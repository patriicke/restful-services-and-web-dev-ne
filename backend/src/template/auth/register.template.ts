export const registerTemplate = ({
  firstName,
  companyName,
}: {
  firstName: string;
  companyName: string;
}) => `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Welcome to ${companyName}</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            color: #333;
            margin: 0;
            padding: 0;
        }
        .container {
            width: 100%;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: #fff;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }
        .header {
            text-align: center;
            padding: 10px 0;
        }
        .header h1 {
            margin: 0;
        }
        .content {
            margin: 20px 0;
        }
        .footer {
            text-align: center;
            color: #888;
            font-size: 12px;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Welcome to ${companyName}!</h1>
        </div>
        <div class="content">
            <p>Hello ${firstName},</p>
            <p>Thank you for signing up with ${companyName}. We're excited to have you on board.</p>
            <p>To get started, please verify your email address by clicking the link below:</p>
            <p>If you have any questions, feel free to reach out to our support team.</p>
            <p>Best regards,<br>The ${companyName} Team</p>
        </div>
        <div class="footer">
            <p>&copy; 2024 ${companyName}. All rights reserved.</p>
        </div>
    </div>
</body>
</html>
`;
