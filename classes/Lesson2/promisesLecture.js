import data from "../Lesson1/users.js";
//Promises

/*
Mecanismo utilizado para la gestión de funciones asíncronas.
1 parámetro. Función de ejecución con 2 parámetros: resolve/reject para lanzar respuesta o error.
Una vez finalizada la promesa se puede capturar el fin de ejecución con .then() (cuando todo ha ido bien y hemos lanzado el método resolve)
o con .catch() (Cuando ha habido algun error y hemos lanzado el método reject())
*/

/*const getSynchronousData = function() {
  return data;
}

console.log(getSynchronousData());*/

/************Async function***********/

/*const getAsynchronousData = function() {
  var newData;

  setTimeout(() => {
    newData = data;
  }, 1500);

  return newData;
}

console.log(getAsynchronousData());*/

/************Promise***********/


/*const getData = function(bOk) {
  return new Promise(function(resolve, reject) {
    //Do something
    if (bOk) {

      setTimeout(() => {
        resolve(data);
      }, 1500);

    } else {
      reject("Ha habido un error");
    }
  })
}

console.log(getData(true));
//getData(true).then(response => console.log(response));
//getData().catch(error => {console.log(error)});*/



/*********2 params in Promise????**********/
/*const getTwoParam = function(bOk) {
  return new Promise(function(resolve, reject) {
    setTimeout(() => {
      resolve("First param", "Two Param");
    }, 1500);
  })
}
getTwoParam(true).then((firstParam, secondParam) => {
  console.log(firstParam);
  console.log()
});*/



/************Promise.resolve***********/

/*const resolvedPromise = Promise.resolve("Success");
console.log(resolvedPromise);
resolvedPromise.then(response => console.log(response));*/

/*const resolvedFunc = () => "Resuelto";
const resolvedWithFunc = Promise.resolve(resolvedFunc())
resolvedWithFunc.then(result => console.log(result));*/


/************Promise.all***********/
/*const firstPromise = Promise.resolve("First success!!!!");

const secondPromise = new Promise(
  function(resolve, reject) {
    setTimeout(() => {
      resolve("Second success!");
    }, 3000);
  }
);

const thirdPromise = new Promise(
  (resolve, reject) => {
    setTimeout(() => resolve("Third success!!"), 1000)
  }
)

Promise.all([
  firstPromise,
  secondPromise,
  thirdPromise
])
  .then(response => {
    console.log(response);
  })
  .catch(error => {
    console.log(error);
  })*/


/**********Promise.allSettled************/
/*const firstPromise = Promise.resolve("First success!!!!");

const secondPromise = new Promise(
  function(resolve, reject) {
    setTimeout(() => {
      resolve("Second success!");
    }, 3000);
  }
);

const thirdPromise = new Promise(
  (resolve, reject) => {
    setTimeout(() => reject("There was an error..."), 1000)
  }
)

Promise.allSettled([
  firstPromise,
  secondPromise,
  thirdPromise
])
  .then(response => {
    console.log(response);
  })
  .catch(error => {
    console.log("Estoy en el catch");
    console.log(error);
  })*/



/********Promise.any*********/
/*//Node > 15.0.0
  //Chrome > 85....

// https://nodejs.org/es/about/releases/

//Error!
const firstPromise = new Promise(
  function(resolve, reject) {
    setTimeout(() => {
      reject("Error!");
    }, 1000);
  }
);

//Ok!
const secondPromise = new Promise(
  function(resolve, reject) {
    setTimeout(() => {
      resolve("Second success!");
    }, 2000);
  }
);

//Ok!
const thirdPromise = new Promise(
  (resolve, reject) => {
    setTimeout(() => reject("There was an error..."), 3000)
  }
)

Promise.any([
  firstPromise,
  secondPromise,
  thirdPromise
])
  .then(response => {
    console.log(response);
  })
  .catch(error => {
    console.log("Estoy en el catch");
    console.log(error);
  })*/



/********Promise.race**********/
/*
//Fastest!!!  //Ok!
const firstPromise = new Promise(
  function(resolve, reject) {
    setTimeout(() => {
      resolve("Success!");
    }, 1000);
  }
  );

//Normal... //Ok!
const secondPromise = new Promise(
  function(resolve, reject) {
    setTimeout(() => {
      resolve("Second success!");
    }, 2000);
  }
);

//Slow  //Ok!
const thirdPromise = new Promise(
  (resolve, reject) => {
    setTimeout(() => reject("There was an error..."), 3000)
  }
)

Promise.race([
  firstPromise,
  secondPromise,
  thirdPromise
])
  .then(response => {
    console.log(response);
  })
  .catch(error => {
    console.log(error);
  })*/
