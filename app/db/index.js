const { Pool } = require('pg');

// DB Connect String
const config = {
  user: 'postgres_user',
  host: 'postgis',
  database: 'postgres_db',
  password: 'postgres_pw',
  port: 5432,
};
const pool = new Pool(config);

module.exports = {
  query: (text, params, callback) => {
    return pool.query(text, params, callback);
  },
};
