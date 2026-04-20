import { describe, expect, test } from "bun:test"
import { divide, sum, subtract, multiply } from "../func"

describe("func", () => {
  test("2 + 6 sum should return 8", () => {
    expect(sum(2, 6)).toBe(8)
  })

  test("-2 + 6 sum should return 4", () => {
    expect(sum(-2, 6)).toBe(4)
  })

  test("10 - 4 subtract should return 6", () => {
    expect(subtract(10, 4)).toBe(6)
  })

  test("-5 - 5 subtract should return -10", () => {
    expect(subtract(-5, 5)).toBe(-10)
  })

  test("3 * 4 multiply should return 12", () => {
    expect(multiply(3, 4)).toBe(12)
  })

  test("-2 * 5 multiply should return -10", () => {
    expect(multiply(-2, 5)).toBe(-10)
  })

  test("10 / 2 divide should return 5", () => {
    expect(divide(10, 2)).toBe(5)
  })

  test("diving 2 by 0 should throw an error", () => {
    expect(() => divide(2, 0)).toThrowError("Cannot divide by zero")
  })
})
