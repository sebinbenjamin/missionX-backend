const { getPool } = require('../db');
const pool = getPool();

const getCountries = () => {
  // When using prepared statements, if you execute same statement again, it will be picked from a LRU cache
  // which will save query preparation time and give better performance

  return pool.then(async (connection) => {
    // Rows and fields are returned, we take only rows now.
    const [rows] = await connection.execute(
      'SELECT Name, IndepYear FROM mhq1.country WHERE IndepYear > 1985 AND Continent = "Asia";',
    );
    return rows;
  });
};

const getCountryWithCode = (countryCode) => {
  return pool.then(async (connection) => {
    // Rows and fields are returned, we take only rows now.
    const [rows] = await connection.execute(
      // 'SELECT * FROM mhq1.country WHERE Code = "ABW";',
      'SELECT * FROM mhq1.country WHERE Code = ?;',
      [countryCode]
    );
    return rows;
  });
};

module.exports = { getCountries, getCountryWithCode };
