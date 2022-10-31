import mongoose from "mongoose";
const { Schema } = mongoose;
const { ObjectId } = mongoose.Schema;

const appointmentSchema = new Schema(
  { 

    userwhobook:{
        
            namewhobook:{
                type:String, 
                required: true,
            },
            idwhobook:{
                type:String, 
                required: true,
            }
    },

    doctorwhowasbooked:{
        nameofdoctorwhowasbooked:{
            type:String, 
            required: true,
        },
        idofdoctorwhowasbooked:{
            type:String, 
            required: true,
        }
},

    dateofbooking:{
        type:String, 
        required: true,
    },

    timeofbooking:{
        type:String, 
        required: true,
    },
    
    statusofappointmentSchema:{
      type: String,
      default: "pending"

    }
  },
  { timestamps: true }
);

export default mongoose.model("Appointment", appointmentSchema);
