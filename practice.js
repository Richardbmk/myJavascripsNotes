const votes = ['y', 'y', 'n', 'y', 'n', 'y', 'n', 'y', 'n', 'n', 'n', 'y', 'y'];

const results = votes.reduce((tally, val) => {
    if (tally[val]) {
        tally[val]++ ;
    } else {
        tally[val] = 1;
    };
    return tally;
}, {})

console.log(results);