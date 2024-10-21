// TODO: Include packages needed for this application
const fs=require('fs')
const generateMarkdown = require('./utils/generateMarkdown')
const inquirer=require('inquirer')
// TODO: Create an array of questions for user input
const questions = [
    {
        type:'input',   // Input type: text
        message:'What is your GitHub username?',    // Prompt message
        name:'github',  // Name for the response
    },
    {
        type:'input',
        message:'What is your email address?',
        name:'email',
        validate: function(value) {         // Validation function for email format
            const valid = /\S+@\S+\.\S+/;   // Regex for validating email
            return valid.test(value) || 'Please enter a valid email address.' // Return validation result
        },
    },
    {
        type:'input',   // Input type: text
        message:'What is your project\'s name?',    // Prompt message
        name:'title',   // Name for the response
    },
    {
        type:'input',
        message:'Please write a short description of your project',
        name:'description',
    },
    {
        type:'list',    // Input type: list selection
        message:'Chose the following licenses:',    // Prompt message
        name:'license', // Name for the response
        choices:['MIT','APACHE 2.0', 'GPL 3.0', 'BSD 3', 'None'],   // License options
    },
    {
        type:'input',
        message:'What command should be run to install dependencies?',
        name:'installation',
        default:'npm i',
    },
    {
        type:'input',
        message:'What command should be run to run test?',
        name:'test',
        default:'npm test',
    },
    {
        type:'input',
        message:'What does the user need to know about using the repo?',
        name:'usage',
    },
    {
        type:'input',
        message:'What does the user need to know about contributing to the repo?',
        name:'contributing',
    }
];

// TODO: Create a function to write README file
function writeToFile(fileName, data) {
    const content = generateMarkdown(data)  // Generate markdown content from user data
    fs.writeFile(fileName, content,(err)=>err?console.error(err):console.log('Generating README...'))   // Handle file writing and log status
}

// TODO: Create a function to initialize app
function init() {
    inquirer
    .prompt(questions)  // Prompt the user with the defined questions
    .then(data=>{   // Process the user's responses
        writeToFile('./output/README.md',data)  // Write the responses to README.md file
    })
}

// Function call to initialize app
init(); // Start the application
