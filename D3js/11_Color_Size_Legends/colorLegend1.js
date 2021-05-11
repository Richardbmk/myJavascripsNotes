export const colorLegend = (selection, props) => {
    const { 
            colorScale,
            circuleRadius,
            circleSpace,
            textOffset
         } = props;

    console.log(colorScale.domain());

    const groups = selection.selectAll('g')
        .data(colorScale.domain());
    const groupsEnter = groups.enter().append('g');
    groupsEnter
        .merge(groups)
            .attr('transform', (d, i) => `translate(0, ${ i * circleSpace})`);
    groups.exit().remove();

    groupsEnter.append('circle')
        .merge(groups.select('circle'))
            .attr('r', circuleRadius)
            .attr('fill', colorScale);

    groupsEnter.append('text')
        .merge(groups.select('text'))
            .text(d => d)
            .attr('dy', '0.32em')
            .attr('x', textOffset);
}