const filesystem = require('./node_modules/graceful-fs/graceful-fs')
const inquirer = require("inquirer");
const {Circle, Square, Triangle} = require("./lib/shapes");

const questions = [
    {
        type: "input",
        name: "text",
        message: "TEXT: 3 characters or less.",
    },
    {
        type: "input",
        name: "text-color",
        message: "TEXT COLOR: Enter a color OR a hexadecimal:",
    },
    {
        type: "input",
        name: "shape",
        message: "SHAPE COLOR: Enter a color keyword OR a hexadecimal:",
    },
    {
        type: "list",
        name: "pixel-image",
        message: "Choose which shape you would like",
        choices: ["Circle", "Square", "Triangle"],
    },
];

async function init() {
    console.log("Starting Program");
    let logoText;
    let textColor;
    let shapeColor;
    let shape;

    const answers = await inquirer.prompt(questions);

    // Text Set up 
	var user_text = "";

    // Check if text is valid
	if (answers.text.length > 0 && answers.text.length < 4) {
		logoText = answers.text;
	} else {
		console.log("Invalid user text field detected! Please enter 1-3 Characters, no more and no less");
        return;
	}

	// Shape setup
	if (user_shape_type.toLowerCase() === "square") {
		shape = new Square();
	}
	else if (user_shape_type.toLowerCase() === "Circle") {
		shape = new Circle();
	}
	else if (user_shape_type.toLowerCase() === "Triangle") {
		shape = new Triangle();
	}
	else {
		console.log("Invalid shape!");
	}

    // Set shapes color
	shape.setColor(user_shape_color);

	// Create a new Svg instance and add the shape and text elements to it
    console.log("Program Exit");
}

await init();