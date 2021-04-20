const { resultToJSON, getSaltedHash, checkPassword } = require('../utils');
const {
  getPassword,
  registerUser,
  updateBLOB,
  getUserProfilePic,
} = require('../models/user.model');

// The login controller which is called when we localhost:4000/api/user/login
const login = async (req, res) => {
  const { email, password } = req.body;

  // Gets the password for a particular email id.
  // getPassword here is running the DB query and returning the result to the controller here.
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

// (Base64 string + mimeType) => Construct a Image URI => Returned to API called by React frontend
const getProfilePic = async (req, res) => {
  const { id } = req.params;
  const queryResult = await getUserProfilePic(id);
  const jsonResult = resultToJSON(queryResult);

  const { image, mimeType } = jsonResult[0];
  const encoding = 'base64';
  // Data URIs - https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/Data_URIs
  // Structure of the URI || data:[<mime type>][;charset=<charset>][;base64],<encoded data>
  // Example              || data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAABNwAAAKmCAYAA...
  const uri = `data:${mimeType};${encoding},${image}`;
  res.status(200).send({ dataURI: uri });
};

// Multer => a Buffer => Base64 String => Inserted into DB
const uploadProfilePic = async (req, res) => {
  const { buffer, mimetype } = req.file; // Multer puts together the file key with a Array Buffer.
    if (!buffer) {
    const error = new Error('Error uploading file');
    res.status = 400;
    return next(error);
  }

  // Stores the base64 encoded string to the DB
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
