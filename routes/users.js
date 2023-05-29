const express = require("express");
const connection = require("../src/config/db");
const router = express.Router();

// static
router.get("/", (req, res) => {
  let sql = "SELECT * FROM user";
  connection.query(sql, (err, result) => {
    res.send(result);
  });
});

router.post("/", (req, res) => {
  res.send("Create new user");
});

router.get("/new", (req, res) => {
  console.log("new users");
  res.send("new users");
});

// Dynamic routing
// router
//   .route("/:id")
//   .get((req, res) => {
//     console.log("users", req.user);
//     console.log(req.params.id);
//     res.send(`New Get user with id: ${req.params.id}`);
//   })
//   .put((req, res) => {
//     console.log(req.params.id);
//     res.send(`Update user with id: ${req.params.id}`);
//   })
//   .delete((req, res) => {
//     console.log(req.params.id);
//     res.send(`Delete user with id: ${req.params.id}`);
//   });

// get user by id
router.get("/:id", (req, res) => {
  let { id } = req.params;
  let sql = `SELECT * FROM user WHERE user.user_id=${id}`;
  connection.query(sql, (err, result) => {
    res.send(result);
  });
  res.send(`Get user with id: ${id}`);
});

// update user by id
router.put("/:id", (req, res) => {
  console.log(req.params.id);
  res.send(`Update user with id: ${req.params.id}`);
});

// delete user by id
router.delete("/:id", (req, res) => {
  console.log(req.params.id);
  res.send(`Delete user with id: ${req.params.id}`);
});

// const users = [{ name: "Kyle" }, { name: "Sally" }];
// router.param("id", (req, res, next, id) => {
//   console.log("Enter params");
//   console.log(id);
//   req.user = users[id];
//   next();
// });

module.exports = router;
