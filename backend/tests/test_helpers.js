const Batch = require("../models/batch");
const mongoose = require("mongoose");

const initialBatches = [
  {
    name: "Green Tea Blend",
    batchNumber: "BTH-124",
    fermentationStage: "1F",
    startDate: "2025-01-15",
    targetDate: "2025-01-22",
    status: "active",
    id: "64b7f0c2a1b2c3d4e5f60781",
  },
  {
    name: "Ginger Lemon",
    batchNumber: "BTH-123",
    fermentationStage: "2F",
    startDate: "2025-01-12",
    targetDate: "2025-01-19",
    status: "active",
  },
  {
    name: "Black Tea Classic",
    batchNumber: "BTH-122",
    fermentationStage: "1F",
    startDate: "2025-01-10",
    targetDate: "2025-01-17",
    status: "active",
  },
  {
    name: "Hibiscus Berry",
    batchNumber: "BTH-121",
    fermentationStage: "2F",
    startDate: "2025-01-05",
    targetDate: "2025-01-12",
    status: "completed",
  },
  {
    name: "Oolong Blend",
    batchNumber: "BTH-120",
    fermentationStage: "1F",
    startDate: "2025-01-01",
    targetDate: "2025-01-08",
    status: "completed",
  },
  {
    name: "Green Jasmine",
    batchNumber: "BTH-119",
    fermentationStage: "2F",
    startDate: "2024-12-20",
    targetDate: "2024-12-27",
    status: "completed",
  },
];

const nonExistingId = () => new mongoose.Types.ObjectId().toString();

const batchesInDb = async () => {
  const batches = await Batch.find({});
  return batches.map((b) => b.toJSON());
};

module.exports = { initialBatches, nonExistingId, batchesInDb };
