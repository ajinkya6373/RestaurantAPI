import express from 'express';
import { login, signup } from '../controllers/user.controller.js';

const userRouter = express.Router();

userRouter.post('/signup', async (req, res) => {
  try {
    const userData = req.body;
    const newUser = await signup(userData);
    res.status(201).json({ message: 'Signup successful.', user: newUser });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

userRouter.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await login(email, password);
    res.status(200).json({ message: 'Login successful.', user });
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
});

export default userRouter;
