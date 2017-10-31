var express = require('express');
var router = express.Router();
const GET_USERS = require('./genericRequest').getUsers;

/* GET users listing. */
router.get('/', function(req, res, next) {
  GET_USERS((users, err) => {
    if (err) {
      res.send(err);
    } else {
      res.render('users', { users: users });
    }
  });
});

module.exports = router;
