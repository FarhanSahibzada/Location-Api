import nodemailer from "nodemailer";

const gmail_account = process.env.GMAIL_NAME;

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: gmail_account,
    pass: process.env.GMAIL_PASS, 
  },
});

const sendLoginAlertEmail = async (to, location) => {
  await transporter.sendMail({
    from: gmail_account,
    to,
    subject: "⚠️ New Login Alert",
    html: `
      <h3>New Login Detected</h3>
      <p><strong>Location:</strong> ${location.city}, ${location.country}</p>
      <p><strong>Time:</strong> ${new Date().toLocaleString()}</p>
      <p>Please login to your account and change the password and it you so you ignore this message</p>
    `,
  });
};


export {
  sendLoginAlertEmail
}