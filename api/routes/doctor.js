import express from "express"
const router= express.Router()

import {applydoctor,markasallcompleted,deleteall,alldoctor,approvedoctor,allapproveddoctor,doctorbyid} from "../controllers/doctor"



import { requireSignin,isAdmin } from "../middlewares";

router.post("/applydoctor",requireSignin,applydoctor);
router.get("/markasallcompleted",requireSignin,markasallcompleted);
router.get("/deleteall",requireSignin,deleteall);
router.get("/alldoctor",requireSignin,alldoctor);
router.post("/approvedoctor",requireSignin,approvedoctor);
router.get("/Doctorapproved",allapproveddoctor);
router.post("/doctorbyid",requireSignin,doctorbyid);


module.exports=router;



