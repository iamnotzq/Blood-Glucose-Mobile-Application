const mongoose = require("mongoose");

// Mocking the mongoose module
jest.mock("mongoose");

describe("Database Connection", () => {
  it("should connect to the database", async () => {
    mongoose.connect.mockResolvedValueOnce(); // Mock successful connection
    require("../../models/db");

    expect(mongoose.connect).toHaveBeenCalledWith(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  });
});
