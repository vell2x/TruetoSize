const https = require('https');
const http = require('http');

function printError(error) {
    console.error(error.message);
}

function printMessage(shoe, data, calculation){
    const message = `${shoe} has ${data} its true to size is ${calculation}`;
    console.log(message); 
}

function get(shoe){
    try{
        const request = https.get(`https://stockx.com/${shoe}.json`, // Api Location
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
                    printMessage(shoe, data.length, profile.calculation);
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