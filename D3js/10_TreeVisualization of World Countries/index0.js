const svg = d3.select('svg');

const width = document.body.clientWidth;
const height = document.body.clientHeight;

const treeLayout = d3.tree()
    .size([height, width]);


console.log(width, height);

svg
        .attr('width', width)
        .attr('height', height)

    
d3.json('data.json')
    .then(data => {
        const root = d3.hierarchy(data);
        const links = treeLayout(root).links();
        const linkPathGenerator = d3.linkHorizontal()
            .x(d => d.y)
            .y(d => d.x);
        treeLayout(root);
        // console.log(data);

        svg.selectAll('path').data(links)
            .enter().append('path')
                .attr('d', linkPathGenerator);
    });