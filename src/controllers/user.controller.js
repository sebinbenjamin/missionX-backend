const { resultToJSON, getSaltedHash, checkPassword } = require('../utils');
const { getPassword, registerUser } = require('../models/user.model');

jsonResult = {};

const login = async (req, res) => {
  const { email, password } = req.body;
  // Gets the password for a particular email id.
  const queryResult = await getPassword(email);
  const jsonResult = resultToJSON(queryResult);
  if (jsonResult.length === 0) {
    res.status(401).send('Could not find a user with the provided email id');
  } else {
    const [{ password: passwordHash }] = jsonResult;
    const isValidPassword = checkPassword(password, passwordHash);
    if (isValidPassword) {
      res.status(200).send('Successfully logged in user!');
    } else {
      res.status(401).send('Invalid password.');
    }
  }
};

const register = async (req, res) => {
  const { name, email, password } = req.body;
  const passwordHash = getSaltedHash(password);
  console.log(passwordHash);
  const queryResult = await registerUser(name, email, passwordHash);
  res.status(200).json(queryResult);
};

const resetPassword = async (req, res) => {
  const { email, oldPassword, newPassword } = req.body;
  console.log({ email, oldPassword, newPassword });

  if (oldPassword === newPassword) {
    res.status(200).send('Password reset successfully');
  } else {
    res.status(400).send('Mismatch ! Please check your password.');
  }
};

module.exports = { login, register, resetPassword };
