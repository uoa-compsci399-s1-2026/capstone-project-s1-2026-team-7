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
]
