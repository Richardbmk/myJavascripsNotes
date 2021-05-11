// My solution

/* Create a function named divisors/Divisors that takes an integer
n > 1 and returns an array with all of the integer's divisors(except for 1 and the number itself),
from smallest to largest. If the number is prime return the string '(integer) is prime' (null in C#)
(use Either String a in Haskell and Result<Vec<u32>, String> in Rust). */

function divisors(integer) {
    const divs = [];
    for (let i = 1; i <= integer; i++){
        if(integer%i === 0){
            //console.log(i);
            divs.push(i)
        }
    }
    divs.shift();
    divs.pop();
    if (divs.length === 0){
        return `${integer} is prime`
    }
    return divs;
}


// My solution litle bit improved
function divisors(integer) {
  const divs = [];
  for (let i = 2; i < integer; i++){
      if(integer%i === 0){
          //console.log(i);
          divs.push(i)
      }
  }
  if (divs.length === 0){
      return `${integer} is prime`
  }
  return divs;
}

divisors(12); // should return [2,3,4,6]
divisors(25); // should return [5]
divisors(13); // should return "13 is prime"


// SOlutions1 of others
function divisors(integer) {
    var res = []
    for (var i = 2; i <= Math.floor(integer / 2); ++i) if (integer % i == 0) res.push(i);
    return res.length ? res : integer + ' is prime'
  };

  // SOlutions2 of others
  function divisors(integer) {
    var divs = [];
    
    for(var i = 2; i < integer; i++) {
      if(integer % i === 0) {
        divs.push(i);
      }
    }
    
    return divs.length ? divs : integer + ' is prime';
  };
  
  // SOlutions2 of others
  function divisors(integer) {
    for(var div = [], i = 2; i < integer; i++) if(integer % i == 0) div.push(i);
    return div.length > 0 ? div : integer + " is prime";
  }

