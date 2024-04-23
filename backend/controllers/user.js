import User from "../models/user.js";
import nodemailer from "nodemailer";
import emailVerificationToken from "../models/emailVerificationToken.js";
import isValidObjectId from "mongoose";

export const create = async (req, res) => {
  const { name, email, password } = req.body;

  // Check if the user already exists
  const olderUser = await User.findOne({ email });
  if (olderUser) {
    return res.status(409).json({ error: "Email is already in use" });  // 409 Conflict for duplicate resource
  }

  try {
    // Create new user
    const newUser = new User({ name, email, password });
    await newUser.save();

    // Generate OTP
    let otp = Math.floor(100000 + Math.random() * 900000);

    // Store the OTP in the database
    const emailToken = new emailVerificationToken({ owner: newUser._id, token: otp });
    await emailToken.save();

    // Configure email transport
    var transport = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "cc72f9799fc729",
        pass: "28ea7124b6c445"
      }
    });

    // Send verification email
    await transport.sendMail({
      from: "yanww0226@gmail.com",
      to: newUser.email,
      subject: "Email Verification",
      html: `<h1>Verify your email</h1><p>Use this OTP to verify your email: ${otp}</p>`
    });

    // Respond to client
    res.status(201).json({ message: "Please verify your email, an OTP has been sent to your email account!" });
  } catch (error) {
    // Log error for debugging
    console.error("Failed operation", error);
    res.status(500).json({ error: "Internal Server Error", details: error.message });
  }
  
};

export const verify = async (req, res) => {
  const { userId, otp } = req.body;
  if(!isValidObjectId(userId)) {
    return res.status(400).json({ error: "Invalid user ID" });  // 400 Bad Request for invalid data
  }
  // Find the user
  const user = await User.findById({ userId }); 
  if(!user) {
    return res.status(400).json({ error: "User not found" });  // 404 Not Found for missing resource
  }
  if(user.isVerified) {
    return res.status(200).json({ error: "User is already verified" });  // 400 Bad Request for invalid data
  }
  const token = await emailVerificationToken.findOne({ owner: userId});
  if(!token) {
    return res.status(400).json({ error: "Invalid OTP" });  // 400 Bad Request for invalid data
  }
}