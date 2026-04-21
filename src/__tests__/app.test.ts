import { describe, expect, test } from "bun:test"
import { app } from ".."

describe("Main app tests", () => {
  test("should return Hello Elysia on GET /", async () => {
    const response = await app
      .handle(new Request("http://localhost/"))
      .then((res) => res.text())

    expect(response).toBe("Hello Elysia")
  })

  test("should return 404 on unknown route", async () => {
    const response = await app
      .handle(new Request("http://localhost/unknown"))
      .then((res) => res.status)

    expect(response).toBe(404)
  })

  test("should return 200 if /arit/sum is validating the body correctly", async () => {
    const response = await app
      .handle(
        new Request("http://localhost/arit/sum", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ a: 1, b: 2 }),
        }),
      )
      .then((res) => res.status)

    expect(response).toBe(200)
  })

  test("should return 422 if body is not valid", async () => {
    const response = await app
      .handle(
        new Request("http://localhost/arit/sum", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name: "invalid" }),
        }),
      )
      .then((res) => res.status)

    expect(response).toBe(422)
  })
})
