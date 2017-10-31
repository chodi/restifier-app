var express = require('express');
var router = express.Router();
var fetch = require('node-fetch');



/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET create customer page. */
router.get('/create', function(req, res, next) {
  res.render('create', { title: 'CREATE' });
});

/* POST CREATE customer page. */
router.post('/create', function(req, res, next) {
  const params = req.body;
  fetch(`http://localhost:3000/api/v1/Customer`,
  {
    method: 'POST',
    headers: {
      "Content-Type": 'application/json',
    },
    body: JSON.stringify(params),
  })
  .then((res) => {
    return res.json()
  })
  .then ((json) => {
    res.send(json);
  })
});


/* GET LIST customer page. */
router.get('/list', function(req, res, next) {
  fetch(`http://localhost:3000/api/v1/Customer`,
  {
    method: 'GET',
  })
   .then((res) => {
    return res.json()
  })
  .then ((users) => {
    res.render('list', { users });
  })
});


/* Delete user page. */
router.get('/delete', function(req, res, next) {
  fetch(`http://localhost:3000/api/v1/Customer`,
    {
      method: 'GET',
    })
    .then((res) => {
      return res.json()
    })
    .then((jsonFormat) => {
      res.render('delete', { users: jsonFormat });
    })

});

/* REQUEST Delete user. */
router.get('/delete/:user', function(req, res, next) {
  fetch(`http://localhost:3000/api/v1/Customer/${req.params.user}`,
  {
    method: 'DELETE',
  })
  .then((res) => {
   return res
  })
  .then((obj) => {
    if (obj.status === 204) {
      res.redirect('/delete')
    } else {
      res.send('something went wrong')
    }
  })
});

/* GET user update page. */
router.get('/update/:userId', function(req, res, next) {
  fetch(`http://localhost:3000/api/v1/Customer/${req.params.userId}`,
    {
      method: 'GET',
    })
    .then((res) => {
      return res.json()
    })
    .then((jsonFormat) => {
      res.render('user', { user: jsonFormat });
    })

});

/* POST REQUEST user update page. */
router.post('/update/:userId', function(req, res, next) {
  const params = req.body;
  fetch(`http://localhost:3000/api/v1/Customer/${req.params.userId}`,
    {
      method: 'PATCH',
      headers: {
      "Content-Type": 'application/json',
    },
      body: JSON.stringify(params)
    })
    .then((res) => {
      return res.json()
    })
    .then((jsonFormat) => {
      res.redirect(`/list`);
    })

});






























// /* GET CREATE user page. */
// router.get('/create', function(req, res, next) {
//   res.render('create', { title: 'Create USer' });
// });

// /* POST CREATE user page. */
// router.post('/', function(req, res, next) {
//   console.log("res")
//   res.render('create', { title: 'Create USer' });
// });
// /* POST /users/Bob/badges

// /* GET CREATE SUB_ITEMS for user page. */
// router.get('/add', function(req, res, next) {
//   res.render('add_sub', { title: 'Add subitem  USer' });
// });

// /* POST CREATE SUB_ITEMS for user page. */
// router.post('/', function(req, res, next) {
//   console.log("res")
//   res.render('create', { title: 'Create USer' });
// });


// /* Delete user page. */
// router.get('/delete', function(req, res, next) {
//   fetch(`http://localhost:3000/api/users`,
//     {
//       method: 'GET',
//     })
//     .then((res) => {
//       return res.json()
//     })
//     .then((jsonFormat) => {
//       res.render('delete', { users: jsonFormat });
//     })

// });

// /* Delete user page. */
// router.get('/delete/:user', function(req, res, next) {
//   console.log("user###########", req.params.user)
//   fetch(`http://localhost:3000/api/users/${req.params.user}`,
//     {
//       method: 'DELETE',
//     })
//     .then((res) => {
//       return res.json()
//     })
//     .then((jsonFormat) => {
//       console.log("delete jsonFormat", jsonFormat)
//       if (jsonFormat.success === true) {
//         res.redirect('/delete')
//       } else {
//         res.send('something went wrong')
//       }
//       // res.render('delete', { users: jsonFormat });
//     })

// });

module.exports = router;
