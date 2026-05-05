import * as migration_20260426_185555 from './20260426_185555'
import * as migration_20260501_030943_migration_tool from './20260501_030943_migration_tool'
import * as migration_20260501_101528 from './20260501_101528'
import * as migration_20260504_191951 from './20260504_191951'

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
]
