const mongoose = require("mongoose");
const request = require("supertest");
const MONGO_URL = require("../src/index")

const beforeEach = async () => {
    await mongoose.connect(process.env.MONGO_URL);
};

/* Closing database connection after each test. */
const afterEach = async () => {
    await mongoose.connection.close();
};