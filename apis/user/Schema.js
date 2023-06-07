const mongoose = require("mongoose");

const validator = require("validator");
const crypto = require("crypto");
const bcrypt = require("bcryptjs");

const { Schema } = mongoose;

// const tokenSchema = new Schema(
//   {
//     token: String,
//     user: {
//       type: Schema.Types.ObjectId,
//       ref: "users",
//     },
//     IP: String,
//     location: {country : String, city : String},
//     rememberMe: Boolean,
//     expiry: Date,
//   },
//   { timestamps: true, toJSON: { virtuals: true } }
// );

const userSchema = new Schema(
  {
    firstName: {
      type: String,
      required: [true, "First Name is reuired."],
      trim: true,
    },
    lastName: { type: String, trim: true },
    // phone: {
    //   type: String,
    //   index: true,
    //   sparse: true,
    //   unique: [true, "Phone number already exists."],
    // },
    email: {
      type: String,
      required: [true, "Please provide your email."],
      unique: true,
      lowercase: true,
      trim: true,
      validate: [validator.isEmail, "Please provide a valid email."],
    },
    password: {
      type: String,
      required: [true, "Please provide your passowrd."],
      minlength: validator[(8, "Password must be at least 8 characters.")],
      select: false, // by default selectg false.
    },
    confirmPassword: {
      type: String,
      required: [true, "Please confirm your passowrd."],
      validate: {
        // This only works on CREATE and SAVE!!!
        validator: function (el) {
          return el === this.password;
        },
        message: "Passwords do not match.",
      },
    },
    // verified: { type: Boolean, default: false },
    // OTP: String,
  },
  { timestamps: true, toJSON: { virtuals: true } }
);

userSchema.pre("save", async function (next) {
  // creating an encrypted password
  this.password = await bcrypt.hash(this.password, parseInt(process.env.SALT));

  this.confirmPassword = undefined;
  next();
});

userSchema.virtual("fullname", () => {
  return this.firstName + " " + this.lastName;
});

// const Connection = mongoose.model("Connections", tokenSchema);
const User = mongoose.model("User", userSchema, "k_users");

module.exports = { User /* Connection */ };
