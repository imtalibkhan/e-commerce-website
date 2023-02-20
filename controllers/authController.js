import userModel from "../models/userModel.js";
import { hashPassword } from "../helper/authHelper.js";

export const registerController = async (req, res) => {
  try {
    const { name, email, password, phone, address } = req.body;
    //validation
    if (!name) {
      return res.send({ error: "Name is require" });
    }
    if (!email) {
      return res.send({ error: "password is require" });
    }
    if (!password) {
      return res.send({ error: "password is require" });
    }
    if (!phone) {
      return res.send({ error: "phone is require" });
    }
    if (!address) {
      return res.send({ error: "address is require" });
    }

    //existing user
    const existingUser = await userModel.findOne({ email });

    if (existingUser) {
      return res.status(200).send({
        success: true,
        message: "Already register please log in",
      });
    }

    //register user and need to hash the password

    const hashedPassword = await hashPassword(password);
    //save
    const user = await new userModel({
      name,
      email,
      phone,
      address,
      password: hashedPassword
    }).save()

    res.status(201).send({
      success: true,
      message: "user Register Successfully ",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Registration",
      error,
    });
  }
};
