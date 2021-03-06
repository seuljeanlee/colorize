// Global import
const jwt = require('jsonwebtoken');

// Local import
const model = require('../../models/reviews/get');

module.exports = {
  info: (req, res) => {
    var userMail = '';
    if (req.headers.token) {
      userMail = jwt.verify(req.headers.token, 'jwt-secret').userMail;
    } else {
      userMail = 'admin@code.com';
    }
    const params = [userMail, req.query.color_id];
    model.info(params, (err, rows) => {
      if (err) throw err;
      else res.send(rows);
    });
  },
  
  list: (req, res) => {
    var userMail=''

    if(req.headers.token){
      userMail = jwt.verify(req.headers.token, 'jwt-secret').userMail;
    } else {
      userMail = 'admin@code.com';
    }
    const params = [req.query.color_id, userMail];

    model.list(params, (err, rows) => {
      if (err) throw err;
      else res.send(rows);
    })
  },

  rank: (req, res) => {
    var userMail = ''

    if (req.headers.token) {
      userMail = jwt.verify(req.headers.token, 'jwt-secret').userMail;
    } else {
      userMail = 'admin@code.com';
    }
  
    const params = [req.query.color_id, userMail];

    
    model.rank(params, (err, rows) => {
      if (err) throw err;
      else res.send(rows);
    })
  },

  user: (req, res) => {

    const userMail = jwt.verify(req.headers.token, 'jwt-secret').userMail;

    model.user(userMail, (err, rows) => {
      if (err) throw err;
      else res.send(rows);
    })
  }
};
