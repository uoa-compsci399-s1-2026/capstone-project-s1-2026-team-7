import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
  CREATE TABLE "home_page_blocks_video_videos" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"url" varchar NOT NULL
  );
  
  CREATE TABLE "home_page_blocks_video_videos_locales" (
  	"title" varchar,
  	"caption" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "home_page_blocks_video" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "home_page_blocks_video_locales" (
  	"title" varchar DEFAULT 'Media' NOT NULL,
  	"description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  ALTER TABLE "home_page_blocks_video_videos" ADD CONSTRAINT "home_page_blocks_video_videos_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_page_blocks_video"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_page_blocks_video_videos_locales" ADD CONSTRAINT "home_page_blocks_video_videos_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_page_blocks_video_videos"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_page_blocks_video" ADD CONSTRAINT "home_page_blocks_video_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_page_blocks_video_locales" ADD CONSTRAINT "home_page_blocks_video_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_page_blocks_video"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "home_page_blocks_video_videos_order_idx" ON "home_page_blocks_video_videos" USING btree ("_order");
  CREATE INDEX "home_page_blocks_video_videos_parent_id_idx" ON "home_page_blocks_video_videos" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "home_page_blocks_video_videos_locales_locale_parent_id_uniqu" ON "home_page_blocks_video_videos_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "home_page_blocks_video_order_idx" ON "home_page_blocks_video" USING btree ("_order");
  CREATE INDEX "home_page_blocks_video_parent_id_idx" ON "home_page_blocks_video" USING btree ("_parent_id");
  CREATE INDEX "home_page_blocks_video_path_idx" ON "home_page_blocks_video" USING btree ("_path");
  CREATE UNIQUE INDEX "home_page_blocks_video_locales_locale_parent_id_unique" ON "home_page_blocks_video_locales" USING btree ("_locale","_parent_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
  DROP TABLE "home_page_blocks_video_videos" CASCADE;
  DROP TABLE "home_page_blocks_video_videos_locales" CASCADE;
  DROP TABLE "home_page_blocks_video" CASCADE;
  DROP TABLE "home_page_blocks_video_locales" CASCADE;`)
}
