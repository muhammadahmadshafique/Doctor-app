import mongoose from "mongoose";
const { Schema } = mongoose;
const { ObjectId } = mongoose.Schema;

const doctorSchema = new Schema(
  { 

    id: {
      type: ObjectId,
      ref: "Userecomerce",
      required: true,
    },
    name: {
      type: String,
      trim: true,
      required: true,
    },
    phoneNumber: {
      type: Number,
      trim: true,
      required: true,
    },
    feeCon: {
      type: Number,
      trim: true,
      required: true,
    },
    timing: {
      type: [],
      required: [true,'Please enter your timing'],
    },
    status:{
      type: String,
      default: "pending"

    }
  },
  { timestamps: true }
);

export default mongoose.model("Doctor", doctorSchema);
