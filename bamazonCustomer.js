var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "",
  database: "Bamazon"
});

connection.connect(function(err) {
  if (err) throw err;
  display();
});


var display = function() {
    var query = "SELECT * FROM products";
    connection.query(query, function(err, res) {
        for (var i = 0; i < res.length; i++) {
            console.log("Item ID: " + res[i].item_id + "\nProduct: " + res[i].product_name + "\nPrice: " + res[i].price);
        }
        purchase(res);
    });
};

var purchase = function() {
    var selection = {
        id: null,
        quantity: null
    }

    inquirer.prompt({
        name: "item_id",
        type: "input",
        message: "Which item would you like to purchase?"
    }).then(function(res)  {
        selection.id = res.item_id;

        inquirer.prompt({
            name: "number",
            type: "message",
            message: "How many would you like to purchase?"
        }).then(function(res) {
            selection.quantity = res.number;
            checkOut(selection);
        });
    });
}

var checkOut = function(order) {
    connection.query("SELECT item_id, product_name, department_name, price, stock_quantity FROM products WHERE ?", {item_id: order.item_id}, function(err, res) {

        if (res[0].stock_quantity > order.quantity {
            var updatedStock = res[0].stock_quantity - selection.quantity;
            connection.query("UPDATE products SET ? WHERE ?", [{{stock_quantity: updatedStock]});
        } else {
            console.log("Insufficient quantity!");
        });
    });
};

// Running the application will first display all of the items available for sale. Include the ids, names, and prices of products for sale



// The app should then prompt users with 2 messages
// First should ask them the ID of the product they would like to buy
// Second should ask how many units of the product they would like to buy



// Once the customer has placed the order, your application should check if your store has enough of the product to meet the customer's request

// If not, the app should log a phrase like "Insufficient quantity!", and then prevent the order from going through


// However, if your store DOES have enough of the product, you should fulfill the customer's order
// This means updating the SQL database to reflect the remaining quantity



