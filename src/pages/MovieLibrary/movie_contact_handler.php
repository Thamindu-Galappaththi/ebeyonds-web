<?php
// movie_contact_handler.php

// Enable error reporting for development (remove in production)
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Set content type to JSON
header('Content-Type: application/json');

// CORS headers for React frontend
header('Access-Control-Allow-Origin: http://localhost:3000'); // Update with your React app URL
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');
header('Access-Control-Allow-Credentials: true');

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// Only allow POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode([
        'success' => false,
        'error' => 'Method not allowed. Only POST requests are accepted.'
    ]);
    exit;
}

// Configuration
$config = [
    'data_file' => 'movie_contact_submissions.json',
    'email' => [
        'to' => 'your-email@example.com', // Change this to your email
        'from' => 'noreply@yourdomain.com', // Change this to your domain
        'subject' => 'New Movie Library Contact Form Submission'
    ],
    'max_file_size' => 10 * 1024 * 1024, // 10MB max file size
    'allowed_fields' => ['firstName', 'lastName', 'email', 'telephone', 'message', 'agreeToTerms']
];

// Security functions
function sanitizeInput($input) {
    if (is_string($input)) {
        return htmlspecialchars(trim($input), ENT_QUOTES, 'UTF-8');
    }
    return $input;
}

function isValidEmail($email) {
    return filter_var($email, FILTER_VALIDATE_EMAIL) !== false;
}

function isValidPhone($phone) {
    // Allow various phone number formats
    $pattern = '/^[\+]?[0-9\s\-\(\)\.]{7,20}$/';
    return empty($phone) || preg_match($pattern, $phone);
}

// Rate limiting (simple implementation)
function checkRateLimit($ip) {
    $rateLimitFile = 'rate_limit.json';
    $maxRequests = 5; // Max 5 requests
    $timeWindow = 300; // Per 5 minutes
    
    $currentTime = time();
    $rateLimits = [];
    
    if (file_exists($rateLimitFile)) {
        $content = file_get_contents($rateLimitFile);
        $rateLimits = json_decode($content, true) ?: [];
    }
    
    // Clean old entries
    foreach ($rateLimits as $key => $data) {
        if ($currentTime - $data['first_request'] > $timeWindow) {
            unset($rateLimits[$key]);
        }
    }
    
    // Check current IP
    if (!isset($rateLimits[$ip])) {
        $rateLimits[$ip] = [
            'count' => 1,
            'first_request' => $currentTime
        ];
    } else {
        $rateLimits[$ip]['count']++;
        
        if ($rateLimits[$ip]['count'] > $maxRequests) {
            return false;
        }
    }
    
    // Save updated rate limits
    file_put_contents($rateLimitFile, json_encode($rateLimits));
    
    return true;
}

// Validation function
function validateFormData($data) {
    $errors = [];
    
    // Required field validation
    if (empty($data['firstName'])) {
        $errors[] = 'First name is required';
    } elseif (strlen($data['firstName']) > 50) {
        $errors[] = 'First name must be less than 50 characters';
    }
    
    if (empty($data['lastName'])) {
        $errors[] = 'Last name is required';
    } elseif (strlen($data['lastName']) > 50) {
        $errors[] = 'Last name must be less than 50 characters';
    }
    
    if (empty($data['email'])) {
        $errors[] = 'Email is required';
    } elseif (!isValidEmail($data['email'])) {
        $errors[] = 'Please enter a valid email address';
    } elseif (strlen($data['email']) > 100) {
        $errors[] = 'Email must be less than 100 characters';
    }
    
    if (!empty($data['telephone']) && !isValidPhone($data['telephone'])) {
        $errors[] = 'Please enter a valid phone number';
    }
    
    if (!empty($data['message']) && strlen($data['message']) > 1000) {
        $errors[] = 'Message must be less than 1000 characters';
    }
    
    if (empty($data['agreeToTerms']) || $data['agreeToTerms'] !== true) {
        $errors[] = 'You must agree to the Terms & Conditions';
    }
    
    return $errors;
}

// Save to JSON file function
function saveToJsonFile($data, $filename) {
    try {
        $submissions = [];
        
        // Read existing data
        if (file_exists($filename)) {
            $jsonContent = file_get_contents($filename);
            if ($jsonContent !== false) {
                $submissions = json_decode($jsonContent, true) ?: [];
            }
        }
        
        // Create new submission
        $submission = [
            'id' => uniqid('sub_', true),
            'timestamp' => date('Y-m-d H:i:s'),
            'firstName' => $data['firstName'],
            'lastName' => $data['lastName'],
            'email' => $data['email'],
            'telephone' => $data['telephone'] ?? '',
            'message' => $data['message'] ?? '',
            'ip_address' => $_SERVER['REMOTE_ADDR'] ?? 'unknown',
            'user_agent' => $_SERVER['HTTP_USER_AGENT'] ?? 'unknown',
            'source' => 'movie_library'
        ];
        
        // Add to submissions array
        $submissions[] = $submission;
        
        // Write back to file
        $result = file_put_contents($filename, json_encode($submissions, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));
        
        if ($result === false) {
            throw new Exception('Failed to save data to file');
        }
        
        return $submission;
        
    } catch (Exception $e) {
        throw new Exception('Error saving submission: ' . $e->getMessage());
    }
}

// Send email function
function sendNotificationEmail($data, $config) {
    $to = $config['email']['to'];
    $subject = $config['email']['subject'];
    $from = $config['email']['from'];
    
    // Create HTML email content
    $htmlMessage = "
    <html>
    <head>
        <style>
            body { font-family: Arial, sans-serif; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background-color: #1d1d1d; color: white; padding: 20px; border-radius: 5px 5px 0 0; }
            .content { background-color: #f9f9f9; padding: 20px; border: 1px solid #ddd; }
            .field { margin-bottom: 15px; }
            .label { font-weight: bold; color: #555; }
            .value { margin-top: 5px; padding: 8px; background-color: white; border-radius: 3px; }
            .footer { background-color: #e9e9e9; padding: 15px; border-radius: 0 0 5px 5px; font-size: 12px; color: #666; }
        </style>
    </head>
    <body>
        <div class='container'>
            <div class='header'>
                <h2>New Movie Library Contact Form Submission</h2>
            </div>
            <div class='content'>
                <div class='field'>
                    <div class='label'>Name:</div>
                    <div class='value'>" . htmlspecialchars($data['firstName'] . ' ' . $data['lastName']) . "</div>
                </div>
                <div class='field'>
                    <div class='label'>Email:</div>
                    <div class='value'>" . htmlspecialchars($data['email']) . "</div>
                </div>
                <div class='field'>
                    <div class='label'>Telephone:</div>
                    <div class='value'>" . htmlspecialchars($data['telephone'] ?: 'Not provided') . "</div>
                </div>
                <div class='field'>
                    <div class='label'>Message:</div>
                    <div class='value'>" . nl2br(htmlspecialchars($data['message'] ?: 'No message provided')) . "</div>
                </div>
            </div>
            <div class='footer'>
                <p>Submitted: " . date('Y-m-d H:i:s') . "</p>
                <p>IP Address: " . ($_SERVER['REMOTE_ADDR'] ?? 'unknown') . "</p>
                <p>Source: Movie Library Contact Form</p>
            </div>
        </div>
    </body>
    </html>";
    
    // Plain text version
    $textMessage = "New Movie Library Contact Form Submission\n\n";
    $textMessage .= "Name: " . $data['firstName'] . " " . $data['lastName'] . "\n";
    $textMessage .= "Email: " . $data['email'] . "\n";
    $textMessage .= "Telephone: " . ($data['telephone'] ?: 'Not provided') . "\n";
    $textMessage .= "Message:\n" . ($data['message'] ?: 'No message provided') . "\n\n";
    $textMessage .= "Submitted: " . date('Y-m-d H:i:s') . "\n";
    $textMessage .= "IP Address: " . ($_SERVER['REMOTE_ADDR'] ?? 'unknown') . "\n";
    
    // Email headers
    $headers = [
        'MIME-Version: 1.0',
        'Content-Type: text/html; charset=UTF-8',
        'From: ' . $from,
        'Reply-To: ' . $data['email'],
        'X-Mailer: PHP/' . phpversion(),
        'X-Priority: 1'
    ];
    
    // Send email
    $success = mail($to, $subject, $htmlMessage, implode("\r\n", $headers));
    
    if (!$success) {
        // Try to send plain text version as fallback
        $plainHeaders = [
            'From: ' . $from,
            'Reply-To: ' . $data['email'],
            'Content-Type: text/plain; charset=UTF-8'
        ];
        
        $success = mail($to, $subject, $textMessage, implode("\r\n", $plainHeaders));
        
        if (!$success) {
            throw new Exception('Failed to send email notification');
        }
    }
    
    return true;
}

// Main execution
try {
    // Rate limiting check
    $clientIP = $_SERVER['REMOTE_ADDR'] ?? 'unknown';
    if (!checkRateLimit($clientIP)) {
        http_response_code(429);
        echo json_encode([
            'success' => false,
            'error' => 'Too many requests. Please wait before submitting again.'
        ]);
        exit;
    }
    
    // Get and decode POST data
    $input = file_get_contents('php://input');
    $data = json_decode($input, true);
    
    if (json_last_error() !== JSON_ERROR_NONE) {
        throw new Exception('Invalid JSON data received');
    }
    
    if (empty($data)) {
        throw new Exception('No data received');
    }
    
    // Filter allowed fields only
    $filteredData = [];
    foreach ($config['allowed_fields'] as $field) {
        $filteredData[$field] = $data[$field] ?? '';
    }
    
    // Sanitize input data
    $sanitizedData = array_map('sanitizeInput', $filteredData);
    
    // Convert agreeToTerms to boolean
    $sanitizedData['agreeToTerms'] = !empty($sanitizedData['agreeToTerms']);
    
    // Validate form data
    $errors = validateFormData($sanitizedData);
    
    if (!empty($errors)) {
        http_response_code(400);
        echo json_encode([
            'success' => false,
            'errors' => $errors
        ]);
        exit;
    }
    
    // Save to JSON file
    $submission = saveToJsonFile($sanitizedData, $config['data_file']);
    
    // Send email notification
    try {
        sendNotificationEmail($sanitizedData, $config);
        $emailSent = true;
    } catch (Exception $emailError) {
        error_log('Email sending failed: ' . $emailError->getMessage());
        $emailSent = false;
    }
    
    // Return success response
    http_response_code(200);
    echo json_encode([
        'success' => true,
        'message' => 'Your message has been sent successfully!',
        'submission_id' => $submission['id'],
        'email_sent' => $emailSent
    ]);
    
} catch (Exception $e) {
    error_log('Contact form error: ' . $e->getMessage());
    
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'error' => 'An error occurred while processing your request. Please try again later.'
    ]);
}
?>