import request from "supertest";
import express from "express";
import dogRoutes from "../src/routes/dogRoutes";
import authMiddleware from "../src/middleware/authMiddleware";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";

const app = express();
app.use(express.json());
app.use("/api/dogs", dogRoutes);

const FETCH_API_URL = "https://frontend-take-home-service.fetch.com";

describe("🐶 Dog Routes", () => {
  let mockAxios: MockAdapter;

  beforeEach(() => {
    mockAxios = new MockAdapter(axios);
  });

  afterEach(() => {
    mockAxios.reset();
  });

  describe("✅ GET /api/dogs/breeds", () => {
    test("✅ Should return a list of dog breeds", async () => {
      const mockBreeds = ["Labrador", "Poodle", "American Pitbull Terrier"];

      mockAxios.onGet(`${FETCH_API_URL}/dogs/breeds`).reply(200, mockBreeds);

      const response = await request(app)
        .get("/api/dogs/breeds")
        .set("Cookie", "fetch-access-token=mocked-token");

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockBreeds);
    });

    test("❌ Should return 401 if no authentication token is provided", async () => {
      const response = await request(app).get("/api/dogs/breeds");

      expect(response.status).toBe(401);
      expect(response.body).toEqual({ error: "No authentication cookie found in request headers" });
    });

    test("❌ Should return 500 if API request fails", async () => {
      mockAxios.onGet(`${FETCH_API_URL}/dogs/breeds`).reply(500, { error: "Server error" });

      const response = await request(app)
        .get("/api/dogs/breeds")
        .set("Cookie", "fetch-access-token=mocked-token");

      expect(response.status).toBe(500);
      expect(response.body.error).toEqual({ error: "Server error" });
    });
  });

  describe("✅ GET /api/dogs/search", () => {
    test("✅ Should return search results", async () => {
      const mockSearchResults = { resultIds: ["123", "456"], total: 2 };

      mockAxios.onGet(`${FETCH_API_URL}/dogs/search`).reply(200, mockSearchResults);

      const response = await request(app)
        .get("/api/dogs/search")
        .query({ breeds: ["Labrador"], size: 10 })
        .set("Cookie", "fetch-access-token=mocked-token");

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockSearchResults);
    });

    test("❌ Should return 401 if no authentication token is provided", async () => {
      const response = await request(app).get("/api/dogs/search");

      expect(response.status).toBe(401);
      expect(response.body).toEqual({ error: "No authentication cookie found in request headers" });
    });

    test("❌ Should return 500 if API request fails", async () => {
      mockAxios.onGet(`${FETCH_API_URL}/dogs/search`).reply(500, { error: "Server error" });

      const response = await request(app)
        .get("/api/dogs/search")
        .set("Cookie", "fetch-access-token=mocked-token");

      expect(response.status).toBe(500);
      expect(response.body.error).toEqual({error: "Server error"});
    });
  });
});
