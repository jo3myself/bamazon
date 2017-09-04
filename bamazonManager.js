// set all the variables needed
var mysql=require("mysql");
var inquirer=require("inquirer");
var show=false;
var stock;
var addID;

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
    console.log("-----------------------------------------------------------------");
    connection.query("SELECT * FROM products", function(err, res) {
      if (err) throw err;
    inquirer
    // prompt options to execute
    .prompt([
        {
            type: 'list',
            name: 'select',
            message: 'What do you want to do?',
            choices: ['View Products for Sale', 'View Low Inventory', 'Add to Inventory', 'Add New Product', 'EXIT']
        }
    ])
    .then(function(ans) {
        switch (ans.select) {
            case 'View Products for Sale':
                for (var i = 0; i < res.length; i++) {
                    // show all the data in database
                    showData(res[i]);
                }
                start();
                break;
            case 'View Low Inventory':
                for (var i = 0; i < res.length; i++) {
                    if (res[i].stock_quantity<5) {
                        // show all data in database that have quantity less than five
                        showData(res[i]);
                        show=true;
                    }
                }
                if (!show) {
                    console.log("No stock less than 5 in quantity")
                }
                start();
                break;
            case 'Add to Inventory':
                inquirer
                // prompt qustions to add item
                .prompt([
                    {
                        type: 'list',
                        name: 'selectAdd',
                        message: 'Which item_id do you want to add?',
                        pageSize: 50,
                        choices: function() {
                            var choiceArray = [];
                            for (var i = 0; i < res.length; i++) {
                            choiceArray.push(res[i].product_name);
                            }
                            return choiceArray;
                        },
                    },
                    {
                        type: "input",
                        message: "How many units of the product you would like to add?",
                        name: "unitAdd",
                        validate: function(value) {
                          if (isNaN(value)===false && parseInt(value)>0 ) {
                          return true;
                          }
                          return "Please add amount you want to add";
                        },
                    },
                ])
                .then(function(ans) { 
                    for (var i = 0; i < res.length; i++) {
                        if (res[i].product_name===ans.selectAdd) {
                          stock=res[i].stock_quantity+parseInt(ans.unitAdd);
                          addID=res[i].item_id;
                        }
                    }
                    // query to update the database by adding additional quantity to the stock quantity
                    connection.query(
                        "UPDATE products SET ? WHERE ?",
                        [
                          {
                            stock_quantity: stock
                          },
                          {
                            item_id: addID
                          }
                        ],
                        function(error) {
                          if (error) throw err;
                          console.log("Item added to inventory!");
                        }
                    )
                    start();
                });
                break;
            case 'Add New Product':
                inquirer
                // prompt questions to add new product
                .prompt([
                    {
                        type: 'input',
                        name: 'productName',
                        message: 'What is the product name?',
                    },
                    {
                        type: 'input',
                        name: 'departmentName',
                        message: 'What is the department name?',
                    },
                    {
                        type: 'input',
                        name: 'price',
                        message: 'What is the price?',
                        validate: function(value) {
                            if (isNaN(value)===false && parseInt(value)>0 ) {
                                return true;
                            }
                            return "Please add the price";
                        },
                    },
                    {
                        type: 'input',
                        name: 'quantity',
                        message: 'What is the quantity?',
                        validate: function(value) {
                            if (isNaN(value)===false && parseInt(value)>0 ) {
                                return true;
                            }
                             return "Please add the quantity";
                        },
                    }
                ])
                .then(function(ans) { 
                    // query statement to add a new product to database
                    connection.query(
                    "INSERT INTO products SET ?",
                    {
                        product_name: ans.productName,
                        department_name: ans.departmentName,
                        price: ans.price,
                        stock_quantity: ans.quantity
                    },
                    function(err, res) {
                        console.log("New product added");
                    }
                    );
                    start();
                });
                break;
                case 'EXIT':
                console.log("Cya later boss!")
                connection.end();
                break;
        }
    });
    });
}

// constructor to show data
function showData(data) {
    console.log("ID :  "+data.item_id+"   Name :  "+data.product_name+"   Price :  $"+data.price+"   Quantity :  "+data.stock_quantity);
}