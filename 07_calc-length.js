
const fs = require('fs');

const gender_json = fs.readFileSync('./output/gender.json');
const gender = JSON.parse(gender_json);

const male = gender[0];
const female = gender[1];

let sumTotalFemale = 0;
const femaleFeatures = female.features;
femaleFeatures.forEach(feature => {

    if (feature.geometry.type === 'MultiLineString') {

        let sum = 0;

        const legs = feature.geometry.coordinates;
        legs.forEach(leg => {
            for (let i = 0; i < leg.length-1; i++) {
                const a = { lat: leg[i][1], lng: leg[i][0] };
                const b = { lat: leg[i+1][1], lng: leg[i+1][0] };
                const dist = distance(a.lat, a.lng, b.lat, b.lng);
                sum += dist;
            }
        });

        //console.log(feature.id + ': ' + sum.toFixed(3));
        sumTotalFemale += sum;

    } else {
        // TODO: ...
    }

});

console.log('Sum female: ' + sumTotalFemale.toFixed());
console.log('Avg female: ' + (sumTotalFemale/femaleFeatures.length).toFixed());

let sumTotalMale = 0;
const maleFeatures = male.features;
maleFeatures.forEach(feature => {

    if (feature.geometry.type === 'MultiLineString') {

        let sum = 0;

        const legs = feature.geometry.coordinates;
        legs.forEach(leg => {
            for (let i = 0; i < leg.length-1; i++) {
                const a = { lat: leg[i][1], lng: leg[i][0] };
                const b = { lat: leg[i+1][1], lng: leg[i+1][0] };
                const dist = distance(a.lat, a.lng, b.lat, b.lng);
                sum += dist;
            }
        });

        //console.log(feature.id + ': ' + sum.toFixed(3));
        sumTotalMale += sum;

    } else {
        // TODO: ...
    }

});

function distance(lat1,lon1,lat2,lon2) {
    var R = 6371; // km (change this constant to get miles)
    var dLat = (lat2-lat1) * Math.PI / 180;
    var dLon = (lon2-lon1) * Math.PI / 180;
    var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.cos(lat1 * Math.PI / 180 ) * Math.cos(lat2 * Math.PI / 180 ) *
        Math.sin(dLon/2) * Math.sin(dLon/2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    var d = R * c;
    if (d>1) return Math.round(d/1000);
    else return Math.round(d*1000);
}

console.log('Sum male: ' + sumTotalMale.toFixed());
console.log('Avg male: ' + (sumTotalMale/maleFeatures.length).toFixed());
