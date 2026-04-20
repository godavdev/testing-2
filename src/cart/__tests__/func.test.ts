import { describe, expect, test } from "bun:test"
import { calculateTotal, Product } from "../func"

describe("calculateTotal", () => {
  test("empty array should return 0", () => {
    expect(calculateTotal([])).toBe(0)
  })

  test("single product should return price * quantity", () => {
    const products: Product[] = [{ name: "Apple", price: 10, quantity: 2 }]
    expect(calculateTotal(products)).toBe(20)
  })

  test("multiple products should return sum of all totals", () => {
    const products: Product[] = [
      { name: "Apple", price: 10, quantity: 2 },
      { name: "Banana", price: 5, quantity: 3 },
    ]
    expect(calculateTotal(products)).toBe(35)
  })

  test("product with quantity 1", () => {
    const products: Product[] = [{ name: "Orange", price: 15, quantity: 1 }]
    expect(calculateTotal(products)).toBe(15)
  })
})