//internal modules
const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
//external packages
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
//wdtd
const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");
//wdtd
const render = require("./lib/htmlRenderer");

//employees master array
const employees = [];

//prompts for user input re: team
//should ask for: 
const questions = 
[
    {
        type: "input",
        message: "Enter team member's name: ",
        default: "Slave One",
        name: "name",
        validate: function (answer) {
            if (answer.length < 1) {
                return console.log("A valid entry is required.");
            }
            return true;
        }
    },
    {
        type: "input",
        message: "Enter team member's ID: ",
        default: "24601",
        name: "id",
        validate: function (answer) {
            if (answer.length < 1) {
                return console.log("A valid entry is required.");
            }
            return true;
        }
    },
    {
        type: "input",
        message: "Enter team member's email: ",
        default: "mandalorian@gmail.com",
        name: "email",
        validate: function (answer) {
            if (answer.length < 1) {
                return console.log("A valid entry is required.");
            }
            return true;
        }
    },
    {
        type: "list",
        message: "Pick team member's role:",
        choices: [
            'Engineer',
            'Intern',
            'Manager'
        ],
        name: "role"
    }
];

//too many parameters?
function (name, role, id, email)
{
    let roleInfo = "";
        if (role === "Engineer") {
            roleInfo = "GitHub username";
        } else if (role === "Intern") {
            roleInfo = "school name";
        } else {
            roleInfo = "office phone number";
        }
        inquirer.prompt([{
            message: `Enter team member's ${roleInfo}`,
            name: "roleInfo"
        },
        {
            type: "list",
            message: "Would you like to add more team members?",
            choices: [
                "yes",
                "no"
            ],
            name: "moreMembers"
        },
}

const followUpsTwo = (roleInfo, moreMembers) => {
    let newMember;
    if (role === "Engineer") {
        newMember = new Engineer(name, id, email, roleInfo);
    } else if (role === "Intern") {
        newMember = new Intern(name, id, email, roleInfo);
    } else {
        newMember = new Manager(name, id, email, roleInfo);
    }
    employees.push(newMember);
    addHtml(newMember)
    .then(function() {
        if (moreMembers === "yes") {
            addMember();
        } else {
            finishHtml();
        }
    });  
};

async function init() {
    //what does try do
    try {

        // triggers Inquirer questions
        const userResponses = await inquirer.prompt(questions).then(followUps).then(followUpsTwo);
        console.log("Your responses: ", userResponses);
    
        // Write markdown to file
        await writeFileAsync('ExampleREADME.md', markdown);

    } catch (error) {
        console.log(error);
    }
};
// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
