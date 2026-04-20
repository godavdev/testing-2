import { Elysia } from "elysia"
import { arit } from "./arit"
import { cart } from "./cart"
import { password } from "./password"

const app = new Elysia()
  .get("/", () => "Hello Elysia")
  .use(arit)
  .use(cart)
  .use(password)
  .listen(3000)

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`,
)
