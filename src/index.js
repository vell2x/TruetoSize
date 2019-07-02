const shoe = require('./shoes');
const conn = require('./conn');

conn.client;
const users = process.argv.slice(2);
var trueToSizeCalculation = 0;
var updatedInfo;

function cacl(users) {
	trueToSizeCalculation += users.forEach(shoe.get);
	updatedInfo = trueToSizeCalculation / users.length;
}

module.exports.calc = updateData;