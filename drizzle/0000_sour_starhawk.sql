CREATE TABLE "todos" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" varchar,
	"status" varchar DEFAULT 'TODO' NOT NULL
);
