import  {  parseYear } from './loadAndProcessData.js';

export const lineChart = (selection, props) => {
    const {
        colorValue,
        colorScale,
        yValue,
        title,
        xValue,
        xAxisLabel,
        circleRadius,
        yAxisLabel,
        margin,
        width,
        height,
        dataVar,
        nested,
        selectedYear,
        setSelectedYear
    } = props;


    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;
    

    const  xScale = d3.scaleTime()
        .domain(d3.extent(dataVar, xValue))
        .range([0, innerWidth]);
    // console.log(xScale.domain());
    // console.log(xScale.range());

    const yScale = d3.scaleLinear()
        .domain(d3.extent(dataVar, yValue))
        .range([innerHeight, 0])
        .nice();
    //console.log(yScale.range());

    

    const g = selection.selectAll('.container').data([null]);
    const gEnter = g.enter()
        .append('g')
            .attr('class', 'container');
    gEnter.merge(g)
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

    const yAxisGEnter =  gEnter
        .append('g')
            .attr('class', 'y-axis');
    const yAxisG = g.select('.y-axis');
    yAxisGEnter 
        .merge(yAxisG)
        .call(yAxis)
        .selectAll('.domain').remove();


    yAxisGEnter
        .append('text')
            .attr('class', 'axis-lable')
            .attr('y', -70)
            .attr('fill', 'black')
            .attr('transform', `rotate(-90)`)
            .attr('text-anchor', 'middle')
        .merge(yAxisG.select('.axis-label'))
            .attr('x', -innerHeight / 2)
            .text(yAxisLabel);

    const xAxisGEnter = gEnter
        .append('g')
            .attr('class', 'x-axis');
    const xAxisG = g.select('.x-axis');
    xAxisGEnter
        .merge(xAxisG)
        .call(xAxis)
        .attr('transform', `translate(0, ${innerHeight})`)
        .select('.domain').remove();
    

    xAxisGEnter
        .append('text')
            .attr('class', 'axis-lable')
            .attr('y', 80)
            .attr('fill', 'black')
        .merge(xAxisG.select('.axis-label'))
            .attr('x', innerWidth / 2)
            .text(xAxisLabel);

    const lineaGenerator = d3.line()
        .x(d => xScale(xValue(d)))
        .y(d => yScale(yValue(d)))
        .curve(d3.curveBasis);


    const linePaths = g.merge(gEnter)
        .selectAll('.line-path').data(nested);
    linePaths
        .enter().append('path')
            .attr('class', 'line-path')
        .merge(linePaths)
            .attr('d', d => lineaGenerator(d.values))
            .attr('stroke', d => colorScale(d.key));

    // New thing about to come
    const selectedYearDate = parseYear(selectedYear);

    gEnter
        .append('line')
            .attr('class', 'line-selectedyead')
            .attr('y1', 0)
        .merge(g.select('.line-selectedyead'))
            .attr('x1', xScale(selectedYearDate))
            .attr('x2', xScale(selectedYearDate))
            .attr('y2', innerHeight)
            .attr('stroke','black');

    gEnter
        .append('text')
            .attr('class', 'title')
            .attr('y', -15)
            .attr('x', 100)
        .merge(g.select('.title'))
            .text(title);

    gEnter  
    .append('rect')
        .attr('class', 'mouse-interceptor')
        .attr('fill', 'none')
        .attr('pointer-events', 'all')
    .merge(g.select('.mouse-interceptor'))
        .attr('width', innerWidth)
        .attr('height', innerHeight)
        .on('mousemove', function() {
            // const x = d3.mouse(g.node())[0];
            const x = d3.mouse(this)[0];
            const hoverDate = xScale.invert(x);
            setSelectedYear(hoverDate.getFullYear());
        });
};