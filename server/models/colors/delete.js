// Local import
const db = require('../../db');
const sQuery = require('../../db/colors/delete');

module.exports = (params, cb) => {
  db.query(sQuery, params, (err, rows) => { cb(err, rows); })
};
