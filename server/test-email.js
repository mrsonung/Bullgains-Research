require('dotenv').config();

console.log('=== SendGrid Environment Check ===\n');

console.log('1. SENDGRID_API_KEY:');
if (process.env.SENDGRID_API_KEY) {
  console.log('   ✅ EXISTS');
  console.log('   Length:', process.env.SENDGRID_API_KEY.length);
  console.log('   Starts with SG.:', process.env.SENDGRID_API_KEY.startsWith('SG.'));
  console.log('   First 10 chars:', process.env.SENDGRID_API_KEY.substring(0, 10));
} else {
  console.log('   ❌ NOT SET');
}

console.log('\n2. SENDGRID_FROM_EMAIL:');
if (process.env.SENDGRID_FROM_EMAIL) {
  console.log('   ✅ EXISTS:', process.env.SENDGRID_FROM_EMAIL);
} else {
  console.log('   ❌ NOT SET');
}

console.log('\n3. ADMIN_EMAIL:');
if (process.env.ADMIN_EMAIL) {
  console.log('   ✅ EXISTS:', process.env.ADMIN_EMAIL);
} else {
  console.log('   ❌ NOT SET');
}

console.log('\n=== Testing SendGrid Connection ===\n');

const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const testEmail = async () => {
  try {
    const msg = {
      to: process.env.ADMIN_EMAIL,
      from: process.env.SENDGRID_FROM_EMAIL,
      subject: 'SendGrid Test Email',
      text: 'If you receive this, SendGrid is working!',
      html: '<strong>If you receive this, SendGrid is working!</strong>',
    };

    console.log('Attempting to send test email...');
    console.log('To:', msg.to);
    console.log('From:', msg.from);

    const result = await sgMail.send(msg);
    console.log('\n✅ SUCCESS! Email sent.');
    console.log('Status:', result[0].statusCode);
    
  } catch (error) {
    console.log('\n❌ FAILED!');
    console.log('Error:', error.response?.body || error.message);
  }
};

testEmail();
