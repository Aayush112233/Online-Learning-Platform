import jwt from "jsonwebtoken";
import UserModel from "../models/User.js";

const checkAuthUser = async (req, res, next) => {
  let token;
  const { authorization } = req.headers;
  if (authorization && authorization.startsWith("Bearer")) {
    try {
      //get token from header
      token = authorization.split(" ")[1];

      // Token Verification
      const { useremail } = await jwt.verify(token, process.env.JWT_SECRET_KEY);

      if(!useremail){
        res.status(400).json({msg:"Unauthorized user"})
      }
      //Get token from user
      req.user = await UserModel.findOne({ email: useremail }).select(
        "-password"
      );
      next();
    } catch (error) {
      res.status(401).json({ status: "false", msg: "Unauthorized user" });
    }
  }
  if (!token) {
    res.status(400).json({ status: "false", msg: "Unauthorized token" });
  }
};

export default checkAuthUser;
