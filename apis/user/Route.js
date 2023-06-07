// router.route("/credentials/login").post(login)

const { login, signup } = require("./Invoke");

module.exports = [
  {
    path: "/login",
    method: "post",
    callback: login,
    authenticate: false,
  },
  {
    path: "/signup",
    method: "post",
    callback: signup,
    authenticate: false,
  },
];
