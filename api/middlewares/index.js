// const { expressjwt: jwt } = require("express-jwt");
const jwt = require("jsonwebtoken");

import Userecomerce from "../models/user";

export const requireSignin = async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {

    return res.json("Please Login to access this resource!!!")
  }

  const decodedData = jwt.verify(token, process.env.JWT_SECRET);
  console.log(decodedData._id)
  req.auth = await Userecomerce.findById(decodedData._id); 
  // console.log("middleware",req.auth.toString())

  next(); 
};
// export const requireSignin = jwt({
//   getToken: (req, res) => req.cookies.token,
//   secret: process.env.JWT_SECRET,
//   algorithms: ["HS256"],
// });


export const isAdmin = async (req, res, next) => {
  try {
    const CheckUserecomerce = await Userecomerce.findById(req.auth._id).exec();
    if (!CheckUserecomerce.role.includes("Admin")) {
      return res.json("You are not allowed to access this resouce,Only admin Can access this.");
    } else {
      next();
    }
  } catch (err) {
    console.log(err);
  }
};



