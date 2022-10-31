import express from "express"
const router= express.Router()

import {appointmentcreated,checkavailbility,appointmentbyid,getpatientsappointments,changestatusofappointment} from "../controllers/appointment"



import { requireSignin,isAdmin } from "../middlewares";

router.get("/getpatientsappointments",requireSignin,getpatientsappointments);

router.post("/appointmentcreated",requireSignin,appointmentcreated);
router.post("/checkavailbility",requireSignin,checkavailbility);
router.get("/appointmentbyid",requireSignin,appointmentbyid);
router.post("/changestatusofappointment",requireSignin,changestatusofappointment);


module.exports=router;



