import * as migration_20260426_004011 from './20260426_004011'

export const migrations = [
  {
    up: migration_20260426_004011.up,
    down: migration_20260426_004011.down,
    name: '20260426_004011',
  },
]
