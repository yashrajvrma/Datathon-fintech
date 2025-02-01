import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
const prisma = new PrismaClient();

export const userSignin = async (req, res) => {
  const { email, password } = req.body;
  console.log(email);
  console.log(password);

  if (!email) {
    return res.status(403).json({ msg: "Email is required" });
  }
  if (!password) {
    return res.status(403).json({ msg: "Password is required" });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    console.log(user);
    if (!user || user.password !== password) {
      return res.status(400).json({ msg: "Enter correct email or password" });
    }

    // Generate JWT Token
    const token = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.JWT_SECRET
    );

    res.status(200).json({ token, msg: "Login successful" });
  } catch (error) {
    console.error("Signin Error:", error);
    res.status(500).json({ error: "Signin failed" });
  }
};
