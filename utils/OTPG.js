OTPG = () => {
  const OTP = Math.floor(Math.random() * (9999 - 1111));
  if (OTP.toString().length == 3) return `${OTP}3`;
  else return OTP;
};
module.exports = OTPG;
