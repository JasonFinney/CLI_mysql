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
            type: "list",
            message: "Welcome! Which would you like to do?",
            choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product"]
        }
    ]).then(function (answer) {
        switch (answer.initial) {
            case "View Products for Sale":
                viewProducts();
                break;
            case "View Low Inventory":
                viewInventory();
                break;
            case "Add to Inventory":
                addInventory();
                break;
            case "Add New Product":
                newProduct();
                break;
            default:
                break;
        };
    });
};

function viewProducts() {
    connection.query("SELECT * FROM products", function (err, data) {
        if (err) throw err;
        console.log("Products Availible for Sale:");
        console.log("-----------------------------------------------------------------");
        for (let i = 0; i < data.length; i++) {
            console.log("Product: " + data[i].product_name + ", ID: " + data[i].id + ", Price: $" + data[i].price + ", quantity availible: " + data[i].stock_quantity);
            console.log("-----------------------------------------------------------------");
        };
        inquirer.prompt([
            {
                name: "continue",
                type: "list",
                message: "Is your work here done or would you like to submit another query?",
                choices: ["My work here is done", "It's gonna be a long night..."]
            }
        ]).then(function (choice) {
            if (choice.continue === "My work here is done") {
                console.log("Congratulations! Happy to help!");
                connection.end();
            } else {
                start();
            };
        });
    });
};

function viewInventory() {
    connection.query("SELECT * FROM products", function (err, data) {
        if (err) throw err;
        console.log("Please find the low inventory items below: \n");
        for (let o = 0; o < data.length; o++) {
            if (data[o].stock_quantity < 6) {
                console.log("Product: " + data[o].product_name + ", ID: " + data[o].id + ", quantity availible " + data[o].stock_quantity);
            };
        };
        inquirer.prompt([
            {
                name: "continue",
                type: "list",
                message: "Is your work here done or would you like to submit another query?",
                choices: ["My work here is done", "It's gonna be a long night..."]
            }
        ]).then(function (choice) {
            if (choice.continue === "My work here is done") {
                console.log("Congratulations! Happy to help!");
                connection.end();
            } else {
                start();
            };
        });
    });
};

function addInventory() {
    connection.query("SELECT * FROM products", function (err, data) {
        if (err) throw err;
        console.log("Please find the list inventory items below: \n");
        for (let o = 0; o < data.length; o++) {
            console.log("Product: " + data[o].product_name + ", ID: " + data[o].id + ", quantity availible " + data[o].stock_quantity + "\n");
        };
        productSelection();
    });
};

function productSelection() {
    inquirer.prompt([
        {
            name: "whichproduct",
            message: "Please enter the id number of the product you wish to add inventory",
            type: "input"
        },
        {
            name: "howMuch",
            message: "How much inventory would you like to add?",
            type: "input"
        }
    ]).then(function (answer) {
        connection.query("SELECT * FROM products WHERE ?", { id: answer.whichproduct }, function (err, data) {
            if (err) throw err;
            var oldQuant = data[0].stock_quantity;
            var newQuant = Number(oldQuant) + Number(answer.howMuch);
            connection.query("UPDATE products SET ? WHERE ?",
                [
                    {
                        stock_quantity: newQuant
                    },
                    {
                        id: answer.whichproduct
                    }
                ], function (err) {
                    if (err) throw err;
                });
        });
        end();
    });
};
function end() {
    inquirer.prompt([
        {
            name: "continue",
            type: "list",
            message: "Is your work here done or would you like to submit another query?",
            choices: ["My work here is done", "It's gonna be a long night..."]
        }
    ]).then(function (choice) {
        if (choice.continue === "My work here is done") {
            console.log("Congratulations! Happy to help!");
            connection.end();
        } else {
            start();
        };
    });
};

function newProduct() {
    console.log("Another Product? Expansion feels good, doesn't it?");
    inquirer.prompt([
        {
            name: "anotherProductname",
            type: "input",
            message: "What is the product called?"
        },
        {
            name: "anotherProductdepartment",
            type: "input",
            message: "In which department will we sell it?"
        },
        {
            name: "anotherProductprice",
            type: "input",
            message: "How much should we sell it for?",
            validate: function (value) {
                if (isNaN(value) === false) {
                    return true;
                }
                return false;
            }
        },
        {
            name: "anotherProductstock",
            type: "input",
            message: "How much do we have in stock?",
            validate: function (value) {
                if (isNaN(value) === false) {
                    return true;
                }
                return false;
            }
        }
    ]).then(function (answer) {
        connection.query("INSERT INTO products SET ?",
            {
                product_name: answer.anotherProductname,
                department_name: answer.anotherProductdepartment,
                price: answer.anotherProductprice,
                stock_quantity: answer.anotherProductstock
            })
        console.log("New Product Added!");
        end();
    });
};

