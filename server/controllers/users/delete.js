// Local import
const model = require('../../models/users/delete');

module.exports = (req, res) => {
  model(req.body.user_id, (err, rows) => {
    if (err) throw err;
    else res.status(200).end('selected user is deleted');
  })
};
