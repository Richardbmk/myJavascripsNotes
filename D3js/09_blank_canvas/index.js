const svg = d3.select('svg');

const width = document.body.clientWidth;
const height = document.body.clientHeight;


console.log(width, height);

svg
        .attr('width', width)
        .attr('height', height)
    .append('rect')
        .attr('width', width)
        .attr('height', height)
        .attr('rx', 40)
