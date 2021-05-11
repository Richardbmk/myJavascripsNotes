const svg = d3.select('svg');

// const projection = d3.geoMercator();
// const projection =  d3.geoOrthographic();
const projection =  d3.geoEqualEarth();
const pathGenerator = d3.geoPath().projection(projection);

const g = svg.append('g');

g.append('path')
    .attr('class', 'sphere')
    .attr('d', pathGenerator({type: 'Sphere'}));

svg.call(d3.zoom().on('zoom', () => {
    g.attr('transform', d3.event.transform)
}));

Promise.all([
    d3.tsv('https://unpkg.com/browse/world-atlas@1.1.4/world/50m.tsv'),
    d3.json('https://unpkg.com/world-atlas@1/world/50m.json')
]).then(([tsvData, topoJSONdata]) => {
    const countryName = {};
    tsvData.forEach(d => {
        countryName[d.iso_n3] = d.name;
    });

    const countries = topojson.feature(topoJSONdata, topoJSONdata.objects.countries);
    g.selectAll('path')
        .data(countries.features)
        .enter().append('path')
            .attr('class', 'country')
            .attr('d', pathGenerator)
        .append('title')
            .text(d => countryName[d.id]);
            
});
