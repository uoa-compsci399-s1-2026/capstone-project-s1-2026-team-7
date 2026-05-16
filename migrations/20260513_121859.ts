import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "contact_page" ADD COLUMN "form_name_placeholder" varchar DEFAULT 'John Doe';
  ALTER TABLE "contact_page" ADD COLUMN "form_email_placeholder" varchar DEFAULT 'example@gmail.com';
  ALTER TABLE "contact_page" ADD COLUMN "form_phone_placeholder" varchar DEFAULT '0226461819';
  ALTER TABLE "contact_page" ADD COLUMN "form_message_placeholder" varchar DEFAULT 'Let us know how we can help';
  ALTER TABLE "contact_page" ADD COLUMN "form_enquiry_type_placeholder" varchar DEFAULT 'Please select…';
  ALTER TABLE "contact_page_locales" DROP COLUMN "hero_image_alt";
  ALTER TABLE "contact_page_locales" DROP COLUMN "form_name_placeholder";
  ALTER TABLE "contact_page_locales" DROP COLUMN "form_email_placeholder";
  ALTER TABLE "contact_page_locales" DROP COLUMN "form_phone_placeholder";
  ALTER TABLE "contact_page_locales" DROP COLUMN "form_message_placeholder";
  ALTER TABLE "contact_page_locales" DROP COLUMN "form_enquiry_type_placeholder";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "contact_page_locales" ADD COLUMN "hero_image_alt" varchar DEFAULT 'Contact page hero image';
  ALTER TABLE "contact_page_locales" ADD COLUMN "form_name_placeholder" varchar DEFAULT 'John Doe';
  ALTER TABLE "contact_page_locales" ADD COLUMN "form_email_placeholder" varchar DEFAULT 'example@gmail.com';
  ALTER TABLE "contact_page_locales" ADD COLUMN "form_phone_placeholder" varchar DEFAULT '0226461819';
  ALTER TABLE "contact_page_locales" ADD COLUMN "form_message_placeholder" varchar DEFAULT 'Let us know how we can help';
  ALTER TABLE "contact_page_locales" ADD COLUMN "form_enquiry_type_placeholder" varchar DEFAULT 'Please select…';
  ALTER TABLE "contact_page" DROP COLUMN "form_name_placeholder";
  ALTER TABLE "contact_page" DROP COLUMN "form_email_placeholder";
  ALTER TABLE "contact_page" DROP COLUMN "form_phone_placeholder";
  ALTER TABLE "contact_page" DROP COLUMN "form_message_placeholder";
  ALTER TABLE "contact_page" DROP COLUMN "form_enquiry_type_placeholder";`)
}
