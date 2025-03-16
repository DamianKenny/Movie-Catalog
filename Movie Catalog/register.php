<?php
session_start();

$host='localhost';
$user='root';
$pass='';
$db="moviecatalog";

$conn=mysqli_connect($host, $user, $pass, $db);

if($conn->connect_error){
    echo "Failed to connect DB" . $conn->connect_error;
}
echo "Connected";

$User=$_POST['email'];
$Pass=$_POST['password'];

$sql="SELECT * FROM login WHERE Email='$User' AND password='$Pass'";
$result=mysqli_query($conn,$sql);

if(mysqli_num_rows($result)===1){
    $row=mysqli_fetch_assoc($result);
    if($row['Email']===$User && $row['password']===$Pass){
        $_SESSION['email']=$User;
        echo"<h1>Welcome:".$_SESSION['email']."</h1>";
        echo "Login successful! <a href='Dashboard.html'> Enter site</a>";
    }

    else{
        echo"Invalid credentials";
    }
}
    else{
        header("Location index.html");
        exit();
    }
    ?>