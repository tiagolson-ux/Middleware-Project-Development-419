// Note to self: This model stores users and hashes passwords automatically before saving.

const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    // Note to self: username is required for display/logins
    username: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 50,
    },

    // Note to self: email must be unique so no duplicate accounts
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, "Please provide a valid email address"],
    },

    // Note to self: we store the hashed password (never plain text)
    password: {
      type: String,
      required: true,
      minlength: 8,
    },
  },
  { timestamps: true }
);

// Note to self: before saving, hash password only if it was created/changed
userSchema.pre("save", async function (next) {
  try {
    if (!this.isModified("password")) return next();

    const saltRounds = 10;
    const hashed = await bcrypt.hash(this.password, saltRounds);

    this.password = hashed;
    return next();
  } catch (err) {
    return next(err);
  }
});

// Note to self: helper method to compare a plain password with the stored hash
userSchema.methods.comparePassword = async function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model("User", userSchema);
