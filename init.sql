create table "users" (
  "id" varchar primary key,
  "name" varchar,
  "email" varchar,
  "password" varchar,
  "created_at" timestamp,
  "updated_at" timestamp
);

create unique index "idx_users_email" on "users" ("email");

create table "projects" (
  "id" varchar primary key,
  "name" varchar,
  "user_id" varchar
);

alter table
  "projects"
add
  foreign key ("user_id") references "users" ("id");

create table "tasks" (
  "id" varchar primary key,
  "description" varchar,
  "done" boolean,
  "termination_date" timestamp,
  "project_id" varchar
);

alter table
  "tasks"
add
  foreign key ("project_id") references "projects" ("id");