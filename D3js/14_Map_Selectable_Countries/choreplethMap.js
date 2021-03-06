const projection =  d3.geoEqualEarth();
const pathGenerator = d3.geoPath().projection(projection);

export const choreplethMap = (selection, props) => {
    const { 
        features,
        colorScale,
        colorValue,
        // selectedColorValue,
        selectedCountryId,
        onCountryClick
         } = props;

    let gUpdate = selection.selectAll('g').data([null]);
    const gEnter = gUpdate.enter().append('g');
    const g = gUpdate.merge(gEnter)

/*     gEnter.append('path')
        .attr('class', 'sphere')
        .attr('d', pathGenerator({type: 'Sphere'})); */

    gEnter
        .append('path')
            .attr('class', 'sphere')
            .attr('d', pathGenerator({type: 'Sphere'}))
        .merge(gUpdate.select('.sphere'))
            .attr('opacity', selectedCountryId ? 0.05 : 1);


    selection.call(d3.zoom().on('zoom', () => {
        g.attr('transform', d3.event.transform)
    }));


    const countryPaths = g.selectAll('.country')
        .data(features);
    const countryPathsEnter = countryPaths
        .enter().append('path')
            .attr('class', 'country')
    countryPaths
        .merge(countryPathsEnter)
            .attr('d', pathGenerator)
            .attr('fill', d => colorScale(colorValue(d)))
            .attr('opacity', d => 
                (!selectedCountryId || selectedCountryId === d.id) ? 1 : 0.1)
            .classed('highlighted', d => 
                selectedCountryId && selectedCountryId === d.id
            )
            .on('click', d => {
                if (selectedCountryId && selectedCountryId === d.id) {
                    onCountryClick(null);
                } else {
                    onCountryClick(d.id);
                }
                
            });

    countryPathsEnter.append('title')
        .text(d => d.properties.name + ' : ' + colorValue(d));

}