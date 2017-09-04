# BAMAZON

## Overview
Bamazon is an Amazon-like storefront application that created using NodeJS and MySQL database.
there are two interface in this bamazon application:
1.  User interface
2.  Manager interface

## Application flow

#### User interface
* When you run the file, it will show the user all the available product and ask user to select the ID that they want to buy. It will validate the user input to add only the available ID.
* After the user added the ID, it will prompt for the quantity that they want to buy. The validation is when the user put quantity more than the stock, it will show message `Insufficient quantity!`.
* After all the input validated, it shows the total of the purchase and updates the SQL database to reflect the remaining quantity.
That's all about customer view. 
- - -
#### Manager interface
* When you execute the file, it will show a set list of menu options for the manager
  * View Products for Sale
  * View Low Inventory
  * Add to Inventory
  * Add New Product
  * EXIT

* If a manager selects `View Products for Sale`, it will list every available item: the item IDs, names, prices, and quantities.
  * If a manager selects `View Low Inventory`, then it will list all items with an inventory count lower than five.
  * If a manager selects `Add to Inventory`, it will display a prompt that will let the manager "add more" of any item currently in the store. The number input will be validate to only number greater than zero.
  * If a manager selects `Add New Product`, it will allow the manager to add a completely new product to the store. The number input will be validate to only number greater than zero.
  * If a manager selects `EXIT`, it will quit the application

## Video
**[Watch the demo video](https://youtu.be/PtihJl2qUqE)**