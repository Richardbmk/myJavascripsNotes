import { loadAndProcessData } from './loadAndProcessData.js';
import { colorLegend } from './colorLegend.js';

const svg = d3.select('svg');

// const projection = d3.geoMercator();
// const projection =  d3.geoOrthographic();
const projection =  d3.geoEqualEarth();
const pathGenerator = d3.geoPath().projection(projection);

const g = svg.append('g');

const colorLegendG = svg.append('g')
    .attr('transform', `translate(30, 300)`);

g.append('path')
    .attr('class', 'sphere')
    .attr('d', pathGenerator({type: 'Sphere'}));


svg.call(d3.zoom().on('zoom', () => {
    g.attr('transform', d3.event.transform)
}));

const colorScale = d3.scaleOrdinal();
const colorValue = d => d.properties.income_grp;
/* const colorValue = d => d.properties.economy; */

loadAndProcessData().then(countries => {

    colorScale
        .domain(countries.features.map(colorValue))
        .domain(colorScale.domain().sort().reverse())
        .range(d3.schemeSpectral[colorScale.domain().length]);

    colorLegendG.call(colorLegend, {
        colorScale,
        circleRadius: 5,
        circleSpace: 17,
        textOffset: 20,
        backgroundRectWidth: 240
        });

    g.selectAll('path')
        .data(countries.features)
        .enter().append('path')
            .attr('class', 'country')
            .attr('d', pathGenerator)
            .attr('fill', d => colorScale(colorValue(d)))
        .append('title')
            .text(d => d.properties.name + ': ' + colorValue(d));
            
});
