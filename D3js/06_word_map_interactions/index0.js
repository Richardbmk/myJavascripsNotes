const svg = d3.select('svg');

// const projection = d3.geoMercator();
// const projection =  d3.geoOrthographic();
const projection =  d3.geoEqualEarth();
const pathGenerator = d3.geoPath().projection(projection);

svg.append('path')
    .attr('class', 'sphere')
    .attr('d', pathGenerator({type: 'Sphere'}));


Promise.all([
    d3.tsv('110m.tsv'),
    d3.json('https://unpkg.com/world-atlas@1/world/110m.json')
]).then(([tsvData, topoJSONdata]) => {
    // Using Reduce:
    const countryName = tsvData.reduce((accum, d) => {
        accum[d.iso_n3] = d.name;
        return accum
    }, {});

/* 
    const countryName = {};
    tsvData.forEach(d => {
        countryName[d.iso_n3] = d.name;
    });
 */
    const countries = topojson.feature(topoJSONdata, topoJSONdata.objects.countries);
    svg.selectAll('path')
        .data(countries.features)
        .enter().append('path')
            .attr('class', 'country')
            .attr('d', pathGenerator)
        .append('title')
            .text(d => countryName[d.id]);
            
});
