import mongoose from "mongoose";
const { Schema } = mongoose;
const { ObjectId } = Schema;
const userSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
    },
    email: {
      type: String,
      trim: true,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      min: 6,
      max: 64,
    },
    picture: {
      type: {},
      default: "/avatar.png",
    },
    role: {
      type: {},
      default: "user",
    },
    isDoctor: {
      type: Boolean,
      default: false,
    },

    unseenmessages: {
      type: Array,
      default: [],
    },
    seenmessages: {
      type: Array,
      default: [],
    },
   
    passwordResetCode: {
      data: String,
      default: "",
    }, 
  },
  { timestamps: true }
);

export default mongoose.model("Userecomerce", userSchema);
