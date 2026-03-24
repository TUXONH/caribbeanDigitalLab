<?php
/**
 * SMTP Configuration for Contact Form
 *
 * Copy this file to config.php and fill in your Hostinger SMTP credentials.
 * NEVER commit config.php to version control.
 */

// Recipient email (where contact form messages are sent)
define('SMTP_RECIPIENT', 'info@caribbeandigitallab.com');

// Sender email (must be a valid email on your Hostinger account)
define('SMTP_FROM', 'noreply@caribbeandigitallab.com');

// SMTP credentials (for PHPMailer upgrade)
// define('SMTP_HOST', 'smtp.hostinger.com');
// define('SMTP_PORT', 465);
// define('SMTP_USERNAME', 'noreply@caribbeandigitallab.com');
// define('SMTP_PASSWORD', 'your-email-password-here');
