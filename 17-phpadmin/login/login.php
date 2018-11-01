<?php 
session_start();
header("Content-type:text/html;charset=utf-8");

// 创建连接 
$conn = new mysqli("localhost", "root", "1632895066","mybs"); 
// 检测连接 
if ($conn->connect_error) { 
    die("Connection failed: " . $conn->connect_error); 
}

// $name = $_POST['name'];
// $tel = $_POST['tel'];

$name = urldecode($_POST['name']);
$tel = urldecode($_POST['tel']);


// Create database 创建数据库

// $sql = "CREATE DATABASE mybs";
// if (mysqli_query($conn, $sql)) {
//     echo "Database created successfully";
// } else {
//     echo "Error creating database: " . mysqli_error($conn);
// }
// mysqli_close($conn);



// sql to create table 创建表
// $sql = "CREATE TABLE MyGuests (
//  id INT(10) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
//  firstname VARCHAR(30) NOT NULL,
//  lastname VARCHAR(30) NOT NULL
// )";
// if (mysqli_query($conn, $sql)) {
//     echo "Table MyGuests created successfully";
// } else {
//     echo "Error creating table: " . mysqli_error($conn);
// }
// mysqli_close($conn);


// 插入数据
$sql = "INSERT INTO MyGuests (firstname, lastname) VALUES ('$name', '$tel')"; 

if (mysqli_query($conn, $sql)) { 
    echo "New record created successfully"; 
} else { 
    echo "Error: " . $sql . "<br>" . mysqli_error($conn); 
} 
mysqli_close($conn); 


?>