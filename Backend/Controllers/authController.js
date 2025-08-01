import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import db from '../Config/db.js'
import User from '../Models/User.js'

//when user registers

export const register = async(req,res)=>{
    const {name,password} = req.body

    if (!name || !password) {
    return res.json({ success: false, message: "Missing details" });
  }

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ name });
    if (existingUser) {
      return res.json({ success: false, message: "User already exists" });
    }

    // Hash password
    const hashPassword = await bcrypt.hash(password, 10);

    // Create and save new user
    const newUser = new User({
      name,
      password: hashPassword,
      online: false, // default, can skip explicitly
    });

    await newUser.save();

    return res.json({
      success: true,
      message: "User registered successfully",
      userId: newUser._id,
    });

  } catch (error) {
    console.error("Error during registration:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }

}

export const login = async (req, res) => {
  const { name, password } = req.body;

  if (!name || !password) {
    return res.json({ success: false, message: "Missing credentials" });
  }

  try {
    const user = await User.findOne({ name });

    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.json({ success: false, message: "Invalid password" });
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id, name: user.name },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || "1d" }
    );

     res.cookie('token', token, {
            httpOnly: true,
            secure: false,
            sameSite: 'Lax',
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

    return res.json({
      success: true,
      message: "Login successful",
      token,
      userId: user._id,
    });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};