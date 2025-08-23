import nodemailer from "nodemailer";
import { ApiError } from "../utlis/ErrorApi.js";

const gmail_account = process.env.GMAIL_NAME;

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: gmail_account,
    pass: process.env.GMAIL_PASS,
  },
});

const sendLoginAlertEmail = async (to, location) => {
  try {
    await transporter.sendMail({
      from: gmail_account,
      to,
      subject: "⚠️ New Login Alert",
      html: `
        <div style="max-width: 600px; margin: auto; font-family: Arial, sans-serif; padding: 20px; border: 1px solid #ddd; border-radius: 8px; background-color: #f9f9f9;">
          <h2 style="color: #e63946;">⚠️ New Login Detected</h2>
          <p style="font-size: 16px; color: #333;">
            We detected a login to your account from a new location:
          </p>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px; font-weight: bold;">🌍 Location:</td>
              <td style="padding: 8px; color: #1d3557;">
                ${location.city}, ${location.country}, ${location.continent}
              </td>
            </tr>
            <tr>
              <td style="padding: 8px; font-weight: bold;">🕒 Time:</td>
              <td style="padding: 8px; color: #1d3557;">
                ${new Date().toLocaleString()}
              </td>
            </tr>
          </table>
          <p style="font-size: 15px; margin-top: 20px; color: #555;">
            If this was you, you can safely ignore this message. <br/>
            If not, please log in to your account immediately and change your password.
          </p>
          <p style="margin-top: 30px; font-size: 14px; color: #999;">
            —Farhan Sahibzada
          </p>
        </div>
      `,
    });
  } catch (error) {
    throw new ApiError(500, "email is not sent to old user");
  }
};

export { sendLoginAlertEmail };
