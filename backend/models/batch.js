const mongoose = require("mongoose");

const batchSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    batchNumber: {
      type: String,
      required: true,
      unique: true,
    },
    fermentationStage: {
      type: String,
      enum: ["1F", "2F"],
      default: "1F",
    },
    startDate: {
      type: Date,
      required: true,
    },
    targetDate: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      enum: ["active", "completed"],
      default: "active",
    },
  },
  { timestamps: true },
);

batchSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const Batch = mongoose.model("Batch", batchSchema);
module.exports = Batch;
