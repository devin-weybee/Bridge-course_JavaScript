const dogs = [
  { weight: 22, curFood: 250, owners: ["Alice", "Bob"] },
  { weight: 8, curFood: 200, owners: ["Matilda"] },
  { weight: 13, curFood: 275, owners: ["Sarah", "John"] },
  { weight: 32, curFood: 340, owners: ["Michael"] },
];

for (const dog of dogs) {
  dog.recommendedFood = Math.trunc(dog.weight ** 0.75 * 28);
}

console.log(dogs);

const dog = dogs.find((owner) => owner.owners.includes("Sarah"));
console.log(dog);

if (dog.curFood > dog.recommendedFood) {
  console.log("Sarah's dog is eating too much");
} else {
  console.log("Sarah's dog is eating too little");
}

const ownersTooMuch = [];
const ownersTooLittle = [];

for (const dog of dogs) {
  if (dog.curFood > dog.recommendedFood) {
    ownersTooMuch.push(...dog.owners);
  } else if (dog.curFood < dog.recommendedFood) {
    ownersTooLittle.push(...dog.owners);
  }
}

console.log("ownersTooMuch", ownersTooMuch);
console.log("ownersTooLittle", ownersTooLittle);

console.log(`${ownersTooMuch.join(" and ")}'s dogs eating too much`);
console.log(`${ownersTooLittle.join(" and ")}'s dogs eating too little`);

console.log(dogs.some((dog) => dog.curFood === dog.recommendedFood));

const eatingOkay = (dog) => {
  return (
    dog.curFood > dog.recommendedFood * 0.9 &&
    dog.curFood < dog.recommendedFood * 1.1
  );
};

console.log(dogs.some(eatingOkay));

const okEatDogs = [];

for (const dog of dogs) {
  if (
    dog.curFood > dog.recommendedFood * 0.9 &&
    dog.curFood < dog.recommendedFood * 1.1
  ) {
    okEatDogs.push(dog);
  }
}

console.log(okEatDogs);

const sortedDogs = dogs
  .slice()
  .sort((a, b) => a.recommendedFood - b.recommendedFood);

console.log(sortedDogs);