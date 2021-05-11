import { colorLegend } from './colorLegend1.js';

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



