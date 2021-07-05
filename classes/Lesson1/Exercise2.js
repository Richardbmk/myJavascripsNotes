import data from "./users.js";
/*
Usar arrow functions
Crear función que valide si hay mas de 1 usuario por colmena
Crear función que genere una tabla con solo 1 usuario por colmena y ordenarlos por skill Management
* */


const validateMoreThan1 = (usersData, Team) => {
  return usersData.filter((usersData) => Team === usersData.Team).length > 1;
};

console.log(validateMoreThan1(data, "Colmena1"));

function selectOneAndSort(usersData) {
  let newData = usersData.reduce(
    (acc, item) =>
      acc.some(({Team}) => Team === item.Team)
        ? acc
        : [...acc, item],
    []
  );

  return newData.sort(
    (itemA, itemB) =>
      itemA.Skills.Management > itemB.Skills.Management
        ? -1
        : itemA.Skills.Management < itemB.Skills.Management
        ? 1
        : 0);
}

console.log(selectOneAndSort(data));
