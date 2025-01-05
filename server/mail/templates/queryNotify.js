exports.queryNotify = (
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
            background-color: #f4f4f9;
            font-family: 'Arial', sans-serif;
            font-size: 16px;
            line-height: 1.5;
            color: #333333;
            margin: 0;
            padding: 0;
        }

        .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 30px;
            background-color: #ffffff;
            border-radius: 8px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            text-align: center;
        }

        .logo {
            max-width: 200px;
            margin-bottom: 20px;
        }

        .message {
            font-size: 24px;
            font-weight: bold;
            color: #2c3e50;
            margin-bottom: 20px;
        }

        .body {
            font-size: 16px;
            color: #555555;
            line-height: 1.6;
            margin-bottom: 30px;
            text-align: left;
            padding: 0 20px;
        }

        .cta {
            display: inline-block;
            padding: 12px 30px;
            background-color: #FFD60A;
            color: #000000;
            text-decoration: none;
            border-radius: 5px;
            font-size: 18px;
            font-weight: bold;
            margin-top: 30px;
            transition: background-color 0.3s ease;
        }

        .cta:hover {
            background-color: #f39c12;
        }

        .highlight {
            font-weight: bold;
            color: #e74c3c;
        }

        .reply-btn {
            display: inline-block;
            padding: 12px 30px;
            background-color: #3498db;
            color: #ffffff;
            text-decoration: none;
            border-radius: 5px;
            font-size: 18px;
            font-weight: bold;
            margin-top: 20px;
            transition: background-color 0.3s ease;
        }

        .reply-btn:hover {
            background-color: #2980b9;
        }

        .support {
            font-size: 14px;
            color: #999999;
            margin-top: 30px;
            text-align: center;
        }

        p {
            margin: 10px 0;
        }

        .footer {
            margin-top: 30px;
            font-size: 12px;
            color: #999999;
        }

        a {
            color: #3498db;
            text-decoration: none;
            font-weight: bold;
        }

        a:hover {
            text-decoration: underline;
        }
    </style>
</head>

<body>
    <div class="container">
        <div class="message">Query Data</div>
        <div class="body">
            <p>New Query Received</p>
            <p>Here are the details of the person who submitted the query:</p>
            <p><span class="highlight">Name:</span> ${firstname} ${lastname}</p>
            <p><span class="highlight">Email:</span> ${email}</p>
            <p><span class="highlight">Phone Number:</span> ${phoneNo}</p>
            <p><span class="highlight">State:</span> ${state}</p>
            <p><span class="highlight">Subject:</span> ${subject}</p>
            <p><span class="highlight">Message:</span> ${message}</p>
        </div>

        <a href="mailto:${email}" class="reply-btn">Reply</a>
    </div>
</body>

</html>
`
  }