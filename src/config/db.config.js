const config = {
  host: process.env.MYSQL_HOST || 'localhost',
  database: process.env.MYSQL_DB || 'demo',
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  port: Number(process.env.MYSQL_PORT || 3306),
  ssl: {
    ca: Buffer.from(process.env.MYSQL_CERT_BASE64, 'base64').toString('ascii'),
  },
};

module.exports = { config };
