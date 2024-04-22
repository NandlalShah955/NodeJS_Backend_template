import UserDataModel from "../models/usermodel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

class UserController {
  // Function for Registering the User in the database
  static userRegistration = async (req, res) => {
    // return false;
    const { first_name, last_name, email, mobile, gender, password } = req.body;
    const user = await UserDataModel.findOne({ email: email });
    if (user) {
      res
        .status(400)
        .send({ status: "failed", message: "Email already exists" });
    } else {
      if (first_name && email && password ) {
          try {
            const salt = await bcrypt.genSalt(10);
            const hashPassword = await bcrypt.hash(password, salt);
            const doc = new UserDataModel({
              first_name: first_name,
              last_name: last_name,
              email: email,
              mobile: mobile,
              gender: gender,
              password: hashPassword,
            });
            await doc.save();
            let saved_user = await UserDataModel.findOne({ email: email });
            const secret = saved_user._id + process.env.JWT_SECRET_KEY;
            const vefication_token = jwt.sign(
              { userID: saved_user._id },
              secret,
              {
                expiresIn: "1d",
              }
            );
            const link = `${Url}verifyAccount/${saved_user._id}/${vefication_token}`;
            // Generate JWT Token
            const token = jwt.sign(
              { userID: saved_user._id },
              process.env.JWT_SECRET_KEY,
              { expiresIn: "5d" }
            );
            sendEmail(
              email,

              "Account Registration Successful",
              `Greetings,<br/><br/>
                   ${first_name} ${last_name}, Your account has been successfully created. Please click on the link to verify your account. <a href=${link}>${Url}</a> `
            );

            res.status(201).send({
              status: "success",
              message: "Registration Success",
              token: token,
            });
            await UserActivityModel.create({
              tenantid: saved_user._id,
            });
            // For Sending Details to Wordpress site
            await RegisterApi(req, saved_user);
          } catch (error) {
            console.log(error);
            res
              .status(400)
              .send({ status: "failed", message: "Unable to Register" });
          }
      } else {
        res.send({ status: "failed", message: "All fields are required" });
      }
    }
  };

  // Function for Login of the User
  static userLogin = async () => {};
}

export default UserController;
