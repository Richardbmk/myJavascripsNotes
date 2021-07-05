const obj = {
  foo: 1,
  bar: 2,
  foobar: 3,
  test: {
    foo: 1,
    bar: 2
  }
};

// Copia por referencia
// let obj2 = obj;
// let obj3 = {
//   foo: obj.foo
// };
// obj3.foo = 100;
// //obj2.foo = 10;
// console.log("---Copia por referencia---");
// console.log(obj);
//console.log(obj3);

const key1 = "pla";
const key2 = "ple";
const key3 = "pli";
// // Claves dinámicas
// const dynObj = {
//   [key1]: 100,
//   [key2]: 200,
//   [key3]: 300
// };
//
// var NIF = "1231231";
// let objetoVacio = {
//   [NIF]: user
// };
// objetoVacio["NIF"] = user;
// console.log(dynObj);

const dynObj2 = {
  key1,
  key2,
  key3
};

//console.log(dynObj2);

// //Spread operator
// let obj4 = {...obj};
// obj4.test.foo = 200;
// console.log("---Spread operator---");
// console.log(obj);


// Desestructurado de objeto
//const {foo, bar, baz} = obj;
// const {foo, ...remainingKeys} = obj;
// console.log("---Desestructurado---");
// console.log(foo);
// console.log(remainingKeys);

// Operador in
console.log("foo" in obj);
console.log("baz" in obj);


let sObj4 = JSON.stringify(obj); // JSON to string with replacer


console.log("---Stringify with array replacer---");

let sObjReplace = JSON.stringify(obj, ["foo", "bar"]); // JSON to string with replacer


function replacer(key, value) {
  if (value < 200) {
    return undefined;
  }
  return value;
}
let sObjReplaceWithFn = JSON.stringify(obj, replacer); // JSON to string with replacer
console.log(sObjReplaceWithFn);



console.log("---Parse---");
console.log("Type of sObjReplace: " + typeof sObjReplace);
let prevObj = JSON.parse(sObjReplace); // JSON to string with replacer
console.log("Type of prevObj: " + typeof prevObj);

console.log("---Parse with replacer---");
function parseReplacer(key, value) {
  return value * 100;
}
console.log("Type of sObjReplace: " + typeof sObjReplaceWithFn);
let prevObjWithFn = JSON.parse(sObjReplace, parseReplacer); // JSON to string with replacer
console.log("Type of prevObjWithFn: " + typeof prevObjWithFn);



//Funciones
const obj5 = {bla: 6, ble: 7, bli: 8};
const obj6 = {foo: 8, bar: 9, foobar: 10};


const mergedObjects = Object.assign({}, obj, obj5, obj6);


console.log("---Object.keys---");
console.table(Object.keys(mergedObjects));
console.log("---Object.entries---");
console.table(Object.entries(mergedObjects));
