import { colorLegend } from './colorLegend.js';
import  { loadAndProcessData, parseYear } from './loadAndProcessData.js';
import { lineChart } from './lineChart.js';

const svg = d3.select('svg');
const lineChartG = svg.append('g');
const colorLegendG = svg.append('g');

const width = +svg.attr('width');
const height = +svg.attr('height');

let selectedYear = 2018;

let dataVar;

const setSelectedYear = year => {
    selectedYear = year;
    render();
};

const render = () => {
    const yValue = d => d.population;
    const colorValue = d => d.country;
    const colorScale = d3.scaleOrdinal(d3.schemeCategory10);
    const lastYvalue = d => yValue(d.values[d.values.length - 1]);

    const nested = d3.nest()
        .key(colorValue)
        .entries(dataVar)
        .sort((a, b) => 
            d3.descending(lastYvalue(a), lastYvalue(b))
        );

    colorScale.domain(nested.map(d => d.key));

    lineChartG.call(lineChart, {
        colorScale,
        colorValue,
        yValue,
        title: 'Population over Time',
        xValue: d => d.year,
        xAxisLabel: 'Year',
        yAxisLabel: 'Population',
        circleRadius: 4,
        margin: { 
            top: 70,
            right: 190,
            bottom: 90,
            left: 100
        },
        width,
        height,
        dataVar,
        nested,
        selectedYear,
        setSelectedYear
    });

    colorLegendG
        .attr('transform', `translate(570,150)`)
        .call(colorLegend, {
        colorScale,
        circleRadius: 8,
        spacing: 30,
        textOffset: 15
        });


};


loadAndProcessData()
    .then((loadedData) => {
        dataVar = loadedData;
        render();
    });
