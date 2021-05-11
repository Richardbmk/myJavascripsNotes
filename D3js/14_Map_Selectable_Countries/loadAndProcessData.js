export const loadAndProcessData = () => 
    Promise
        .all([
            d3.tsv('110m.tsv'),
            d3.json('https://unpkg.com/world-atlas@1/world/110m.json')
        ])
        .then(([tsvData, topoJSONdata]) => {
            // Using Reduce:
            const rowById = tsvData.reduce((accum, d) => {
                accum[d.iso_n3] = d;
                return accum
            }, {});
    
        const countries = topojson.feature(topoJSONdata, topoJSONdata.objects.countries);

        countries.features.forEach(d => {
            Object.assign(d.properties, rowById[d.id]);        
        });

        return countries;
});
