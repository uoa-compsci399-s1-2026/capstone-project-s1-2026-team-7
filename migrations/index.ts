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
import * as migration_20260523_135153_add_video_block from './20260523_135153_add_video_block'
import * as migration_20260520_070000_research_csv_tools from './20260520_070000_research_csv_tools'
import * as migration_20260520_234806 from './20260520_234806'
import * as migration_20260521_010122 from './20260521_010122'
import * as migration_20260524_000000_research_csv_deletion_persistence from './20260524_000000_research_csv_deletion_persistence'
import * as migration_20260527_000000_research_optional_doi_link from './20260527_000000_research_optional_doi_link'
import * as migration_20260523_130048 from './20260523_130048'
import * as migration_20260526_000000_donations_cleanup from './20260526_000000_donations_cleanup'
import * as migration_20260527_115409 from './20260527_115409'
import * as migration_20260527_180608 from './20260527_180608'

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
    up: migration_20260523_135153_add_video_block.up,
    down: migration_20260523_135153_add_video_block.down,
    name: '20260523_135153_add_video_block',
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
    up: migration_20260524_000000_research_csv_deletion_persistence.up,
    down: migration_20260524_000000_research_csv_deletion_persistence.down,
    name: '20260524_000000_research_csv_deletion_persistence',
  },
  {
    up: migration_20260527_000000_research_optional_doi_link.up,
    down: migration_20260527_000000_research_optional_doi_link.down,
    name: '20260527_000000_research_optional_doi_link',
    up: migration_20260523_130048.up,
    down: migration_20260523_130048.down,
    name: '20260523_130048',
  },
  {
    up: migration_20260526_000000_donations_cleanup.up,
    down: migration_20260526_000000_donations_cleanup.down,
    name: '20260526_000000_donations_cleanup',
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
]
