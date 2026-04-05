import nodemailer from "nodemailer";
import ApiError from "../utils/apiError.js";
import ApiResponse from "../utils/apiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";

// Configure nodemailer
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER?.trim(),
    pass: process.env.EMAIL_PASSWORD?.trim(),
  },
  tls: {
    rejectUnauthorized: false,
  },
});

const sendContactEmail = asyncHandler(async (req, res) => {
  const { name, phone, message, recipientEmail } = req.body;

  if (!name || !phone || !message || !recipientEmail) {
    throw new ApiError(400, "All fields are required");
  }

  try {
    // Email to admin
    await transporter.sendMail({
      from: process.env.EMAIL_USER?.trim(),
      to: recipientEmail,
      subject: `New Contact Form Submission from ${name}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
        <hr/>
        <p><small>This email was sent from your website's contact form.</small></p>
      `,
    });

    return res
      .status(200)
      .json(new ApiResponse(200, null, "Email sent successfully"));
  } catch (error) {
    console.error("Email error:", error);
    throw new ApiError(500, `Failed to send email: ${error.message}`);
  }
});

export { sendContactEmail };
