const bcrypt = require('bcrypt');

const getSaltedHash = (password) => {
  // genSaltSync - Generates the salt value used for hashing
  const salt = bcrypt.genSaltSync(5);
  try {
    return bcrypt.hashSync(password, salt);
  } catch (err) {
    console.log('Error', err);
    return err;
  }
};

// Compares the password sent in the login API and the one in the database 
const checkPassword = (password, hash) => {
  return bcrypt.compareSync(password, hash);
};

module.exports = { getSaltedHash, checkPassword };
