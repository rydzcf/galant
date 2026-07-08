<?php
// deploy.php

$secret = getenv('DEPLOY_SECRET');
$token  = $_GET['token'] ?? '';

if (!$secret || !hash_equals($secret, $token)) {
    http_response_code(403);
    die('Brak uprawnień');
}

// triggeruje GitHub Actions przez API 
$ch = curl_init('https://api.github.com/repos/rydzcf/galant/actions/workflows/deploy.yml/dispatches');
curl_setopt_array($ch, [
    CURLOPT_POST => true,
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_HTTPHEADER => [
        'Authorization: Bearer ' . getenv('GH_TOKEN'),
        'Content-Type: application/json',
        'User-Agent: deploy-hook'
    ],
    CURLOPT_POSTFIELDS => json_encode(['ref' => 'main'])
]);

$response = curl_exec($ch);
$status = curl_getinfo($ch, CURLINFO_HTTP_CODE);

echo $status === 204 ? 'Deploy uruchomiony!' : 'Błąd: ' . $response;
?>