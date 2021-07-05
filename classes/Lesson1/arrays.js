//https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Array
import users from "./users.js";

let data = [];

const foo1 = {foo: 10, bar: 10};
const foo2 = {foo: 100, bar: 100};

for (let int = 0; int < 1_000_000; int++) {
  data.push({
    foo: Math.random(),
    bar: Math.random()
  })
}
data = [
  foo1,
  ...data,
  foo2
];

console.log(data.length);
const lastEl = data.pop();
const firstEl = data.shift();

console.log(firstEl);
console.log(lastEl);
console.log(data.length);

console.log("-------Some--------");
console.time("Some");
console.log(
  "Some item fulfills condition: " + data.some(function(element) {
    return element.foo > 1000;
  })
);
console.timeEnd("Some");

console.log("-------Every--------");
console.time("Every");
console.log(
  "Every item fulfills condition: " + data.every((element) => {
    return element.foo > 0;
  })
);
console.timeEnd("Every");

console.log("-------Filter--------");
console.time("Filter");
console.log(
  "Items filtered: " + data.filter((element) => element.foo > 0.5).length
);
console.timeEnd("Filter");

console.log("-------Map--------");
console.time("Map");
var modifiedItems = data.map((element) => {
  return {
    ...element,
    baz: element.foo + element.bar
  };
});
console.timeEnd("Map");

console.log("-------Foreach--------");
console.time("Foreach");
let newData = data.forEach(({foo, bar}) => {
  let total = foo + bar;
});
console.timeEnd("Foreach");

console.log("-------Reduce--------");
console.time("Reduce");
let accumulator = data.reduce(
  function(accumulator, item, index, arrayInitial) {
    return {
      foo: accumulator.foo + item.foo,
      bar: accumulator.bar + item.bar
    }
  },
  {foo: 0, bar: 0});
console.timeEnd("Reduce");

console.log("-------Reduce2--------");
console.time("Reduce2");
console.log(
  data.reduce((accumulator, {foo, bar}) => ({
    foo: accumulator.foo + foo,
    bar: accumulator.bar + bar
  }))
);
console.timeEnd("Reduce2");

console.log("-------Sort--------");
console.time("Sort");
console.log(
  data.sort((el_1, el_2) => el_1.foo < el_2.foo ? -1 : el_1.foo > el_2.foo ? 1 : 0)[data.length - 1]
);
console.timeEnd("Sort");

console.log("-------Find--------");
console.time("Find");
console.log(
  data.find(({foo}) => foo > 0.1 && foo < 0.2)
);
console.timeEnd("Find");

console.log("-------FindIndex--------");
console.time("FindIndex");
console.log(
  data.findIndex(({foo}) => foo > 0.1 && foo < 0.2)
);
console.timeEnd("FindIndex");

console.log("-------For loop--------");
console.time("For loop");
for (let int = 0; int < data.length; int++) {
  let total = data[int].foo + data[int].bar;
}
console.timeEnd("For loop");
