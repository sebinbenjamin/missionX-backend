const { resultToJSON, getSaltedHash, checkPassword } = require('../utils');
const {
  getPassword,
  registerUser,
  updateBLOB,
  getUserProfilePic,
} = require('../models/user.model');

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

const getProfilePic = async (req, res) => {
  const { id } = req.body;
  const queryResult = await getUserProfilePic(id);
  const jsonResult = resultToJSON(queryResult);

  const { image, mimeType } = jsonResult[0];
  const encoding = 'base64';
  // data:[<mime type>][;charset=<charset>][;base64],<encoded data>
  const uri = `data:${mimeType};${encoding},${image}`;
  res.status(200).send({ dataURI :  uri});
};

const uploadProfilePic = async (req, res) => {
  const { buffer, mimetype } = req.file;
  if (!buffer) {
    const error = new Error('Error uploading file');
    res.status = 400;
    return next(error);
  }

  // Everything went fine
  const queryResult = await updateBLOB(buffer.toString('base64'), mimetype);
  res.status(200).json(queryResult);
};

module.exports = {
  login,
  register,
  resetPassword,
  uploadProfilePic,
  getProfilePic,
};
