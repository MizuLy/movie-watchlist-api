const { prisma } = require("../config/db");
const bcrypt = require("bcrypt");
const generateToken = require("../utils/generateToken");

const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const isExists = await prisma.user.findUnique({
      where: { email: email },
    });

    if (isExists)
      return res.status(400).json({ error: "Email already existed" });

    // Hash Password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create User
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    res.status(201).json({
      status: "Success",
      data: {
        user: {
          id: user.id,
          name: name,
          email: email,
        },
      },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({
      where: { email: email },
    });

    if (user === null)
      return res.status(404).json({ error: "User doesn't exist" });
    if (user === false)
      return res.status(401).json({ error: "Invalid user or password" });

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid)
      return res.status(401).json({ error: "Incorrect email or password" });

    const token = await generateToken(user.id, res);

    res.status(201).json({
      status: "Success",
      data: {
        user: {
          id: user.id,
          name: user.name,
          email: email,
        },
        token,
      },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const logout = async (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({
    status: "Success",
    message: "Logged out success",
  });
};

module.exports = { register, login, logout };
