<?php
//load_entries.php
header('Content-Type: application/json');

// Check if password is required
$passwordFile = __DIR__ . '/../auth/.password';
$requiresPassword = file_exists($passwordFile);

// If a password is required, enforce cookie check
if ($requiresPassword && !isset($_COOKIE['archive_validated'])) {
    http_response_code(403);
    echo json_encode(['error' => 'Unauthorized']);
    exit;
}

// Load and return entries
$entriesFile = __DIR__ . '/../../assets/data/entries.json';
if (!file_exists($entriesFile)) {
    echo json_encode([]); // No entries yet
    http_response_code(404);
    exit;
}

$data = file_get_contents($entriesFile);

// Optional: Validate JSON structure before echoing
$decoded = json_decode($data, true);
if ($decoded === null) {
    http_response_code(500);
    echo json_encode(['error' => 'Corrupted entry file']);
    exit;
}

echo json_encode($decoded);
