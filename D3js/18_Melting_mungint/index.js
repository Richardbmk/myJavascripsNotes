import { colorLegend } from './colorLegend.js';
import  { loadAndProcessData } from './loadAndProcessData.js';
const svg = d3.select('svg');

const width = +svg.attr('width');
const height = +svg.attr('height');

const render = dataVar => {

    const title = 'Population over Time';
    const xValue = d => d.year;
    const xAxisLabel = 'Year';

    const yValue = d => d.population;
    const yAxisLabel = 'Population';
    const circleRadius = 4;

    const colorValue = d => d.country;

    const margin = {top: 70, right: 190, bottom: 90, left: 100};
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;
    

    const  xScale = d3.scaleTime()
        .domain(d3.extent(dataVar, xValue))
        .range([0, innerWidth]);
    //console.log(xScale.domain());
    //console.log(xScale.range());

    const yScale = d3.scaleLinear()
        .domain(d3.extent(dataVar, yValue))
        .range([innerHeight, 0])
        .nice();
    //console.log(yScale.range());

    const colorScale = d3.scaleOrdinal(d3.schemeCategory10);

    const g = svg.append('g')
        .attr('transform', `translate(${margin.left},${margin.top})`);
    

    const xAxis = d3.axisBottom(xScale)
        .ticks(6)
        .tickSize(-innerHeight)
        .tickPadding(30);
    
    const yAxisTickFormat = number => 
        d3.format('.2s')(number)
            .replace('G', 'B')
            .replace('.0', '');
    
    const yAxis = d3.axisLeft(yScale)
        .tickSize(-innerWidth)
        .tickFormat(yAxisTickFormat)
        .tickPadding(10);

    const yAxisG =  g.append('g').call(yAxis);
    yAxisG.selectAll('path').remove();

    yAxisG.append('text')
        .attr('class', 'axis-lable')
        .attr('y', -70)
        .attr('x', -innerHeight / 2)
        .attr('fill', 'black')
        .attr('transform', `rotate(-90)`)
        .attr('text-anchor', 'middle')
        .text(yAxisLabel);

    const xAxisG = g.append('g').call(xAxis)
        .attr('transform', `translate(0, ${innerHeight})`);
    xAxisG.selectAll('path').remove();

    xAxisG.append('text')
        .attr('class', 'axis-lable')
        .attr('x', innerWidth / 2)
        .attr('y', 80)
        .attr('fill', 'black')
        .text(xAxisLabel);

    const lineaGenerator = d3.line()
        .x(d => xScale(xValue(d)))
        .y(d => yScale(yValue(d)))
        .curve(d3.curveBasis);

    const lastYvalue = d => yValue(d.values[d.values.length - 1]);

    const nested = d3.nest()
        .key(colorValue)
        .entries(dataVar)
        .sort((a, b) => 
            d3.descending(lastYvalue(a), lastYvalue(b))
        );

    console.log(nested);

    colorScale.domain(nested.map(d => d.key));

    g.selectAll('.line-path').data(nested)
        .enter().append('path')
            .attr('class', 'line-path')
            .attr('d', d => lineaGenerator(d.values))
            .attr('stroke', d => colorScale(d.key));

    g.append('text')
    .attr('class', 'title')
    .attr('y', -15)
    .attr('x', 100)
    .text(title);
        
    svg.append('g')
        .attr('transform', `translate(570,150)`)
        .call(colorLegend, {
        colorScale,
        circleRadius: 8,
        spacing: 30,
        textOffset: 15
        });


};


loadAndProcessData().then(render);
