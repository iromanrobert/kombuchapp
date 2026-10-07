const batchRouter = require("express").Router();
const Batch = require("../models/batch");

batchRouter.get("/", async (request, response) => {
  const notes = await Batch.find({});
  response.json(notes);
});

batchRouter.post("/", async (request, response) => {
  const body = request.body;

  const batch = new Batch({
    name: body.name,
    batchNumber: body.batchNumber,
    fermentationStage: body.fermentationStage,
    startDate: body.startDate,
    targetDate: body.targetDate,
    status: body.status,
  });

  const savedBatch = await batch.save();
  response.status(201).json(savedBatch);
});

module.exports = batchRouter;
