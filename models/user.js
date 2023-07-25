const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");
const validator = require('validator')

const UserSchema = new mongoose.Schema({
   email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      validate(v) {
         if(!validator.isEmail(v)) {
             throw new Error('Please provide a valid email')
         }
     }
  },
	username: {
      type: String,
      required: true,
      trim: true
  },
	password: {
      type: String,
      trim: true
  }
});

UserSchema.plugin(passportLocalMongoose);

const User = mongoose.model("User", UserSchema);

module.exports = User;