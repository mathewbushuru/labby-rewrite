import request from "supertest";
import { describe, it, expect } from "vitest";

import app from "../app";

describe("GET /", () => {
  it("responds with a welcome message", async () => {
    const response = await request(app).get("/");
    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      message: "Checklists API",
    });
  });
});

describe("Error handler", () => {
  it("responds with a 500 status code and error message", async () => {
    const response = await request(app).get("/test/test-error-handler");
    expect(response.status).toBe(500);
    expect(response.body).toHaveProperty("errorMessage");
  });
});
