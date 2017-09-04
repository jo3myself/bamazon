DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;
USE bamazon;
CREATE TABLE products (
  item_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  product_name VARCHAR(50) NOT NULL,
  department_name VARCHAR(50) NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  stock_quantity INT NOT NULL
);
 
 
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("productA", "deptA", 11.11, 100), ("productAAA", "deptA", 13.13, 130), ("productB", "deptB", 22.22, 200), ("productBBB", "deptB", 23.23, 230), ("productC", "deptC", 33.33, 300), ("productCCC", "deptC", 33.33, 330), ("productD", "deptD", 41.41, 410), ("productDD", "deptD", 42.42, 420), ("productDDD", "deptD", 43.43, 430), ("productDDDD", "deptD", 44.44, 440);