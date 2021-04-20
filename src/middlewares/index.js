const errorHandler = (err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }
  res.status(500);
  res.render('error', { error: err });
};

/**
 * Alternatively, you could use something more advanced like Morgan.
 * Morgan is a popular HTTP request middleware logger for Node.js
 * It has several pre-defined log output formats that are commonly used.
 * https://www.npmjs.com/package/morgan#predefined-formats
 * */ 
const simpleLogger = (req, res, next) => {
  console.log(
    `Request Received: ${req.method} ${req.url}`,
    new Date().toISOString(),
  );
  next();
};

/**
 * Cross-Origin Resource Sharing (CORS) is a security mechanism 
 * which describes which origins (servers/clients) are permitted 
 * to read information. It is basically an access control mechanism.
 * This middleware basically allows everything to simplify things for the demo.
*/
const allowCORS = (req, res, next) => {
  const origin = req.get('origin');
  res.header("Access-Control-Allow-Origin", origin);
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
};

module.exports = { errorHandler, simpleLogger, allowCORS };
