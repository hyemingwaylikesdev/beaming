const { default: mongoose } = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    maxLength: 50,
  },
  email: {
    type: String,
    trim: true,
    unique: true,
  },
  password: {
    type: String,
    minlength: [5, "Password must be at least 5 characters long."],
  },
  role: {
    type: Number,
    default: 0,
  },
  image: String,
});

const User = mongoose.model("User", userSchema);

module.exports = User;
