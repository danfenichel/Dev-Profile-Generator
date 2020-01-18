const inquirer = require("inquirer");
const fs = require("fs");
const axios = require("axios").default;
const HTMLToPDF = require("html-pdf");
const generate = require("./generateHTML");

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
]).then(function (res) {
    // console.log(res.name, res.color);
    const userName = res.name;
    const userColor = res.color;

    const queryURL = `https://api.github.com/users/${userName}`;
    const starredURL = `https://api.github.com/users/${userName}/starred`;

    gitHubRequest(queryURL).then(function (userData){
        gitHubStars(starredURL).then(function (starResponse) {
            const options = { format: 'Letter' };
            HTMLToPDF.create(generate(res, starResponse, userData), options).toFile(`./${userName}.pdf`, function (err, response) {
                if (err) return console.log(err);
                console.log(response);
            });
        });
    });
});

function gitHubRequest(queryURL) {
    return axios.get(queryURL)
        .then(function (gitResponse) {

            let userData = {
                proPic: (gitResponse.data.avatar_url + ".png"),

                fullName: (gitResponse.data.name),

                gitUsername: (gitResponse.data.login),

                location: (gitResponse.data.location),

                profileURL: (gitResponse.data.html_url),

                blog: (gitResponse.data.blog),

                userBio: (gitResponse.data.bio),

                publicRepos: (gitResponse.data.public_repos),

                followers: (gitResponse.data.followers),

                following: (gitResponse.data.following)
            };

            return userData;
        })
        .catch(function (error) {
            console.log(error);
        });
};

function gitHubStars(starredURL) {
    return axios.get(starredURL)
        .then(function (starResponse) {
            return starResponse.data.length;
        })
        .catch(function (error) {
            console.log(error);
        });
};