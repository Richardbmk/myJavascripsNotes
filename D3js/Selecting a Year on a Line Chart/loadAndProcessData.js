import { csv, range, timeParse } from 'd3';

export const parseYear = timeParse('%Y');

const allCaps = str => str === str.toUpperCase();
const isRegion = name => allCaps(name) && name !== 'WORLD';

const melt = (unData, minYear, maxYear) => {
  const years = range(minYear, maxYear + 1);

  const data = [];

  unData.forEach(d => {
    const name = d['Region, subregion, country or area *']
      .replace('AND THE', '&');
    years.forEach(year => {
      const population = +d[year].replace(/ /g, '') * 1000;
      const row = {
        year: parseYear(year),
        name,
        population
      };
      data.push(row);
    });
  });

  return data.filter(d => isRegion(d.name));
};

export const loadAndProcessData = () => 
  Promise
    .all([
      csv('MEDIUM_VARIAN_WPP2019_POP_F01_1_TOTAL_POPULATION_BOTH_SEXES.csv'),
      csv('ESTIMATES_WPP2019_POP_F01_1_TOTAL_POPULATION_BOTH_SEXES.csv'),
    ])
    .then(([unDataMediumVariant, unDataEstimates]) => {
      return melt(unDataEstimates, 1950, 2019)
        .concat(melt(unDataMediumVariant, 2020, 2100));
    });