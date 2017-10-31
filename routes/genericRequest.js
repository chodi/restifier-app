var fetch = require('node-fetch');

// Get ALL Users
const getUsers = (cb) => {
  fetch(`http://localhost:3000/api/users`,
  {
    method: 'GET',
  })
  .then((res) => {
    return res.json()
  })
  .then((users) => {
    return cb(users)
  })
  .catch((err) => {
    return cb(null, err)
  })
}

// Get user by ID
const getUser = (id, cb) => {
  fetch(`http://localhost:3000/api/users/${id}`,
  {
    method: 'GET',
  })
  .then((res) => {
    return res.json()
  })
  .then((user) => {
    return cb(user)
  })
  .catch((err) => {
    return cb(null, err)
  })
}

const deleteUser = (userId) => {
  return [];
}

// Add OWNER BADGE
const postUpdateSub = (userId, params, cb) => {
  // PATCH /users/Bob
  console.log("userId", userId, params)
  fetch(`http://localhost:3000/api/users/${userId}/badges`,
  {
    method: 'POST',
    headers: {
      "Content-Type": 'application/json',
    },
    // body: JSON.stringify(params),
  })
  .then((res) => {
    return res.json()
  })
  .then((user) => {
    console.log("postUpdateSub", user)
    return cb(user)
  })
  .catch((err) => {
    console.log("EROR on postUpdateSub", err)
    return cb(null, err)
  })
  return [];
}

// Update USer by ID
const updateUser = (userId, params, cb) => {
  // PATCH /users/Bob
  console.log("userId", userId, params)
  fetch(`http://localhost:3000/api/users/${userId}`,
  {
    method: 'PATCH',
    headers: {
      "Content-Type": 'application/json',
    },
    body: JSON.stringify(params),
  })
  .then((res) => {
    return res.json()
  })
  .then((user) => {
    console.log("updateUser", user)
    return cb(user)
  })
  .catch((err) => {
    console.log("EROOOR #####################", err)
    return cb(null, err)
  })
  return [];
}


// PATCH OWNER BADGE
const patchUpdateSub = (userId, params, cb) => {
  // PATCH /users/Bob
  console.log("userId", userId, params)
  fetch(`http://localhost:3000/api/users/${userId}/badges`,
  {
    method: 'PATCH',
    headers: {
      "Content-Type": 'application/json',
    },
    body: JSON.stringify(params),
  })
  .then((res) => {
    return res.json()
  })
  .then((user) => {
    console.log("patchUpdateSub", user)
    return cb(user)
  })
  .catch((err) => {
    console.log("EROR on patchUpdateSub", err)
    return cb(null, err)
  })
  return [];
}

module.exports = {
  getUsers,
  getUser,
  deleteUser,
  updateUser,
  postUpdateSub,
  patchUpdateSub,
}
