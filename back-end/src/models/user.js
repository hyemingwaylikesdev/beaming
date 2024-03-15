const { default: mongoose } = require("mongoose");
const bcrypt = require("bcrypt");

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

//! 비밀번호 salt로 암호화
userSchema.pre("save", async function (next) {
  const user = this;
  if (user.isModified("password")) {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(user.password, salt);
    user.password = hash;
  }
  next();
});

userSchema.methods.comparePassword = async function (plainPassword) {
  const match = await bcrypt.compare(plainPassword, this.password);

  return match;
};

const User = mongoose.model("User", userSchema);

module.exports = User;
