import UserDataModel from "../models/usermodel.js";
import bcrypt from "brcypt";
import jwt from "jsonwebtoken";

class UserController {
  // Function for Registering the User in the database
  static userRegisteration = async () => {
    const { first_name, last_name, email, mobile, password } = req.body;
  };
  // Function for Login of the User
  static userLogin = async () => {};
}
