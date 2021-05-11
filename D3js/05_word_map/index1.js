const svg = d3.select('svg');

// const projection = d3.geoMercator();
// const projection =  d3.geoOrthographic();
const projection =  d3.geoEqualEarth();
const pathGenerator = d3.geoPath().projection(projection);

svg.append('path')
    .attr('class', 'sphere')
    .attr('d', pathGenerator({type: 'Sphere'}));


d3.json('https://unpkg.com/world-atlas@1/world/110m.json')
    .then((data) => {
        const countries = topojson.feature(data, data.objects.countries);

        svg.selectAll('path')
            .data(countries.features)
            .enter().append('path')
                .attr('class', 'country')
                .attr('d', pathGenerator)
});