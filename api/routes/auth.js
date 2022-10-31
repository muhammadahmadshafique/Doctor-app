import express from "express"
const router= express.Router()

import {signup,signin,logout,currentUser,
forgotPassword,resetPassword,
getuser,updateuserpassword,userprofileupdated,alluser,
singleuserforadmin,userrolechange,deleteuser,uploadImage} from "../controllers/auth"



import { requireSignin,isAdmin } from "../middlewares";
router.post("/signup",signup);
router.post("/pic/upload-image", uploadImage);
router.post("/signin",signin); 
router.get("/logout",logout);
router.get("/current-user", requireSignin, currentUser);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);
router.post("/updateuserpassword", requireSignin, updateuserpassword);
router.post("/userprofileupdated", requireSignin, userprofileupdated);
router.get("/getuser", requireSignin, getuser);

router.get("/alluser", requireSignin, alluser);
router.get("/singleuser/:singleuserforadmin", requireSignin,isAdmin, singleuserforadmin);

router.post("/userrolechange/:userrolechange", requireSignin,isAdmin, userrolechange);

router.delete("/deleteuser/:deleteuser", requireSignin,isAdmin, deleteuser);



module.exports=router;



