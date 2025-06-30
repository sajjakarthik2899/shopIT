import nodemailer from "nodemailer";

const sendEmail = async (options) => {
  // Create transporter using SMTP
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,       // e.g., smtp.gmail.com
    port: process.env.SMTP_PORT,       // 587 (TLS) or 465 (SSL)
    secure: false,                     // true for 465, false for 587
    auth: {
      user: process.env.SMTP_EMAIL,    // your email
      pass: process.env.SMTP_PASSWORD, // your password or app-specific password
    },
  });

  // Email options
  const mailOptions = {
    from: `"ShopIT Support" <${process.env.SMTP_EMAIL}>`,
    to: options.email,
    subject: options.subject,
    text: options.message,
  };

  // Send email
const info = await transporter.sendMail(mailOptions); 
console.log("📧 Message sent: %s", info.messageId);
console.log("🔗 Preview URL: %s", nodemailer.getTestMessageUrl(info));

};

export default sendEmail;
