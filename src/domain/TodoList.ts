import { FastifyReply, FastifyRequest } from "fastify";
import TodoSchema from "../database/schema";
import { db } from "../database/client";
import { eq } from "drizzle-orm";

const TodoList = async (app: any, options: any) => {
  app.get("/alltodos", async (req: FastifyRequest, reply: FastifyReply) => {
    const allTodos = await db.select().from(TodoSchema);

    return reply
      .status(201)
      .send({ success: true, msg: "All todo list getted", todo: allTodos });
  });

  app.post(
    "/post/todo",
    async (
      req: FastifyRequest<{ Body: { title: string; status: string } }>,
      reply: FastifyReply,
    ) => {
      const { title, status } = req.body;

      const createTodo = await db
        .insert(TodoSchema)
        .values({ title, status })
        .returning();

      if (createTodo.length === 0) {
        return reply
          .status(401)
          .send({ msg: "Failed to create todo", success: false });
      } else {
        return reply.status(201).send({
          msg: "Todo create successfully",
          success: true,
          todo: createTodo[0],
        });
      }
    },
  );

  app.patch(
    "/update/:id",
    async (
      req: FastifyRequest<{
        Params: { id: string };
        Body: { title: string; status: string };
      }>,
      reply: FastifyReply,
    ) => {
      const { id } = req.params;
      const { title, status } = req.body;

      const idInNumber = Number(id);

      const updateTodo = await db
        .update(TodoSchema)
        .set({ title, status })
        .where(eq(TodoSchema.id, idInNumber))
        .returning();

      try {
        if (updateTodo.length === 0) {
          return reply
            .status(401)
            .send({ msg: "Failed to update todo", success: false });
        } else {
          return reply.status(201).send({
            msg: "Todo update successfully",
            success: true,
            todo: updateTodo[0],
          });
        }
      } catch (error) {
        console.error("error : ", error);
        return reply.status(501).send({ msg: "server error ", success: false });
      }
    },
  );

  app.delete(
    "/delete/:id",
    async (
      req: FastifyRequest<{ Params: { id: string } }>,
      reply: FastifyReply,
    ) => {
      const { id } = req.params;
      const idInNumber = Number(id);

      if (isNaN(idInNumber)) {
        return reply.status(400).send({
          success: false,
          message: "Invalid ID",
        });
      }

      try {
        const deletedTodo = await db
          .delete(TodoSchema)
          .where(eq(TodoSchema.id, idInNumber))
          .returning();

        if (deletedTodo.length === 0) {
          return reply.status(404).send({
            success: false,
            message: "Todo not found",
          });
        }

        return reply.status(200).send({
          success: true,
          message: "Todo deleted successfully",
          data: deletedTodo[0],
        });
      } catch (error) {
        console.error(error);

        return reply.status(500).send({
          success: false,
          message: "Internal server error",
        });
      }
    },
  );
};

export default TodoList;
