// Uso de var/let/const

var a = 1;
let b = 2;

if (a === 1) {
  var a = 10;
  let b = 20;
}

//console.log(a); // 6
//console.log(b); // 6/

// Use strict. Implicito en ES6. https://www.w3schools.com/js/js_es6.asp

/*function do_something() {
  //bar = 5;
  //var let = 1;
}

//do_something();

// Use of this
*/
const test = {
  foo: 5,
  func: function() {
    return this.foo;
  },
  bar: {
    foo: 10,
    func: function() {
      return this.foo;
    },
  }
};

console.log(test.func());
console.log(test.bar.func());
