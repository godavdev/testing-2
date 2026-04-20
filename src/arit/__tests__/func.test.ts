import { describe, expect, test } from "bun:test"
import { divide, sum } from "../func"

describe("func", () => {
  test("2 + 6 sum should return 8", () => {
    expect(sum(2, 6)).toBe(8)
  })

  test("-2 + 6 sum should return 4", () => {
    expect(sum(-2, 6)).toBe(4)
  })

  test("diving 2 by 0 should throw an error", () => {
    expect(() => divide(2, 0)).toThrowError("Cannot divide by zero")
  })
})
