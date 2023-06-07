const Notes = require("../apis/notes/Route");
const User = require("../apis/user/Route");
const Library = require("../apis/library/Route");
const Activity = require("../apis/activity/Route");

module.exports = [...Notes, ...User, ...Library, ...Activity];
