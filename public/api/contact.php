<?php
/**
 * Contact Form Handler
 * Uses PHPMailer with Hostinger SMTP to send contact form emails.
 */

header('Content-Type: application/json; charset=utf-8');
header('X-Content-Type-Options: nosniff');

// Only allow POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['status' => 'error', 'message' => 'Method not allowed']);
    exit;
}

// Load SMTP config
$configFile = __DIR__ . '/config.php';
if (!file_exists($configFile)) {
    http_response_code(500);
    echo json_encode(['status' => 'error', 'message' => 'Server configuration error']);
    exit;
}
require_once $configFile;

// Honeypot check — if filled, silently pretend success
if (!empty($_POST['_honeypot'])) {
    echo json_encode(['status' => 'ok', 'message' => 'Email sent successfully']);
    exit;
}

// Sanitize inputs
$name    = htmlspecialchars(strip_tags(trim($_POST['name'] ?? '')), ENT_QUOTES, 'UTF-8');
$email   = filter_var(trim($_POST['email'] ?? ''), FILTER_SANITIZE_EMAIL);
$phone   = htmlspecialchars(strip_tags(trim($_POST['phone'] ?? '')), ENT_QUOTES, 'UTF-8');
$message = htmlspecialchars(strip_tags(trim($_POST['message'] ?? '')), ENT_QUOTES, 'UTF-8');

// Validate required fields
if (empty($name) || empty($email) || empty($message)) {
    http_response_code(400);
    echo json_encode(['status' => 'error', 'message' => 'Name, email, and message are required']);
    exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(['status' => 'error', 'message' => 'Invalid email address']);
    exit;
}

// Rate limiting (simple: 1 submission per IP per 60 seconds)
$rateLimitFile = sys_get_temp_dir() . '/cdl_rate_' . md5($_SERVER['REMOTE_ADDR'] ?? 'unknown');
if (file_exists($rateLimitFile) && (time() - filemtime($rateLimitFile)) < 60) {
    http_response_code(429);
    echo json_encode(['status' => 'error', 'message' => 'Please wait before sending another message']);
    exit;
}
touch($rateLimitFile);

// Build email
$to = SMTP_RECIPIENT;
$subject = "Nuevo contacto: $name - Caribbean Digital Lab";

$body = "
<html>
<body style='font-family: Arial, sans-serif; color: #333;'>
  <h2 style='color: #0B1D3A;'>Nuevo mensaje de contacto</h2>
  <table style='border-collapse: collapse; width: 100%;'>
    <tr><td style='padding: 8px; font-weight: bold; border-bottom: 1px solid #eee;'>Nombre:</td><td style='padding: 8px; border-bottom: 1px solid #eee;'>$name</td></tr>
    <tr><td style='padding: 8px; font-weight: bold; border-bottom: 1px solid #eee;'>Email:</td><td style='padding: 8px; border-bottom: 1px solid #eee;'><a href='mailto:$email'>$email</a></td></tr>
    <tr><td style='padding: 8px; font-weight: bold; border-bottom: 1px solid #eee;'>Teléfono:</td><td style='padding: 8px; border-bottom: 1px solid #eee;'>" . ($phone ?: 'No proporcionado') . "</td></tr>
    <tr><td style='padding: 8px; font-weight: bold;' colspan='2'>Mensaje:</td></tr>
    <tr><td style='padding: 8px;' colspan='2'>" . nl2br($message) . "</td></tr>
  </table>
  <hr style='margin-top: 20px; border: none; border-top: 1px solid #eee;'>
  <p style='color: #999; font-size: 12px;'>Enviado desde caribbeandigitallab.com</p>
</body>
</html>";

// Send using PHP mail() with proper headers
// For production with PHPMailer, replace this block with PHPMailer SMTP
$headers = [
    'MIME-Version: 1.0',
    'Content-type: text/html; charset=UTF-8',
    'From: Caribbean Digital Lab <' . SMTP_FROM . '>',
    'Reply-To: ' . $email,
    'X-Mailer: PHP/' . phpversion(),
];

$sent = mail($to, $subject, $body, implode("\r\n", $headers));

if ($sent) {
    echo json_encode(['status' => 'ok', 'message' => 'Email sent successfully']);
} else {
    http_response_code(500);
    echo json_encode(['status' => 'error', 'message' => 'Could not send email. Please try again later.']);
}
