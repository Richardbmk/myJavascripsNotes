/*
  Arrow functions
  No tiene sus propios enlaces a this o super y no se debe usar como métodos.
  No tiene argumentos o palabras clave new.target.
  No apta para los métodos call, apply y bind, que generalmente se basan en establecer un ámbito o alcance
  No se puede utilizar como constructor.
  No se puede utilizar yield dentro de su cuerpo.
*/

const obj = {
  foo: 10,
  bar: 20,
  baz: 30
};
const arr = [
  100,
  200,
  300
];

const arrowFunction = (param1) => {

};

const fnFirstFunction = function() {

  const fnSecondFunction = function(arg1, arg2) {
    console.log(arg1 + arg2);
  };
  const fnThirdFunction = function(arg1, arg2) {
    console.log(arg1 * arg2);
  };

  fnSecondFunction.apply(null, arguments);
  fnThirdFunction.call(null, arguments[0], arguments[1]);
  console.log(arguments);
};

//fnFirstFunction.apply(null, [2, 5]);

const arrow_function = (foo, bar) => {
  console.log("---arrow_function---");
  console.log(foo + bar);
};

//arrow_function(obj.foo, obj.bar);

const arrow_function_and_destructuring = ({foo, bar}, {baz}) => {
  console.log("---arrow_function_and_destructuring---");
  console.log(foo - bar - baz);
};

//arrow_function_and_destructuring(obj, obj);

const arrow_function_destructuring_and_return = ({foo, bar}) => {
  return {
    foobar: foo + bar
  };
};

const arrow_function_destructuring_and_implicit_return = ({foo, bar}) => ({foobar: foo + bar});

// console.log("---arrow_function_destructuring_and_return---");
// console.log(arrow_function_destructuring_and_return(obj));
// console.log("---arrow_function_destructuring_and_implicit_return---");
// console.log(arrow_function_destructuring_and_implicit_return(obj));

const arrow_function_and_implicit_value_return = (data) => data.foo + data.bar;

const arrow_function_destructuring_and_implicit_value_return = ({foo, bar}) => foo + bar;

console.log("---arrow_function_and_implicit_value_return---");
console.log(arrow_function_and_implicit_value_return(obj));
console.log("---arrow_function_destructuring_and_implicit_value_return---");
console.log(arrow_function_destructuring_and_implicit_value_return(obj));
