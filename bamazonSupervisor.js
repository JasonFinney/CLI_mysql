var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "root",
    database: "bamazondb"
});

connection.connect(function (err) {
    if (err) throw err;
    start();
});

function start() {
    inquirer.prompt([
        {
            name: "initial",
            message: "Welcome! What would you like to do?",
            type: "list",
            choices: ["View Product Sales by Department", "Create New Department"]
        }
    ]).then(function (answer) {
        switch (answer.initial) {
            case "View Product Sales by Department":
                viewProduct();
                break;
            case "Create New Department":
                newDepartment();
                break;
            default:
                break;
        };
    });
};

function viewProduct() {

};

function newDepartment() {

};