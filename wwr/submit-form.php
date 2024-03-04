<?php

// Check if the form is submitted
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Assign form fields to variables
    $name = isset($_POST['name']) ? $_POST['name'] : "";
    $email = isset($_POST['email']) ? $_POST['email'] : "";
    $message = isset($_POST['message']) ? $_POST['message'] : "";

    // Simple validation (make sure that all fields are filled in)
    if (empty($name) || empty($email) || empty($message)) {
        echo "All fields are required.";
    } else {
        // Process the form data (e.g., send an email, save to a database, etc.)
        // For the purpose of this example, we'll just display the data.
        echo "<h2>Form Submission Details</h2>";
        echo "<p><strong>Name:</strong> " . htmlspecialchars($name) . "</p>";
        echo "<p><strong>Email:</strong> " . htmlspecialchars($email) . "</p>";
        echo "<p><strong>Message:</strong> " . htmlspecialchars($message) . "</p>";

        // Example of sending an email
        /*
        $to = 'yourcompanyemail@example.com'; // Specify your email address
        $subject = 'Contact Form Submission from ' . $name;
        $body = "You have received a new message from your website contact form.\n\n" .
                "Here are the details:\n" .
                "Name: $name\n" .
                "Email: $email\n" .
                "Message:\n$message";
        $headers = 'From: webmaster@example.com' . "\r\n" .
                   'Reply-To: ' . $email . "\r\n" .
                   'X-Mailer: PHP/' . phpversion();

        mail($to, $subject, $body, $headers);
        echo "<p>Thank you for your message, we will get back to you soon.</p>";
        */
    }
} else {
    // Not a POST request, redirect to the contact form
    header('Location: contact.html');
    exit;
}

?>
