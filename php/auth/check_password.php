<?php
// File: check_password.php

header('Content-Type: application/json');

// Define the correct password (stored securely or hashed)
$correctPassword = file_get_contents('.password'); // Or use a hashed password and compare hashes

// Get the posted password from the request
$data = json_decode(file_get_contents('php://input'), true);
$password = $data['password'] ?? '';

// Check if password is correct
if (password_verify($password, trim($correctPassword))) {
    // Set the cookie for 1 day (expires in 86400 seconds)
    setcookie('archive_validated', 'true', [
        'expires' => time() + 86400,
        'path' => '/',
        'secure' => $useSecure, // Only true if HTTPS
        'httponly' => true,     // Can't be accessed by JavaScript
        'samesite' => 'Strict'  // Prevent CSRF
    ]);

    // Respond with success
    echo json_encode(['success' => true]);
} else {
    // Respond with failure
    echo json_encode(['success' => false]);
}
