const jwt = require("jsonwebtoken");

const generateToken = async (userId, res) => {
  const payload = { id: userId };
  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || "7d",
  });

  res.cookie("jwt", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 7 * 60 * 60 * 24 * 1000, // 7d * 60s * 60m * 24h * 1ms
  });
  return token;
};

module.exports = generateToken;
