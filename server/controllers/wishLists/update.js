// Local import
const model = require('../../models/wishLists/update');

module.exports = (req, res) => {
  const {user_id, color_id} = req.body;
  const params = [user_id, color_id];

  model(params, (err, rows) => {
    if (err) throw err;
    else res.status(200).send(rows);
  })
};
