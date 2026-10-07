const dns = require("dns");
dns.setServers(["8.8.8.8", "1.1.1.1"]);
const { test, after, describe, beforeEach } = require("node:test");
const assert = require("node:assert");
const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const Batch = require("../models/batch");
const helper = require("./test_helpers");

const api = supertest(app);
const BASE_URL = "/api/batch";

beforeEach(async () => {
  await Batch.deleteMany({});
  await Batch.insertMany(helper.initialBatches);
});

describe("POST /api/batch", () => {
  const validBatch = {
    name: "Green Jasmine Bucha",
    batchNumber: "BTH-116",
    fermentationStage: "2F",
    startDate: "2024-12-20",
    targetDate: "2024-12-27",
    status: "completed",
  };

  test("returns 201 and saves a valid batch", async () => {
    await api
      .post(BASE_URL)
      .send(validBatch)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const batchesAtEnd = await helper.batchesInDb();
    assert.strictEqual(batchesAtEnd.length, helper.initialBatches.length + 1);
    assert(batchesAtEnd.map((b) => b.name).includes(validBatch.name));
  });

  for (const field of ["name", "batchNumber", "startDate", "targetDate"]) {
    test(`returns 400 when ${field} is missing`, async () => {
      const { [field]: _omitted, ...invalidBatch } = validBatch;

      await api.post(BASE_URL).send(invalidBatch).expect(400);

      const batchesAtEnd = await helper.batchesInDb();
      assert.strictEqual(batchesAtEnd.length, helper.initialBatches.length);
    });
  }

  test("returns 400 for an invalid fermentationStage", async () => {
    await api
      .post(BASE_URL)
      .send({ ...validBatch, fermentationStage: "3F" })
      .expect(400);
  });

  test("returns 400 for an invalid status", async () => {
    await api
      .post(BASE_URL)
      .send({ ...validBatch, status: "fermenting" })
      .expect(400);
  });
});

describe("GET /api/batch", () => {
  test("returns all batches as JSON", async () => {
    const response = await api
      .get(BASE_URL)
      .expect(200)
      .expect("Content-Type", /application\/json/);

    assert.strictEqual(response.body.length, helper.initialBatches.length);
  });
});

describe("GET /api/batch/:id", () => {
  test("returns 200 and the batch for an existing id", async () => {
    const [batchToView] = await helper.batchesInDb();

    const response = await api
      .get(`${BASE_URL}/${batchToView.id}`)
      .expect(200)
      .expect("Content-Type", /application\/json/);

    assert.strictEqual(response.body.id, batchToView.id);
    assert.strictEqual(response.body.name, batchToView.name);
  });

  test("returns 404 for a valid id that does not exist", async () => {
    await api.get(`${BASE_URL}/${helper.nonExistingId()}`).expect(404);
  });

  test("returns 400 for a malformed id", async () => {
    await api.get(`${BASE_URL}/not-a-valid-id`).expect(400);
  });
});

describe("DELETE /api/batch/:id", () => {
  test("returns 204 and removes an existing batch", async () => {
    const batchesAtStart = await helper.batchesInDb();
    const batchToDelete = batchesAtStart[0];

    await api.delete(`${BASE_URL}/${batchToDelete.id}`).expect(204);

    const batchesAtEnd = await helper.batchesInDb();
    assert.strictEqual(batchesAtEnd.length, batchesAtStart.length - 1);
    assert(!batchesAtEnd.map((b) => b.id).includes(batchToDelete.id));
  });

  test("returns 204 for a valid id that does not exist", async () => {
    await api.delete(`${BASE_URL}/${helper.nonExistingId()}`).expect(204);
  });

  test("returns 400 for a malformed id", async () => {
    await api.delete(`${BASE_URL}/not-a-valid-id`).expect(400);
  });
});

after(async () => {
  await mongoose.connection.close();
});
