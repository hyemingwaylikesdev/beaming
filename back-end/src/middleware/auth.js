const jwt = require("jsonwebtoken");
const User = require("../models/user");

let auth = async (req, res, next) => {
  // 토큰을 request headers에서 가져오기
  const authHeader = req.headers["authorization"];

  // Bearer ooerkogkeorkgoek.erogkoerkog.eorgkoerkgoerkgokg
  const token = authHeader && authHeader.split(" ")[1];
  if (token === null) return res.sendStatus(401);

  try {
    // 토큰이 유효한 토큰인지 확인
    const decode = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findOne({ _id: decode.user.id });
    if (!user) {
      return res.status(400).send("no find user");
    }

    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = auth;
