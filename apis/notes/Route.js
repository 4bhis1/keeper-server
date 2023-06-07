const { saveNotes, updateNotes, getUserNotes, getPage } = require("./Invoke");

module.exports = [
  {
    path: "/userNotes/:userId",
    method: "get",
    callback: getUserNotes,
  },
  {
    path: "/notes",
    method: "post",
    callback: saveNotes,
  },
  {
    path: "/notes/:pageId",
    method: "post",
    callback: updateNotes,
  },
  {
    path: "/notes/:pageId",
    method: "get",
    callback: getPage,
  },
];
