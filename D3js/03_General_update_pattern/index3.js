import { fruitBowl } from './fruitBowl_v3.js';

const svg = d3.select('svg');

const makeFruit = type => ({ 
    type,
    id: Math.random()
 });

let fruits = d3.range(5)
    .map(() => makeFruit('Orange'));

const render = () => {
    fruitBowl(svg, {
        fruits,
        height: +svg.attr('height')
    })
};

render();

// Eat an apple
setTimeout(() => {
    fruits.pop();
    render();
}, 2000);

// Replace an apple with a lemon
setTimeout(() => {
    fruits[2].type = 'lemon';
    render();
}, 3000);

// Eat an apple
setTimeout(() => {
    fruits = fruits.filter((d, i) => i !== 1);
    render();
}, 4000);



