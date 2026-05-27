import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS "home_page_blocks_current_studies" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "_path" text NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "block_name" varchar
    );

    DO $$
    BEGIN
      IF EXISTS (
        SELECT 1
        FROM information_schema.columns
        WHERE table_schema = 'public'
          AND table_name = 'studies_page'
          AND column_name = 'banner_id'
      )
      AND NOT EXISTS (
        SELECT 1
        FROM information_schema.columns
        WHERE table_schema = 'public'
          AND table_name = 'studies_page'
          AND column_name = 'listing_page_banner_id'
      ) THEN
        ALTER TABLE "studies_page" RENAME COLUMN "banner_id" TO "listing_page_banner_id";
      END IF;
    END $$;

    ALTER TABLE "studies_page" DROP CONSTRAINT IF EXISTS "studies_page_banner_id_media_id_fk";
    ALTER TABLE "studies_page" DROP CONSTRAINT IF EXISTS "studies_page_listing_page_banner_id_media_id_fk";

    DROP INDEX IF EXISTS "studies_page_banner_idx";
    DROP INDEX IF EXISTS "studies_page_listing_page_listing_page_banner_idx";

    ALTER TABLE "studies_page" ALTER COLUMN "contact_email" SET DEFAULT 'HNU_SYNERGY@auckland.ac.nz';
    ALTER TABLE "studies_page" ALTER COLUMN "contact_phone" SET DEFAULT '021 0919 5443';
    ALTER TABLE "studies_page_locales" ALTER COLUMN "contact_address" SET DEFAULT '18 Carrick Place, Mount Eden, Auckland 1024';

    DO $$
    BEGIN
      IF EXISTS (
        SELECT 1
        FROM information_schema.columns
        WHERE table_schema = 'public'
          AND table_name = 'studies_page_locales'
          AND column_name = 'title'
      )
      AND NOT EXISTS (
        SELECT 1
        FROM information_schema.columns
        WHERE table_schema = 'public'
          AND table_name = 'studies_page_locales'
          AND column_name = 'listing_page_title'
      ) THEN
        ALTER TABLE "studies_page_locales" RENAME COLUMN "title" TO "listing_page_title";
      END IF;
    END $$;

    ALTER TABLE "studies_page_locales" ADD COLUMN IF NOT EXISTS "listing_page_title" varchar DEFAULT 'Studies' NOT NULL;

    DO $$
    BEGIN
      IF EXISTS (
        SELECT 1
        FROM information_schema.columns
        WHERE table_schema = 'public'
          AND table_name = 'studies_page_locales'
          AND column_name = 'title'
      ) THEN
        EXECUTE 'UPDATE "studies_page_locales" SET "listing_page_title" = COALESCE(NULLIF("listing_page_title", ''''), "title")';
        ALTER TABLE "studies_page_locales" DROP COLUMN "title";
      END IF;
    END $$;

    ALTER TABLE "studies_page_locales" ADD COLUMN IF NOT EXISTS "detail_template_back_button_label" varchar DEFAULT 'Studies' NOT NULL;
    ALTER TABLE "studies_page_locales" ADD COLUMN IF NOT EXISTS "detail_template_hero_stats_duration_label" varchar DEFAULT 'Duration' NOT NULL;
    ALTER TABLE "studies_page_locales" ADD COLUMN IF NOT EXISTS "detail_template_hero_stats_compensation_label" varchar DEFAULT 'Compensation' NOT NULL;
    ALTER TABLE "studies_page_locales" ADD COLUMN IF NOT EXISTS "detail_template_hero_stats_location_label" varchar DEFAULT 'Location' NOT NULL;
    ALTER TABLE "studies_page_locales" ADD COLUMN IF NOT EXISTS "detail_template_about_section_eyebrow" varchar DEFAULT 'About' NOT NULL;
    ALTER TABLE "studies_page_locales" ADD COLUMN IF NOT EXISTS "detail_template_about_section_heading" varchar DEFAULT 'Why this study matters' NOT NULL;
    ALTER TABLE "studies_page_locales" ADD COLUMN IF NOT EXISTS "detail_template_participation_section_eyebrow" varchar DEFAULT 'Participation' NOT NULL;
    ALTER TABLE "studies_page_locales" ADD COLUMN IF NOT EXISTS "detail_template_participation_section_heading" varchar DEFAULT 'What you''ll be asked to do' NOT NULL;
    ALTER TABLE "studies_page_locales" ADD COLUMN IF NOT EXISTS "detail_template_eligibility_section_eyebrow" varchar DEFAULT 'Eligibility' NOT NULL;
    ALTER TABLE "studies_page_locales" ADD COLUMN IF NOT EXISTS "detail_template_eligibility_section_heading" varchar DEFAULT 'Who we''re looking for' NOT NULL;
    ALTER TABLE "studies_page_locales" ADD COLUMN IF NOT EXISTS "detail_template_eligibility_section_inclusion_heading" varchar DEFAULT 'You can join if' NOT NULL;
    ALTER TABLE "studies_page_locales" ADD COLUMN IF NOT EXISTS "detail_template_eligibility_section_exclusion_heading" varchar DEFAULT 'You cannot join if' NOT NULL;
    ALTER TABLE "studies_page_locales" ADD COLUMN IF NOT EXISTS "detail_template_faq_section_eyebrow" varchar DEFAULT 'FAQ' NOT NULL;
    ALTER TABLE "studies_page_locales" ADD COLUMN IF NOT EXISTS "detail_template_faq_section_heading" varchar DEFAULT 'Common questions' NOT NULL;
    ALTER TABLE "studies_page_locales" ADD COLUMN IF NOT EXISTS "detail_template_apply_card_eyebrow" varchar DEFAULT 'Apply' NOT NULL;
    ALTER TABLE "studies_page_locales" ADD COLUMN IF NOT EXISTS "detail_template_apply_card_heading" varchar DEFAULT 'Check if you''re eligible' NOT NULL;
    ALTER TABLE "studies_page_locales" ADD COLUMN IF NOT EXISTS "detail_template_apply_card_button_label" varchar DEFAULT 'Take eligibility Survey' NOT NULL;
    ALTER TABLE "studies_page_locales" ADD COLUMN IF NOT EXISTS "detail_template_apply_card_helper_text" varchar DEFAULT 'Survey takes ~5 min. We''ll contact you within 2 working days if you qualify for screening.' NOT NULL;
    ALTER TABLE "studies_page_locales" ADD COLUMN IF NOT EXISTS "detail_template_ethics_card_heading" varchar DEFAULT 'Ethics approved' NOT NULL;
    ALTER TABLE "studies_page_locales" ADD COLUMN IF NOT EXISTS "detail_template_ethics_card_approved_by_prefix" varchar DEFAULT 'Approved by the' NOT NULL;
    ALTER TABLE "studies_page_locales" ADD COLUMN IF NOT EXISTS "detail_template_ethics_card_committee_name" varchar DEFAULT 'Southern Health and Disability Ethics Committee' NOT NULL;
    ALTER TABLE "studies_page_locales" ADD COLUMN IF NOT EXISTS "detail_template_contact_card_heading" varchar DEFAULT 'Contact' NOT NULL;

    DO $$
    BEGIN
      IF NOT EXISTS (
        SELECT 1 FROM pg_constraint
        WHERE conname = 'home_page_blocks_current_studies_parent_id_fk'
      ) THEN
        ALTER TABLE "home_page_blocks_current_studies"
        ADD CONSTRAINT "home_page_blocks_current_studies_parent_id_fk"
        FOREIGN KEY ("_parent_id")
        REFERENCES "public"."home_page"("id")
        ON DELETE cascade
        ON UPDATE no action;
      END IF;
    END $$;

    CREATE INDEX IF NOT EXISTS "home_page_blocks_current_studies_order_idx" ON "home_page_blocks_current_studies" USING btree ("_order");
    CREATE INDEX IF NOT EXISTS "home_page_blocks_current_studies_parent_id_idx" ON "home_page_blocks_current_studies" USING btree ("_parent_id");
    CREATE INDEX IF NOT EXISTS "home_page_blocks_current_studies_path_idx" ON "home_page_blocks_current_studies" USING btree ("_path");

    DO $$
    BEGIN
      IF EXISTS (
        SELECT 1
        FROM information_schema.columns
        WHERE table_schema = 'public'
          AND table_name = 'studies_page'
          AND column_name = 'listing_page_banner_id'
      )
      AND NOT EXISTS (
        SELECT 1 FROM pg_constraint
        WHERE conname = 'studies_page_listing_page_banner_id_media_id_fk'
      ) THEN
        ALTER TABLE "studies_page"
        ADD CONSTRAINT "studies_page_listing_page_banner_id_media_id_fk"
        FOREIGN KEY ("listing_page_banner_id")
        REFERENCES "public"."media"("id")
        ON DELETE set null
        ON UPDATE no action;
      END IF;
    END $$;

    CREATE INDEX IF NOT EXISTS "studies_page_listing_page_listing_page_banner_idx" ON "studies_page" USING btree ("listing_page_banner_id");
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "home_page_blocks_current_studies" DROP CONSTRAINT IF EXISTS "home_page_blocks_current_studies_parent_id_fk";
    DROP TABLE IF EXISTS "home_page_blocks_current_studies" CASCADE;

    ALTER TABLE "studies_page" DROP CONSTRAINT IF EXISTS "studies_page_listing_page_banner_id_media_id_fk";
    DROP INDEX IF EXISTS "studies_page_listing_page_listing_page_banner_idx";

    DO $$
    BEGIN
      IF EXISTS (
        SELECT 1
        FROM information_schema.columns
        WHERE table_schema = 'public'
          AND table_name = 'studies_page'
          AND column_name = 'listing_page_banner_id'
      )
      AND NOT EXISTS (
        SELECT 1
        FROM information_schema.columns
        WHERE table_schema = 'public'
          AND table_name = 'studies_page'
          AND column_name = 'banner_id'
      ) THEN
        ALTER TABLE "studies_page" RENAME COLUMN "listing_page_banner_id" TO "banner_id";
      END IF;
    END $$;

    ALTER TABLE "studies_page" ALTER COLUMN "contact_email" DROP DEFAULT;
    ALTER TABLE "studies_page" ALTER COLUMN "contact_phone" DROP DEFAULT;
    ALTER TABLE "studies_page_locales" ALTER COLUMN "contact_address" DROP DEFAULT;

    DO $$
    BEGIN
      IF EXISTS (
        SELECT 1
        FROM information_schema.columns
        WHERE table_schema = 'public'
          AND table_name = 'studies_page_locales'
          AND column_name = 'listing_page_title'
      )
      AND NOT EXISTS (
        SELECT 1
        FROM information_schema.columns
        WHERE table_schema = 'public'
          AND table_name = 'studies_page_locales'
          AND column_name = 'title'
      ) THEN
        ALTER TABLE "studies_page_locales" RENAME COLUMN "listing_page_title" TO "title";
      END IF;
    END $$;

    ALTER TABLE "studies_page_locales" DROP COLUMN IF EXISTS "detail_template_back_button_label";
    ALTER TABLE "studies_page_locales" DROP COLUMN IF EXISTS "detail_template_hero_stats_duration_label";
    ALTER TABLE "studies_page_locales" DROP COLUMN IF EXISTS "detail_template_hero_stats_compensation_label";
    ALTER TABLE "studies_page_locales" DROP COLUMN IF EXISTS "detail_template_hero_stats_location_label";
    ALTER TABLE "studies_page_locales" DROP COLUMN IF EXISTS "detail_template_about_section_eyebrow";
    ALTER TABLE "studies_page_locales" DROP COLUMN IF EXISTS "detail_template_about_section_heading";
    ALTER TABLE "studies_page_locales" DROP COLUMN IF EXISTS "detail_template_participation_section_eyebrow";
    ALTER TABLE "studies_page_locales" DROP COLUMN IF EXISTS "detail_template_participation_section_heading";
    ALTER TABLE "studies_page_locales" DROP COLUMN IF EXISTS "detail_template_eligibility_section_eyebrow";
    ALTER TABLE "studies_page_locales" DROP COLUMN IF EXISTS "detail_template_eligibility_section_heading";
    ALTER TABLE "studies_page_locales" DROP COLUMN IF EXISTS "detail_template_eligibility_section_inclusion_heading";
    ALTER TABLE "studies_page_locales" DROP COLUMN IF EXISTS "detail_template_eligibility_section_exclusion_heading";
    ALTER TABLE "studies_page_locales" DROP COLUMN IF EXISTS "detail_template_faq_section_eyebrow";
    ALTER TABLE "studies_page_locales" DROP COLUMN IF EXISTS "detail_template_faq_section_heading";
    ALTER TABLE "studies_page_locales" DROP COLUMN IF EXISTS "detail_template_apply_card_eyebrow";
    ALTER TABLE "studies_page_locales" DROP COLUMN IF EXISTS "detail_template_apply_card_heading";
    ALTER TABLE "studies_page_locales" DROP COLUMN IF EXISTS "detail_template_apply_card_button_label";
    ALTER TABLE "studies_page_locales" DROP COLUMN IF EXISTS "detail_template_apply_card_helper_text";
    ALTER TABLE "studies_page_locales" DROP COLUMN IF EXISTS "detail_template_ethics_card_heading";
    ALTER TABLE "studies_page_locales" DROP COLUMN IF EXISTS "detail_template_ethics_card_approved_by_prefix";
    ALTER TABLE "studies_page_locales" DROP COLUMN IF EXISTS "detail_template_ethics_card_committee_name";
    ALTER TABLE "studies_page_locales" DROP COLUMN IF EXISTS "detail_template_contact_card_heading";
  `)
}
