// Global import
const mysql = require('mysql');

// Local import
const { user, password, database } = require('../../config');

const db = mysql.createConnection({ user, password, database });
db.connect((err) => {
  if (err) console.log('[database  ] need mysql.server start...') 
  else console.log('[database  ] connected to mysql server...');
});

module.exports = db;
