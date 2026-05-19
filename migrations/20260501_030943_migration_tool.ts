import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "home_page_partners_section_partners" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"logo_id" integer NOT NULL,
  	"alt" varchar NOT NULL
  );
  
  CREATE TABLE "contact_page" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"hero_image_id" integer,
  	"form_recipient_email" varchar DEFAULT 'example@auckland.ac.nz' NOT NULL,
  	"map_src" varchar DEFAULT 'https://www.google.com/maps?q=18%20Carrick%20Place%2C%20Mt%20Eden%2C%20Auckland%201024%2C%20New%20Zealand&output=embed' NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "contact_page_locales" (
  	"hero_title" varchar DEFAULT 'Contact Us' NOT NULL,
  	"hero_image_alt" varchar DEFAULT 'Contact page hero image',
  	"form_name" varchar DEFAULT 'Name' NOT NULL,
  	"form_email" varchar DEFAULT 'Email Address' NOT NULL,
  	"form_phone" varchar DEFAULT 'Phone Number' NOT NULL,
  	"form_message" varchar DEFAULT 'Your Message' NOT NULL,
  	"form_name_placeholder" varchar DEFAULT 'John Doe',
  	"form_email_placeholder" varchar DEFAULT 'example@gmail.com',
  	"form_phone_placeholder" varchar DEFAULT '0226461819',
  	"form_message_placeholder" varchar DEFAULT 'Let us know how we can help',
  	"form_button_title" varchar DEFAULT 'Send Message' NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "footer_explore_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"footer_u_r_l" varchar NOT NULL
  );
  
  CREATE TABLE "footer_explore_links_locales" (
  	"footer_title" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "footer_support_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"footer_u_r_l" varchar NOT NULL
  );
  
  CREATE TABLE "footer_support_links_locales" (
  	"footer_title" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "footer_social_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"footer_logo_id" integer NOT NULL,
  	"footer_u_r_l" varchar NOT NULL
  );
  
  CREATE TABLE "footer_legal_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"footer_u_r_l" varchar NOT NULL
  );
  
  CREATE TABLE "footer_legal_links_locales" (
  	"footer_title" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "footer" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"uoa_logo_id" integer NOT NULL,
  	"hnu_logo_id" integer NOT NULL,
  	"footer_motif_id" integer NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  ALTER TABLE "pages" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "pages" CASCADE;
  DROP TABLE "_pages_v" CASCADE;
ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT IF EXISTS "payload_locked_documents_rels_pages_fk";  
  ALTER TABLE "studies_locales" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "research_locales" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "home_page_hero_buttons_locales" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "home_page_locales" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "our_team_page_locales" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "studies_page_locales" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "research_page_locales" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "navigation_bar_navbar_links_locales" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "contact_page_locales" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "footer_explore_links_locales" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "footer_support_links_locales" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "footer_legal_links_locales" ALTER COLUMN "_locale" SET DATA TYPE text;
  DROP TYPE "public"."_locales";
  CREATE TYPE "public"."_locales" AS ENUM('en', 'zh');
  ALTER TABLE "studies_locales" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "research_locales" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "home_page_hero_buttons_locales" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "home_page_locales" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "our_team_page_locales" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "studies_page_locales" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "research_page_locales" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "navigation_bar_navbar_links_locales" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "contact_page_locales" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "footer_explore_links_locales" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "footer_support_links_locales" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "footer_legal_links_locales" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
DROP INDEX IF EXISTS "payload_locked_documents_rels_pages_id_idx";  ALTER TABLE "studies" ADD COLUMN "banner_id" integer;
  ALTER TABLE "studies_locales" ADD COLUMN "slug" varchar NOT NULL;
  ALTER TABLE "studies_locales" ADD COLUMN "description" jsonb NOT NULL;
  ALTER TABLE "research" ADD COLUMN "doi" varchar NOT NULL;
  ALTER TABLE "studies_page" ADD COLUMN "banner_id" integer NOT NULL;
  ALTER TABLE "home_page_partners_section_partners" ADD CONSTRAINT "home_page_partners_section_partners_logo_id_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "home_page_partners_section_partners" ADD CONSTRAINT "home_page_partners_section_partners_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "contact_page" ADD CONSTRAINT "contact_page_hero_image_id_media_id_fk" FOREIGN KEY ("hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "contact_page_locales" ADD CONSTRAINT "contact_page_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."contact_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_explore_links" ADD CONSTRAINT "footer_explore_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_explore_links_locales" ADD CONSTRAINT "footer_explore_links_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer_explore_links"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_support_links" ADD CONSTRAINT "footer_support_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_support_links_locales" ADD CONSTRAINT "footer_support_links_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer_support_links"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_social_links" ADD CONSTRAINT "footer_social_links_footer_logo_id_media_id_fk" FOREIGN KEY ("footer_logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "footer_social_links" ADD CONSTRAINT "footer_social_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_legal_links" ADD CONSTRAINT "footer_legal_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_legal_links_locales" ADD CONSTRAINT "footer_legal_links_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer_legal_links"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer" ADD CONSTRAINT "footer_uoa_logo_id_media_id_fk" FOREIGN KEY ("uoa_logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "footer" ADD CONSTRAINT "footer_hnu_logo_id_media_id_fk" FOREIGN KEY ("hnu_logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "footer" ADD CONSTRAINT "footer_footer_motif_id_media_id_fk" FOREIGN KEY ("footer_motif_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "home_page_partners_section_partners_order_idx" ON "home_page_partners_section_partners" USING btree ("_order");
  CREATE INDEX "home_page_partners_section_partners_parent_id_idx" ON "home_page_partners_section_partners" USING btree ("_parent_id");
  CREATE INDEX "home_page_partners_section_partners_logo_idx" ON "home_page_partners_section_partners" USING btree ("logo_id");
  CREATE INDEX "contact_page_hero_image_idx" ON "contact_page" USING btree ("hero_image_id");
  CREATE UNIQUE INDEX "contact_page_locales_locale_parent_id_unique" ON "contact_page_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "footer_explore_links_order_idx" ON "footer_explore_links" USING btree ("_order");
  CREATE INDEX "footer_explore_links_parent_id_idx" ON "footer_explore_links" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "footer_explore_links_locales_locale_parent_id_unique" ON "footer_explore_links_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "footer_support_links_order_idx" ON "footer_support_links" USING btree ("_order");
  CREATE INDEX "footer_support_links_parent_id_idx" ON "footer_support_links" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "footer_support_links_locales_locale_parent_id_unique" ON "footer_support_links_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "footer_social_links_order_idx" ON "footer_social_links" USING btree ("_order");
  CREATE INDEX "footer_social_links_parent_id_idx" ON "footer_social_links" USING btree ("_parent_id");
  CREATE INDEX "footer_social_links_footer_logo_idx" ON "footer_social_links" USING btree ("footer_logo_id");
  CREATE INDEX "footer_legal_links_order_idx" ON "footer_legal_links" USING btree ("_order");
  CREATE INDEX "footer_legal_links_parent_id_idx" ON "footer_legal_links" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "footer_legal_links_locales_locale_parent_id_unique" ON "footer_legal_links_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "footer_uoa_logo_idx" ON "footer" USING btree ("uoa_logo_id");
  CREATE INDEX "footer_hnu_logo_idx" ON "footer" USING btree ("hnu_logo_id");
  CREATE INDEX "footer_footer_motif_idx" ON "footer" USING btree ("footer_motif_id");
  ALTER TABLE "studies" ADD CONSTRAINT "studies_banner_id_media_id_fk" FOREIGN KEY ("banner_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "studies_page" ADD CONSTRAINT "studies_page_banner_id_media_id_fk" FOREIGN KEY ("banner_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "studies_banner_idx" ON "studies" USING btree ("banner_id");
  CREATE INDEX "studies_page_banner_idx" ON "studies_page" USING btree ("banner_id");
  ALTER TABLE "studies" DROP COLUMN "description";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "pages_id";
  DROP TYPE "public"."enum_pages_status";
  DROP TYPE "public"."enum__pages_v_version_status";
  DROP TYPE "public"."enum__pages_v_published_locale";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__pages_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__pages_v_published_locale" AS ENUM('en', 'zh', 'mi');
  ALTER TYPE "public"."_locales" ADD VALUE 'mi';
  CREATE TABLE "pages" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"content" jsonb,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_pages_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "_pages_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_title" varchar,
  	"version_content" jsonb,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__pages_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"snapshot" boolean,
  	"published_locale" "enum__pages_v_published_locale",
  	"latest" boolean,
  	"autosave" boolean
  );
  
  ALTER TABLE "home_page_partners_section_partners" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "contact_page" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "contact_page_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "footer_explore_links" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "footer_explore_links_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "footer_support_links" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "footer_support_links_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "footer_social_links" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "footer_legal_links" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "footer_legal_links_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "footer" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "home_page_partners_section_partners" CASCADE;
  DROP TABLE "contact_page" CASCADE;
  DROP TABLE "contact_page_locales" CASCADE;
  DROP TABLE "footer_explore_links" CASCADE;
  DROP TABLE "footer_explore_links_locales" CASCADE;
  DROP TABLE "footer_support_links" CASCADE;
  DROP TABLE "footer_support_links_locales" CASCADE;
  DROP TABLE "footer_social_links" CASCADE;
  DROP TABLE "footer_legal_links" CASCADE;
  DROP TABLE "footer_legal_links_locales" CASCADE;
  DROP TABLE "footer" CASCADE;
  ALTER TABLE "studies" DROP CONSTRAINT "studies_banner_id_media_id_fk";
  
  ALTER TABLE "studies_page" DROP CONSTRAINT "studies_page_banner_id_media_id_fk";
  
  DROP INDEX "studies_banner_idx";
  DROP INDEX "studies_page_banner_idx";
  ALTER TABLE "studies" ADD COLUMN "description" jsonb NOT NULL;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "pages_id" integer;
  ALTER TABLE "_pages_v" ADD CONSTRAINT "_pages_v_parent_id_pages_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "pages_updated_at_idx" ON "pages" USING btree ("updated_at");
  CREATE INDEX "pages_created_at_idx" ON "pages" USING btree ("created_at");
  CREATE INDEX "pages__status_idx" ON "pages" USING btree ("_status");
  CREATE INDEX "_pages_v_parent_idx" ON "_pages_v" USING btree ("parent_id");
  CREATE INDEX "_pages_v_version_version_updated_at_idx" ON "_pages_v" USING btree ("version_updated_at");
  CREATE INDEX "_pages_v_version_version_created_at_idx" ON "_pages_v" USING btree ("version_created_at");
  CREATE INDEX "_pages_v_version_version__status_idx" ON "_pages_v" USING btree ("version__status");
  CREATE INDEX "_pages_v_created_at_idx" ON "_pages_v" USING btree ("created_at");
  CREATE INDEX "_pages_v_updated_at_idx" ON "_pages_v" USING btree ("updated_at");
  CREATE INDEX "_pages_v_snapshot_idx" ON "_pages_v" USING btree ("snapshot");
  CREATE INDEX "_pages_v_published_locale_idx" ON "_pages_v" USING btree ("published_locale");
  CREATE INDEX "_pages_v_latest_idx" ON "_pages_v" USING btree ("latest");
  CREATE INDEX "_pages_v_autosave_idx" ON "_pages_v" USING btree ("autosave");
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "payload_locked_documents_rels_pages_id_idx" ON "payload_locked_documents_rels" USING btree ("pages_id");
  ALTER TABLE "studies" DROP COLUMN "banner_id";
  ALTER TABLE "studies_locales" DROP COLUMN "slug";
  ALTER TABLE "studies_locales" DROP COLUMN "description";
  ALTER TABLE "research" DROP COLUMN "doi";
  ALTER TABLE "studies_page" DROP COLUMN "banner_id";`)
}
