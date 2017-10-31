var express = require('express');
var router = express.Router();
var fetch = require('node-fetch');



/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET create customer page. */
router.get('/create-todo', function(req, res, next) {
  res.render('create-todo', { title: 'CREATE' });
});

/* POST CREATE todo page. */
router.post('/create-todo/:userId', function(req, res, next) {
  const params = req.body;
  params.owner = req.params.userId;
  fetch(`http://localhost:3000/api/v1/Todo`,
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
    // res.send(json);
    res.redirect(`/todo/list-todo/${req.params.userId}`)
  })
  .catch(err => console.log("error on post create-todo", err))
});


/* GET LIST customer page. */
router.get('/list-todo/:userId', function(req, res, next) {
  const query = { owner: req.params.userId };
  const userId = req.params.userId;
  fetch(`http://localhost:3000/api/v1/Todo?query={"owner":"${userId}"}`,
  {
    method: 'GET',
  }
  )
   .then((res) => {
    return res.json()
  })
  .then ((todos) => {
    res.render('list-todo', { todos, userId });
  })
  .catch(err => console.log("error on post /list-todo/:userId", err))
});

/* REQUEST Completed Task. */
router.get('/completed-todo/:ownerId/:todoId', function(req, res, next) {
  const params = { isCompleted: true };
  fetch(`http://localhost:3000/api/v1/Todo/${req.params.todoId}`,
  {
    method: 'PATCH',
    headers: {
    "Content-Type": 'application/json',
  },
    body: JSON.stringify(params)
  })
  .then((res) => {
   return res
  })
  .then((obj) => {
    res.redirect(`/todo/list-todo/${req.params.ownerId}`)
  })
});

/* REVERT to NOt-COMPLETED Completed Task. */
router.get('/not-completed-todo/:ownerId/:todoId', function(req, res, next) {
  const params = { isCompleted: false };
  fetch(`http://localhost:3000/api/v1/Todo/${req.params.todoId}`,
  {
    method: 'PATCH',
    headers: {
    "Content-Type": 'application/json',
  },
    body: JSON.stringify(params)
  })
  .then((res) => {
   return res
  })
  .then((obj) => {
    res.redirect(`/todo/list-todo/${req.params.ownerId}`)
  })
});

/* GET user update page. */
router.get('/update-todo/:todoId', function(req, res, next) {
  fetch(`http://localhost:3000/api/v1/Todo/${req.params.todoId}`,
    {
      method: 'GET',
    })
    .then((res) => {
      return res.json()
    })
    .then((jsonFormat) => {
      res.render('todo', { todo: jsonFormat });
    })

});

/* POST REQUEST todo update page. */
router.post('/update-todo/:todoOwner/:todoId', function(req, res, next) {
  const params = req.body;
  fetch(`http://localhost:3000/api/v1/Todo/${req.params.todoId}`,
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
    .then((todo) => {
      res.redirect(`/todo/list-todo/${req.params.todoOwner}`)
    })

});


module.exports = router;
