import fetch from "node-fetch";

//Hacer una carga masiva inicial de una serie de datos maestros y que se vayan guardando a medida que se vayan resolviendo las llamadas

/*
url de apis para simular datos maestros
https://jsonplaceholder.typicode.com/todos
https://jsonplaceholder.typicode.com/posts
https://jsonplaceholder.typicode.com/comments
https://jsonplaceholder.typicode.com/albums
https://jsonplaceholder.typicode.com/users
 */

const delayCallFunc = (endpoint) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(fetch(endpoint));
    }, 5000)
  });
}

const MasterDataCalls = [
  {
    endpoint: "https://jsonplaceholder.typicode.com/todos",
    modelKey: "todos",
    delay: 5000
  },
  {
    endpoint: "https://jsonplaceholder.typicode.com/posts",
    modelKey: "posts",
    delay: 6000
  },
  {
    endpoint: "https://jsonplaceholder.typicode.com/comments",
    modelKey: "comments",
    delay: 7000
  },
  {
    endpoint: "https://jsonplaceholder.typicode.com/albums",
    modelKey: "albums",
    delay: 8000
  },
  {
    endpoint: "https://jsonplaceholder.typicode.com/users",
    modelKey: "users",
    delay: 9000
  }
];

var MasterDataJSONModel = {};


async function MasterDataLoad() {
  return await Promise.all(
    MasterDataCalls.map(
      async ({endpoint, modelKey, delay}) => {
        const apiResponse = await fetch(endpoint, delay);
        const parsedResponse = await apiResponse.json();
        MasterDataJSONModel[modelKey] = parsedResponse;
        return parsedResponse;
      }
    )
  )
}

//Definimos una funcion asíncrona ya que deberá esperar un resultado
async function MasterDataLoad() {

  //El resultado que debe esperar es la respuesta de los Promise.all. Por ello el await antes del Promise
  return await Promise.all(

    /*
    Como hemos explicado antes. Las llamadas definidas con async a fin de cuentas crean un Promise. Por ello,
    al iterar sobre la tabla de parejas endpoint/modelKey y usando la sentencia async, haremos que el bucle retorne
    un Promise por cada elemento
     */

    MasterDataCalls.map(
      //sentencia async para que cada iteración retorne un Promise
      async ({endpoint, modelKey, delay}) => {

        /*
        En cada iteración, que se ejecutará en paralelo gracias a Promise.all. Se hace un await del fetch y del parseo
         */
        const apiResponse = await delayCallFunc(endpoint, delay);
        const parsedResponse = await apiResponse.json();

        console.log("--------Init---------")
        console.log("Todos in master: " + ("todos" in MasterDataJSONModel));
        console.log("Posts in master: " + ("posts" in MasterDataJSONModel));
        console.log("Comments in master: " + ("comments" in MasterDataJSONModel));
        console.log("Users in master: " + ("users" in MasterDataJSONModel));
        console.log("Albums in master: " + ("albums" in MasterDataJSONModel));
        console.log("--------End---------")

        //Se rellena el modelo con los datos maestros cargados en cada iteración
        MasterDataJSONModel[modelKey] = parsedResponse;

        //Retornamos la respuesta en caso de que queramos recuperarlo toodo en el .then() de MasterDataLoad()
        return parsedResponse;
      }
    )
  )
}

console.time("MasterLoad");
await MasterDataLoad()

console.log(MasterDataJSONModel.todos.length);
console.log(MasterDataJSONModel.posts.length);
console.log(MasterDataJSONModel.comments.length);
console.log(MasterDataJSONModel.users.length);
console.log(MasterDataJSONModel.albums.length);

console.timeEnd("MasterLoad");
