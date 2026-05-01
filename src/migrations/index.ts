import * as migration_20260426_185555 from './20260426_185555'
import * as migration_20260501_030943_migration_tool from './20260501_030943_migration_tool'

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
]
