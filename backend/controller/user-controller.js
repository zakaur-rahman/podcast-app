import User from "../model/user.js";
import bcrypt from "bcrypt";
import createHttpError from "http-errors";
import {sendMail} from "../utils/sendMail.js"
//import client from "../database/redis.db.js";
import { joiSchemaSignup, joiSchemaLogin } from "../tools/validation-schema.js";
import {
  signAccessToken,
  signRefreshToken,
  verifyRefreshToken,
} from "./jwt-controller.js";

import jwt from "jsonwebtoken"

export const signupUser = async (req, res, next) => {
  try {
    console.log(req.body);
    const result = await joiSchemaSignup.validateAsync(req.body);
    const doesExist = await User.findOne({ email: result.email });
    if (doesExist) {
      throw createHttpError.Conflict(`Email already exists`);
    }

    const user = {
      name: result.name,
      email: result.email,
      password: result.password,
    };


    const activationToken = createActivationToken(user);
    const activationUrl = `http://localhost:3000/activation/${activationToken}`;


    try {
      await sendMail({
        email: user.email,
        subject: "Activate your account",
        message: `Hello ${user.name}, please click on the link to activate your account: ${activationUrl}`,
      });
      res.status(200).json({
        success: true,
        message: `please check your email:- ${user.email} to activate your account!`,
      });
    } catch (error) {
      console.log(error);
      return next(createHttpError.InternalServerError());
    }


    /*const savedUser = await user.save();
     const accessToken = await signAccessToken(savedUser.id);
    const refreshToken = await signRefreshToken(savedUser.id);
    res
      .status(200)
      .json({ accessToken: accessToken, refreshToken: refreshToken }); */
  
    } catch (error) {
    if (error.isJoi === true) error.status = 422;
    next(error);
  }
};

export const loginUser = async (req, res, next) => {
  try {
    const result = await joiSchemaLogin.validateAsync(req.body);
    const user = await User.findOne({ email: result.email });
    if (!user) {
      throw createHttpError.NotFound("User not Found.");
    }
    const isValidated = await bcrypt.compare(result.password, user.password);

    if (!isValidated) {
      throw createHttpError.Unauthorized("Invalid Credentials");
    }

    const accessToken = await signAccessToken(user.id);
    const refreshToken = await signRefreshToken(user.id);
    res
      .status(200)
      .json({ accessToken: accessToken, refreshToken: refreshToken, name: user.name, email: user.email });
  } catch (error) {
    if (error.isJoi === true)
      return next(createHttpError.BadRequest("Invalid Email or Password."));
    next(error);
  }
};

export const newAccessToken = async (req, res, next) => {
  try {
    const { refreshToken } = req.body;
    console.log(refreshToken);

    if (!refreshToken) throw next(createHttpError.BadRequest());
    const userId = await verifyRefreshToken(refreshToken);

    const accessToken = await signAccessToken(userId);
    const newRefreshToken = await signRefreshToken(userId);
    res
      .status(200)
      .json({ accessToken: accessToken, refreshToken: newRefreshToken });
  } catch (err) {
    next(err);
  }
};


export const logoutUser = async (req, res, next) => {
  try {
    const { refreshToken } = req.body;
    if (!refreshToken) throw next(createHttpError.BadRequest());
    const userId = await verifyRefreshToken(refreshToken);

    //await client.del(`${userId}`);
    res.sendStatus(204);
  } catch (err) {
    next(createHttpError.InternalServerError());
  }
};



// Function to create activation token
const createActivationToken = (user) => {
  return jwt.sign(user, process.env.ACTIVATION_SECRET, {
    expiresIn: "5m",
  });
};

// Create activation token
export const activateAccount = async (req, res, next) => {
  try {
    const { activation_token } = req.body;
    const newUser = jwt.verify(activation_token, process.env.ACTIVATION_SECRET);
    if (!newUser) {
      throw createHttpError.Unauthorized("Link expired!");
    }
    // Update user status and save it in database
    const { name, email, password} = newUser;
    const existingUser = await User.findOne({email})
    if(existingUser){
      throw createHttpError.Conflict(`Email already exists`);
    }

    const hashedPassword = bcrypt.hashSync(password, 10);
    const user = await User.create({
      name: name,
      email: email,
      password: hashedPassword,
    });
    const accessToken = await signAccessToken(user.id);
    const refreshToken = await signRefreshToken(user.id);
    res
      .status(200)
      .json({ accessToken: accessToken, refreshToken: refreshToken, name: user.name, email: user.email });
    console.log(user);
  } catch (error) {
    next(createHttpError.InternalServerError());
  }
};