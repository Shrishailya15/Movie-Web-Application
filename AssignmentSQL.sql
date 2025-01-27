CREATE DATABASE AssignmentSQL;

USE AssignmentSQl;

CREATE TABLE Customers (
    CustomerID INT PRIMARY KEY,
    FirstName VARCHAR(50),
    LastName VARCHAR(50),
    Email VARCHAR(100),
    City VARCHAR(50)
);

INSERT INTO Customers VALUES 
(1, 'Alice', 'Smith', 'alice.smith@example.com', 'New York'),
(2, 'Bob', 'Johnson', 'bob.johnson@example.com', 'Los Angeles'),
(3, 'Charlie', 'Brown', 'charlie.brown@example.com', 'Chicago'),
(4, 'David', 'Williams', 'david.williams@example.com', 'Houston'),
(5, 'Eve', 'Jones', 'eve.jones@example.com', 'Phoenix');

CREATE TABLE Employees (
    EmployeeID INT PRIMARY KEY,
    FirstName VARCHAR(50),
    LastName VARCHAR(50),
    Email VARCHAR(100),
    HireDate DATE,
    ManagerID INT
);

INSERT INTO Employees (EmployeeID, FirstName, LastName, Email, HireDate, ManagerID) 
VALUES 
(1, 'John', 'Doe', 'john.doe@example.com', '2020-01-01', NULL),
(2, 'Jane', 'Doe', 'jane.doe@example.com', '2021-05-15', 1),
(3, 'Mike', 'Johnson', 'mike.johnson@example.com', '2022-03-10', 1),
(4, 'Sara', 'Smith', 'sara.smith@example.com', '2023-07-20', 2),
(5, 'Tom', 'Williams', 'tom.williams@example.com', '2025-01-01', NULL);

CREATE TABLE Products (
    ProductID INT PRIMARY KEY,
    ProductName VARCHAR(50),
    Price DECIMAL(10, 2)
);

INSERT INTO Products (ProductID, ProductName, Price) 
VALUES 
(1, 'Laptop', 1200.00),
(2, 'Smartphone', 800.00),
(3, 'Headphones', 150.00),
(4, 'Keyboard', 45.00),
(5, 'Mouse', 25.00);

CREATE TABLE Orders (
    OrderID INT PRIMARY KEY,
    CustomerID INT,
    OrderDate DATE,
    OrderTotal DECIMAL(10, 2)
);

INSERT INTO Orders (OrderID, CustomerID, OrderDate, OrderTotal) 
VALUES 
(101, 1, '2023-01-10', 200.00),
(102, 2, '2023-02-15', 120.00),
(103, 3, '2023-03-20', 90.00),
(104, 4, '2023-04-25', 300.00),
(105, 5, '2023-05-30', 150.00);


CREATE TABLE OrderDetails (
    OrderDetailID INT PRIMARY KEY,
    OrderID INT,
    ProductID INT,
    Quantity INT
);

INSERT INTO OrderDetails (OrderDetailID, OrderID, ProductID, Quantity) 
VALUES 
(1, 101, 1, 2),
(2, 101, 3, 1),
(3, 102, 2, 1),
(4, 103, 4, 2),
(5, 104, 1, 1),
(6, 104, 5, 3),
(7, 105, 3, 2);

-- 1. Basic SELECT Query
-- • Write a query to retrieve all columns from a table called Customers.

SELECT * FROM Customers;

-- 2. SELECT Specific Columns
-- • Write a query to retrieve the FirstName, LastName, and Email columns from the Employees table.

SELECT FirstName, LastName, Email FROM Employees;

-- 3. WHERE Clause
-- • Write a query to retrieve all rows from the Products table where the price is greater than 50.

SELECT * FROM Products WHERE Price > 50;

-- 4. ORDER BY Clause
-- • Write a query to retrieve all records from the Orders table, sorted by OrderDate in descending order.

SELECT * FROM Orders ORDER BY Orderdate DESC;

-- 5. LIMIT Rows with TOP
-- • Write a query to get the first 5 records from the Employees table.

SELECT TOP 5 * FROM Employees;

-- 6. DISTINCT Keyword
-- • Write a query to retrieve all distinct City values from the Customers table.

SELECT DISTINCT City FROM Customers;

-- 7. AND / OR Conditions
-- • Write a query to retrieve all Orders where the CustomerID is 10 and the OrderTotal is greater than 100.

SELECT * FROM Orders WHERE CustomerID = 10 AND OrderTotal > 100;

-- 8. LIKE Operator
-- • Write a query to find all Customers whose LastName starts with the letter ‘S’.

SELECT * FROM Customers WHERE LastName LIKE 'S%';

-- 9. BETWEEN Operator
-- • Write a query to find all Products with prices between 20 and 50.

SELECT * FROM Products WHERE Price BETWEEN 20 AND 50;

-- 10. IN Operator
-- • Write a query to retrieve all Orders that have OrderID values 101, 102, and 105

SELECT * FROM Orders WHERE OrderID IN (101, 102, 105);

-- 11. NULL Values
-- • Write a query to find all Employees whose ManagerID is NULL.

SELECT * FROM Employees WHERE ManagerID IS NULL;

-- 12. COUNT Function
-- • Write a query to count the total number of records in the Products table.

SELECT COUNT(*) AS TotalProducts FROM Products;

-- 13. GROUP BY Clause
-- • Write a query to get the total sales for each ProductID from the OrderDetails table.

SELECT ProductID, SUM(Quantity) AS TotalSales 
FROM OrderDetails 
GROUP BY ProductID;

-- 14. HAVING Clause
-- • Write a query to retrieve the products that have a total sales of more than 500, grouped by ProductID.

SELECT ProductID, SUM(Quantity) AS TotalSales 
FROM OrderDetails 
GROUP BY ProductID 
HAVING SUM(Quantity) > 500;

-- 15. SUM and AVG Functions
-- • Write a query to get the total (SUM) and average (AVG) of OrderTotal from the Orders table.

SELECT SUM(OrderTotal) AS TotalSales, AVG(OrderTotal) AS AverageSales FROM Orders;

-- 16. INNER JOIN
-- • Write a query to get all OrderDetails with ProductName from the Products table using an INNER JOIN.

SELECT od.*, p.ProductName 
FROM OrderDetails od 
INNER JOIN Products p ON od.ProductID = p.ProductID;

-- 17. LEFT JOIN
-- • Write a query to retrieve all Customers and their associated Orders (if any), using a LEFT JOIN.

SELECT c.*, o.* 
FROM Customers c 
LEFT JOIN Orders o ON c.CustomerID = o.CustomerID;

-- 18. UPDATE Statement
-- • Write a query to update the Email address of the customer with CustomerID 5 in the Customers table.

UPDATE Customers 
SET Email = 'newone@gmail.com' 
WHERE CustomerID = 5;

-- 19. DELETE Statement
-- • Write a query to delete a record from the Orders table where the OrderID is 10.

DELETE FROM Orders WHERE OrderID = 10;

-- 20• Write a query to insert a new record into the Employees table with the following data: FirstName = 'John', LastName = 'Doe', Email = 'john.doe@example.com', and HireDate = '2025-01-01'.

INSERT INTO Employees  VALUES (6,'John', 'Doe', 'john.doe@example.com', '2025-01-01',2);
