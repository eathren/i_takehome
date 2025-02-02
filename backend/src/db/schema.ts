import {
  pgTable,
  text,
  varchar,
  timestamp,
  boolean,
} from "drizzle-orm/pg-core";

export const secrets = pgTable("secrets", {
  id: varchar("id", { length: 8 }).primaryKey(),
  content: text("content").notNull(),
  password: text("password"),
  expiresAt: timestamp("expires_at").notNull(),
  accessed: boolean("accessed").default(false),
});
