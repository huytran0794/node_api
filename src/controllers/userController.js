const userController = {
  // get all user
  getAllUser: (req, res) => {
    res.send("get user");
  },

  //   get user by id
  getUserById: (req, res) => {
    res.send("get user by id");
  },

  //   get user by name
  getUserByName: (req, res) => {
    res.send("get user by name");
  },

  //   create new user
  createUser: (req, res) => {
    res.send("create new user");
  },

  //   update user by id
  updateUser: (req, res) => {
    // check if user exists before updating
    res.send("update user by id");
  },
  //   delete user by name
  deleteUser: (req, res) => {
    // check if user exists before deleting
    res.send("delete user by id");
  },
};

export default userController;
