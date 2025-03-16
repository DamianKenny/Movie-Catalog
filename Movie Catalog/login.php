<?php
session_start();

$host = "localhost";
$username = "root"; // Replace with your DB username
$password = ""; // Replace with your DB password
$dbname = "MovieCatalog";

// Connect to the database
$conn = new mysqli($host, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Capture data from form submission
$email = $_POST['email'];
$password = $_POST['password'];

// Validate user credentials
$sql = "SELECT * FROM MovieUsers WHERE email = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("s", $email);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows > 0) {
    $user = $result->fetch_assoc();
    if (password_verify($password, $user['password'])) {
        $_SESSION['user_id'] = $user['user_id'];
        $_SESSION['name'] = $user['name'];
        header("Location: dashboard.html"); // Redirect to the dashboard
    } else {
        echo "Invalid password. <a href='login.html'>Try again</a>";
    }
} else {
    echo "No account found with this email. <a href='sign-up.html'>Sign up here</a>";
}

// Close the connection
$stmt->close();
$conn->close();
?>
