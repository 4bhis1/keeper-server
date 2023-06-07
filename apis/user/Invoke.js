const { User: UsersSchema, Connection: ConnectionSchema } = require("./Schema");
const { v4: uuidv4 } = require("uuid");
const geoip = require("geoip-lite");

const axios = require("axios");

async function getLocationFromIP(ip) {
  try {
    const response = await axios.get(`http://ip-api.com/json/${ip}`);
    const { status, data } = response;

    if (status === 200 && data.status === "success") {
      const { country, regionName, city, lat, lon } = data;
      const location = {
        country,
        region: regionName,
        city,
        latitude: lat,
        longitude: lon,
      };
      return location;
    } else {
      throw new Error("Failed to retrieve location data");
    }
  } catch (error) {
    throw new Error("Failed to retrieve location data");
  }
}

// Usage

login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const originIP =
      req.headers["x-forwarded-for"] || req.connection.remoteAddress;
    console.log("Origin IP:", originIP);
    const ip = "https://142.250.193.78:443";
    // const location = geoip.lookup(ip);

    // const ip = "127.0.0.1"; // Replace with the IP address you want to lookup

    getLocationFromIP(ip)
      .then((location) => {
        console.log(location);
      })
      .catch((error) => {
        console.error(error);
      });

    // console.log("\n@@@  file: Invoke.js:10  location:", location);

    const userVerify = UsersSchema.findOne({ email, password }, { email: 1 })
      .populate([{ path: "fullname" }])
      .lean();
    console.log("\n@@@  file: Invoke.js:56  userVerify:", userVerify);

    if (!userVerify) {
      throw new Error("Either email or password is wrong");
    }

    const tokenUuid = uuidv4();

    await ConnectionSchema.create({
      token: tokenUuid,
      user: userVerify._id,
      rememberMe: true,
    });

    await res.status(200).send({ token: tokenUuid, user: { userVerify } });
  } catch (err) {
    console.log("\n@@@  file: Invoke.js:32  err:", err);
    res.status(400).send({ message: "Error in Login" });
  }
};

signup = async ({ body, params }, res) => {
  try {
    const { firstName, lastName, email, password, confirmPassword } = body;

    if (!(firstName && email && password && confirmPassword)) {
      throw new Error("All credentials required.");
    }

    const user = await UsersSchema.findOne({ email: email });
    console.log("\n@@@  file: Invoke.js:42  user:", user);
    if (user) {
      throw new Error("Email already exists");
    }

    const data = new UsersSchema(body);
    await data.save();

    res.status(200).json({ message: "Succesfully account created." });
  } catch (err) {
    console.log("\n@@@  file: Invoke.js:52  err:", err);
    res.status(400).send({ message: "Error in Signup", error: err });
  }
};

module.exports = {
  signup,
  login,
};
