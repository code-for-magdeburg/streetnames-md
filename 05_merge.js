
const fs = require('fs');
const csv = require('csv-parser');

const coordinates_geojson = fs.readFileSync('./output/coordinates-magdeburg.geojson', 'utf-8');
const streets = JSON.parse(coordinates_geojson);

const streetnames = [];
fs.createReadStream('./names-magdeburg.csv')
    .pipe(csv())
    .on('data', data => streetnames.push(data))
    .on('end', () => {

        streets.features.forEach(feature => {
            const streetname = streetnames.find(s => s.Name === feature.properties.name);
            if (streetname && streetname.Name && streetname.Zuordnung) {
                feature.id = streetname.Name;
                feature.properties['gender'] = streetname.Zuordnung;
            } else {
                console.log('Nicht gefunden: ' + feature.properties.name);
            }
        });

        fs.writeFileSync('./output/streetnames-magdeburg.geojson', JSON.stringify(streets));

    });
