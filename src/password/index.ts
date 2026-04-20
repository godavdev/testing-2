import Elysia, { t } from "elysia"
import { validatePassword } from "./func"

const body = t.Object({
  password: t.String(),
})

export const password = new Elysia({ prefix: "/password" }).post(
  "/validate",
  ({ body }) => {
    return validatePassword(body.password)
  },
  { body },
)