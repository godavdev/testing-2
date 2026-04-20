import Elysia, { t } from "elysia"
import { calculateTotal } from "./func"

const product = t.Object({
  name: t.String(),
  price: t.Number(),
  quantity: t.Number(),
})

const body = t.Array(product)

export const cart = new Elysia({ prefix: "/cart" }).post(
  "/total",
  ({ body }) => {
    return calculateTotal(body)
  },
  { body },
)