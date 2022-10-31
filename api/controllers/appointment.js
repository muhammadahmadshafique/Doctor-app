import Userecomerce from "../models/user"
import Doctor from "../models/doctor"
import Appointment from "../models/appointment"
import moment from "moment";
import { hashpassword, comparepassword } from '../utils/auth'
import jwt from "jsonwebtoken"
import AWS from "aws-sdk";
import { nanoid } from 'nanoid'
const multer = require('multer');
const path = require('path');
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

export const appointmentcreated = async (req, res) => {
    //Get data from request
   
    try {

        const doctorbyid= await Doctor.findById(req.body.doctorID).populate("id")

        const singleuser= await Userecomerce.findById(req.auth.id)
        console.log(singleuser,'singleusersingleusersingleusersingleuser')

        const Doctoruser= await Userecomerce.findById(doctorbyid.id._id)

        console.log(Doctoruser,'DoctoruserDoctoruserDoctoruserDoctoruser')
        

        console.log(singleuser.name,singleuser._id,doctorbyid.name,doctorbyid._id,'letsscheck')


        const CreatedAppointment = new Appointment({
            userwhobook:{
                namewhobook:singleuser.name,
                idwhobook:singleuser._id
            },
            doctorwhowasbooked:{
                nameofdoctorwhowasbooked:doctorbyid.name,
                idofdoctorwhowasbooked:doctorbyid._id
            },
            dateofbooking:req.body.dateofappointment,
            timeofbooking:req.body.timeofappointment  
        });

        await CreatedAppointment.save()

        Doctoruser.unseenmessages.push({
            data:{
              type: "Appontment request",
              message: `Appointment is booked by ${singleuser.name}`,
            }
          }) 
          Doctoruser.save()
        return res.status(200).json({ success: true, CreatedAppointment: CreatedAppointment })
    }

    catch (err) {
        console.log(err.message)
        return res.status(400).send(" Try again")
    }
};

export const checkavailbility= async (req, res) => { 

    try {
    const date = moment(req.body.dateofappointment, "DD-MM-YYYY").toISOString();
    
    const fromTime = moment(req.body.timeofappointment, "HH:mm").subtract(1, "hours").toISOString();
    const toTime = moment(req.body.timeofappointment, "HH:mm").add(1, "hours").toISOString();
    const doctorId = req.body.doctorID;
    const appointments = await Appointment.find(
        { 'doctorwhowasbooked.idofdoctorwhowasbooked': doctorId,
        dateofbooking:req.body.dateofappointment,
        // timeofbooking: { $gte: fromTime, $lte: toTime },

    }
    );
    console.log(appointments.length,'appointmentsappointments')
    return
    
    if (appointments.length > 0) {
        return res.status(200).json({
          message: "Appointments not available",
          success: false,
        });
      } 
      if (appointments.length === 0) {
        return res.status(200).json({
          message: "Appointments available",
          success: true,
        });
      } 
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Error booking appointment",
      success: false,
      error,
    });
  }

}

export const appointmentbyid = async (req, res) => {
    
  try {

    const appointmentofusers = await Appointment.find({
      'userwhobook.idwhobook': req.auth.id,
    });
    return res.json({ success: true, appointmentofusers:appointmentofusers });

  } catch (err) {
    return res.json({ Error: "error" });
    console.log(err);

  }
};

export const getpatientsappointments = async (req, res) => {
    
  try {

    const doctorfind= await Doctor.find({
      id:req.auth.id
    })

     console.log(doctorfind[0]._id,'This is doctor')

    const getpatientsappointments = await Appointment.find({
      'doctorwhowasbooked.idofdoctorwhowasbooked': doctorfind[0]._id,
    });

    console.log(getpatientsappointments)

    
    return res.json({ success: true, getpatientsappointments});

  } catch (err) {
    return res.json({ Error: "error" });
    console.log(err);

  }
};

export const changestatusofappointment = async (req, res) => {

  try {
    const { appointmentId, status } = req.body;
    const appointment = await Appointment.findByIdAndUpdate(appointmentId, {
      statusofappointmentSchema:'Approved',
    });
    const appointmentokk = await Appointment.findById(appointmentId);
    console.log(appointmentokk.userwhobook.idwhobook,'Thi isssssssssssssss')

    const sendmessagetouser= await Userecomerce.findById(appointmentokk.userwhobook.idwhobook)


    sendmessagetouser.unseenmessages.push({
      data:{
        type: "appointment",
        message: `Your appointment has been approved`,
      }
    }) 

    sendmessagetouser.save()
    return res.status(200).json({
      success:true,
      })
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Error changing appointment status",
      success: false,
      error,
    });
  }


}