//Imports
import express from "express";
import cors from "cors";
const morgan= require("morgan");
require("dotenv").config();
import fs from "fs";
import mongoose from "mongoose";
import csrf from "csurf";
import cookieParser from "cookie-parser"; 

const csrfProtection = csrf({ cookie: true });
//create an app
const app= express() 
//Database 
mongoose.connect(process.env.DATABASE,{
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(()=>console.log("Database has been connected"))
.catch((error)=>console.log(`Error in database ${error}`))


//Apply middleware functions  

app.use(cors());
app.use(express.json({limit:"20mb"}));
app.use(cookieParser());
app.use(morgan("dev"));
app.use((req,res,next)=>{
    console.log("This is our own middleware")
    next()
})


//routes
fs.readdirSync("./routes").map((r)=>{
    app.use("/api",require(`./routes/${r}`))

}); 


app.use(csrfProtection);

app.get("/api/csrf-token", (req, res) => {
  res.json({ csrfToken: req.csrfToken() });
});



//Port
const port=process.env.PORT || 8000;

//Listen
app.listen(port,()=> console.log(`Server is running at port ${port}`));

