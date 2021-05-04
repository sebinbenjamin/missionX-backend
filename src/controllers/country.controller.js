const { resultToJSON } = require('../utils');
const { getCountries, getCountryWithCode } = require('../models/country.model');

// The login controller which is called when we localhost:4000/api/country
const getAllCountries = async (req, res) => {
  try {
    const queryResult = await getCountries();
    const jsonResult = resultToJSON(queryResult);
    res.send(jsonResult);
  } catch (error) {
    console.log(error);
  }
};

// The login controller which is called when we localhost:4000/api/country/:code
const getCountry = async (req, res) => {
  const { code } = req.params;
  try {
    const queryResult = await getCountryWithCode(code);
    const jsonResult = resultToJSON(queryResult);
    res.send(jsonResult);
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getAllCountries,
  getCountry,
};

// const login = async (req, res) => {
//   const { email, password } = req.body;
//   // Gets the password for a particular email id.
//   // getPassword here is running the DB query and returning the result to the controller here.
//   try {
//     const queryResult = await getPassword(email);
//     const jsonResult = resultToJSON(queryResult);
//   } catch (error) {
//     console.log(error);
//   }

//   if (jsonResult.length === 0) {
//     res.status(401).send('Could not find a user with the provided email id');
//   } else {
//     const [{ password: passwordHash }] = jsonResult;
//     const isValidPassword = checkPassword(password, passwordHash);
//     if (isValidPassword) {
//       res.status(200).send('Successfully logged in user!');
//     } else {
//       res.status(401).send('Invalid password.');
//     }
//   }
// };
