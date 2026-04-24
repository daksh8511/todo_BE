import "dotenv/config";
import fastify from "fastify";
import { db } from "../database/client.ts";
import { sql } from "drizzle-orm";
import TodoList from "../domain/TodoList.ts";

const app = fastify({ logger: false });

app.register(TodoList, {prefix : '/api'})

app.listen({ host: "0.0.0.0", port: 3004 }, async (err, address) => {
  try {
    await db.execute(sql`select 1`);
    console.log("Database connected successfully");
    console.log("server start successfully", address);
  } catch (error) {
    if (error) {
      console.error("Error : ", err);
      process.exit(1);
    }
  }
});
