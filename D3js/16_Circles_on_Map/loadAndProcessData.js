export const loadAndProcessData = () => 
    Promise
        .all([
            d3.csv('https://gist.githubusercontent.com/curran/e7ed69ac1528ff32cc53b70fdce16b76/raw/61f3c156efd532ae6ed84b38102cf9a0b3b1d094/data.csv'),
            d3.json('https://unpkg.com/visionscarto-world-atlas/world/110m.json')
        ])
        .then(([unData, topoJSONdata]) => {
            // Using Reduce:
            const rowById = unData.reduce((accum, d) => {
                accum[d['Country code']] = d;
                return accum
            }, {});

        const countries = topojson.feature(topoJSONdata, topoJSONdata.objects.countries);
        
        countries.features.forEach(d => {
            Object.assign(d.properties, rowById[+d.id]);  
               
        });

        const featuresWithPopulation = countries.features
            .filter(d => d.properties['2020'])
            .map(d => {
                d.properties['2020'] = +d.properties['2020'].replace(/ /g, '') * 1000;
                return d;
            });


        // console.log(featuresWithPopulation);

        return {
            features: countries.features,
            featuresWithPopulation
        };
    });
