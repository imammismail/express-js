const bcrypt = require("bcrypt");

exports.hash = async function (text) {
  let saltRound = 10; //default
  let hashed = await bcrypt.hash(text, saltRound);
  return hashed;
};

exports.validate = async function (plain, hash) {
  let compare = await bcrypt.compare(plain, hash);
  return compare;
};
