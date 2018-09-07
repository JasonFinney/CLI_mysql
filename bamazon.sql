DROP DATABASE IF EXISTS bamazonDB;
CREATE database bamazonDB;

USE bamazonDB;

CREATE TABLE products
(
    id INTEGER(11)
    auto_increment NOT NULL,
    product_name VARCHAR
    (55) NOT NULL,
    department_name VARCHAR
    (55) NOT NULL,
    price DECIMAL
    (11,2) NOT NULL,
    stock_quantity INTEGER
    (11) NOT NULL,
    product_sales DECIMAL
    (11,2) NOT NULL,
    PRIMARY KEY
    (id)
);

    CREATE TABLE departments
    (
        department_id INTEGER
        auto_increment NOT NULL,
    department_name VARCHAR
        (55) NOT NULL,
    over_head_cost DECIMAL
        (14,2) NOT NULL,
    PRIMARY KEY
        (department_id)
);

        INSERT INTO products
            (product_name, department_name, price, stock_quantity, product_sales)
        VALUES
            ("rifle", "outdoors", 1400.00, 30, 0.00);
        INSERT INTO products
            (product_name, department_name, price, stock_quantity, product_sales)
        VALUES
            ("fishing pole", "outdoors", 200.00, 30, 0.00);
        INSERT INTO products
            (product_name, department_name, price, stock_quantity, product_sales)
        VALUES
            ("milk", "grocery", 2.50, 300, 0.00);
        INSERT INTO products
            (product_name, department_name, price, stock_quantity, product_sales)
        VALUES
            ("eggs", "grocery", 1.75, 300, 0.00);
        INSERT INTO products
            (product_name, department_name, price, stock_quantity, product_sales)
        VALUES
            ("speakers", "electronics", 50.00, 50, 0.00);
        INSERT INTO products
            (product_name, department_name, price, stock_quantity, product_sales)
        VALUES
            ("laptop", "electronics", 1200.00, 50, 0.00);
        INSERT INTO products
            (product_name, department_name, price, stock_quantity, product_sales)
        VALUES
            ("bathmat", "home", 20.00, 100, 0.00);
        INSERT INTO products
            (product_name, department_name, price, stock_quantity, product_sales)
        VALUES
            ("cabnet", "home", 70.00, 100, 0.00);
        INSERT INTO products
            (product_name, department_name, price, stock_quantity, product_sales)
        VALUES
            ("pillows", "home", 9.00, 35, 0.00);
        INSERT INTO products
            (product_name, department_name, price, stock_quantity, product_sales)
        VALUES
            ("printers", "electronics", 80.00, 70, 0.00);

        INSERT INTO departments
            (department_name, over_head_cost)
        VALUES
            ();


        SELECT *
        FROM products;
        SELECT *
        FROM departments