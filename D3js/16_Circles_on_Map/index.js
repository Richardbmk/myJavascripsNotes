import { loadAndProcessData } from './loadAndProcessData.js';
import { sizeLegend } from './sizeLegend.js';

const svg = d3.select('svg');

// const projection = d3.geoMercator();
// const projection =  d3.geoOrthographic();
const projection =  d3.geoEqualEarth();
const pathGenerator = d3.geoPath().projection(projection);
const radiusValue = d => d.properties['2020'];
const populationFormat = d3.format(',');

const g = svg.append('g');

g.append('path')
    .attr('class', 'sphere')
    .attr('d', pathGenerator({type: 'Sphere'}));


svg.call(d3.zoom().on('zoom', () => {
    g.attr('transform', d3.event.transform)
}));


loadAndProcessData().then(countries => {

    const sizeScale = d3.scaleSqrt()
        .domain([0, d3.max(countries.features, radiusValue)])
        .range([0, 33]);

    g.selectAll('path')
        .data(countries.features)
        .enter().append('path')
            .attr('class', 'country')
            .attr('d', pathGenerator)
            .attr('fill', d => d.properties['2020'] ? '#d8d8d8' : '#fec1c1')
        .append('title')
            .text(d => isNaN(radiusValue(d))
              ? 'Missing data' 
              : [
                d.properties['Region subregion country or area'],
                populationFormat(radiusValue(d))
            ].join(': '));

    // console.log(radiusValue(countries.features[0]))
       
            
    g.selectAll('circle').data(countries.featuresWithPopulation)
        .enter().append('circle')
            .attr('class', 'country-circle')
            .attr('cx', d => projection(d3.geoCentroid(d))[0])
            .attr('cy', d => projection(d3.geoCentroid(d))[1])
            .attr('r', d => sizeScale(radiusValue(d)));

    
    g.append('g')
    .attr('transform', `translate(-50,270)`)
    .call(sizeLegend, {
        sizeScale,
        circleSpace: 35,
        textOffset: 10,
        numTicks: 5,
        // circleFill: 'rgba(0, 0, 0, 0.5)',
        tickFormat: populationFormat
    }).append('text')
        .attr('class', 'legend-title')
        .text('Population')
        .attr('transform', `translate(80,-50)`);
            
});
