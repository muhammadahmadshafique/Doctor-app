import Userecomerce from "../models/user"
import {hashpassword,comparepassword} from '../utils/auth'
import jwt from "jsonwebtoken"
import AWS from "aws-sdk";
import { nanoid } from 'nanoid'
const multer = require('multer');
const path = require( 'path' );
const url = require('url');
var multerS3 = require("multer-s3-v2");



const awsConfig = {
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
  apiVersion: process.env.AWS_API_VERSION,
};

const SES = new AWS.SES(awsConfig); 
const S3 = new AWS.S3(awsConfig);


export const signup= async (req,res)=>{
    //Get data from request
    console.log(req.body)
  
    const {name,email,password,picture}=req.body;
    try{
        //Validation
        if(!name) return res.status(400).send("Name is required");
        if(!password || password.length<6) return res.status(400).send("Password is required and should be 6 letter minimum")
        let userExist= await Userecomerce.findOne({email}).exec();
        if(userExist) return res.status(400).send("Email already Taken.")
        //hashPassword 
        const Finalhashpassword= await hashpassword(password);
        //lets register 
        const CreatedUserecomerce=  new Userecomerce({
            name,
            email, 
            password:Finalhashpassword,
            picture
        });

        await CreatedUserecomerce.save()
        console.log("Saved user is", Userecomerce);
        return res.status(200).json({ok:true,message:"This is a test mess"})
    }

    catch(err){
        console.log(err.message)
        return res.status(400).send("Sign Up failed! Try again")
    }
};


export const uploadImage = async (req, res) => {
  // console.log(req.body);
  
  try {
    const { image } = req.body;
    if (!image) return res.status(400).send("No image");

    // prepare the image
    const base64Data = new Buffer.from(
      image.replace(/^data:image\/\w+;base64,/, ""),
      "base64"
    );

    const type = image.split(";")[0].split("/")[1];

    // image params
    const params = {
      Bucket: "edemybucketuettaxila",
      Key: `${nanoid()}.${type}`,
      Body: base64Data,
      ACL: "public-read",
      ContentEncoding: "base64",
      ContentType: `image/${type}`,
    };

    // upload to s3
    S3.upload(params, (err, data) => {
      if (err) {
        console.log(err);
        return res.sendStatus(400);
      }
      console.log(data);
      return res.json({ 
        data
      })
    });
  } catch (err) {
    console.log(err);
  }
};

//Login 
export const signin= async (req,res)=>{
    try{
        // console.log(req.body)
        const { email,password}=req.body;
        //Validation 
    
        if(!password || password.length<6 ){
            return res.status(400).send("Password is required and Password Should be 6 letter minimum! ");

        }
        const CheckUserecomerce = await Userecomerce.findOne({email}).exec();
        if(!CheckUserecomerce) return res.status(400).send("No user found with this email!!");
        
        //CheckPassword 
        const Matchpassword= await comparepassword(password,CheckUserecomerce.password);

        if(Matchpassword){
            //Create a signed Jwt
            const token = jwt.sign({ _id: CheckUserecomerce._id }, process.env.JWT_SECRET, {
              expiresIn: "70d",
            });
            console.log(CheckUserecomerce._id)
            //Send user and jwt token to client without hashed password
            CheckUserecomerce.password=undefined;
            res.cookie("token", token, {
              httpOnly: true,
              // secure: true, // only works on https
            });
        

           res.json(CheckUserecomerce)

        }else{
            return res.status(400).send("Passowrd is incorrect");

        }
    }
    catch(err){
        console.log(err.message);
        return res.status(400).send("Error. Try Again.")
    }
};

export const logout= async(req,res)=>{
    try{
      res.clearCookie('token');
      return res.json({message:"Logout successful"})
    }catch(err){
      return res.status(400).send("Try again")   
    }
  }
  //Current User
  export const currentUser = async (req, res) => {
    
    try {
  
      const Userecomercesssss = await Userecomerce.findById(req.auth._id).select("-password").exec();
      // console.log("CURRENT_USER", user);
      return res.json({ ok: true });
  
    } catch (err) {
      return res.json({ Error: "Not Get current User" });
      console.log(err);
  
    }
  };
  /////////////////////////Forget Paaword
export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    // console.log(email);
    const shortCode = nanoid(6).toUpperCase();
    console.log(shortCode)
    const Userecomerce = await Userecomerce.findOneAndUpdate(
      { email },
      { passwordResetCode: shortCode }
    );
    if (!Userecomerce) return res.status(400).send("User not found");

    // prepare for email
    const params = {
      Source: process.env.EMAIL_FROM,
      Destination: {
        ToAddresses: [email],
      },
      Message: {
        Body: {
          Html: {
            Charset: "UTF-8",
            Data: `
                <html>
                  <h1>Reset password</h1>
                  <p>User this code to reset your password</p>
                  <h2 style="color:red;">${shortCode}</h2>
                  <i>edemy.com</i>
                </html>
              `,
          },
        },
        Subject: {
          Charset: "UTF-8",
          Data: "Reset Password",
        },
      },
    };

    const emailSent = SES.sendEmail(params).promise();
    emailSent
      .then((data) => {
        console.log(data);
        res.json({ Userecomerce: true });
      })
      .catch((err) => {
        console.log(err);
      });
  } catch (err) {
    console.log(err);
  }
};

export const resetPassword = async (req, res) => {
  try {
    const { email, code, newPassword } = req.body;
    // console.table({ email, code, newPassword });
    const hashedPassword = await hashpassword(newPassword);

    const Userecomerce = Userecomerce.findOneAndUpdate(
      {
        email,
        passwordResetCode: code,
      },
      {
        password: hashedPassword,
        passwordResetCode: "",
      }
    ).exec();
    if(Userecomerce){
      res.json({ ok: "Successfully update Password" });

    }else{
      res.json({ ok: "Code is not correct" });

    }
    
  } catch (err) {
    console.log(err);
    return res.status(400).send("Error! Try again.");
  }
};

// Get user 
export const getuser=async (req,res)=>{
  try {
    const getuser= await Userecomerce.findById(req.auth._id)

    res.json(getuser)
    
  } catch (error) {
    res.json("User not fetched")
  }
}
// update User password

export const updateuserpassword=async (req,res)=>{
  try {
    const userpassword= await Userecomerce.findById(req.auth._id)

    if(!userpassword){
      return res.json("User not found")
    }

    // console.log("1st",userpassword.password)
    // console.log("2nt",req.body.oldpassword)
     //CheckPassword 
    //  const Matchpassword= await comparepassword(password,CheckUserecomerce.password);

     const Matchpassword= await comparepassword(req.body.oldpassword, userpassword.password);

    //  console.log("IS IT MATCHED",Matchpassword)

     if(Matchpassword){

      const hashedPassword = await hashpassword(req.body.newpassword);    


      const updatepassword= await Userecomerce.findByIdAndUpdate(req.auth._id,{
        $set: {
          password: hashedPassword,
        }
      },{
        new:true,
    })
    return res.json(updatepassword)

     }else{
      return res.json("Old Password is Wrong")
     }
  } catch (error) {
    res.json("Password not changed")
  }
}

// update Profile

export const userprofileupdated=async (req,res)=>{
  try {
    const userpassword= await Userecomerce.findById(req.auth._id)

    if(!userpassword){
      return res.json("User not found")
    }

    const updateprofile= await Userecomerce.findByIdAndUpdate(req.auth._id,req.body,{
      new:true,
  })

  res.json(updateprofile)
     

  } catch (error) {
    res.json("Profile not Updated")
  }
}

// Get all users(admin)

export const alluser= async (req,res)=>{
  try {
    const allusers= await Userecomerce.find({})
     return res.json(allusers)
    
  } catch (error) {
    return res.json("allusers not found")
    
  }
}

// Get single user (admin)
export const singleuserforadmin= async (req,res)=>{
  try {
    const singleuser= await Userecomerce.findById(req.params.singleuserforadmin)
     return res.json(singleuser)
    
  } catch (error) {
    return res.json("Single User not found")
    
  }
}

// update User Role -- Admin
export const userrolechange=async (req,res)=>{
  try {
    const userpassword= await Userecomerce.findById(req.params.userrolechange)

    if(!userpassword){
      return res.json("User not found") 
    }

    const userrolechanged= await Userecomerce.findByIdAndUpdate(req.params.userrolechange,{
      $set: {
        role: req.body.role,
      }
    },{
      new:true,
  })

  res.json(userrolechanged)
     

  } catch (error) {
    res.json("userrolechange not Updated")
  }
}

//Delete user by admin
export const deleteuser=async (req,res)=>{
  try {
    const userp= await Userecomerce.findById(req.params.deleteuser)

    await userp.remove();

    res.status(200).json({
      success: true,
      message: "User Deleted Successfully",
    });


  } catch (error) {
    return res.json("Not Deletd") 
  }
}


