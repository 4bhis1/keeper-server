const { Connection: ConnectionModel } = require("../apis/user/Schema");

const aunthenticate = (req, res, next) => {
  console.log("\n@@@  file: authenticate.js:4  res:", res)
  try {
    let token = req.headers["Authorization"];
    token = token.split("Bearer ")[1];
    console.log("\n@@@  file: authenticate.js:7  token:", token);

    const data = ConnectionModel.find({ token: token });
    console.log(">>> data", data);

    res.User = { Name: "Abhishek kumar" };

    next();
  } catch (err) {
    throw new Error("Error while authenticating");
  }
};

module.exports = { aunthenticate };
