// inquirer npm
const inquirer = require('inquirer');
// filesystem npm
const fs = require('fs');
// node.js
const util = require('util');
// HTML to PDF npm
const pdf = require('html-pdf');
var gs = require('github-scraper');
const axios = require('axios');
var url;
var queryurl;
var color;
const writeFileAsync = util.promisify(fs.writeFile);
function init() {
  inquirer
    .prompt([
      {
        type: 'input',
        name: 'username',
        message: 'What is your GitHub username?',
        default: 'please input your username'
      },

      {
        type: 'list',
        message: 'What is your favorite color?',
        default: 'please choose one',
        name: 'color',
        choices: ['green', 'blue', 'pink', 'red']
      }
    ])
    .then(answers => {
      // console.info('Answer:', answers.username);
      // console.info('Answer:', answers.color);
      url = answers.username;
      color = answers.color;

      gs(url, function(err, data) {
        userData = {
          username: data.username,
          name: data.name,
          bio: data.bio,
          image: data.avatar,
          loc: data.location,
          repos: data.repos,
          stars: data.stars,
          followers: data.followers,
          following: data.following,
          color : answers.color
        };

        const queryUrl = `https://api.github.com/users/${answers.username}`;
        axios.get(queryUrl).then(function(result) {
          // console.log(result.data.avatar_url);
          const userData2 = {
            githubURL: result.data.html_url,
            githubPic: result.data.avatar_url,
            githubRepos: result.data.public_repos,
            githubFollowers: result.data.followers,
            githubLocation: result.data.location,
            githubBlog: result.data.blog,
            githubName: result.data.name,
            githubBio: result.data.bio
          };
          const html = genenrateHTML(userData, userData2);
          writeFileAsync('index.html', html, 'utf8');
        });
      });
    });
}
function genenrateHTML(userData, userData2) {
  // console.log('userData', userData);
  // console.log('userData2', userData2);

  return `
      <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous">
        <title>Developer Profile</title>
        <style>
        .jumbotron {
            color: white;
            background: ${userData.color};
            text-align: center;
        }
    </style>
    </head>
    <body>
        <div class="jumbotron">
          <img src="${userData2.githubPic}" alt="${userData.name}s's picture">
          <h5 class="display-4">${userData.name}'s Developer Profile</h5>
            <p class="lead"></p>
            <hr class="my-4">
            I'm from: ${userData2.githubLocation}
            <p>${userData2.githubBio}</p>
            <ul style="list-style-type:none;">
            <li>GitHub Public Repositories:  ${userData.repos}
            </li>
            <li>GitHub Followers: ${userData.followers}
            </li>
            <li>GitHub Stars: ${userData.stars}
            </li>
            <li>GitHub Following: ${userData.following}
            </li>
            </ul>
            <p>Find out more about me:.</p>
            <a class="btn btn-primary btn-lg" href="https://www.google.com/maps/place/${userData2.githubLocation}/" role="button" target="blank">My Location</a>
            <a class="btn btn-primary btn-lg" href="${userData2.githubURL}" role="button" target="blank">GitHub</a>
            <a class="btn btn-primary btn-lg" href="${userData2.githubBlog}" role="button" target="blank">Blog</a>
          </div>

        <script src="https://code.jquery.com/jquery-3.4.1.slim.min.js" integrity="sha384-J6qa4849blE2+poT4WnyKhv5vZF5SrPo0iEjwBvKU7imGFAV0wwj1yYfoRSJoZ+n" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js" integrity="sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo" crossorigin="anonymous"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.min.js" integrity="sha384-wfSDF2E50Y2D1uUdj0O3uMBJnjuUD4Ih7YwaYd1iqfktj0Uod8GCExl3Og8ifwB6" crossorigin="anonymous"></script>
    </body>
    </html>
  }
  ;`;
}

init();