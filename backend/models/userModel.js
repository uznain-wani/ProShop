import _default from "concurrently";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";

//create userschema of dbase
const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
    },
    password: {
      type: String,
    },
    isAdmin: {
      type: Boolean,

      default: false,
    },
  },
  {
    timestamps: true,
  }
);

//for becrytion of enccryted password of dbase inorder to compare with user typed password

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};
// middleware for encrypting password that user types when he registers for saving in dbase
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// create  model from schema now

const User = mongoose.model("User", userSchema); //   created "users" which is the collection name in db  but must be written singular here

export default User;

//now different users will be added into this collection of users in user.js file
