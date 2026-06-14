import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "staff_locales" (
  	"meta_title" varchar,
  	"meta_description" varchar,
  	"meta_image_id" integer,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "footer_locales" (
  	"meta_title" varchar,
  	"meta_description" varchar,
  	"meta_image_id" integer,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "collaborations_page_locales" (
  	"meta_title" varchar,
  	"meta_description" varchar,
  	"meta_image_id" integer,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  ALTER TABLE "studies_locales" ADD COLUMN "meta_title" varchar;
  ALTER TABLE "studies_locales" ADD COLUMN "meta_description" varchar;
  ALTER TABLE "studies_locales" ADD COLUMN "meta_image_id" integer;
  ALTER TABLE "research_locales" ADD COLUMN "meta_title" varchar;
  ALTER TABLE "research_locales" ADD COLUMN "meta_description" varchar;
  ALTER TABLE "research_locales" ADD COLUMN "meta_image_id" integer;
  ALTER TABLE "our_team_page_locales" ADD COLUMN "meta_title" varchar;
  ALTER TABLE "our_team_page_locales" ADD COLUMN "meta_description" varchar;
  ALTER TABLE "our_team_page_locales" ADD COLUMN "meta_image_id" integer;
  ALTER TABLE "donations_page_locales" ADD COLUMN "meta_title" varchar;
  ALTER TABLE "donations_page_locales" ADD COLUMN "meta_description" varchar;
  ALTER TABLE "donations_page_locales" ADD COLUMN "meta_image_id" integer;
  ALTER TABLE "studies_page_locales" ADD COLUMN "meta_title" varchar;
  ALTER TABLE "studies_page_locales" ADD COLUMN "meta_description" varchar;
  ALTER TABLE "studies_page_locales" ADD COLUMN "meta_image_id" integer;
  ALTER TABLE "research_page_locales" ADD COLUMN "meta_title" varchar;
  ALTER TABLE "research_page_locales" ADD COLUMN "meta_description" varchar;
  ALTER TABLE "research_page_locales" ADD COLUMN "meta_image_id" integer;
  ALTER TABLE "contact_page_locales" ADD COLUMN "meta_title" varchar;
  ALTER TABLE "contact_page_locales" ADD COLUMN "meta_description" varchar;
  ALTER TABLE "contact_page_locales" ADD COLUMN "meta_image_id" integer;
  ALTER TABLE "staff_locales" ADD CONSTRAINT "staff_locales_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "staff_locales" ADD CONSTRAINT "staff_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."staff"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_locales" ADD CONSTRAINT "footer_locales_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "footer_locales" ADD CONSTRAINT "footer_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "collaborations_page_locales" ADD CONSTRAINT "collaborations_page_locales_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "collaborations_page_locales" ADD CONSTRAINT "collaborations_page_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."collaborations_page"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "staff_meta_meta_image_idx" ON "staff_locales" USING btree ("meta_image_id","_locale");
  CREATE UNIQUE INDEX "staff_locales_locale_parent_id_unique" ON "staff_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "footer_meta_meta_image_idx" ON "footer_locales" USING btree ("meta_image_id","_locale");
  CREATE UNIQUE INDEX "footer_locales_locale_parent_id_unique" ON "footer_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "collaborations_page_meta_meta_image_idx" ON "collaborations_page_locales" USING btree ("meta_image_id","_locale");
  CREATE UNIQUE INDEX "collaborations_page_locales_locale_parent_id_unique" ON "collaborations_page_locales" USING btree ("_locale","_parent_id");
  ALTER TABLE "studies_locales" ADD CONSTRAINT "studies_locales_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "research_locales" ADD CONSTRAINT "research_locales_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "our_team_page_locales" ADD CONSTRAINT "our_team_page_locales_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "donations_page_locales" ADD CONSTRAINT "donations_page_locales_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "studies_page_locales" ADD CONSTRAINT "studies_page_locales_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "research_page_locales" ADD CONSTRAINT "research_page_locales_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "contact_page_locales" ADD CONSTRAINT "contact_page_locales_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "studies_meta_meta_image_idx" ON "studies_locales" USING btree ("meta_image_id","_locale");
  CREATE INDEX "research_meta_meta_image_idx" ON "research_locales" USING btree ("meta_image_id","_locale");
  CREATE INDEX "our_team_page_meta_meta_image_idx" ON "our_team_page_locales" USING btree ("meta_image_id","_locale");
  CREATE INDEX "donations_page_meta_meta_image_idx" ON "donations_page_locales" USING btree ("meta_image_id","_locale");
  CREATE INDEX "studies_page_meta_meta_image_idx" ON "studies_page_locales" USING btree ("meta_image_id","_locale");
  CREATE INDEX "research_page_meta_meta_image_idx" ON "research_page_locales" USING btree ("meta_image_id","_locale");
  CREATE INDEX "contact_page_meta_meta_image_idx" ON "contact_page_locales" USING btree ("meta_image_id","_locale");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "staff_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "footer_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "collaborations_page_locales" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "staff_locales" CASCADE;
  DROP TABLE "footer_locales" CASCADE;
  DROP TABLE "collaborations_page_locales" CASCADE;
  ALTER TABLE "studies_locales" DROP CONSTRAINT "studies_locales_meta_image_id_media_id_fk";
  
  ALTER TABLE "research_locales" DROP CONSTRAINT "research_locales_meta_image_id_media_id_fk";
  
  ALTER TABLE "our_team_page_locales" DROP CONSTRAINT "our_team_page_locales_meta_image_id_media_id_fk";
  
  ALTER TABLE "donations_page_locales" DROP CONSTRAINT "donations_page_locales_meta_image_id_media_id_fk";
  
  ALTER TABLE "studies_page_locales" DROP CONSTRAINT "studies_page_locales_meta_image_id_media_id_fk";
  
  ALTER TABLE "research_page_locales" DROP CONSTRAINT "research_page_locales_meta_image_id_media_id_fk";
  
  ALTER TABLE "contact_page_locales" DROP CONSTRAINT "contact_page_locales_meta_image_id_media_id_fk";
  
  DROP INDEX "studies_meta_meta_image_idx";
  DROP INDEX "research_meta_meta_image_idx";
  DROP INDEX "our_team_page_meta_meta_image_idx";
  DROP INDEX "donations_page_meta_meta_image_idx";
  DROP INDEX "studies_page_meta_meta_image_idx";
  DROP INDEX "research_page_meta_meta_image_idx";
  DROP INDEX "contact_page_meta_meta_image_idx";
  ALTER TABLE "studies_locales" DROP COLUMN "meta_title";
  ALTER TABLE "studies_locales" DROP COLUMN "meta_description";
  ALTER TABLE "studies_locales" DROP COLUMN "meta_image_id";
  ALTER TABLE "research_locales" DROP COLUMN "meta_title";
  ALTER TABLE "research_locales" DROP COLUMN "meta_description";
  ALTER TABLE "research_locales" DROP COLUMN "meta_image_id";
  ALTER TABLE "our_team_page_locales" DROP COLUMN "meta_title";
  ALTER TABLE "our_team_page_locales" DROP COLUMN "meta_description";
  ALTER TABLE "our_team_page_locales" DROP COLUMN "meta_image_id";
  ALTER TABLE "donations_page_locales" DROP COLUMN "meta_title";
  ALTER TABLE "donations_page_locales" DROP COLUMN "meta_description";
  ALTER TABLE "donations_page_locales" DROP COLUMN "meta_image_id";
  ALTER TABLE "studies_page_locales" DROP COLUMN "meta_title";
  ALTER TABLE "studies_page_locales" DROP COLUMN "meta_description";
  ALTER TABLE "studies_page_locales" DROP COLUMN "meta_image_id";
  ALTER TABLE "research_page_locales" DROP COLUMN "meta_title";
  ALTER TABLE "research_page_locales" DROP COLUMN "meta_description";
  ALTER TABLE "research_page_locales" DROP COLUMN "meta_image_id";
  ALTER TABLE "contact_page_locales" DROP COLUMN "meta_title";
  ALTER TABLE "contact_page_locales" DROP COLUMN "meta_description";
  ALTER TABLE "contact_page_locales" DROP COLUMN "meta_image_id";`)
}
