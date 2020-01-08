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
const writeFileAsync = util.promisify(fs.writeFile);


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
        userData = {
          username : data.username,
          name : data.name,
          bio : data.bio,
          image : data.avatar,
          loc : data.location,
          repos : data.repos,
          stars : data.stars,
          followers : data.followers,
          following : data.following,
      }

      // genenrateHTML(userData);

      const html = genenrateHTML(userData)
      writeFileAsync('index.html', html, 'utf8');
    })

  }
  );


async function genenrateHTML(userData) {
    console.log(userData);

    const html = `
        <!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <meta http-equiv="X-UA-Compatible" content="ie=edge">
          <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous">
      </head>
      <body>
          <div class="jumbotron">
              <h1 class="display-4">${userdata.name}</h1>
              <p class="lead"></p>
              <hr class="my-4">
              <p>${userdata.bio}</p>
              <a class="btn btn-primary btn-lg" href="#" role="button">Learn more</a>
            </div>

          <script src="https://code.jquery.com/jquery-3.4.1.slim.min.js" integrity="sha384-J6qa4849blE2+poT4WnyKhv5vZF5SrPo0iEjwBvKU7imGFAV0wwj1yYfoRSJoZ+n" crossorigin="anonymous"></script>
      <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js" integrity="sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo" crossorigin="anonymous"></script>
      <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.min.js" integrity="sha384-wfSDF2E50Y2D1uUdj0O3uMBJnjuUD4Ih7YwaYd1iqfktj0Uod8GCExl3Og8ifwB6" crossorigin="anonymous"></script>
      </body>
      </html>
    }
    ;`
  // } catch (err) {
  //   console.log(err);
  // }
  }



