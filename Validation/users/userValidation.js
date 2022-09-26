const { user } = require("./userSchema");

module.exports = {
  addUserValidation: (req, res, next) => {
    const value = user.validate(req.body);
    if (value.error) {
      res.json({
        success: 0,
        message: value.error.details[0].message,
      });
    } else {
      next();
    }
  },
};
