DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;
USE bamazon;

CREATE TABLE products(
  item_id INT AUTO_INCREMENT NOT NULL,
  product_name VARCHAR(45) NOT NULL,
  department_name VARCHAR(45) NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  stock_quantity INT(10) NOT NULL,
  primary key(item_id)
);

SELECT * FROM products;
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES("Luke Skywalker BobbleHead Doll", "Collectibles", 19.99, 99),
("Princess Leia BobbleHead Doll", "Collectibles", 19.99, 144),
("Chewbacca BobbleHead Doll", "Collectibles", 19.99, 101),
("Darth Vader BobbleHead Doll", "Collectibles", 19.99, 66),
("BB-8 Pillow", "Bedding", 9.99, 500),
("Porg Stuffed Plush", "Toys", 5.99, 100),
("Kylo Ren Mask", "Costumes", 14.99, 181),
("General Hux Speak and Spell", "Pure Entertainment", 24.99, 6),
("Han Solo Replica Jacket", "Clothing", 99.99, 69),
("C-3PO Talking Pez Dispensor", "Candy", 14.99, 77),
("R2-D2 Remote Control Doll", "Electronics", 44.99, 33),
("Purple Lightsaber", "Toys", 19.99, 55),
("Rey Doll", "Collectibles", 21.99, 165);


