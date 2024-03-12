const filesystem = require('./node_modules/graceful-fs/graceful-fs')
const inquirer = require("inquirer");
const { Circle, Square, Triangle } = require("./assets/shapes");

const questions = [
	{
		type: "input",
		name: "text",
		message: "TEXT: 3 characters or less.",
	},
	{
		type: "input",
		name: "textColor",
		message: "TEXT COLOR: Enter a color OR a hexadecimal:",
	},
	{
		type: "input",
		name: "shapeColor",
		message: "SHAPE COLOR: Enter a color keyword OR a hexadecimal:",
	},
	{
		type: "list",
		name: "shape",
		message: "Choose which shape you would like",
		choices: ["Circle", "Square", "Triangle"],
	},
];

const init = async () => {
	console.log("Starting Program");

	const answers = await inquirer.prompt(questions);

	// Logo Variables
	let logoText;
	let textColor = answers.textColor;
	let shapeColor = answers.shapeColor;
	let shape;

	// Check if text is valid
	console.log(answers.text.length);
	if (answers.text.length >= 0 && answers.text.length <= 3) {
		logoText = answers.text;
	} else {
		console.log("Invalid user text field detected! Please enter 0-3 Characters, no more and no less");
		return;
	}

	// Shape setup
	if (answers.shape.toLowerCase() === "square") {
		console.log("Square");
		shape = new Square();
	}
	else if (answers.shape.toLowerCase() === "circle") {
		console.log("Circle");
		shape = new Circle();
	}
	else if (answers.shape.toLowerCase() === "triangle") {
		console.log("Triangle");
		shape = new Triangle();
	}
	else {
		console.log("Invalid shape!");
		return;
	}

	// Set shapes color
	shape.setColor(shapeColor);

	let logo = new Svg();
	logo.setText(logoText, textColor);
	logo.setShape(shape);
	let svgString = logo.render();

	//Print shape to log
	console.log("Displaying shape:\n\n" + svgString);

	console.log("Shape generation complete!");
	console.log("Writing shape to file...");
	writeToFile("logo.svg", svgString);

	// Create a new Svg instance and add the shape and text elements to it
	console.log("Program Exit");
}

const writeToFile = (fileName, data) => {
	console.log(`Writing ${data} to file ${fileName}`)
	filesystem.writeFile(fileName, data, function (err) {
		if (err) {
			return console.log(err);
		}
		console.log("Logo saved as logo.svg");
	});
}

class Svg {
	constructor() {
		this.textElement = ''
		this.shapeElement = ''
	}
	render() {
		console.log("REDERING", this.textElement)
		return `<svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="300" height="200">${this.shapeElement}${this.textElement}</svg>`
	}
	setText(text, color) {
		this.textElement = `<text x="150" y="125" font-size="60" text-anchor="middle" fill="${color}">${text}</text>`
	}
	setShape(shape) {
		this.shapeElement = shape.render()

	}
}

module.export = { Svg };

init();