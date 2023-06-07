const { showDailyActivity, addActivity, activityDetail } = require("./Invoke");

module.exports = [
  { path: "/activities", method: "post", callback: addActivity },
  {
    path: "/activities/:activitiesId",
    method: "get",
    callback: activityDetail,
  },
  {
    path: "/activities/:activityId/dailyActivity",
    method: "get",
    callback: showDailyActivity,
  },
];
