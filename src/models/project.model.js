const { getPool } = require('../db');
const pool = getPool();

const getAllProjects = (countryCode) => {
  // When using prepared statements, if you execute same statement again, it will be picked from a LRU cache
  // which will save query preparation time and give better performance

  return pool.then(async (connection) => {
    // Rows and fields are returned, we take only rows now.
    const [rows,] = await connection.execute(
      'SELECT * FROM demo.countryLanguage where CountryCode = ?;',
      [countryCode],
    );
    return rows;
  });
};

module.exports = { getAllProjects };
