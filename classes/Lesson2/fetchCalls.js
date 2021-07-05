import fetch from "node-fetch";


/************Simplest GET call**************/
/*fetch('https://jsonplaceholder.typicode.com/todos/1')
  .then(response => response.json())
  .then(json => console.log(json))*/




/**************GET call + async/await****************/
/*async function getCall() {
  let parsedResponse;
  try {

    const response = await fetch('https://jsonplaceholder.typicode.com/todos/1');
    parsedResponse = await response.json();

  } catch(error) {
    console.log(error);
  }

  console.log(parsedResponse);
  return parsedResponse;
}

getCall()
  .then(response => {
    console.log("Async func .then()");
    console.log(response);
  });*/




/**************POST call**************/

/*
fetch('https://jsonplaceholder.typicode.com/posts', {
  method: 'POST',
  body: JSON.stringify({
    title: 'foo',
    body: 'bar',
    userId: 1,
  }),
  headers: {
    'Content-type': 'application/json; charset=UTF-8',
  },
})
  .then((response) => response.json())
  .then((json) => console.log(json));*/
