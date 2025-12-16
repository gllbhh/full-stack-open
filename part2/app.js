var animals = [
	{ name: "Caro", species: "Dog" },
	{ name: "Misty", species: "Cat" },
	{ name: "Tweety", species: "Bird" },
	{ name: "Nemo", species: "Fish" },
	{ name: "Pluto", species: "Dog" },
	{ name: "Goofy", species: "Dog" },
];

var isDog = function (animal) {
	return animal.species === "Dog";
};

var dogs = animals.filter(isDog);

console.log("Dogs:", dogs.map((d) => d.name).join(", "));
console.log("All animals are dogs:", animals.every(isDog));
console.log("All animals in dogs are dogs:", dogs.every(isDog));

const even = (e) => e % 2 === 0;

const num = [1, 2, 3, 4, 5, 6, 7];

console.log("Even numbers: ", num.some(even));
