import { Elysia } from "elysia"
import { arit } from "./arit"

const app = new Elysia()
  .get("/", () => "Hello Elysia")
  .use(arit)
  .listen(3000)

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`,
)
