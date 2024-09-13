const nodemailer = require("nodemailer");
const { MAIL_ID, APP_PASS } = require("../utils/config");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: MAIL_ID,
    pass: APP_PASS,
  },
});

module.exports = transporter;