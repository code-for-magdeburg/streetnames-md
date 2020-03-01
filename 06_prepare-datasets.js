const fs = require('fs');

const streetnames_geojson = fs.readFileSync('./output/streetnames-magdeburg.geojson');
const streetnames = JSON.parse(streetnames_geojson);

const streetnames_female = streetnames.features.filter(feature => feature.id && feature.properties && feature.properties.gender === 'f');
const streetnames_male = streetnames.features.filter(feature => feature.id && feature.properties && feature.properties.gender === 'm');
//const streetnames_none = streetnames.features.filter(feature => !feature.id || !feature.properties || (feature.properties.gender !== 'w' && feature.properties.gender !== 'm'));

const gender = [
    {
        color: '#ff7f00',
        label: 'männlich',
        features: streetnames_male
    },
    {
        color: '#007fff',
        label: 'weiblich',
        features: streetnames_female
    }
];

fs.writeFileSync('./output/gender.json', JSON.stringify(gender));
