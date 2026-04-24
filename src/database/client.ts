import {drizzle} from 'drizzle-orm/postgres-js'
import postgres from "postgres";
import * as schema from '../database/schema.ts'

const client = postgres(process.env.DATABASE_URL!, {
    max : 10,
    idle_timeout : 20,
    max_lifetime : 10
})

export const db = drizzle(client, {schema, logger : true})