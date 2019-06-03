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
    console.log("Sucessfully connected as id " + connection.threadId + "\n");

    console.log("Hi! Welcome to Bamazon");

    selectProduct();
});

var selectProduct = function() {
    inquirer
        .prompt({
            name: "selectProductID",
            type: "input",
            message: "Enter the ID of the product you want to look for:",
            validate: function(product_id) {
                var valid = !isNaN(parseFloat(product_id));
                return valid || "Please enter a valid Product ID";
            },
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

var unitsToBuy = function() {
    inquirer
        .prompt({
            name: "selectProductQuantity",
            type: "input",
            message: "How many units of the product would you like to buy?:",
            validate: function(quantity) {
                var valid = !isNaN(parseFloat(quantity));
                return valid || "Please enter a number";
            },
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