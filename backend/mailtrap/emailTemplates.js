export const VERIFICATION_EMAIL_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Verify Your Email</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background: linear-gradient(to right, #4CAF50, #45a049); padding: 20px; text-align: center;">
    <h1 style="color: white; margin: 0;">Verify Your Email</h1>
  </div>
  <div style="background-color: #f9f9f9; padding: 20px; border-radius: 0 0 5px 5px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
    <p>Hello,</p>
    <p>Thank you for signing up! Your verification code is:</p>
    <div style="text-align: center; margin: 30px 0;">
      <span style="font-size: 32px; font-weight: bold; letter-spacing: 5px; color: #4CAF50;">{verificationCode}</span>
    </div>
    <p>Enter this code on the verification page to complete your registration.</p>
    <p>This code will expire in 15 minutes for security reasons.</p>
    <p>If you didn't create an account with us, please ignore this email.</p>
    <p>Best regards,<br>Your App Team</p>
  </div>
  <div style="text-align: center; margin-top: 20px; color: #888; font-size: 0.8em;">
    <p>This is an automated message, please do not reply to this email.</p>
  </div>
</body>
</html>
`;

export const PASSWORD_RESET_SUCCESS_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Password Reset Successful</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background: linear-gradient(to right, #4CAF50, #45a049); padding: 20px; text-align: center;">
    <h1 style="color: white; margin: 0;">Password Reset Successful</h1>
  </div>
  <div style="background-color: #f9f9f9; padding: 20px; border-radius: 0 0 5px 5px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
    <p>Hello,</p>
    <p>We're writing to confirm that your password has been successfully reset.</p>
    <div style="text-align: center; margin: 30px 0;">
      <div style="background-color: #4CAF50; color: white; width: 50px; height: 50px; line-height: 50px; border-radius: 50%; display: inline-block; font-size: 30px;">
        ✓
      </div>
    </div>
    <p>If you did not initiate this password reset, please contact our support team immediately.</p>
    <p>For security reasons, we recommend that you:</p>
    <ul>
      <li>Use a strong, unique password</li>
      <li>Enable two-factor authentication if available</li>
      <li>Avoid using the same password across multiple sites</li>
    </ul>
    <p>Thank you for helping us keep your account secure.</p>
    <p>Best regards,<br>Your App Team</p>
  </div>
  <div style="text-align: center; margin-top: 20px; color: #888; font-size: 0.8em;">
    <p>This is an automated message, please do not reply to this email.</p>
  </div>
</body>
</html>
`;

export const PASSWORD_RESET_REQUEST_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Reset Your Password</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background: linear-gradient(to right, #4CAF50, #45a049); padding: 20px; text-align: center;">
    <h1 style="color: white; margin: 0;">Password Reset</h1>
  </div>
  <div style="background-color: #f9f9f9; padding: 20px; border-radius: 0 0 5px 5px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
    <p>Hello,</p>
    <p>We received a request to reset your password. If you didn't make this request, please ignore this email.</p>
    <p>To reset your password, click the button below:</p>
    <div style="text-align: center; margin: 30px 0;">
      <a href="{resetURL}" style="background-color: #4CAF50; color: white; padding: 12px 20px; text-decoration: none; border-radius: 5px; font-weight: bold;">Reset Password</a>
    </div>
    <p>This link will expire in 1 hour for security reasons.</p>
    <p>Best regards,<br>Your App Team</p>
  </div>
  <div style="text-align: center; margin-top: 20px; color: #888; font-size: 0.8em;">
    <p>This is an automated message, please do not reply to this email.</p>
  </div>
</body>
</html>
`;


export const WELCOME_EMAIL_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Welcome to Our App!</title>
</head>
<body style="font-family: 'Arial', sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background: linear-gradient(135deg, #6e8efb, #a777e3); padding: 40px 20px; text-align: center; border-radius: 8px 8px 0 0;">
    <h1 style="color: white; margin: 0; font-size: 28px;">Welcome to Our App!</h1>
  </div>
  <div style="background-color: #ffffff; padding: 40px 20px; border-radius: 0 0 8px 8px; box-shadow: 0 4px 8px rgba(0,0,0,0.1);">
    <p style="font-size: 16px;">Hello {userName},</p>
    <p style="font-size: 16px;">We're thrilled to have you on board! Thank you for joining our community. We're excited to help you get started on your journey with us.</p>
    <div style="text-align: center; margin: 30px 0;">
      <img src="https://your-app-logo-url.com/logo.png" alt="App Logo" style="max-width: 150px;">
    </div>
    <h2 style="color: #6e8efb; font-size: 22px;">What's Next?</h2>
    <ul style="padding-left: 20px;">
      <li style="margin-bottom: 10px;">Explore our features and discover how we can help you</li>
      <li style="margin-bottom: 10px;">Set up your profile to personalize your experience</li>
      <li style="margin-bottom: 10px;">Connect with other members of our community</li>
    </ul>
    <div style="text-align: center; margin: 30px 0;">
      <a href="{appURL}" style="background-color: #6e8efb; color: white; padding: 12px 25px; text-decoration: none; border-radius: 25px; font-weight: bold; font-size: 16px; display: inline-block;">Get Started</a>
    </div>
    <p style="font-size: 16px;">If you have any questions or need assistance, our support team is always here to help. Just reply to this email or visit our help center.</p>
    <p style="font-size: 16px;">We're looking forward to seeing you in action!</p>
    <p style="font-size: 16px;">Best regards,<br>The {appName} Team</p>
  </div>
  <div style="text-align: center; margin-top: 20px; color: #888; font-size: 14px;">
    <p>Follow us on social media:</p>
    <a href="{facebookURL}" style="color: #6e8efb; text-decoration: none; margin: 0 10px;">Facebook</a>
    <a href="{twitterURL}" style="color: #6e8efb; text-decoration: none; margin: 0 10px;">Twitter</a>
    <a href="{instagramURL}" style="color: #6e8efb; text-decoration: none; margin: 0 10px;">Instagram</a>
  </div>
  <div style="text-align: center; margin-top: 20px; color: #888; font-size: 12px;">
    <p>You received this email because you signed up for {appName}. If you didn't sign up, please ignore this email.</p>
  </div>
</body>
</html>
`;