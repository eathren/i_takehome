CREATE TABLE "fragments" (
	"id" varchar(8) NOT NULL,
	"order" integer NOT NULL,
	"content" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "secrets" (
	"id" varchar(8) PRIMARY KEY NOT NULL,
	"expires_at" timestamp NOT NULL,
	"password" text
);
