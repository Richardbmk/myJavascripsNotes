
const allCaps = str => str === str.toUpperCase();
const isRegion = name => allCaps(name) && name !== 'WORD';

const melt = (unData, minYear, maxYear) => {
    const years = d3.range(minYear, maxYear + 1);

    const data = [];

    unData.forEach(d => {
        const country = d['Region subregion country or area *'];
        years.forEach(year => {
            const population = +d[year].replace(/ /g, '')*1000;
            const row = {
                // year: new Date(year + ''),
                year: d3.timeParse('%Y')(year),
                country,
                population
            };
            data.push(row);
        });
    });

    return data.filter(d => isRegion(d.country));
}


export const loadAndProcessData = () => 
    Promise
        .all([
            d3.csv('MEDIUM_VARIAN_WPP2019_POP_F01_1_TOTAL_POPULATION_BOTH_SEXES.csv'),
            d3.csv('ESTIMATES_WPP2019_POP_F01_1_TOTAL_POPULATION_BOTH_SEXES.csv'),
        ])
        .then(([unDataMediumVarian, unDataEstimates]) => {
            
            return melt(unDataEstimates, 1950, 2019)
                .concat(melt(unDataMediumVarian, 2020, 2100));
            
    });
