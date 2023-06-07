const {
  DateWiseActiivty: DailyActivitesSchema,
  Activity: ActivitesSchema,
} = require("./Schema");

addActivity = async (req, res) => {
  const { body } = req;
  const data = await ActivitesSchema.create(body);
  return data;
};

activityDetail = async (req, res) => {};

addDailyActivity = async (req, res) => {
  const { body } = req;
  const data = await DailyActivitesSchema.create(body);
  return data;
};

showDailyActivity = async (req, res) => {
  const { params } = req;

  return ["hello"];
};

module.exports = {
  addActivity,
  activityDetail,
  addDailyActivity,
  showDailyActivity,
};
