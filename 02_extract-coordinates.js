const osmread = require('osm-read');
const fs = require('fs');
const GeoJSON = require('geojson');


const nodes = [];
const osmStreets = [];
const osm = osmread.parse({
    format: 'xml',
    filePath: './output/highways-magdeburg.osm',

    endDocument: function () {
        const geoJson = GeoJSON.parse(osmStreets, { 'MultiLineString': 'entries' });
        fs.writeFileSync('./output/coordinates-magdeburg.geojson', JSON.stringify(geoJson));
        console.log('Done.');
    },

    node: function (node) {
        nodes.push({ id: node.id, coords: [node.lon, node.lat] });
    },

    way: function (way) {
        if (way.tags && way.tags.highway && way.tags.name) {

            const osmStreet = osmStreets.find(s => s.name === way.tags.name);
            if (osmStreet) {
                osmStreet.entries.push(way.nodeRefs.map(nodeRef => {
                    const node = nodes.find(n => n.id === nodeRef);
                    if (node) {
                        return node.coords;
                    }
                    return null;
                }).filter(node => !!node));
            } else {
                osmStreets.push({
                    name: way.tags.name,
                    entries: [way.nodeRefs.map(nodeRef => {
                        const node = nodes.find(n => n.id === nodeRef);
                        if (node) {
                            return node.coords;
                        }
                        return null;
                    }).filter(node => !!node)]
                });
            }

        }
    },

});
