import {
  pgTable,
  text,
  varchar,
  timestamp,
  integer,
} from "drizzle-orm/pg-core";

export const secrets = pgTable("secrets", {
  id: varchar("id", { length: 8 }).primaryKey(),
  expiresAt: timestamp("expires_at").notNull(),
  password: text("password"), // Hashed password
});

export const fragments = pgTable("fragments", {
  id: varchar("id", { length: 8 }).notNull(),
  order: integer("order").notNull(),
  content: text("content").notNull(),
});
