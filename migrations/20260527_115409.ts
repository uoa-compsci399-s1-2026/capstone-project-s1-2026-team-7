import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_collaborations_page_blocks_stats_section_stats_icon" AS ENUM('GraduationCap', 'BookOpen', 'Handshake', 'UsersRound');
  CREATE TABLE "collaborations_page_blocks_collaboration_hero" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "collaborations_page_blocks_collaboration_hero_locales" (
  	"title" varchar NOT NULL,
  	"description" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "collaborations_page_blocks_partner_logos_logos" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"logo_id" integer NOT NULL
  );
  
  CREATE TABLE "collaborations_page_blocks_partner_logos" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "collaborations_page_blocks_collaboration_areas_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"description" varchar NOT NULL
  );
  
  CREATE TABLE "collaborations_page_blocks_collaboration_areas" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "collaborations_page_blocks_collaborative_approach_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"description" varchar NOT NULL
  );
  
  CREATE TABLE "collaborations_page_blocks_collaborative_approach" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "collaborations_page_blocks_research_enquiries" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar DEFAULT 'Research Enquiries' NOT NULL,
  	"description" varchar DEFAULT 'For enquiries related to research collaborations or partnership opportunities, please contact our team.' NOT NULL,
  	"button_label" varchar DEFAULT 'Contact' NOT NULL,
  	"button_url" varchar DEFAULT '/contact' NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "collaborations_page_blocks_stats_section_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" numeric NOT NULL,
  	"label" varchar NOT NULL,
  	"icon" "enum_collaborations_page_blocks_stats_section_stats_icon" NOT NULL
  );
  
  CREATE TABLE "collaborations_page_blocks_stats_section" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "collaborations_page" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  ALTER TABLE "collaborations_page_blocks_collaboration_hero" ADD CONSTRAINT "collaborations_page_blocks_collaboration_hero_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "collaborations_page_blocks_collaboration_hero" ADD CONSTRAINT "collaborations_page_blocks_collaboration_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."collaborations_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "collaborations_page_blocks_collaboration_hero_locales" ADD CONSTRAINT "collaborations_page_blocks_collaboration_hero_locales_par_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."collaborations_page_blocks_collaboration_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "collaborations_page_blocks_partner_logos_logos" ADD CONSTRAINT "collaborations_page_blocks_partner_logos_logos_logo_id_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "collaborations_page_blocks_partner_logos_logos" ADD CONSTRAINT "collaborations_page_blocks_partner_logos_logos_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."collaborations_page_blocks_partner_logos"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "collaborations_page_blocks_partner_logos" ADD CONSTRAINT "collaborations_page_blocks_partner_logos_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."collaborations_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "collaborations_page_blocks_collaboration_areas_items" ADD CONSTRAINT "collaborations_page_blocks_collaboration_areas_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."collaborations_page_blocks_collaboration_areas"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "collaborations_page_blocks_collaboration_areas" ADD CONSTRAINT "collaborations_page_blocks_collaboration_areas_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."collaborations_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "collaborations_page_blocks_collaborative_approach_items" ADD CONSTRAINT "collaborations_page_blocks_collaborative_approach_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."collaborations_page_blocks_collaborative_approach"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "collaborations_page_blocks_collaborative_approach" ADD CONSTRAINT "collaborations_page_blocks_collaborative_approach_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."collaborations_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "collaborations_page_blocks_research_enquiries" ADD CONSTRAINT "collaborations_page_blocks_research_enquiries_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."collaborations_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "collaborations_page_blocks_stats_section_stats" ADD CONSTRAINT "collaborations_page_blocks_stats_section_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."collaborations_page_blocks_stats_section"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "collaborations_page_blocks_stats_section" ADD CONSTRAINT "collaborations_page_blocks_stats_section_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."collaborations_page"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "collaborations_page_blocks_collaboration_hero_order_idx" ON "collaborations_page_blocks_collaboration_hero" USING btree ("_order");
  CREATE INDEX "collaborations_page_blocks_collaboration_hero_parent_id_idx" ON "collaborations_page_blocks_collaboration_hero" USING btree ("_parent_id");
  CREATE INDEX "collaborations_page_blocks_collaboration_hero_path_idx" ON "collaborations_page_blocks_collaboration_hero" USING btree ("_path");
  CREATE INDEX "collaborations_page_blocks_collaboration_hero_image_idx" ON "collaborations_page_blocks_collaboration_hero" USING btree ("image_id");
  CREATE UNIQUE INDEX "collaborations_page_blocks_collaboration_hero_locales_locale" ON "collaborations_page_blocks_collaboration_hero_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "collaborations_page_blocks_partner_logos_logos_order_idx" ON "collaborations_page_blocks_partner_logos_logos" USING btree ("_order");
  CREATE INDEX "collaborations_page_blocks_partner_logos_logos_parent_id_idx" ON "collaborations_page_blocks_partner_logos_logos" USING btree ("_parent_id");
  CREATE INDEX "collaborations_page_blocks_partner_logos_logos_logo_idx" ON "collaborations_page_blocks_partner_logos_logos" USING btree ("logo_id");
  CREATE INDEX "collaborations_page_blocks_partner_logos_order_idx" ON "collaborations_page_blocks_partner_logos" USING btree ("_order");
  CREATE INDEX "collaborations_page_blocks_partner_logos_parent_id_idx" ON "collaborations_page_blocks_partner_logos" USING btree ("_parent_id");
  CREATE INDEX "collaborations_page_blocks_partner_logos_path_idx" ON "collaborations_page_blocks_partner_logos" USING btree ("_path");
  CREATE INDEX "collaborations_page_blocks_collaboration_areas_items_order_idx" ON "collaborations_page_blocks_collaboration_areas_items" USING btree ("_order");
  CREATE INDEX "collaborations_page_blocks_collaboration_areas_items_parent_id_idx" ON "collaborations_page_blocks_collaboration_areas_items" USING btree ("_parent_id");
  CREATE INDEX "collaborations_page_blocks_collaboration_areas_order_idx" ON "collaborations_page_blocks_collaboration_areas" USING btree ("_order");
  CREATE INDEX "collaborations_page_blocks_collaboration_areas_parent_id_idx" ON "collaborations_page_blocks_collaboration_areas" USING btree ("_parent_id");
  CREATE INDEX "collaborations_page_blocks_collaboration_areas_path_idx" ON "collaborations_page_blocks_collaboration_areas" USING btree ("_path");
  CREATE INDEX "collaborations_page_blocks_collaborative_approach_items_order_idx" ON "collaborations_page_blocks_collaborative_approach_items" USING btree ("_order");
  CREATE INDEX "collaborations_page_blocks_collaborative_approach_items_parent_id_idx" ON "collaborations_page_blocks_collaborative_approach_items" USING btree ("_parent_id");
  CREATE INDEX "collaborations_page_blocks_collaborative_approach_order_idx" ON "collaborations_page_blocks_collaborative_approach" USING btree ("_order");
  CREATE INDEX "collaborations_page_blocks_collaborative_approach_parent_id_idx" ON "collaborations_page_blocks_collaborative_approach" USING btree ("_parent_id");
  CREATE INDEX "collaborations_page_blocks_collaborative_approach_path_idx" ON "collaborations_page_blocks_collaborative_approach" USING btree ("_path");
  CREATE INDEX "collaborations_page_blocks_research_enquiries_order_idx" ON "collaborations_page_blocks_research_enquiries" USING btree ("_order");
  CREATE INDEX "collaborations_page_blocks_research_enquiries_parent_id_idx" ON "collaborations_page_blocks_research_enquiries" USING btree ("_parent_id");
  CREATE INDEX "collaborations_page_blocks_research_enquiries_path_idx" ON "collaborations_page_blocks_research_enquiries" USING btree ("_path");
  CREATE INDEX "collaborations_page_blocks_stats_section_stats_order_idx" ON "collaborations_page_blocks_stats_section_stats" USING btree ("_order");
  CREATE INDEX "collaborations_page_blocks_stats_section_stats_parent_id_idx" ON "collaborations_page_blocks_stats_section_stats" USING btree ("_parent_id");
  CREATE INDEX "collaborations_page_blocks_stats_section_order_idx" ON "collaborations_page_blocks_stats_section" USING btree ("_order");
  CREATE INDEX "collaborations_page_blocks_stats_section_parent_id_idx" ON "collaborations_page_blocks_stats_section" USING btree ("_parent_id");
  CREATE INDEX "collaborations_page_blocks_stats_section_path_idx" ON "collaborations_page_blocks_stats_section" USING btree ("_path");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "collaborations_page_blocks_collaboration_hero" CASCADE;
  DROP TABLE "collaborations_page_blocks_collaboration_hero_locales" CASCADE;
  DROP TABLE "collaborations_page_blocks_partner_logos_logos" CASCADE;
  DROP TABLE "collaborations_page_blocks_partner_logos" CASCADE;
  DROP TABLE "collaborations_page_blocks_collaboration_areas_items" CASCADE;
  DROP TABLE "collaborations_page_blocks_collaboration_areas" CASCADE;
  DROP TABLE "collaborations_page_blocks_collaborative_approach_items" CASCADE;
  DROP TABLE "collaborations_page_blocks_collaborative_approach" CASCADE;
  DROP TABLE "collaborations_page_blocks_research_enquiries" CASCADE;
  DROP TABLE "collaborations_page_blocks_stats_section_stats" CASCADE;
  DROP TABLE "collaborations_page_blocks_stats_section" CASCADE;
  DROP TABLE "collaborations_page" CASCADE;
  DROP TYPE "public"."enum_collaborations_page_blocks_stats_section_stats_icon";`)
}
