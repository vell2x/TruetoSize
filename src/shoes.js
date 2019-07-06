const https = require('https');
const http = require('http');

function printError(error) {
    console.error(error.message);
}

function printMessage(shoe, data, calculation){
    const message = `${shoe} has ${data} its true to size is ${calculation}`;
    console.log(message); 
}

function trueToSizeCalculation(shoeName, data) {
    calc = 0;
    size = 0;

    for(let d of data) {
        if(d.match(/^[0-9]+$/) != null)
        {
            calc += parseInt(d);
            size++;
        }
    };
    return calc / size; 
} //average of the true to size entries for a given shoe

module.exports.trueToSizeCalculation = trueToSizeCalculation;