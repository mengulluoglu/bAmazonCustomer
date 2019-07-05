// Initializes the npm packages used
var mysql = require("mysql");
var inquirer = require("inquirer");
require("console.table");

var connection = mysql.createConnection({
    host: "localhost",


    port: 3306,


    user: "root",

    password: "Erenkoy2007",
    database: "bamazon"
});


connection.connect(function(err) {
    if (err) {
        console.error("error connecting: " + err.stack);
    }
    queryProducts();
});

function queryProducts() {

    connection.query("SELECT * FROM products", function(err, res) {
        if (err) throw err;


        console.table(res);


        Item(res);
    });
}


function Item(inventory) {

    inquirer
        .prompt([{
            type: "input",
            name: "choice",
            message: "What is the ID of the item you would you like to purchase? [Quit with Q]",
            validate: function(val) {
                return !isNaN(val) || val.toLowerCase() === "q";
            }
        }])
        .then(function(val) {

            quitCheck(val.choice);
            var choiceId = parseInt(val.choice);
            var product = checkInventory(choiceId, inventory);


            if (product) {

                promptQuantity(product);
            } else {

                console.log("\nSorry..That item is not in the inventory.");
                queryProducts();
            }
        });
}

function promptQuantity(product) {
    inquirer
        .prompt([{
            type: "input",
            name: "quantity",
            message: "How many would you like? [Quit with Q]",
            validate: function(val) {
                return val > 0 || val.toLowerCase() === "q";
            }
        }])
        .then(function(val) {

            quitCheck(val.quantity);
            var quantity = parseInt(val.quantity);


            if (quantity > product.stock_quantity) {
                console.log("\nInsufficient quantity!");
                queryProducts();
            } else {

                queryPurchase(product, quantity);
            }
        });
}


function queryPurchase(product, quantity) {
    connection.query(
        "UPDATE products SET stock_quantity = stock_quantity - ? WHERE item_id = ?", [quantity, product.item_id],
        function(err, res) {

            console.log("\nSuccessfully purchased " + quantity + " " + product.product_name + "'s!");
            queryProducts();
        }
    );
}


function checkInventory(choiceId, inventory) {
    for (var i = 0; i < inventory.length; i++) {
        if (inventory[i].item_id === choiceId) {

            return inventory[i];
        }
    }

    return null;
}


function quitCheck(choice) {
    if (choice.toLowerCase() === "q") {

        console.log("SEE YOU!");
        process.exit(0);
    }
}