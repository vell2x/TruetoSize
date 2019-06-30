'use strict';

var express = require('express');
var router = express.Router();

router.get('/todos', function(req, res) {
	res.json({todos: todos})
})

module.exports = router;

const shoe = require('./shoes');

const users = process.argv.slice(2);
users.forEach(shoe.get);