import { colorLegend } from './colorLegend1.js';
import { sizeLegend } from './sizeLegend.js';

const svg = d3.select('svg');

const colorScale = d3.scaleOrdinal()
    .domain(['Orange', 'Lemon', 'Apple', 'Lime'])
    .range(['#F9AF04', '#eae700', '#c11d1d', 'green']);

svg.append('g')
    .attr('transform', `translate(400, 150)`)
    .call(colorLegend, {
        colorScale,
        circuleRadius: 25,
        circleSpace: 80,
        textOffset: 50
});

const sizeScale = d3.scaleSqrt()
    .domain([0, 10])
    .range([0, 50])

svg.append('g')
    .attr('transform', `translate(600, 120)`)
    .call(sizeLegend, {
        sizeScale,
        circleSpace: 70,
        textOffset: 10,
        numTicks: 5,
        circleFill: 'rgb(0, 0, 0, 0.5)'
    });



