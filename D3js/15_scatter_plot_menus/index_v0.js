const svg = d3.select('svg');

const width = +svg.attr('width');
const height = +svg.attr('height');

const render = dataVar => {
    const xValue = d => d.population;
    const yValue = d => d.country;
    const margin = {top: 20, right: 40, bottom: 20, left: 100};
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;
    

    const  xScale = d3.scaleLinear()
        .domain([0, d3.max(dataVar, xValue)])
        .range([0, innerWidth]);
    //console.log(xScale.domain());
    //console.log(xScale.range());

    const yScale = d3.scaleBand()
        .domain(dataVar.map(yValue))
        .range([0, innerHeight])
        .padding(0.1);
    //console.log(yScale.domain());

    const g = svg.append('g')
        .attr('transform', `translate(${margin.left},${margin.top})`);
    
    g.append('g').call(d3.axisLeft(yScale));
    g.append('g').call(d3.axisBottom(xScale))
        .attr('transform', `translate(0, ${innerHeight})`)

    g.selectAll('rect').data(dataVar)
        .enter().append('rect')
            .attr('y', d => yScale(yValue(d)))
            .attr('width', d => xScale(xValue(d)))
            .attr('height', yScale.bandwidth());
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