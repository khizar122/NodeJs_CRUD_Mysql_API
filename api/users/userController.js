const {
  create,
  getUserByUserId,
  getUserByUserEmail,
  getUsers,
  deleteUser,
  updateUser,
} = require("./userService");
const { genSaltSync, hashSync, compareSync } = require("bcrypt");
const { sign } = require("jsonwebtoken");

module.exports = {
  createUser: (req, resp) => {
    const body = req.body;
    const salt = genSaltSync(10);
    body.password = hashSync(body.password, salt);
    create(body, (error, results) => {
      if (error) {
        console.log(error);
        return resp.status(500).json({
          success: 0,
          message: "Database connection error",
          Error: error,
        });
      }
      return resp.status(200).json({
        success: 1,
        data: results,
      });
    });
  },

  getUserByUserId: (req, resp) => {
    const id = req.params.id;
    getUserByUserId(id, (error, results, fields) => {
      if (error) {
        console.log(error);
        return;
      }
      if (!results) {
        return resp.json({
          success: 0,
          message: "Record Not Found",
        });
      }
      return resp.json({
        success: 1,
        data: results,
      });
    });
  },

  getUsers: (req, res) => {
    getUsers((err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      return res.json({
        success: 1,
        data: results,
      });
    });
  },

  updateUsers: (req, res) => {
    const body = req.body;
    const salt = genSaltSync(10);
    body.password = hashSync(body.password, salt);
    updateUser(body, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      if (!results) {
        return res.json({
          success: 0,
          message: "Failed to Update User",
        });
      }
      return res.json({
        success: 1,
        message: "updated successfully",
      });
    });
  },

  deleteUser: (req, res) => {
    const data = req.body;
    deleteUser(data, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      if (!results) {
        return res.json({
          success: 0,
          message: "Record Not Found",
        });
      }
      return res.json({
        success: 1,
        message: "user deleted successfully",
      });
    });
  },
  login: (req, res) => {
    const body = req.body;
    getUserByUserEmail(body.email, (error, results) => {
      if (error) {
        console.log(error);
      }
      if (!results) {
        return res.json({
          success: 0,
          data: "Invalid Email or Password",
        });
      }
      const result = compareSync(body.password, results.password);
      if (result) {
        results.password = undefined;
        const jsonwebtoken = sign({ result: results }, process.env.secret_key, {
          expiresIn: "1h",
        });
        return res.json({
          success: 1,
          message: "Login Successfully",
          token: jsonwebtoken,
        });
      } else {
        res.json({
          success: 0,
          data: "Invalid Email or Password",
        });
      }
    });
  },
};
