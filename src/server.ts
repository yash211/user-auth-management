import express, { Request, Response } from "express";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { connectToDatabase } from "./db";

dotenv.config();

const app = express();
app.use(express.json());


/* `connectToDatabase()` is a function that connects to a MongoDB database using Mongoose. The code
block following it is a promise chain that logs a success message to the console if the connection
is successful, and logs an error message if the connection fails. */
connectToDatabase()

// Define user schema
const userSchema = new mongoose.Schema({
  email: { type: String, unique: true },
  password: String,
});

// Create a new collection called 'users'
const User = mongoose.model("User", userSchema, "users");

// Sign up route
/* This code block defines a route for signing up a new user. It listens for a POST request to the
"/signup" endpoint and expects the request body to contain an email and password. */
app.post("/signup", async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    // Check if the email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "Email already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({ email, password: hashedPassword });
    await newUser.save();

    return res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Server error" });
  }
});

// Login route
/* This code block defines a route for logging in a user. It listens for a POST request to the "/login"
endpoint and expects the request body to contain an email and password. It then checks if the user
exists in the database and if the password provided matches the hashed password stored in the
database. If the user is authenticated, it generates an access token and a refresh token using the
`jsonwebtoken` library and returns them in the response. If there is an error, it returns a 401 or
500 status code with an error message. */
app.post("/login", async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    // Check if the user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    // Check if the password is correct
    const isPasswordValid = await bcrypt.compare(password, user.password ?? "");
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    // Generate access token
    const accessToken = jwt.sign(
      { userId: user._id },
      process.env.ACCESS_TOKEN_SECRET!,
      { expiresIn: "120s" }
    );
    const refreshToken = jwt.sign(
      { userId: user._id },
      process.env.REFRESH_TOKEN_SECRET!
    );

    return res.status(200).json({ accessToken, refreshToken });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Server error" });
  }
});

// Delete user route
app.delete('/user/:id', async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    await User.findByIdAndDelete(id);
    return res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Server error' });
  }
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
