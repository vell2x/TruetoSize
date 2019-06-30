const https = require('https');
const http = require('http');

function printError(error) {
    console.error(error.message);
}

function printMessage(username, badgeCount, point){
    const message = `${username} has ${badgeCount} total badge(s) and ${point}
 points in JavaScript`;
    console.log(message); 
}

function get(username){
    try{
        const request = https.get(`https://teamtreehouse.com/${username}.json`,
    response => {
        if(response.statusCode === 200)
        {
            let body = "";
            response.on("data", data => {
                body += data.toString();
                });

            response.on('end', () => { 
                try{
                    //parse the data 
                    const profile = JSON.parse(body); 
                    //print the data
                    printMessage(username, profile.badges.length, profile.points.JavaScript);
                    } catch (error) {
                        printError(error);
                    }
                    });
                }
                else {
                    const message = 'There was a error getting the profile for ${username} (${response.statusCode})';
                    const statusCodeError = new Error(message);
                    printError(statusCodeError);
                }
        });
    } catch (error) {

    }
}

module.exports.get = get;