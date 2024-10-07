// TODO: Include packages needed for this application
const fs=require('fs')
const generateMarkdown = require('./utils/generateMarkdown')
const inquirer=require('inquirer')
// TODO: Create an array of questions for user input
const questions = [
    {
        type:'input',
        message:'What is your GitHub username?',
        name:'github',
    },
    {
        type:'input',
        message:'What is your email address?',
        name:'email',
        validate: function(value) {
            const valid = /\S+@\S+\.\S+/;
            return valid.test(value) || 'Please enter a valid email address.'
        },
    },
    {
        type:'input',
        message:'What is your project\'s name?',
        name:'title',
    },
    {
        type:'input',
        message:'Please write a short description of your project',
        name:'description',
    },
    {
        type:'list',
        message:'Chose the following licenses:',
        name:'license',
        choices:['MIT','APACHE 2.0', 'GPL 3.0', 'BSD 3', 'None'],
    },
    {
        type:'input',
        message:'What command should be run to install dependencies?',
        name:'installation',
        default:'npm i',
    },
    {
        type:'input',
        message:'What command should be run to run tests?',
        name:'tests',
        default:'npm tests',
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
    const content = generateMarkdown(data)
    fs.writeFile(fileName, content,(err)=>err?console.error(err):console.log('Generating README...')) 
}

// TODO: Create a function to initialize app
function init() {
    inquirer
    .prompt(questions)
    .then(data=>{
        writeToFile('./output/README.md',data)
    })
}

// Function call to initialize app
init();
