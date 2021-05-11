const svg = d3.select('svg');

const width = +svg.attr('width');
const height = +svg.attr('height');


const render = (selection, { fruits }) => {
    const circle = selection.selectAll('circle').data(fruits);
    circle
        .enter().append('circle')
            .attr('cx', (d, i) => i * 120 + 60)
            .attr('cy', height / 2)
            .attr('fill', '#c11d1d')
            .attr('r', 50);

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



