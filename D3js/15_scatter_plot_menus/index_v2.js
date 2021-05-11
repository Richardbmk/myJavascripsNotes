const svg = d3.select('svg');

const width = +svg.attr('width');
const height = +svg.attr('height');

const render = dataVar => {
    const xValue = d => d.population;
    const yValue = d => d.country;
    const margin = {top: 70, right: 100, bottom: 70, left: 150};
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;
    

    const  xScale = d3.scaleLinear()
        .domain([0, d3.max(dataVar, xValue)])
        .range([0, innerWidth])
        .nice();
    //console.log(xScale.domain());
    //console.log(xScale.range());

    const yScale = d3.scalePoint()
        .domain(dataVar.map(yValue))
        .range([0, innerHeight])
        .padding(0.7);
    //console.log(yScale.range());

    const g = svg.append('g')
        .attr('transform', `translate(${margin.left},${margin.top})`);
    
    const xAxisTickFormat = number => 
        d3.format('.3s')(number)
        .replace('G', 'B');

    const xAxis = d3.axisBottom(xScale)
        .tickFormat(xAxisTickFormat)
        .tickSize(-innerHeight);
    
    const yAxis = d3.axisLeft(yScale)
        .tickSize(-innerWidth)

    g.append('g').call(yAxis)
        .selectAll('path')
            .remove();


    const xAxisG = g.append('g').call(xAxis)
        .attr('transform', `translate(0, ${innerHeight})`);
    xAxisG.selectAll('path').remove();

    xAxisG.append('text')
        .attr('class', 'axis-lable')
        .attr('x', innerWidth / 2)
        .attr('y', 50)
        .attr('fill', 'black')
        .text('Population');

    g.selectAll('circle').data(dataVar)
        .enter().append('circle')
            .attr('cy', d => yScale(yValue(d)))
            .attr('cx', d => xScale(xValue(d)))
            .attr('r', 10);
    
    //console.log(yScale.bandwidth() / 2)

    g.append('text')
        .attr('class', 'title')
        .attr('y', -10)
        .text('Top 10 Most Populous Countries of 2017');
};


d3.csv('data.csv').then(data => {
    data.forEach( d => {
        //d.population = parseFloat(d.population);
        d.population = +d.population*1000;
    });
    //console.log(data);
    render(data);
});
/* 
PRINTING THE CSV DATA INTO JSON
const kilobytes = data => Math.ceil( d3.csvFormat(data).length / 1024);

const body = d3.select('body');

d3.csv('data.csv').then(data => {
    body.append('pre')
        .text([
            `${data.length} rows`,
            `${Object.keys(data[0]).length} columns`,
            `${kilobytes(data)} KB`
        ].join(', '));

    body.append('pre')
        .text('First 10 roes');
    
    body.append('pre')
        .text(JSON.stringify(data.slice(0, 10), null, 2))
}) 
*/