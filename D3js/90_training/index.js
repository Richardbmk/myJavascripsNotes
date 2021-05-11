const data = [25, 20, 10, 12, 15, 18];

const svg = d3.select("#chart-area").append('svg')
                .attr("width", 500)
                .attr("height", 500);

                
d3.json('./data/buildings.json')
    .then((data) => {
        console.log(data);

        data.forEach(d => {
            d.height = +d.height;
        });

const rect = svg.selectAll('rect')
            .data(data).enter()
                .append('rect')
                    .attr('x', (d, i) => {
                        return (i * 70);
                    })
                    .attr('y', 50)
                    .attr('width', 50)
                    .attr('height', d => {
                        return d.height;
                    })
                    .attr('fill', 'blue')
    })





/* 

const rect = svg.selectAll('rect')
                    .data(data).enter()
                        .append('rect')
                            .attr('x', (d, i) => {
                                return (i * 70);
                            })
                            .attr('y', 50)
                            .attr('width', 50)
                            .attr('height', d => {
                                return d;
                            })
                            .attr('fill', 'blue')

 */