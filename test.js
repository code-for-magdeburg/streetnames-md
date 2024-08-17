
const fs = require('fs');
const csv = require('csv-parser');

const x = fs.readFileSync('./karlsruhe.json');
const a = JSON.parse(x);
console.log(a[1].features.length);
return;

const googleDriveData = [];
const amtData = [];

fs.createReadStream('./names-magdeburg.csv')
    .pipe(csv())
    .on('data', data => googleDriveData.push(data))
    .on('end', () => {

        console.log(googleDriveData);

        fs.createReadStream('./STREF.csv')
            .pipe(csv({ separator: ';' }))
            .on('data', data => amtData.push(data))
            .on('end', () => {

                let cnt = 0;
                amtData.forEach(ad => {
                    if (googleDriveData.findIndex(gdd => gdd.Name === ad['Straßenname']) === -1) {
                        console.log(`Nicht gefunden: ${ad['Straßenname']}`);
                        cnt++;
                    }
                });
                console.log(cnt);

/*
                let cnt = 0;
                googleDriveData.forEach(gdd => {
                    if (amtData.findIndex(ad => gdd.Name === ad['Straßenname']) === -1) {
                        console.log(`Nicht gefunden: ${gdd.Name}`);
                        cnt++;
                    }
                });
                console.log(cnt);
*/

            });

    });
