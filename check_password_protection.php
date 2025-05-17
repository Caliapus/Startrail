<?php
// check_password_protection.php
// Check if the password protection file exists
$passwordFile = '.password';
$requiresPassword = file_exists($passwordFile);

// Check if the user is validated by checking the cookie
$isAuthenticated = isset($_COOKIE['archive_validated']) && $_COOKIE['archive_validated'] === 'true';

// Prepare the response
$response = [
    'passwordRequired' => $requiresPassword,
    'authenticated' => $isAuthenticated
];

// Return the response as JSON
header('Content-Type: application/json');
echo json_encode($response);
?>
