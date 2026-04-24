import "dotenv/config";
import fastify from "fastify";
import { db } from "../database/client.ts";
import { sql } from "drizzle-orm";
import TodoList from "../domain/TodoList.ts";
import cors from '@fastify/cors'

const app = fastify({ logger: true });

await app.register(cors, {
  origin: [
    "https://todo-first-backend.vercel.app",
    "http://localhost:5173",
    "http://127.0.0.1:5173"
  ],
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
});

app.register(TodoList, { prefix: "/api" });

const start = async () => {
  try {
    await db.execute(sql`select 1`);
    console.log("Database connected successfully");
    const port = Number(process.env.PORT) || 3000;
    await app.listen({
      host: "0.0.0.0",
      port,
    });

    console.log(`Server started on port ${port}`);
  } catch (error) {
    console.error("Startup error:", error);
    process.exit(1);
  }
};

start();