import { User } from "../models/user.model.js";
import { sendVerificationEmail } from '../mailtrap/emails.js';

export const requestEmailChange = async (req, res) => {
  const { userId, newEmail } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Generate verification token (6-digit code)
    const verificationToken = Math.floor(100000 + Math.random() * 900000).toString();

    user.verificationToken = verificationToken;
    user.verificationTokenExpireAt = Date.now() + 3600000; // 1 hour

    await user.save();

    const emailSent = await sendVerificationEmail(newEmail, verificationToken);
    if (!emailSent) {
      return res.status(500).json({ message: 'Error sending verification email' });
    }

    res.status(200).json({ message: 'Verification email sent' });
  } catch (error) {
    res.status(500).json({ message: 'Error requesting email change', error: error.message });
  }
};

export const verifyEmailChange = async (req, res) => {
  const { userId, verificationToken, newEmail } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (user.verificationToken !== verificationToken || user.verificationTokenExpireAt < Date.now()) {
      return res.status(400).json({ message: 'Invalid or expired verification token' });
    }

    user.email = newEmail;
    user.verificationToken = undefined;
    user.verificationTokenExpireAt = undefined;

    await user.save();

    res.status(200).json({ message: 'Email address updated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error verifying email change', error: error.message });
  }
};