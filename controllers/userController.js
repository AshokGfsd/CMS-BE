const User = require("../models/users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { SECRET_KEY, MAIL_ID, URL } = require("../utils/config");
const transporter = require("../utils/transporter");
const OTPG = require("../utils/OTPG");

const userController = {
  register: async (request, response) => {
    try {
      const { userName, email, password } = request.body;

      const user = await User.findOne({ email });
      if (user) {
        return response
          .status(400)
          .json({ message: "user already registerd with this mail" });
      }
      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = new User({
        userName,
        email,
        password: hashedPassword,
      });
      await newUser.save();
      response.status(200).json({ message: "user successfully created" });
    } catch (error) {
      response.status(500).send({ message: error.message });
    }
  },
  login: async (request, response) => {
    try {
      const { email, password } = request.body;

      const user = await User.findOne({ email });
      if (!user) {
        return response.status(400).json({ message: "User not found" });
      }
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return response.status(400).send({ message: "Invalid password" });
      }
      const token = jwt.sign({ id: user._id }, SECRET_KEY);
      response.cookie("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        expires: new Date(Date.now() + 24 * 3600000),
      });
      response.status(200).json({ message: "Login succesfully", token });
    } catch (error) {
      response.status(500).json({ message: error.message });
    }
  },
  logout: async (request, response) => {
    try {
      response.clearCookie("token", {
        httpOnly: true,
        secure: true,
        sameSite: "none",
      });
      response.status(200).send({ message: "Logged out successfully" });
    } catch (error) {
      response.status(500).send({ message: error.message });
    }
  },
  getProfile: async (request, response) => {
    try {
      const userId = request.userId;

      const user = await User.findById(userId).select(
        "-password -__v -_id -otp"
      );

      if (!user) {
        return response.status(404).send({ message: "User not found" });
      }

      response.status(200).json({ message: "User profile", user });
    } catch (error) {
      response.status(500).send({ message: error.message });
    }
  },
  forgot: async (request, response) => {
    try {
      const { email } = request.body;

      const user = await User.findOne({ email });

      if (!user) {
        return response.status(400).json({ message: "User not found" });
      }
      const otp = OTPG();
      user.otp = otp;
      user.save();
      transporter.sendMail({
        from: MAIL_ID,
        to: email,
        subject: "reset pasword",
        text: `This Your OTP:${otp}`,
      });
      response.status(200).json({ message: "OTP sended succesfully" });
    } catch (error) {
      response.status(500).json({ message: error.message });
    }
  },
  verify: async (request, response) => {
    try {
      const { email, otp } = request.body;

      const user = await User.findOne({ email });

      if (user.otp != otp) {
        return response.status(400).json({ message: "Invalid OTP" });
      }

      response.status(200).json({ message: "verified succesfully" });
    } catch (error) {
      response.status(500).json({ message: error.message });
    }
  },
  reset: async (request, response) => {
    try {
      const { email, password, otp } = request.body;

      const user = await User.findOne({ email });

      if (user.otp != otp) {
        return response.status(400).json({ message: "Link was expiried !!!" });
      }
      const hashedPassword = await bcrypt.hash(password, 10);

      user.otp = "";

      user.password = hashedPassword;

      await user.save();

      response.status(200).json({ message: "Password is changed succesfully" });
    } catch (error) {
      response.status(500).json({ message: error.message });
    }
  },
  update: async (request, response) => {
    try {
      const { userName } = request.body;
      const userId = request.userId;
    
      const user = await User.findOneAndUpdate(
        {
          _id: userId,       
        }
      );
      if (!user) {
        return response.status(404).send({ message: "User not found" });
      }
          const savedUser = await User.findByIdAndUpdate(
        userId,
        {
          userName,       
        },
        { new: true }
      ).select("-password -__v -_id -otp");

      response
        .status(200)
        .json({ message: "form update successfully", user: savedUser });
    } catch (error) {
      response.status(500).send({ message: error.message });
    }
  }
};

module.exports = userController;
