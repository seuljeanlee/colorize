// Local import
const model = require('../../models/colors/get');

module.exports = (req, res) => {
  model((err, rows) => {
    if (err) throw err;
    else res.send(rows);
  })
};
