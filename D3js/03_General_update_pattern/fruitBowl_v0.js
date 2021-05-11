const colorScale = d3.scaleOrdinal()
    .domain(['apple', 'lemon'])
    .range(['#c11d1d', '#eae700']);

const radiusScale = d3.scaleOrdinal()
    .domain(['apple', 'lemon'])
    .range([50, 30]);

const xPosition = (d, i) => i * 120 + 60;

export const fruitBowl = (selection, props) => {
    const { fruits, height } = props;
    const circle = selection.selectAll('circle')
        .data(fruits, d => d.id);
    circle
        .enter().append('circle')
            .attr('cx', xPosition)
            .attr('cy', height / 2)
            .attr('r', 0)
        .merge(circle)
            .attr('fill', d => colorScale(d.type))
        .transition().duration(1000)
            .attr('cx', xPosition)
            .attr('r', d => radiusScale(d.type));

    circle.exit()
        .transition().duration(1000)
            .attr('r', 0)
        .remove();
}