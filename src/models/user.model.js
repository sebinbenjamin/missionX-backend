const { getPool } = require('../db');
const pool = getPool();

/**
 CREATE TABLE `demo`.`users` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(90) NOT NULL,
  `email` VARCHAR(255) NOT NULL,
  `password` CHAR(60) NOT NULL,
  PRIMARY KEY (`id`));
*/

const register = (name, email, passwordHash) => {
  return pool.then(async (connection) => {
    const [
      rows,
    ] = await connection.execute(
      'INSERT INTO `demo`.`users` (`name`,`email`,`password`) VALUES (?, ?, ?);',
      [name, email, passwordHash],
    );
    return rows;
  });
};

const getPassword = (email) => {
  return pool.then(async (connection) => {
    const [
      rows,
    ] = await connection.execute(
      'SELECT `users`.`password` FROM `demo`.`users` WHERE `users`.`email` = ?;',
      [email],
    );
    return rows;
  });
};

module.exports = { registerUser: register, getPassword };
