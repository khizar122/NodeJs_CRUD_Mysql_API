const { application } = require("express");
const {
  login,
  createUser,
  getUsers,
  getUserByUserId,
  deleteUser,
  updateUsers,
} = require("./userController");
const router = require("express").Router();
const { checkToken } = require("../../Auth/validation");
const { addUserValidation } = require("../../Validation/users/userValidation");

router.post("/create", checkToken, addUserValidation, createUser);
router.get("/", checkToken, getUsers);
router.get("/:id", checkToken, getUserByUserId);
router.patch("/", checkToken, updateUsers);
router.delete("/", checkToken, deleteUser);
router.post("/login", login);

module.exports = router;
