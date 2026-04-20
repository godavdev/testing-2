import Elysia, { t } from "elysia"
import { divide, multiply, subtract, sum } from "./func"

const body = t.Object({
  a: t.Number(),
  b: t.Number(),
})

export const arit = new Elysia({ prefix: "/arit" })

  .post(
    "/sum",
    ({ body }) => {
      const { a, b } = body
      return sum(a, b)
    },
    { body },
  )
  .post(
    "/subtract",
    ({ body }) => {
      const { a, b } = body
      return subtract(a, b)
    },
    { body },
  )
  .post(
    "/multiply",
    ({ body }) => {
      const { a, b } = body
      return multiply(a, b)
    },
    { body },
  )
  .post(
    "/divide",
    ({ body }) => {
      const { a, b } = body
      return divide(a, b)
    },
    { body },
  )
