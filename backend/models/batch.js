const mongoose = require("mongoose");

const batchSchema = new mongoose.Schema(
  {
    name: String,
    batchNumber: String,
    fermentationStage: String,
    startDate: Date,
    targetDate: Date,
    status: String,
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
