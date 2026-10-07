const batchRouter = require("express").Router();
const Batch = require("../models/batch");

batchRouter.get("/", async (request, response) => {
  const batches = await Batch.find({});
  response.json(batches);
});

batchRouter.get("/:id", async (request, response) => {
  const batch = await Batch.findById(request.params.id);
  if (!batch) {
    response.status(404).end();
  }
  response.json(batch);
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

batchRouter.delete("/:id", async (request, response) => {
  const batch = await Batch.findByIdAndDelete(request.params.id);
  if (!batch) {
    response.status(404).end();
  }
  response.status(204).end();
});

module.exports = batchRouter;
