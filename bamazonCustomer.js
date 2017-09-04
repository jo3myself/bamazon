// set all the variables needed
var mysql=require("mysql");
var inquirer=require("inquirer");
var itemID="";
var itemUnit; 
var itemPrice;

// variable to open connection to bamazon database
var connection=mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "aaa",
  database: "bamazon"
});
 
// open mysql connection and run the start function 
connection.connect(function(err) {
  if (err) throw err;
  start();
}); 

function start() {
  connection.query("SELECT * FROM products", function(err, res) {
    if (err) throw err;
    // console log all items in products table
    for (var i = 0; i < res.length; i++) {
      console.log("ID :  "+res[i].item_id+"   Name :  "+res[i].product_name+"   Price :  $"+res[i].price);
    }
    inquirer
    .prompt([
      // 1 question to input the item ID
      {
        type: "input",
        message: "What is the ID of the product you would like to buy?",
        name: "select",
        // check if the item exist, if not, input will not accepted
        validate: function(value) {
          for (var i = 0; i < res.length; i++) {
            if(res[i].item_id==value){
              itemID=value;
              itemUnit=res[i].stock_quantity;
              itemPrice=res[i].price;
              return true;
            }
          };
          if (itemID=="") {
            return "please choose any available ID";
          }
        }
      },
      {
        // 2 question, to input desired amount
        type: "input",
        message: "How many units of the product you would like to buy?",
        name: "units",
        // check for input and inventory quantity, if not as expected, ask for input again
        validate: function(value) {
          if (isNaN(value) === false && parseInt(value) > 0 && parseInt(itemUnit) > parseInt(value) ) {
          return true;
          }
          return "Insufficient quantity! Please add less amount";
        },
      },
    ])
    .then(function(ans) {
      // update quntity in table for the product selected
      itemUnit-=ans.units;
      connection.query(
        "UPDATE products SET ? WHERE ?",
        [
          {
            stock_quantity: itemUnit
          },
          {
            item_id: ans.select
          }
        ],
        function(error) {
          if (error) throw err;
          // show the total price
          console.log("The total cost of your purchase is : $"+ans.units*itemPrice);
          // close mysql connection
          connection.end();
        }
      );
    });
  });
}