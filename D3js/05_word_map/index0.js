const svg = d3.select('svg');

const width = +svg.attr('width');
const height = +svg.attr('height');

const projection = d3.geoMercator();
const pathGenerator = d3.geoPath().projection(projection)

d3.json('https://unpkg.com/world-atlas@1/world/110m.json')
    .then((data) => {
        const countries = topojson.feature(data, data.objects.countries);
        console.log(countries);

        const paths = svg.selectAll('path')
            .data(countries.features)
        paths.enter().append('path')
            .attr('d', d => pathGenerator(d));
});