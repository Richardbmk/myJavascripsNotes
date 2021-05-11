import { loadAndProcessData } from './loadAndProcessData.js';
import { colorLegend } from './colorLegend.js';
import { choreplethMap } from './choreplethMap.js';

const svg = d3.select('svg');

// const projection = d3.geoMercator();
// const projection =  d3.geoOrthographic();
const projection =  d3.geoEqualEarth();
const pathGenerator = d3.geoPath().projection(projection);
const choroplethMapG = svg.append('g');
const colorLegendG = svg.append('g')
    .attr('transform', `translate(30, 300)`);

const colorScale = d3.scaleOrdinal();
const colorValue = d => d.properties.income_grp;
/* const colorValue = d => d.properties.economy; */

// State
// let selectedColorValue;
let features;
let selectedCountryId;

/* 
const onClick = d => {
    selectedColorValue = d;
    // console.log({selectedColorValue});
    render();
}; 
*/

const onCountryClick = id => {
    // console.log(d.id);
    selectedCountryId = id;
    render();
};

loadAndProcessData().then(countries => {
    features = countries.features;
    render();   
});

const render = () => {
    colorScale
        .domain(features.map(colorValue))
        .domain(colorScale.domain().sort().reverse())
        .range(d3.schemeSpectral[colorScale.domain().length]);

    colorLegendG.call(colorLegend, {
        colorScale,
        circleRadius: 5,
        circleSpace: 17,
        textOffset: 20,
        backgroundRectWidth: 240,
        // onClick,
        // selectedColorValue
        });

    choroplethMapG.call(choreplethMap, {
        features,
        colorScale,
        colorValue,
        // selectedColorValue,
        selectedCountryId,
        onCountryClick
    });
}




