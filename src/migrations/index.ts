import * as migration_20260426_185555 from './20260426_185555'
import * as migration_20260427_140159 from './20260427_140159'

export const migrations = [
  {
    up: migration_20260426_185555.up,
    down: migration_20260426_185555.down,
    name: '20260426_185555',
  },
  {
    up: migration_20260427_140159.up,
    down: migration_20260427_140159.down,
    name: '20260427_140159',
  },
]
