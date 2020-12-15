const { getSaltedHash, checkPassword } = require('./bcrypt');

/**
 * The result of the query method is converted into the normal JSON object using Object.assign method in this method
 * Refer - https://github.com/mysqljs/mysql/issues/1330
 *
 * Returns : An array of JSON objects. 
 *          [{}, {} ... {}]
 *
 */
const resultToJSON = (resultRowsArray) => {
  return resultRowsArray.map((mysqlObj) => Object.assign({}, mysqlObj));
};

module.exports = { resultToJSON, getSaltedHash, checkPassword };
