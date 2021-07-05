/*
Las funciones async/await permiten ejecutar funciones de manera asíncrona al igual que occurre con promises
permitiendo una notación más sencilla/limpia
*/

/*
Con la palabra reservada async antes de 'function' indicamos que la función será asincrona y se habilita
la sentencia await para indicar qué debe esperar la función
 */




/**********async/await**************/
/*function asyncFuncWithPromise() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("Async function response")
    }, 1000)
  });
}

/!*!//With Promise normal notation
asyncFuncWithPromise()
  .then(response => {
    console.log(response);
  })*!/

//With async/await notation
async function asyncCall() {
  let response = await asyncFuncWithPromise();
  console.log(response);
}

asyncCall();

/!*async function asyncFunc() {
  return "asyncFunc result";
}

console.log(asyncFunc())

asyncFunc()
  .then(response => {
    console.log(response);
  })*!/*/




/*********async/await - catch exception************/
/*function asyncFuncWithPromise() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      reject("Error async response")
    }, 1000)
  });
}

//With Promise normal notation
asyncFuncWithPromise()
  .then(response => {
    console.log(response);
  })
  .catch(error => {
    console.log("Promise error")
    console.log(error)
  })

//With async/await notation
async function asyncCall() {
  try {
    let response = await asyncFuncWithPromise();
    console.log(response);
  } catch (error) {
    console.log("Async/await error")
    console.log(error);
  }
}

asyncCall()*/




/*********Sequential async/await********/
/*function resolveAfter1Sec() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      reject("1 second error");
    }, 1000);
  });
}

function resolveAfter2Sec() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("2 second func");
    }, 2000);
  });
}

async function sequentialExec() {
  console.time("Slow");
  console.time("Fast");

  try {
    let fast = await resolveAfter1Sec();
    console.log(fast);
    console.timeEnd("Fast");

    let slow = await resolveAfter2Sec();
    console.log(slow);
    console.timeEnd("Slow");

  } catch (error) {

    console.log("Sequential error");
    console.log(error);

  }
}

sequentialExec();*/




/*********Concurrent async/await********/

/*function resolveAfter1Sec() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("1 second func");
    }, 1000);
  });
}

function resolveAfter2Sec() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("2 second func");
    }, 2000);
  });
}

async function concurrentExec() {
  console.time("Slow");
  console.time("Fast");

  try {
    let fast = resolveAfter1Sec();
    let slow = resolveAfter2Sec();

    console.log(await fast);
    console.timeEnd("Fast");

    console.log(await slow);
    console.timeEnd("Slow");
  } catch (error) {
    console.log("Concurrent error");
    console.log(error);
  }
}

concurrentExec();*/




/***********Parallel execution***************/
/*function resolveAfter1Sec() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("1 second func");
    }, 1000);
  });
}

function resolveAfter2Sec() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("2 second func");
    }, 2000);
  });
}

const asyncFunctions = [resolveAfter1Sec, resolveAfter2Sec];

async function parallelExec() {
  return await Promise.all(
    asyncFunctions.map(
      async (asyncFunctionItem) => {
        const asyncResult = await asyncFunctionItem();
        console.log(asyncResult);

        return asyncResult;
      }
    )
  );
}

parallelExec()
  .then(([firstResponse, secondResponse]) => {
    console.log("Parallel response");
    console.log(firstResponse);
    console.log(secondResponse);
  });*/
