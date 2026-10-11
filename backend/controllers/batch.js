const jwt = require("jsonwebtoken");
const batchRouter = require("express").Router();
const auth = require("../utils/auth");
const Batch = require("../models/batch");
const User = require("../models/user");

batchRouter.get("/", auth, async (request, response) => {
  const batches = await Batch.find({ user: request.user.id });
  response.json(batches);
});

batchRouter.get("/:id", auth, async (request, response) => {
  const batch = await Batch.findOne({
    _id: request.params.id,
    user: request.user.id,
  });
  if (!batch) {
    return response.status(404).json({ error: "Batch not found" });
  }
  response.json(batch);
});

batchRouter.post("/", auth, async (request, response) => {
  const body = request.body;

  const user = await User.findById(request.user.id);
  console.log(user);

  if (!user) {
    return response
      .status(400)
      .json({ error: "userId is missing or not valid" });
  }

  const batch = new Batch({
    name: body.name,
    batchNumber: body.batchNumber,
    fermentationStage: body.fermentationStage,
    startDate: body.startDate,
    targetDate: body.targetDate,
    status: body.status,
    user: user._id,
  });

  const savedBatch = await batch.save();
  user.batches = user.batches.concat(savedBatch._id);
  await user.save();
  response.status(201).json(savedBatch);
});

batchRouter.delete("/:id", auth, async (request, response) => {
  const deleted = await Batch.findOneAndDelete({
    _id: request.params.id,
    user: request.user.id,
  });

  if (!deleted) {
    return response.status(404).json({ error: "Batch not found" });
  }

  response.status(204).end();
});

module.exports = batchRouter;
