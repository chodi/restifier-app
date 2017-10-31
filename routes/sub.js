var express = require('express');
var router = express.Router();
const Request = require('./genericRequest');

/* GET users listing. */
router.get('/', function(req, res, next) {
  Request.getUsers((users, err) => {
    if (err) {
      res.send(err);
    } else {
      res.render('UserToEdit', { users: users });
    }
  });
});

/* GET user to EDIT. */
router.get('/:id', function(req, res, next) {
  Request.getUser(req.params.id, (user, err) => {
    if (err) {
      res.send(err);
    } else {
      res.render('edit_user', { user });
    }
  });
});

///edit/:id

/* POST user to EDIT. */
router.post('/edit/:id', function(req, res, next) {
  Request.postUpdateSub(req.params.id, req.body, (user, err) => {
    if (err) {
      res.send(err);
      return
    } else {
      res.render('edit_user', { user });
      return
    }
    res.redirect('/sub')
  });
});


/* GET user to EDIT. */
router.get('/update/:id', function(req, res, next) {
  Request.getUser(req.params.id, (user, err) => {
    if (err) {
      res.send(err);
    } else {
      res.render('update_user_profile', { user });
    }
  });
});


/* POST user to EDIT. */
router.post('/editUser/:id', function(req, res, next) {
  Request.updateUser(req.params.id, req.body, (user, err) => {
    if (err) {
      res.send(err);
      return
    } else {
      console.log("returned VALUE @@@@@", user)
      res.render('edit_user', { user });
      return
    }
    res.redirect('/sub')
  });
});



/* PATCH SUB user. */
router.get('/patch/:id', function(req, res, next) {
  Request.patchUpdateSub(req.params.id, req.params, (user, err) => {
    if (err) {
      res.send(err);
    } else {
      res.render('UserToEdit', { user });
    }
  });
});

module.exports = router;
