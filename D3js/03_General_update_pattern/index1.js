const svg = d3.select('svg');

const width = +svg.attr('width');
const height = +svg.attr('height');

const colorScale = d3.scaleOrdinal()
    .domain(['apple', 'lemon'])
    .range(['#c11d1d', '#eae700']);

const radiusScale = d3.scaleOrdinal()
    .domain(['apple', 'lemon'])
    .range([50, 30]);

const render = (selection, { fruits }) => {
    const circle = selection.selectAll('circle').data(fruits);
    circle
        .enter().append('circle')
            .attr('cx', (d, i) => i * 120 + 60)
            .attr('cy', height / 2)
            .attr('fill', d => colorScale(d.type))
            .attr('r', d => radiusScale(d.type));
    circle
        .attr('fill', d => colorScale(d.type))
        .attr('r', d => radiusScale(d.type));

    circle.exit().remove();
}

const makeFruit = type => ({ type });

const fruits = d3.range(5)
    .map(() => makeFruit('Orange'));

render(svg, { fruits });

// Eat an apple
setTimeout(() => {
    fruits.pop();
    render(svg, { fruits });
}, 2000);

// Replace an apple with a lemon
setTimeout(() => {
    fruits[2].type = 'lemon';
    render(svg, { fruits });
}, 3000);



