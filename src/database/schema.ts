import { pgTable, serial, varchar } from "drizzle-orm/pg-core";

const TodoSchema = pgTable('todos', {
    id : serial().primaryKey(),
    title : varchar('title'),
    status : varchar('status').notNull().default('TODO')
})

export default TodoSchema;