import data from "./users.js";

/*
Crear jerarquia de colmena/usuarios
*/


function createNestedData(usersData) {
  return usersData.reduce(
    function(nestedData, userItem, index, initialArray) {
      if (!nestedData.some(({Team}) => userItem.Team === Team)) {
        nestedData.push({
          Team: userItem.Team,
          Users: initialArray.filter(({Team}) => Team === userItem.Team)
        })
      }

      return nestedData;
    },
    []
  )
}

console.table(createNestedData(data));
