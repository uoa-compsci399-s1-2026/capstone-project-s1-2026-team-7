import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
  ALTER TABLE "studies" ADD COLUMN IF NOT EXISTS "participant_info_pdf_id" integer;
  ALTER TABLE "studies_page_locales" ADD COLUMN IF NOT EXISTS "detail_template_download_pdf_card_heading" varchar DEFAULT 'Study Documents' NOT NULL;
  ALTER TABLE "studies_page_locales" ADD COLUMN IF NOT EXISTS "detail_template_download_pdf_card_file_label" varchar DEFAULT 'Participant Information Sheet' NOT NULL;
  ALTER TABLE "studies_page_locales" ADD COLUMN IF NOT EXISTS "detail_template_download_pdf_card_file_sub_label" varchar DEFAULT 'PDF' NOT NULL;
  ALTER TABLE "studies_page_locales" ADD COLUMN IF NOT EXISTS "detail_template_download_pdf_card_button_label" varchar DEFAULT 'Download' NOT NULL;
  ALTER TABLE "studies_page_locales" ADD COLUMN IF NOT EXISTS "detail_template_download_pdf_card_helper_text" varchar DEFAULT 'Download the participant information sheet for full details about this study.' NOT NULL;

  DO $$
  BEGIN
    IF NOT EXISTS (
      SELECT 1 FROM pg_constraint WHERE conname = 'studies_participant_info_pdf_id_media_id_fk'
    ) THEN
      ALTER TABLE "studies" ADD CONSTRAINT "studies_participant_info_pdf_id_media_id_fk" FOREIGN KEY ("participant_info_pdf_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
    END IF;
  END $$;

  CREATE INDEX IF NOT EXISTS "studies_participant_info_pdf_idx" ON "studies" USING btree ("participant_info_pdf_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
  ALTER TABLE "studies" DROP CONSTRAINT IF EXISTS "studies_participant_info_pdf_id_media_id_fk";
  DROP INDEX IF EXISTS "studies_participant_info_pdf_idx";
  ALTER TABLE "studies" DROP COLUMN IF EXISTS "participant_info_pdf_id";
  ALTER TABLE "studies_page_locales" DROP COLUMN IF EXISTS "detail_template_download_pdf_card_heading";
  ALTER TABLE "studies_page_locales" DROP COLUMN IF EXISTS "detail_template_download_pdf_card_file_label";
  ALTER TABLE "studies_page_locales" DROP COLUMN IF EXISTS "detail_template_download_pdf_card_file_sub_label";
  ALTER TABLE "studies_page_locales" DROP COLUMN IF EXISTS "detail_template_download_pdf_card_button_label";
  ALTER TABLE "studies_page_locales" DROP COLUMN IF EXISTS "detail_template_download_pdf_card_helper_text";`)
}
