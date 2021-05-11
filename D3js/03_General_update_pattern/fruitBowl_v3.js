const colorScale = d3.scaleOrdinal()
    .domain(['Orange', 'lemon'])
    .range(['#F9AF04', '#eae700']);

const radiusScale = d3.scaleOrdinal()
    .domain(['Orange', 'lemon'])
    .range([50, 30]);

export const fruitBowl = (selection, props) => {
    const { fruits, height } = props;

    const bowl = selection.selectAll('rect')
        .data([null])
        .enter().append('rect')
            .attr('y', 150)
            .attr('width', 610)
            .attr('height', 200)
            .attr('rx', 300 / 2);

    const groups = selection.selectAll('g')
        .data(fruits);
    const groupsEnter = groups.enter().append('g');
    groupsEnter
        .merge(groups)
            .attr('transform', (d, i) => `translate(${ i * 120 + 60}, ${height / 2})`);
    groups.exit().remove();

    groupsEnter.append('circle')
        .merge(groups.select('circle'))
            .attr('r', d => radiusScale(d.type))
            .attr('fill', d => colorScale(d.type));

    groupsEnter.append('text')
        .merge(groups.select('text'))
            .text(d => d.type)
            .attr('y', 120);
}