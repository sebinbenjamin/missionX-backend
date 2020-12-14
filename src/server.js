const express = require('express');
const cors = require('cors');

// Loads environment variables from a '.env' file stored in the project root
// and makes it available in 'process.env' object
// https://www.npmjs.com/package/dotenv
require('dotenv').config();

const { port } = require('./config');

const { connect } = require('./db');
const { errorHandler, simpleLogger } = require('./middlewares');
const projectRouter = require('./routes/project.routes');
const userRouter = require('./routes/user.routes');

// Init express
const app = express();
app.use(express.json());
app.use(cors()); // https://auth0.com/blog/cors-tutorial-a-guide-to-cross-origin-resource-sharing/

// A simple Logger middleware
app.use(simpleLogger);

// Register Routers
app.use('/api/project', projectRouter);
app.use('/api/user', userRouter);

// 404 error
app.all('*', (req, res, next) => {
  const err = new HttpException(404, `Endpoint ${req.url} Not Found`);
  next(err);
});

// Error middleware - placed last, after all other middle wares and route handlers
app.use(errorHandler);

// Starting the server after connecting to DB
const startServer = async () => {
  try {
    await connect();
    app.listen(port, () => console.log(`🚀 Server running on port ${port}!`));
  } catch (e) {
    console.error(e);
  }
};

startServer();
