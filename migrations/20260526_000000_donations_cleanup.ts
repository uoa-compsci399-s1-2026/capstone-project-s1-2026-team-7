import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    DROP TABLE IF EXISTS "donations_page_partners_locales" CASCADE;
    DROP TABLE IF EXISTS "donations_page_partners" CASCADE;

    ALTER TABLE "donations_page" DROP CONSTRAINT IF EXISTS "donations_page_donation_link_background_image_id_media_id_fk";
    DROP INDEX IF EXISTS "donations_page_donation_link_donation_link_background_im_idx";

    ALTER TABLE "donations_page" DROP COLUMN IF EXISTS "donation_link_background_image_id";
    ALTER TABLE "donations_page" DROP COLUMN IF EXISTS "donation_link_button_url";
    ALTER TABLE "donations_page_locales" DROP COLUMN IF EXISTS "donation_link_title";
    ALTER TABLE "donations_page_locales" DROP COLUMN IF EXISTS "donation_link_description";
    ALTER TABLE "donations_page_locales" DROP COLUMN IF EXISTS "donation_link_button_label";

    ALTER TABLE "donations_page" ADD COLUMN IF NOT EXISTS "hero_donate_url" varchar DEFAULT '' NOT NULL;
    ALTER TABLE "donations_page" ALTER COLUMN "hero_donate_url" DROP DEFAULT;
  `)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "donations_page" DROP COLUMN "hero_donate_url";

    ALTER TABLE "donations_page" ADD COLUMN "donation_link_background_image_id" integer;
    ALTER TABLE "donations_page" ADD COLUMN "donation_link_button_url" varchar;
    ALTER TABLE "donations_page_locales" ADD COLUMN "donation_link_title" varchar;
    ALTER TABLE "donations_page_locales" ADD COLUMN "donation_link_description" varchar;
    ALTER TABLE "donations_page_locales" ADD COLUMN "donation_link_button_label" varchar;

    ALTER TABLE "donations_page" ADD CONSTRAINT "donations_page_donation_link_background_image_id_media_id_fk" FOREIGN KEY ("donation_link_background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
    CREATE INDEX "donations_page_donation_link_donation_link_background_im_idx" ON "donations_page" USING btree ("donation_link_background_image_id");

    CREATE TABLE "donations_page_partners" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "logo_id" integer NOT NULL
    );
    CREATE TABLE "donations_page_partners_locales" (
      "alt" varchar NOT NULL,
      "id" serial PRIMARY KEY NOT NULL,
      "_locale" "_locales" NOT NULL,
      "_parent_id" varchar NOT NULL
    );

    ALTER TABLE "donations_page_partners" ADD CONSTRAINT "donations_page_partners_logo_id_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
    ALTER TABLE "donations_page_partners" ADD CONSTRAINT "donations_page_partners_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."donations_page"("id") ON DELETE cascade ON UPDATE no action;
    ALTER TABLE "donations_page_partners_locales" ADD CONSTRAINT "donations_page_partners_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."donations_page_partners"("id") ON DELETE cascade ON UPDATE no action;

    CREATE INDEX "donations_page_partners_order_idx" ON "donations_page_partners" USING btree ("_order");
    CREATE INDEX "donations_page_partners_parent_id_idx" ON "donations_page_partners" USING btree ("_parent_id");
    CREATE INDEX "donations_page_partners_logo_idx" ON "donations_page_partners" USING btree ("logo_id");
    CREATE UNIQUE INDEX "donations_page_partners_locales_locale_parent_id_unique" ON "donations_page_partners_locales" USING btree ("_locale","_parent_id");
  `)
}
