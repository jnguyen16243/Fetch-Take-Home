import request from "supertest";
import express from "express";
import authRoutes from "../src/routes/authRoutes"; 
import axios from "axios";
import MockAdapter from "axios-mock-adapter";

const app = express();
app.use(express.json());
app.use("/api/auth", authRoutes);

const FETCH_API_URL = "https://frontend-take-home-service.fetch.com";

describe("POST /api/auth/login", () => {
  let mockAxios: MockAdapter;

  beforeEach(() => {
    mockAxios = new MockAdapter(axios);
  });

  afterEach(() => {
    mockAxios.reset();
  });

  test("✅ Should successfully login and return a Set-Cookie header", async () => {
    const mockName = "John Doe";
    const mockEmail = "john@example.com";
    const mockToken = "fetch-access-token=mocked-token; Path=/; HttpOnly";


    mockAxios.onPost(`${FETCH_API_URL}/auth/login`).reply(200, {}, { "set-cookie": mockToken });

    const response = await request(app).post("/api/auth/login").send({ name: mockName, email: mockEmail });

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ success: true });
    expect(response.headers["set-cookie"]).toContain(mockToken);
  });

  test("❌ Should return 401 if no Set-Cookie header is received", async () => {
    const mockName = "John Doe";
    const mockEmail = "john@example.com";


    mockAxios.onPost(`${FETCH_API_URL}/auth/login`).reply(200, {});

    const response = await request(app).post("/api/auth/login").send({ name: mockName, email: mockEmail });

    expect(response.status).toBe(401);
    expect(response.body).toEqual({ error: "Login failed: No authentication cookie received" });
  });

  test("❌ Should return 401 if the authentication token is missing", async () => {
    const mockName = "John Doe";
    const mockEmail = "john@example.com";

    mockAxios.onPost(`${FETCH_API_URL}/auth/login`).reply(200, {}, { "set-cookie": "some-other-cookie=value" });

    const response = await request(app).post("/api/auth/login").send({ name: mockName, email: mockEmail });

    expect(response.status).toBe(401);
    expect(response.body).toEqual({ error: "Authentication token not found in response" });
  });

  test("❌ Should return 401 on request failure", async () => {
    const mockName = "John Doe";
    const mockEmail = "john@example.com";


    mockAxios.onPost(`${FETCH_API_URL}/auth/login`).reply(401, { error: "Invalid credentials" });

    const response = await request(app).post("/api/auth/login").send({ name: mockName, email: mockEmail });

    expect(response.status).toBe(401);
    expect(response.body).toEqual({ error: "Login failed" });
  });
});
