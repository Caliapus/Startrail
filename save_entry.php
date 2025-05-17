<?php
// Debugging headers
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// Clear any previous output
if (ob_get_length()) ob_clean();

header('Content-Type: application/json');

// Get JSON POST data
$data = json_decode(file_get_contents('php://input'), true);

// Validate data
if (!is_array($data)) {
    echo json_encode(['success' => false, 'message' => 'Invalid JSON input']);
    exit;
}

$filename = 'entries.json';

// Load existing entries or start a new array
$entries = file_exists($filename) ? json_decode(file_get_contents($filename), true) : [];

if (!is_array($entries)) {
    $entries = []; // Reset if file is corrupted
}

// Append new entry
$entries[] = $data;

// Convert to JSON
$jsonData = json_encode($entries, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);

// Attempt to write
if (file_put_contents($filename, $jsonData) !== false) {
    echo json_encode(['success' => true]);
} else {
    echo json_encode(['success' => false, 'message' => 'Failed to write to file']);
}
?>
