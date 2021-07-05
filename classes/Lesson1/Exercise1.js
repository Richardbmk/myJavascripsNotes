import data from "./users.js";

/*
Usar notacion function()
Crear metodo para recuperar todos los usuarios y crear un objeto JSON con clave (key)=NIF y valor las Skills de cada User
Crear metodo para recuperar por cada usuario la mejor skill que tenga cada uno
* */


function parseUserSkillsWithForEach(usersData, type) {
  let skillsByNif = {};
  let skillsByNif2 = {};

  usersData.forEach(function(user) {
    skillsByNif[user.NIF] = user.Skills;
  });

  usersData.forEach(function({NIF, Skills}) {
    skillsByNif2[NIF] = Skills;
  });

  return type === 1 ? skillsByNif : skillsByNif2;
}

function parseUserSkillsWithReduce(usersData) {
  let parsedData = usersData.reduce(
    function(userAccumulator, userItem) {
      return {
        ...userAccumulator,
        [userItem.NIF]: userItem.Skills
      }
    },
    {}
  );

  return parsedData;
}

const parseUserSkillsWithReduce2 = (usersData) => (
  usersData.reduce(
    (userAccumulator, userItem) => (
      {
        ...userAccumulator,
        [userItem.NIF]: userItem.Skills
      }
    ),
    {}
  )
);

console.log(parseUserSkillsWithForEach(data, 1));
console.log(parseUserSkillsWithForEach(data, 2));
console.log(parseUserSkillsWithReduce(data));
console.log(parseUserSkillsWithReduce2(data));

function getBestSkill(usersData) {
  let bestSkills = usersData.map(
    function({Name, Skills}) {
      let BestSkill = Object.entries(Skills)
        .filter(function(entryItem) {
          return entryItem[1] === 4;
        })
        .map(function(entryItem) {
          return entryItem[0];
        });

      return {
        Name,
        BestSkill
      };
    }
  );

  return bestSkills;
}

function getBestSkillShort(usersData) {
  return usersData.map(

    ({Name, Skills}) => ({
      Name,
      BestSkill: Object.entries(Skills)



        .filter(([key, value]) => value === 4)



        .map(([key, value]) => key)
    })
  );
}

console.log(getBestSkill(data));
