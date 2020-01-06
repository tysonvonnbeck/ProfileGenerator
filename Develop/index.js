// inquirer npm
const inquirer = require('inquirer');
// filesystem npm
const fs = require('fs');
// node.js
const util = require('util');
// HTML to PDF npm
const pdf = require('html-pdf');
// gitbub scraper npm
var gs = require('github-scraper');
var url;
var color;


inquirer.prompt([
    {
      type: "input",
      name: "username",
      message: "What is your GitHub username?",
      default: "please input your username"
    },

    {
    type: "list",
    message: "What is your favorite color?",
    default: "please choose one",
    name: "color",
    choices: [
      "green", 
      "blue", 
      "pink", 
      "red"
    ],
    }
])
.then(answers => {
    // console.info('Answer:', answers.username);
    // console.info('Answer:', answers.color);
    url = answers.username;
    color = answers.color;

    gs(url, function(err, data) {
      // console.log(data.location);
      
    })

  });


  