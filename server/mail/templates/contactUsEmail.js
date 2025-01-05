exports.contactUsEmail = (
    email,
    firstname,
    lastname,
    message,
    phoneNo,
    state,
    subject
) => {
    return `<!DOCTYPE html>
<html>

<head>
  <meta charset="UTF-8">
  <title>Contact Form Confirmation</title>
  <style>
    body {
      background-color: #f4f7fc;
      font-family: 'Arial', sans-serif;
      font-size: 16px;
      color: #333333;
      margin: 0;
      padding: 0;
      line-height: 1.6;
    }

    .container {
      max-width: 600px;
      margin: 40px auto;
      padding: 20px;
      background-color: #ffffff;
      border-radius: 8px;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
      text-align: center;
    }

    .logo {
      max-width: 150px;
      margin-bottom: 20px;
    }

    .message {
      font-size: 22px;
      font-weight: 600;
      color: #1a73e8;
      margin-bottom: 20px;
      margin-top: 10px;
    }

    .body {
      font-size: 16px;
      color: #333333;
      margin-bottom: 20px;
      text-align: left;
    }

    .cta {
      display: inline-block;
      padding: 12px 25px;
      background-color: #FFD60A;
      color: #000000;
      text-decoration: none;
      border-radius: 5px;
      font-size: 16px;
      font-weight: bold;
      margin-top: 20px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      transition: all 0.3s ease;
    }

    .cta:hover {
      background-color: #ffbb00;
      transform: translateY(-2px);
    }

    .support {
      font-size: 14px;
      color: #999999;
      margin-top: 20px;
      text-align: center;
    }

    .highlight {
      font-weight: bold;
      color: #1a73e8;
    }

    .info {
      color: #666;
      margin-bottom: 5px;
    }

    .detail {
      color: #333333;
      font-weight: bold;
    }

    .email-header {
      background-color: #b67203;
      padding: 20px;
      text-align: center;
      color: #ffffff;
      border-top-left-radius: 8px;
      border-top-right-radius: 8px;
    }

    .email-header h1 {
      margin: 0;
      font-size: 24px;
      letter-spacing: 1px;
    }
  </style>
</head>

<body>
  <div class="container">
    <div class="email-header">
      <h1> KF</h1>
    </div>
    <div class="message">Contact Form Confirmation</div>
    <div class="body">
      <p>Dear ${firstname} ${lastname},</p>
      <p>Thank you for reaching out to us. We have received your message and will get back to you as soon as possible.
      </p>

      <p>Here are the details you provided:</p>
      <p class="info"><span class="detail">Name:</span> ${firstname} ${lastname}</p>
      <p class="info"><span class="detail">Email:</span> ${email}</p>
      <p class="info"><span class="detail">Phone Number:</span> ${phoneNo}</p>
      <p class="info"><span class="detail">State:</span> ${state}</p>
      <p class="info"><span class="detail">Subject:</span> ${subject}</p>
      <p class="info"><span class="detail">Message:</span> ${message}</p>
      <p>We appreciate your interest and will respond to your query shortly.</p>
    </div>
    <a href="mailto:supportKF.com" class="cta">Contact Us Again</a>
    <div class="support">
      If you have any further questions or need immediate assistance, please feel free to reach out to us at
      <a href="mailto:supportKF.com" class="highlight">infoKF@gmail.com</a>.
    </div>
  </div>
</body>

</html>`
}
