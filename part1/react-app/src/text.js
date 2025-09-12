const obj = {
	name: "john",
	age: 35,
};
console.log(obj);

obj.address = "Oulu";
console.log(obj);

obj["index"] = 90500;
console.log(obj);

const sum = (p1, p2) => {
	console.log(p1);
	console.log(p2);
	return p1 + p2;
};

const result = sum(1, 5);
console.log(result);
