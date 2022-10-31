import Userecomerce from "../models/user"
import Doctor from "../models/doctor"

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

export const applydoctor= async (req,res)=>{
    //Get data from request
    req.body.id=req.auth._id
    console.log(req.body)
      try{
            const CreatedDoctor=  new Doctor(req.body);

        await CreatedDoctor.save()
        const adminuser= await Userecomerce.findOne({role: "admin"}) 
        let unseenmessages=adminuser.unseenmessages

        unseenmessages.push({
          type:"Doctor request",
          data:{
            message: `${CreatedDoctor.name} has been applied for Doctor`,
            name:CreatedDoctor.name,
            id:CreatedDoctor._id,
          },
          onClickPath:"/admin/doctors" 
        })
        adminuser.save()



        console.log("Saved doctor is", CreatedDoctor);
        return res.status(200).json({success:true,doctor:CreatedDoctor})
    }

    catch(err){
        console.log(err.message)
        return res.status(400).send("Sign Up failed! Try again")
    }
};
export const alldoctor= async (req,res)=>{
  try {
    const alldoctors= await Doctor.find({})
     return res.json(alldoctors)
    
  } catch (error) {
    return res.json("alldoctors not found")
    
  }
}
export const markasallcompleted= async (req,res)=>{
    try{
      const user= await Userecomerce.findById(req.auth._id)
      let unseenmessages= user.unseenmessages
      let seenmessages= user.seenmessages
      
      seenmessages.push(...unseenmessages)
      unseenmessages=[]
      user.seenmessages= seenmessages
      user.unseenmessages= unseenmessages
      user.save()   
      return res.status(200).json({
        user:user,
        success:true,
      })
  }

  catch(err){
      console.log(err.message)
      return res.status(400).send("Try again")
  }
};
export const deleteall= async (req,res)=>{
  try{
    const user= await Userecomerce.findById(req.auth._id)
    user.seenmessages= []
    user.unseenmessages= []
    user.save()   
    return res.status(200).json({
      user:user,
      success:true,
    })
}

catch(err){
    console.log(err.message)
    return res.status(400).send("Try again")
}
};
export const approvedoctor= async (req,res)=>{

  const {doctorId} = req.body


  try {
    const doctorapprove= await Doctor.findById(doctorId)
    doctorapprove.status="approved"
    doctorapprove.save()
    const sendmessagetouser= await Userecomerce.findById(doctorapprove.id)
    sendmessagetouser.isDoctor=true


    sendmessagetouser.unseenmessages.push({
      data:{
        type: "new-doctor-request-changed",
        message: `Your doctor account has been approved`,
      }
    }) 

    sendmessagetouser.save()
    return res.status(200).json({
      doctor:doctorapprove,
      user:sendmessagetouser
      })
  } catch (error) {
    return res.json("Error")
    
  }
}


export const allapproveddoctor= async (req,res)=>{
  try {
    const alldoctors= await Doctor.find({status:"approved"}).populate("id")
     return res.json(alldoctors)
    
  } catch (error) {
    return res.json("allapproveddoctor not found")
    
  }
}

export const doctorbyid= async (req,res)=>{
  try {
    const doctorbyid= await Doctor.find({_id:req.body.doctorID}).populate("id")
     return res.json(doctorbyid)
    
  } catch (error) {
    return res.json("doctorbyid not found")
    
  }
}