const inquirer = require("inquirer");
const fs = require("fs");
const axios = require("axios").default;
const HTMLToPDF = require("html-pdf");
const generate = require("./generateHTML.js");

inquirer.prompt([
    {
        type: "input",
        name: "name",
        message: "What is your GitHub Username?"
    },
    {
        type: "rawlist",
        name: "color",
        message: "What is your favorite color?",
        choices: [
            "green",
            "blue",
            "pink",
            "red"
        ]
    }
]).then(function(res){
    // console.log(res.name, res.color);
    const userName = res.name;
    const userColor = res.color

    const queryURL = `https://api.github.com/users/${userName}`;
    const starredURL = `https://api.github.com/users/${userName}/starred`;

    gitHubRequest(queryURL);
});

function gitHubRequest(queryURL) {
    return axios.get(queryURL)
    .then(function(gitResponse){
        const proPic = gitResponse.data.avatar_url + ".png";

        const gitUsername = gitResponse.data.login;
        // console.log(gitUsername);

        const location = gitResponse.data.location;

        const profileURL = gitResponse.data.html_url;

        const blog = gitResponse.data.blog;

        const userBio = gitResponse.data.bio;

        const publicRepos = gitResponse.data.public_repos;

        const followers = gitResponse.data.followers;
        // console.log(followers);

        const following = gitResponse.data.following;
    });
};