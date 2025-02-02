import "dotenv/config";
import { drizzle } from "drizzle-orm/node-postgres";
import { migrate } from "drizzle-orm/node-postgres/migrator";
import * as schema from "./schema";

const db = drizzle(process.env.DATABASE_URL!, { schema });

// async function runMigrations() {
//   try {
//     await migrate(db, { migrationsFolder: "./drizzle" });
//     console.log("Migrations applied successfully");
//   } catch (err) {
//     console.error("Migration failed:", err);
//     process.exit(1);
//   }
// }

// runMigrations();

export { db };
