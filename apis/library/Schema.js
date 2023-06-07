const mongoose = require("mongoose");
const moment = require("moment");

const { Schema } = mongoose;

const NotesSchema = new Schema(
  {
    createdBy: { type: Schema.Types.ObjectId, ref: "users" },
    groupName: String,
    note: [{ type: Schema.Types.ObjectId, ref: "notes" }],
  },
  { timestamps: true, toJSON: { virtuals: true } }
);

module.exports = mongoose.model("library", NotesSchema);
