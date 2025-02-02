import { InferInsertModel, InferSelectModel } from "drizzle-orm";
import { fragments, secrets } from "./schema";

export type NewSecret = InferInsertModel<typeof secrets>;
export type Secret = InferSelectModel<typeof secrets>;

export type Fragment = InferSelectModel<typeof fragments>;
export type NewFragment = InferInsertModel<typeof fragments>;
