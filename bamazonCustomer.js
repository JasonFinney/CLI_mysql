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

var productsList = [];

function start() {
    connection.query("SELECT * FROM products", function (err, data) {
        if (err) throw err;
        console.log("Products Availible for Sale:  \n");
        for (let i = 0; i < data.length; i++) {
            var productID = { "id": data[i].id };
            var productName = { "Product Name": data[i].product_name };
            var productPrice = { "Price": data[i].price };
            productsList.push(productName);
            productsList.push(productID);
            productsList.push(productPrice);
            console.log("Product Name: " + data[i].product_name + ", id: " + data[i].id + ", Price: $" + data[i].price);
            console.log("-----------------------------------------");
        };
        purchase();
    });
};

function purchase() {
    inquirer.prompt([
        {
            name: "buyWhat",
            type: "input",
            message: "What would you like to buy? Please enter the id number",
            validate: function (value) {
                if (isNaN(value) === false && Number(value) < 11 && Number(value) > 0) {
                    return true;
                }
                return false;
            }
        },
        {
            name: "howMany",
            type: "input",
            message: "How many would you like?",
            validate: function (value) {
                if (isNaN(value) === false) {
                    return true;
                }
                return false;
            }
        }
    ]).then(function (answer) {
        connection.query("SELECT * FROM products WHERE ?", { id: answer.buyWhat }, function (err, data) {
            if (err) throw err;
            var chosenIDsales = Number(data[0].product_sales);
            var chosenIDprice = data[0].price;
            var chosenIDquant = data[0].stock_quantity;
            if (answer.howMany < chosenIDquant) {
                var totalPrice = Number(chosenIDprice) * Number(answer.howMany);
                var totalSales = Number(chosenIDsales) + Number(totalPrice);
                var newQuant = Number(chosenIDquant) - Number(answer.howMany);
                connection.query("UPDATE products SET ? WHERE ?",
                    [
                        {
                            stock_quantity: newQuant
                        },
                        {
                            id: answer.buyWhat
                        }
                    ], function (err) {
                        if (err) throw err;
                    }
                );
                connection.query("UPDATE products SET ? WHERE ?",
                    [
                        {
                            product_sales: totalSales
                        },
                        {
                            id: answer.buyWhat
                        }
                    ], function (err) {
                        if (err) throw err;
                    }
                );
                var totalPrice = chosenIDprice * answer.howMany;
                console.log("Your transaction was successfull! \n" + "You total today comes to $" + totalPrice);
                inquirer.prompt([
                    {
                        name: "continue",
                        type: "confirm",
                        message: "Would you like to continue shopping?"
                    }
                ]).then(function (confirm) {
                    if (confirm.continue) {
                        start();
                    } else {
                        console.log("Thank you! Come again!");
                        connection.end();
                    }
                })
            } else {
                console.log("Not enough product in stock to complete your transaction");
                inquirer.prompt([
                    {
                        name: "continue",
                        type: "confirm",
                        message: "Would you like to continue shopping?"
                    }
                ]).then(function (confirm) {
                    if (confirm.continue) {
                        start();
                    } else {
                        console.log("Thank you! Come again!");
                        connection.end();
                    }
                })
            };
        });
    });
}