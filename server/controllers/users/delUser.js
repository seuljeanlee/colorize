// Local import
const model = require('../../models/users/delUser');

module.exports = function(req, res) {
  console.log('[req.body  ]',req.body);
  console.log(`[controller] received request from client...`);
  
  let userMail = req.body.userMail;
  
  let params = [userMail];

  model(params, function(err, rows) {
    if (err) { throw err }
    else {
      console.log(`[controller] received response from model...`);
      res.end('selected user is deleted');
    }
  })
};
