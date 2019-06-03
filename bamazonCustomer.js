var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "Cali7mil*",
    database: "bamazon"
});

connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId + "\n");
    start();
});

function start() {
    inquirer
        .prompt({
            name: "selectProductID",
            type: "input",
            message: "Please, enter the ID of the product you want to look for.",
            validate: function validateProductID(input) {
                return input !== 'number';
            }
        })
        .then(function(answer) {
            // based on their answer, either call the bid or the post functions
            if (answer.selectProductID !== "number") {
                unitsToBuy();
            } else {
                connection.end();
            }
        });
}

function unitsToBuy() {
    inquirer
        .prompt({
            name: "selectProductQuantity",
            type: "input",
            message: "how many units of the product would you like to buy?",
            validate: function validateProductQuantity(quantity) {
                return quantity !== 'number'
            }
        })
        .then(function(answer) {
            // based on their answer, either call the bid or the post functions
            if (answer.selectProductQuantity !== "number") {
                checkAvailable();
            } else {
                connection.end();
            }
        });
}

function checkAvailable() {
    console.log("Selecting all products...\n");
    connection.query("SELECT * FROM products \G", function(err, res) {
        if (err) throw err;
        // Log all results of the SELECT statement
        console.log(res);
        connection.end();
    });
}