import app from "../app.js";
import supertest from "supertest";

const request = supertest(app);

describe("POST /weather", () => {
  it("responds with correct weather data", async () => {
    const response = await request.post("/weather").send({ cityName: "London" });
    expect(response.status).toBe(200);
    expect(response.body.weatherText).toContain("Current temperature in London");
  });

  it("responds with error for invalid cityName", async () => {
    const response = await request.post("/weather").send({ cityName: "City 17" });
    expect(response.status).toBe(500);
  });

  it("responds with error for empty cityName", async () => {
    const response = await request.post("/weather").send({});
    expect(response.status).toBe(400);
    expect(response.text).toContain("City name is required");
  });
});