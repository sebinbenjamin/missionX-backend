const mysql = require('mysql2/promise');
const { config } = require('../config/db.config');

let pool = null;
let isConnected = false;

const connect = async () => {
  const poolConfig = {
    ...config,
    connectionLimit: 3,
    queueLimit: 5,
  };
  pool = await mysql.createPool(poolConfig);
  isConnected = true;
  setListeners(pool);
};

const getPool = async () => {
  // Go through an infinite loop until connected :( 
  while (!isConnected) {
    await new Promise((_) => setTimeout(_, 2000));
  }
  if (isConnected) return pool;
};

const setListeners = (pool) => {
  // Event when a new connection is made within the pool
  pool.on('enqueue', () => {
    console.log('Waiting for available connection slot');
  });

  // Event when a callback has been queued to wait for an available connection.
  pool.on('acquire', (connection) => {
    console.log('Connection %d acquired', connection.threadId);
  });

  // Called after all release activity has been performed on the connection
  pool.on('release', (connection) => {
    console.log('Connection %d released', connection.threadId);
  });
};

module.exports = { connect, getPool };
