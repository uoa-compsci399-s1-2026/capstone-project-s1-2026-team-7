import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."_locales" AS ENUM('en', 'zh', 'mi');
  CREATE TYPE "public"."enum_pages_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__pages_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__pages_v_published_locale" AS ENUM('en', 'zh', 'mi');
  CREATE TYPE "public"."enum_home_page_hero_buttons_variant" AS ENUM('primary', 'secondary');
  CREATE TABLE "users_sessions" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"created_at" timestamp(3) with time zone,
  	"expires_at" timestamp(3) with time zone NOT NULL
  );
  
  CREATE TABLE "users" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"email" varchar NOT NULL,
  	"reset_password_token" varchar,
  	"reset_password_expiration" timestamp(3) with time zone,
  	"salt" varchar,
  	"hash" varchar,
  	"login_attempts" numeric DEFAULT 0,
  	"lock_until" timestamp(3) with time zone
  );
  
  CREATE TABLE "media" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"alt" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"url" varchar,
  	"thumbnail_u_r_l" varchar,
  	"filename" varchar,
  	"mime_type" varchar,
  	"filesize" numeric,
  	"width" numeric,
  	"height" numeric,
  	"focal_x" numeric,
  	"focal_y" numeric
  );
  
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
  
  CREATE TABLE "staff" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"firstname" varchar NOT NULL,
  	"lastname" varchar NOT NULL,
  	"orcid" varchar,
  	"job_title" varchar NOT NULL,
  	"intro" varchar,
  	"manager" boolean DEFAULT false NOT NULL,
  	"uoa_profile_link" varchar,
  	"email" varchar,
  	"photo_id" integer,
  	"sort_order" numeric,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "studies" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"description" jsonb NOT NULL,
  	"sort_order" numeric,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "studies_locales" (
  	"title" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "research" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"research_link" varchar NOT NULL,
  	"date" varchar,
  	"order" numeric,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "research_locales" (
  	"title" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "research_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"staff_id" integer,
  	"research_categories_id" integer
  );
  
  CREATE TABLE "research_categories" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"slug" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_kv" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar NOT NULL,
  	"data" jsonb NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"global_slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer,
  	"media_id" integer,
  	"pages_id" integer,
  	"staff_id" integer,
  	"studies_id" integer,
  	"research_id" integer,
  	"research_categories_id" integer
  );
  
  CREATE TABLE "payload_preferences" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar,
  	"value" jsonb,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_preferences_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer
  );
  
  CREATE TABLE "payload_migrations" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"batch" numeric,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "home_page_hero_buttons" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"url" varchar NOT NULL,
  	"variant" "enum_home_page_hero_buttons_variant" DEFAULT 'primary' NOT NULL
  );
  
  CREATE TABLE "home_page_hero_buttons_locales" (
  	"label" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "home_page" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"hero_portrait_hero_image_id" integer NOT NULL,
  	"hero_mobile_hero_image_id" integer NOT NULL,
  	"about_section_portrait_image_id" integer NOT NULL,
  	"about_section_mobile_image_id" integer NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "home_page_locales" (
  	"hero_title" varchar NOT NULL,
  	"hero_description" varchar NOT NULL,
  	"studies_section_title" varchar NOT NULL,
  	"about_section_heading" varchar NOT NULL,
  	"about_section_body" varchar NOT NULL,
  	"seo_meta_title" varchar,
  	"seo_meta_description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "home_page_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"studies_id" integer
  );
  
  CREATE TABLE "our_team_page" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"banner_id" integer,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "our_team_page_locales" (
  	"title" varchar NOT NULL,
  	"board_tab_label" varchar DEFAULT 'Board Of Directors' NOT NULL,
  	"staff_tab_label" varchar DEFAULT 'Research Team' NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "our_team_page_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"staff_id" integer
  );
  
  CREATE TABLE "studies_page" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "studies_page_locales" (
  	"title" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "studies_page_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"studies_id" integer
  );
  
  CREATE TABLE "research_page" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"portrait_image_id" integer NOT NULL,
  	"mobile_image_id" integer NOT NULL,
  	"seo_meta_title" varchar,
  	"seo_meta_description" varchar,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "research_page_locales" (
  	"title" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "research_page_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"research_categories_id" integer
  );
  
  CREATE TABLE "navigation_bar_navbar_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"nav_u_r_l" varchar NOT NULL
  );
  
  CREATE TABLE "navigation_bar_navbar_links_locales" (
  	"nav_title" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "navigation_bar" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"uoa_logo_id" integer NOT NULL,
  	"hnu_logo_id" integer NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  ALTER TABLE "users_sessions" ADD CONSTRAINT "users_sessions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v" ADD CONSTRAINT "_pages_v_parent_id_pages_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "staff" ADD CONSTRAINT "staff_photo_id_media_id_fk" FOREIGN KEY ("photo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "studies_locales" ADD CONSTRAINT "studies_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."studies"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "research_locales" ADD CONSTRAINT "research_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."research"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "research_rels" ADD CONSTRAINT "research_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."research"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "research_rels" ADD CONSTRAINT "research_rels_staff_fk" FOREIGN KEY ("staff_id") REFERENCES "public"."staff"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "research_rels" ADD CONSTRAINT "research_rels_research_categories_fk" FOREIGN KEY ("research_categories_id") REFERENCES "public"."research_categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_locked_documents"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_staff_fk" FOREIGN KEY ("staff_id") REFERENCES "public"."staff"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_studies_fk" FOREIGN KEY ("studies_id") REFERENCES "public"."studies"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_research_fk" FOREIGN KEY ("research_id") REFERENCES "public"."research"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_research_categories_fk" FOREIGN KEY ("research_categories_id") REFERENCES "public"."research_categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_preferences"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_page_hero_buttons" ADD CONSTRAINT "home_page_hero_buttons_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_page_hero_buttons_locales" ADD CONSTRAINT "home_page_hero_buttons_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_page_hero_buttons"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_page" ADD CONSTRAINT "home_page_hero_portrait_hero_image_id_media_id_fk" FOREIGN KEY ("hero_portrait_hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "home_page" ADD CONSTRAINT "home_page_hero_mobile_hero_image_id_media_id_fk" FOREIGN KEY ("hero_mobile_hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "home_page" ADD CONSTRAINT "home_page_about_section_portrait_image_id_media_id_fk" FOREIGN KEY ("about_section_portrait_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "home_page" ADD CONSTRAINT "home_page_about_section_mobile_image_id_media_id_fk" FOREIGN KEY ("about_section_mobile_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "home_page_locales" ADD CONSTRAINT "home_page_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_page_rels" ADD CONSTRAINT "home_page_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."home_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_page_rels" ADD CONSTRAINT "home_page_rels_studies_fk" FOREIGN KEY ("studies_id") REFERENCES "public"."studies"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "our_team_page" ADD CONSTRAINT "our_team_page_banner_id_media_id_fk" FOREIGN KEY ("banner_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "our_team_page_locales" ADD CONSTRAINT "our_team_page_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."our_team_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "our_team_page_rels" ADD CONSTRAINT "our_team_page_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."our_team_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "our_team_page_rels" ADD CONSTRAINT "our_team_page_rels_staff_fk" FOREIGN KEY ("staff_id") REFERENCES "public"."staff"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "studies_page_locales" ADD CONSTRAINT "studies_page_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."studies_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "studies_page_rels" ADD CONSTRAINT "studies_page_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."studies_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "studies_page_rels" ADD CONSTRAINT "studies_page_rels_studies_fk" FOREIGN KEY ("studies_id") REFERENCES "public"."studies"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "research_page" ADD CONSTRAINT "research_page_portrait_image_id_media_id_fk" FOREIGN KEY ("portrait_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "research_page" ADD CONSTRAINT "research_page_mobile_image_id_media_id_fk" FOREIGN KEY ("mobile_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "research_page_locales" ADD CONSTRAINT "research_page_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."research_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "research_page_rels" ADD CONSTRAINT "research_page_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."research_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "research_page_rels" ADD CONSTRAINT "research_page_rels_research_categories_fk" FOREIGN KEY ("research_categories_id") REFERENCES "public"."research_categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "navigation_bar_navbar_links" ADD CONSTRAINT "navigation_bar_navbar_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."navigation_bar"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "navigation_bar_navbar_links_locales" ADD CONSTRAINT "navigation_bar_navbar_links_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."navigation_bar_navbar_links"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "navigation_bar" ADD CONSTRAINT "navigation_bar_uoa_logo_id_media_id_fk" FOREIGN KEY ("uoa_logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "navigation_bar" ADD CONSTRAINT "navigation_bar_hnu_logo_id_media_id_fk" FOREIGN KEY ("hnu_logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "users_sessions_order_idx" ON "users_sessions" USING btree ("_order");
  CREATE INDEX "users_sessions_parent_id_idx" ON "users_sessions" USING btree ("_parent_id");
  CREATE INDEX "users_updated_at_idx" ON "users" USING btree ("updated_at");
  CREATE INDEX "users_created_at_idx" ON "users" USING btree ("created_at");
  CREATE UNIQUE INDEX "users_email_idx" ON "users" USING btree ("email");
  CREATE INDEX "media_updated_at_idx" ON "media" USING btree ("updated_at");
  CREATE INDEX "media_created_at_idx" ON "media" USING btree ("created_at");
  CREATE UNIQUE INDEX "media_filename_idx" ON "media" USING btree ("filename");
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
  CREATE INDEX "staff_photo_idx" ON "staff" USING btree ("photo_id");
  CREATE INDEX "staff_updated_at_idx" ON "staff" USING btree ("updated_at");
  CREATE INDEX "staff_created_at_idx" ON "staff" USING btree ("created_at");
  CREATE INDEX "studies_updated_at_idx" ON "studies" USING btree ("updated_at");
  CREATE INDEX "studies_created_at_idx" ON "studies" USING btree ("created_at");
  CREATE UNIQUE INDEX "studies_locales_locale_parent_id_unique" ON "studies_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "research_updated_at_idx" ON "research" USING btree ("updated_at");
  CREATE INDEX "research_created_at_idx" ON "research" USING btree ("created_at");
  CREATE UNIQUE INDEX "research_locales_locale_parent_id_unique" ON "research_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "research_rels_order_idx" ON "research_rels" USING btree ("order");
  CREATE INDEX "research_rels_parent_idx" ON "research_rels" USING btree ("parent_id");
  CREATE INDEX "research_rels_path_idx" ON "research_rels" USING btree ("path");
  CREATE INDEX "research_rels_staff_id_idx" ON "research_rels" USING btree ("staff_id");
  CREATE INDEX "research_rels_research_categories_id_idx" ON "research_rels" USING btree ("research_categories_id");
  CREATE UNIQUE INDEX "research_categories_slug_idx" ON "research_categories" USING btree ("slug");
  CREATE INDEX "research_categories_updated_at_idx" ON "research_categories" USING btree ("updated_at");
  CREATE INDEX "research_categories_created_at_idx" ON "research_categories" USING btree ("created_at");
  CREATE UNIQUE INDEX "payload_kv_key_idx" ON "payload_kv" USING btree ("key");
  CREATE INDEX "payload_locked_documents_global_slug_idx" ON "payload_locked_documents" USING btree ("global_slug");
  CREATE INDEX "payload_locked_documents_updated_at_idx" ON "payload_locked_documents" USING btree ("updated_at");
  CREATE INDEX "payload_locked_documents_created_at_idx" ON "payload_locked_documents" USING btree ("created_at");
  CREATE INDEX "payload_locked_documents_rels_order_idx" ON "payload_locked_documents_rels" USING btree ("order");
  CREATE INDEX "payload_locked_documents_rels_parent_idx" ON "payload_locked_documents_rels" USING btree ("parent_id");
  CREATE INDEX "payload_locked_documents_rels_path_idx" ON "payload_locked_documents_rels" USING btree ("path");
  CREATE INDEX "payload_locked_documents_rels_users_id_idx" ON "payload_locked_documents_rels" USING btree ("users_id");
  CREATE INDEX "payload_locked_documents_rels_media_id_idx" ON "payload_locked_documents_rels" USING btree ("media_id");
  CREATE INDEX "payload_locked_documents_rels_pages_id_idx" ON "payload_locked_documents_rels" USING btree ("pages_id");
  CREATE INDEX "payload_locked_documents_rels_staff_id_idx" ON "payload_locked_documents_rels" USING btree ("staff_id");
  CREATE INDEX "payload_locked_documents_rels_studies_id_idx" ON "payload_locked_documents_rels" USING btree ("studies_id");
  CREATE INDEX "payload_locked_documents_rels_research_id_idx" ON "payload_locked_documents_rels" USING btree ("research_id");
  CREATE INDEX "payload_locked_documents_rels_research_categories_id_idx" ON "payload_locked_documents_rels" USING btree ("research_categories_id");
  CREATE INDEX "payload_preferences_key_idx" ON "payload_preferences" USING btree ("key");
  CREATE INDEX "payload_preferences_updated_at_idx" ON "payload_preferences" USING btree ("updated_at");
  CREATE INDEX "payload_preferences_created_at_idx" ON "payload_preferences" USING btree ("created_at");
  CREATE INDEX "payload_preferences_rels_order_idx" ON "payload_preferences_rels" USING btree ("order");
  CREATE INDEX "payload_preferences_rels_parent_idx" ON "payload_preferences_rels" USING btree ("parent_id");
  CREATE INDEX "payload_preferences_rels_path_idx" ON "payload_preferences_rels" USING btree ("path");
  CREATE INDEX "payload_preferences_rels_users_id_idx" ON "payload_preferences_rels" USING btree ("users_id");
  CREATE INDEX "payload_migrations_updated_at_idx" ON "payload_migrations" USING btree ("updated_at");
  CREATE INDEX "payload_migrations_created_at_idx" ON "payload_migrations" USING btree ("created_at");
  CREATE INDEX "home_page_hero_buttons_order_idx" ON "home_page_hero_buttons" USING btree ("_order");
  CREATE INDEX "home_page_hero_buttons_parent_id_idx" ON "home_page_hero_buttons" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "home_page_hero_buttons_locales_locale_parent_id_unique" ON "home_page_hero_buttons_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "home_page_hero_hero_portrait_hero_image_idx" ON "home_page" USING btree ("hero_portrait_hero_image_id");
  CREATE INDEX "home_page_hero_hero_mobile_hero_image_idx" ON "home_page" USING btree ("hero_mobile_hero_image_id");
  CREATE INDEX "home_page_about_section_about_section_portrait_image_idx" ON "home_page" USING btree ("about_section_portrait_image_id");
  CREATE INDEX "home_page_about_section_about_section_mobile_image_idx" ON "home_page" USING btree ("about_section_mobile_image_id");
  CREATE UNIQUE INDEX "home_page_locales_locale_parent_id_unique" ON "home_page_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "home_page_rels_order_idx" ON "home_page_rels" USING btree ("order");
  CREATE INDEX "home_page_rels_parent_idx" ON "home_page_rels" USING btree ("parent_id");
  CREATE INDEX "home_page_rels_path_idx" ON "home_page_rels" USING btree ("path");
  CREATE INDEX "home_page_rels_studies_id_idx" ON "home_page_rels" USING btree ("studies_id");
  CREATE INDEX "our_team_page_banner_idx" ON "our_team_page" USING btree ("banner_id");
  CREATE UNIQUE INDEX "our_team_page_locales_locale_parent_id_unique" ON "our_team_page_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "our_team_page_rels_order_idx" ON "our_team_page_rels" USING btree ("order");
  CREATE INDEX "our_team_page_rels_parent_idx" ON "our_team_page_rels" USING btree ("parent_id");
  CREATE INDEX "our_team_page_rels_path_idx" ON "our_team_page_rels" USING btree ("path");
  CREATE INDEX "our_team_page_rels_staff_id_idx" ON "our_team_page_rels" USING btree ("staff_id");
  CREATE UNIQUE INDEX "studies_page_locales_locale_parent_id_unique" ON "studies_page_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "studies_page_rels_order_idx" ON "studies_page_rels" USING btree ("order");
  CREATE INDEX "studies_page_rels_parent_idx" ON "studies_page_rels" USING btree ("parent_id");
  CREATE INDEX "studies_page_rels_path_idx" ON "studies_page_rels" USING btree ("path");
  CREATE INDEX "studies_page_rels_studies_id_idx" ON "studies_page_rels" USING btree ("studies_id");
  CREATE INDEX "research_page_portrait_image_idx" ON "research_page" USING btree ("portrait_image_id");
  CREATE INDEX "research_page_mobile_image_idx" ON "research_page" USING btree ("mobile_image_id");
  CREATE UNIQUE INDEX "research_page_locales_locale_parent_id_unique" ON "research_page_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "research_page_rels_order_idx" ON "research_page_rels" USING btree ("order");
  CREATE INDEX "research_page_rels_parent_idx" ON "research_page_rels" USING btree ("parent_id");
  CREATE INDEX "research_page_rels_path_idx" ON "research_page_rels" USING btree ("path");
  CREATE INDEX "research_page_rels_research_categories_id_idx" ON "research_page_rels" USING btree ("research_categories_id");
  CREATE INDEX "navigation_bar_navbar_links_order_idx" ON "navigation_bar_navbar_links" USING btree ("_order");
  CREATE INDEX "navigation_bar_navbar_links_parent_id_idx" ON "navigation_bar_navbar_links" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "navigation_bar_navbar_links_locales_locale_parent_id_unique" ON "navigation_bar_navbar_links_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "navigation_bar_uoa_logo_idx" ON "navigation_bar" USING btree ("uoa_logo_id");
  CREATE INDEX "navigation_bar_hnu_logo_idx" ON "navigation_bar" USING btree ("hnu_logo_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "users_sessions" CASCADE;
  DROP TABLE "users" CASCADE;
  DROP TABLE "media" CASCADE;
  DROP TABLE "pages" CASCADE;
  DROP TABLE "_pages_v" CASCADE;
  DROP TABLE "staff" CASCADE;
  DROP TABLE "studies" CASCADE;
  DROP TABLE "studies_locales" CASCADE;
  DROP TABLE "research" CASCADE;
  DROP TABLE "research_locales" CASCADE;
  DROP TABLE "research_rels" CASCADE;
  DROP TABLE "research_categories" CASCADE;
  DROP TABLE "payload_kv" CASCADE;
  DROP TABLE "payload_locked_documents" CASCADE;
  DROP TABLE "payload_locked_documents_rels" CASCADE;
  DROP TABLE "payload_preferences" CASCADE;
  DROP TABLE "payload_preferences_rels" CASCADE;
  DROP TABLE "payload_migrations" CASCADE;
  DROP TABLE "home_page_hero_buttons" CASCADE;
  DROP TABLE "home_page_hero_buttons_locales" CASCADE;
  DROP TABLE "home_page" CASCADE;
  DROP TABLE "home_page_locales" CASCADE;
  DROP TABLE "home_page_rels" CASCADE;
  DROP TABLE "our_team_page" CASCADE;
  DROP TABLE "our_team_page_locales" CASCADE;
  DROP TABLE "our_team_page_rels" CASCADE;
  DROP TABLE "studies_page" CASCADE;
  DROP TABLE "studies_page_locales" CASCADE;
  DROP TABLE "studies_page_rels" CASCADE;
  DROP TABLE "research_page" CASCADE;
  DROP TABLE "research_page_locales" CASCADE;
  DROP TABLE "research_page_rels" CASCADE;
  DROP TABLE "navigation_bar_navbar_links" CASCADE;
  DROP TABLE "navigation_bar_navbar_links_locales" CASCADE;
  DROP TABLE "navigation_bar" CASCADE;
  DROP TYPE "public"."_locales";
  DROP TYPE "public"."enum_pages_status";
  DROP TYPE "public"."enum__pages_v_version_status";
  DROP TYPE "public"."enum__pages_v_published_locale";
  DROP TYPE "public"."enum_home_page_hero_buttons_variant";`)
}
