const mongoose = require("mongoose");
const moment = require("moment");

const { Schema } = mongoose;

const schema = new Schema(
  {
    createdBy: { type: Schema.Types.ObjectId, ref: "users" },
    note: [
      {
        types: String,
        data: String,
      },
    ],
    heading: String,
    pinned: {
      type: Boolean,
      default: false,
    },
    background: {
      type: String,
      default: "white",
    },
  },
  { timestamps: true, toJSON: { virtuals: true } }
);

const Notes = mongoose.model("Notes", schema, "k_notes");

module.exports = Notes;
