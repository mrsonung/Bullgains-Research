const sgMail = require('@sendgrid/mail');

// Initialize SendGrid with API key
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// Send email to admin when new query is submitted
const sendAdminNotification = async (queryData) => {
  const msg = {
    to: process.env.ADMIN_EMAIL,
    from: process.env.SENDGRID_FROM_EMAIL, // Must be verified in SendGrid
    subject: `🔔 New Customer Query - ${queryData.subject}`,
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
          body { 
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
            line-height: 1.6; 
            color: #333;
            margin: 0;
            padding: 0;
            background-color: #f4f4f4;
          }
          .container { 
            max-width: 600px; 
            margin: 20px auto; 
            background: white;
            border-radius: 10px;
            overflow: hidden;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
          }
          .header { 
            background: linear-gradient(135deg, #0D4C3A 0%, #1A6A50 100%); 
            color: white; 
            padding: 30px 20px;
            text-align: center;
          }
          .header h1 {
            margin: 0;
            font-size: 24px;
          }
          .header p {
            margin: 5px 0 0 0;
            opacity: 0.9;
            font-size: 14px;
          }
          .content { 
            padding: 30px 20px;
          }
          .field { 
            margin-bottom: 20px;
            padding-bottom: 20px;
            border-bottom: 1px solid #eee;
          }
          .field:last-child {
            border-bottom: none;
            margin-bottom: 0;
            padding-bottom: 0;
          }
          .label { 
            font-weight: 600;
            color: #0D4C3A;
            font-size: 13px;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            margin-bottom: 8px;
          }
          .value { 
            font-size: 15px;
            color: #333;
            padding: 12px;
            background: #f9f9f9;
            border-left: 3px solid #0D4C3A;
            border-radius: 4px;
          }
          .badge { 
            display: inline-block; 
            padding: 6px 12px; 
            background: #FFD700; 
            color: #0D4C3A; 
            border-radius: 20px; 
            font-weight: 600;
            font-size: 12px;
            text-transform: uppercase;
            letter-spacing: 0.5px;
          }
          .footer { 
            background: #f9f9f9;
            color: #666;
            padding: 20px;
            text-align: center;
            font-size: 12px;
            border-top: 1px solid #eee;
          }
          .footer p {
            margin: 5px 0;
          }
          .cta-button {
            display: inline-block;
            padding: 12px 30px;
            background: #0D4C3A;
            color: white !important;
            text-decoration: none;
            border-radius: 6px;
            font-weight: 600;
            margin: 10px 5px;
          }
          a {
            color: #0D4C3A;
            text-decoration: none;
          }
          a:hover {
            text-decoration: underline;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🔔 New Customer Query</h1>
            <p>Bullgains Research - Admin Notification</p>
          </div>
          
          <div class="content">
            <div class="field">
              <div class="label">Query Type</div>
              <div class="value">
                <span class="badge">${queryData.subject.toUpperCase().replace(/-/g, ' ')}</span>
              </div>
            </div>

            <div class="field">
              <div class="label">Customer Name</div>
              <div class="value">${queryData.name}</div>
            </div>

            <div class="field">
              <div class="label">Email Address</div>
              <div class="value">
                <a href="mailto:${queryData.email}" style="color: #0D4C3A; font-weight: 600;">${queryData.email}</a>
              </div>
            </div>

            <div class="field">
              <div class="label">Phone Number</div>
              <div class="value">
                <a href="tel:${queryData.phone}" style="color: #0D4C3A; font-weight: 600;">${queryData.phone}</a>
              </div>
            </div>

            <div class="field">
              <div class="label">Message</div>
              <div class="value" style="white-space: pre-wrap;">${queryData.message}</div>
            </div>

            <div class="field">
              <div class="label">Submitted At</div>
              <div class="value">${new Date().toLocaleString('en-IN', { 
                timeZone: 'Asia/Kolkata',
                dateStyle: 'full',
                timeStyle: 'short'
              })}</div>
            </div>

            <div style="text-align: center; margin-top: 30px;">
              <a href="mailto:${queryData.email}" class="cta-button">📧 Reply via Email</a>
              <a href="tel:${queryData.phone}" class="cta-button">📞 Call Customer</a>
            </div>
          </div>

          <div class="footer">
            <p><strong>⚡ Action Required</strong></p>
            <p>Please respond within 24 hours to maintain service quality.</p>
            <p style="margin-top: 15px; opacity: 0.7;">This is an automated notification from Bullgains Research Admin Panel</p>
          </div>
        </div>
      </body>
      </html>
    `,
    text: `
New Customer Query Received

Query Type: ${queryData.subject}
Customer Name: ${queryData.name}
Email: ${queryData.email}
Phone: ${queryData.phone}

Message:
${queryData.message}

Submitted At: ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}

Please respond within 24 hours.
    `
  };

  try {
    await sgMail.send(msg);
    console.log('✅ Admin notification email sent via SendGrid');
    return { success: true };
  } catch (error) {
    console.error('❌ SendGrid error (Admin):', error.response?.body || error.message);
    return { success: false, error: error.message };
  }
};

// Send confirmation email to customer
const sendCustomerConfirmation = async (queryData) => {
  const msg = {
    to: queryData.email,
    from: process.env.SENDGRID_FROM_EMAIL, // Must be verified in SendGrid
    subject: '✅ Query Received - Bullgains Research',
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
          body { 
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
            line-height: 1.6; 
            color: #333;
            margin: 0;
            padding: 0;
            background-color: #f4f4f4;
          }
          .container { 
            max-width: 600px; 
            margin: 20px auto; 
            background: white;
            border-radius: 10px;
            overflow: hidden;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
          }
          .header { 
            background: linear-gradient(135deg, #0D4C3A 0%, #1A6A50 100%); 
            color: white; 
            padding: 40px 20px;
            text-align: center;
          }
          .logo { 
            font-size: 28px; 
            font-weight: 700;
            margin-bottom: 10px;
            letter-spacing: 1px;
          }
          .header-subtitle {
            margin: 0;
            font-size: 18px;
            opacity: 0.95;
          }
          .content { 
            padding: 40px 30px;
          }
          .greeting {
            font-size: 20px;
            color: #0D4C3A;
            margin: 0 0 20px 0;
            font-weight: 600;
          }
          .message-box { 
            background: #f9f9f9;
            padding: 20px;
            border-left: 4px solid #0D4C3A;
            margin: 25px 0;
            border-radius: 4px;
          }
          .message-box p {
            margin: 0 0 15px 0;
          }
          .message-box p:last-child {
            margin-bottom: 0;
          }
          .highlight { 
            color: #0D4C3A; 
            font-weight: 600;
          }
          .button { 
            display: inline-block; 
            padding: 14px 35px; 
            background: #0D4C3A; 
            color: white !important; 
            text-decoration: none; 
            border-radius: 6px; 
            margin: 20px 0;
            font-weight: 600;
            font-size: 15px;
          }
          .info-box {
            background: #fff8e1;
            border-left: 4px solid #FFD700;
            padding: 15px;
            margin: 20px 0;
            border-radius: 4px;
          }
          .footer { 
            background: #2c2c2c;
            color: #fff;
            padding: 30px 20px;
            text-align: center;
            font-size: 13px;
          }
          .footer p {
            margin: 8px 0;
          }
          .footer a {
            color: #FFD700;
            text-decoration: none;
          }
          .social-links {
            margin: 20px 0 10px 0;
          }
          .social-links a {
            display: inline-block;
            margin: 0 8px;
            color: #FFD700;
            text-decoration: none;
            font-size: 12px;
          }
          ul {
            padding-left: 20px;
          }
          ul li {
            margin: 8px 0;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <div class="logo">BULLGAINS RESEARCH</div>
            <p class="header-subtitle">✅ Query Received Successfully</p>
          </div>
          
          <div class="content">
            <p class="greeting">Hello ${queryData.name},</p>
            
            <p>Thank you for contacting <strong>Bullgains Research</strong>! We have successfully received your query and our team is reviewing it.</p>

            <div class="message-box">
              <p><strong>📋 Your Query Details</strong></p>
              <p><span class="highlight">Subject:</span> ${queryData.subject.replace(/-/g, ' ').toUpperCase()}</p>
              <p><span class="highlight">Your Message:</span><br>${queryData.message}</p>
            </div>

            <div class="info-box">
              <p style="margin: 0;"><strong>⏰ Response Time:</strong> Within 24 hours</p>
            </div>

            <p>Our expert team will review your query and get back to you at:</p>
            <ul>
              <li><strong>Email:</strong> ${queryData.email}</li>
              <li><strong>Phone:</strong> ${queryData.phone}</li>
            </ul>

            <p>If you have any urgent questions, feel free to reach us directly at <a href="mailto:support@bullgains.in" style="color: #0D4C3A; font-weight: 600;">support@bullgains.in</a></p>

            <center>
              <a href="https://www.bullgains.in" class="button">Visit Our Website</a>
            </center>
          </div>

          <div class="footer">
            <p style="font-size: 16px; font-weight: 600; margin-bottom: 15px;">BULLGAINS RESEARCH</p>
            <p>SEBI Registered Research Analyst - INH000022190</p>
            <p>📍 No. 631, Brahmpur, Patna, Bihar – 800027</p>
            <p>📧 support@bullgains.in | 🌐 <a href="https://www.bullgains.in">www.bullgains.in</a></p>
            
            <div class="social-links">
              <a href="https://www.instagram.com/bullgainsresearch">Instagram</a> •
              <a href="https://www.linkedin.com/in/bullgains-44588438a/">LinkedIn</a> •
              <a href="https://twitter.com/bullgainsr">Twitter</a>
            </div>
            
            <p style="margin-top: 20px; opacity: 0.8; font-size: 11px;">© ${new Date().getFullYear()} Bullgains Research. All rights reserved.</p>
            <p style="opacity: 0.7; font-size: 11px;">Investment in securities market are subject to market risks. Read all documents carefully before investing.</p>
          </div>
        </div>
      </body>
      </html>
    `,
    text: `
Hello ${queryData.name},

Thank you for contacting Bullgains Research! We have successfully received your query.

Your Query Details:
Subject: ${queryData.subject}
Message: ${queryData.message}

Our team will review your query and get back to you within 24 hours at:
- Email: ${queryData.email}
- Phone: ${queryData.phone}

For urgent queries, contact us at support@bullgains.in

Best regards,
Bullgains Research Team
SEBI Registered Research Analyst - INH000022190
www.bullgains.in
    `
  };

  try {
    await sgMail.send(msg);
    console.log('✅ Customer confirmation email sent via SendGrid');
    return { success: true };
  } catch (error) {
    console.error('❌ SendGrid error (Customer):', error.response?.body || error.message);
    return { success: false, error: error.message };
  }
};

module.exports = {
  sendAdminNotification,
  sendCustomerConfirmation
};
