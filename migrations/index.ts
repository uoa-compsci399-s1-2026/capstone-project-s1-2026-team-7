import * as migration_20260426_185555 from './20260426_185555'
import * as migration_20260501_030943_migration_tool from './20260501_030943_migration_tool'
import * as migration_20260501_101528 from './20260501_101528'
import * as migration_20260504_191951 from './20260504_191951'
import * as migration_20260509_034348 from './20260509_034348'
import * as migration_20260509_050939 from './20260509_050939'
import * as migration_20260509_065637 from './20260509_065637'
import * as migration_20260509_070050 from './20260509_070050'
import * as migration_20260512_152526 from './20260512_152526'
import * as migration_20260513_121859 from './20260513_121859'
import * as migration_20260513_123521 from './20260513_123521'
import * as migration_20260513_164709 from './20260513_164709'
import * as migration_20260513_173014 from './20260513_173014'
import * as migration_20260520_070000_research_csv_tools from './20260520_070000_research_csv_tools'
import * as migration_20260520_234806 from './20260520_234806'
import * as migration_20260521_010122 from './20260521_010122'
import * as migration_20260523_130048 from './20260523_130048'
import * as migration_20260523_135153_add_video_block from './20260523_135153_add_video_block'
import * as migration_20260524_000000_research_csv_deletion_persistence from './20260524_000000_research_csv_deletion_persistence'
import * as migration_20260526_000000_donations_cleanup from './20260526_000000_donations_cleanup'
import * as migration_20260527_000000_research_optional_doi_link from './20260527_000000_research_optional_doi_link'
import * as migration_20260527_115409 from './20260527_115409'
import * as migration_20260527_180608 from './20260527_180608'
import * as migration_20260601_133919_add_participant_info_pdf_field from './20260601_133919_add_participant_info_pdf_field'
import * as migration_20260601_141351_add_documents_collection from './20260601_141351_add_documents_collection'
import * as migration_20260604_000904_add_documents_and_translation_approval from './20260604_000904_add_documents_and_translation_approval'
import * as migration_20260605_030000_research_keywords_and_search_text from './20260605_030000_research_keywords_and_search_text'
import * as migration_20260606_091408 from './20260606_091408'
import * as migration_20260613_155220 from './20260613_155220'
import * as migration_20260614_070306 from './20260614_070306'
import * as migration_20260614_165808_add_seo_homepage_fields from './20260614_165808_add_seo_homepage_fields'
import * as migration_20260614_171530 from './20260614_171530'
import * as migration_20260615_125201 from './20260615_125201'
import * as migration_20260615_154718 from './20260615_154718'
import * as migration_20260615_170630 from './20260615_170630'
import * as migration_20260615_174133 from './20260615_174133'
import * as migration_20260615_182651 from './20260615_182651'
import * as migration_20260615_192543 from './20260615_192543'
import * as migration_20260616_024913 from './20260616_024913'
import * as migration_20260616_070251 from './20260616_070251'
import * as migration_20260616_110013 from './20260616_110013'
import * as migration_20260616_112123 from './20260616_112123'

export const migrations = [
  {
    up: migration_20260426_185555.up,
    down: migration_20260426_185555.down,
    name: '20260426_185555',
  },
  {
    up: migration_20260501_030943_migration_tool.up,
    down: migration_20260501_030943_migration_tool.down,
    name: '20260501_030943_migration_tool',
  },
  {
    up: migration_20260501_101528.up,
    down: migration_20260501_101528.down,
    name: '20260501_101528',
  },
  {
    up: migration_20260504_191951.up,
    down: migration_20260504_191951.down,
    name: '20260504_191951',
  },
  {
    up: migration_20260509_034348.up,
    down: migration_20260509_034348.down,
    name: '20260509_034348',
  },
  {
    up: migration_20260509_050939.up,
    down: migration_20260509_050939.down,
    name: '20260509_050939',
  },
  {
    up: migration_20260509_065637.up,
    down: migration_20260509_065637.down,
    name: '20260509_065637',
  },
  {
    up: migration_20260509_070050.up,
    down: migration_20260509_070050.down,
    name: '20260509_070050',
  },
  {
    up: migration_20260512_152526.up,
    down: migration_20260512_152526.down,
    name: '20260512_152526',
  },
  {
    up: migration_20260513_121859.up,
    down: migration_20260513_121859.down,
    name: '20260513_121859',
  },
  {
    up: migration_20260513_123521.up,
    down: migration_20260513_123521.down,
    name: '20260513_123521',
  },
  {
    up: migration_20260513_164709.up,
    down: migration_20260513_164709.down,
    name: '20260513_164709',
  },
  {
    up: migration_20260513_173014.up,
    down: migration_20260513_173014.down,
    name: '20260513_173014',
  },
  {
    up: migration_20260520_070000_research_csv_tools.up,
    down: migration_20260520_070000_research_csv_tools.down,
    name: '20260520_070000_research_csv_tools',
  },
  {
    up: migration_20260520_234806.up,
    down: migration_20260520_234806.down,
    name: '20260520_234806',
  },
  {
    up: migration_20260521_010122.up,
    down: migration_20260521_010122.down,
    name: '20260521_010122',
  },
  {
    up: migration_20260523_130048.up,
    down: migration_20260523_130048.down,
    name: '20260523_130048',
  },
  {
    up: migration_20260523_135153_add_video_block.up,
    down: migration_20260523_135153_add_video_block.down,
    name: '20260523_135153_add_video_block',
  },
  {
    up: migration_20260524_000000_research_csv_deletion_persistence.up,
    down: migration_20260524_000000_research_csv_deletion_persistence.down,
    name: '20260524_000000_research_csv_deletion_persistence',
  },
  {
    up: migration_20260526_000000_donations_cleanup.up,
    down: migration_20260526_000000_donations_cleanup.down,
    name: '20260526_000000_donations_cleanup',
  },
  {
    up: migration_20260527_000000_research_optional_doi_link.up,
    down: migration_20260527_000000_research_optional_doi_link.down,
    name: '20260527_000000_research_optional_doi_link',
  },
  {
    up: migration_20260527_115409.up,
    down: migration_20260527_115409.down,
    name: '20260527_115409',
  },
  {
    up: migration_20260527_180608.up,
    down: migration_20260527_180608.down,
    name: '20260527_180608',
  },
  {
    up: migration_20260601_133919_add_participant_info_pdf_field.up,
    down: migration_20260601_133919_add_participant_info_pdf_field.down,
    name: '20260601_133919_add_participant_info_pdf_field',
  },
  {
    up: migration_20260601_141351_add_documents_collection.up,
    down: migration_20260601_141351_add_documents_collection.down,
    name: '20260601_141351_add_documents_collection',
  },
  {
    up: migration_20260604_000904_add_documents_and_translation_approval.up,
    down: migration_20260604_000904_add_documents_and_translation_approval.down,
    name: '20260604_000904_add_documents_and_translation_approval',
  },
  {
    up: migration_20260605_030000_research_keywords_and_search_text.up,
    down: migration_20260605_030000_research_keywords_and_search_text.down,
    name: '20260605_030000_research_keywords_and_search_text',
  },
  {
    up: migration_20260606_091408.up,
    down: migration_20260606_091408.down,
    name: '20260606_091408',
  },
  {
    up: migration_20260613_155220.up,
    down: migration_20260613_155220.down,
    name: '20260613_155220',
  },
  {
    up: migration_20260614_070306.up,
    down: migration_20260614_070306.down,
    name: '20260614_070306',
  },
  {
    up: migration_20260614_165808_add_seo_homepage_fields.up,
    down: migration_20260614_165808_add_seo_homepage_fields.down,
    name: '20260614_165808_add_seo_homepage_fields',
  },
  {
    up: migration_20260614_171530.up,
    down: migration_20260614_171530.down,
    name: '20260614_171530',
  },
  {
    up: migration_20260615_125201.up,
    down: migration_20260615_125201.down,
    name: '20260615_125201',
  },
  {
    up: migration_20260615_154718.up,
    down: migration_20260615_154718.down,
    name: '20260615_154718',
  },
  {
    up: migration_20260615_170630.up,
    down: migration_20260615_170630.down,
    name: '20260615_170630',
  },
  {
    up: migration_20260615_174133.up,
    down: migration_20260615_174133.down,
    name: '20260615_174133',
  },
  {
    up: migration_20260615_182651.up,
    down: migration_20260615_182651.down,
    name: '20260615_182651',
  },
  {
    up: migration_20260615_192543.up,
    down: migration_20260615_192543.down,
    name: '20260615_192543',
  },
  {
    up: migration_20260616_024913.up,
    down: migration_20260616_024913.down,
    name: '20260616_024913',
  },
  {
    up: migration_20260616_070251.up,
    down: migration_20260616_070251.down,
    name: '20260616_070251',
  },
  {
    up: migration_20260616_110013.up,
    down: migration_20260616_110013.down,
    name: '20260616_110013',
  },
  {
    up: migration_20260616_112123.up,
    down: migration_20260616_112123.down,
    name: '20260616_112123',
  },
]
