# Neon Branch Sync, Autopush, and Payload Migration Workflow

This document explains how our database workflow works when using Neon branches, Payload CMS, and migrations.

The goal is simple:

- Each developer works against their own Neon database branch.
- The `main` Git branch points to the `production` Neon branch.
- Feature branches should not accidentally change production.
- Database schema changes should be made using Payload migrations, not random local schema pushes.

---

## 1. Main idea

We use a Neon branch sync script to automatically connect your local `.env` file to the correct Neon database branch.

When you run the sync command, the script:

1. Checks your current Git branch.
2. Decides which Neon branch you should use.
3. Creates that Neon branch if it does not already exist.
4. Gets the database connection string for that Neon branch.
5. Updates your local `.env` file.
6. Tells you to restart the dev server if it is already running.

This means you should not manually copy and paste database URLs every time you change branches.

---

## 2. Branch mapping rules

The sync script uses the current Git branch name to choose the Neon branch.

### Main branch

If your Git branch is:

```bash
main
```

then your Neon branch will be:

```bash
production
```

### Developer branches

For non-main branches, the script looks at the first word before the first dash.

For example:

| Git branch              | Neon branch |
| ----------------------- | ----------- |
| `james-homepage-fix`    | `james`     |
| `kelvin-footer-update`  | `kelvin`    |
| `ayush-studies-page`    | `ayush`     |
| `rahul-research-schema` | `rahul`     |

The accepted owner names are:

```txt
kelvin, ayush, carl, johnathan, james, rahul
```

So our branch names should normally start with one of those names.

Good examples:

```bash
james-fix-navbar
kelvin-update-footer
ayush-add-study-fields
rahul-research-migration
```

Bad examples:

```bash
fix-navbar
feature/studies-page
new-schema-test
```

Those bad examples may fall back to the `production` Neon branch, which is risky.

---

## 3. First-time setup

Before running anything, install dependencies:

```bash
npm install
```

This is required because the sync script expects the local Neon CLI to exist inside:

```bash
node_modules/.bin/neonctl
```

On Windows, it uses:

```bash
node_modules/.bin/neonctl.cmd
```

You also need your Neon environment variables in `.env`:

```env
NEON_API_KEY=your_neon_api_key
NEON_PROJECT_ID=your_neon_project_id
```

The script can fall back to local Neon CLI authentication if those are missing, but it is safer and clearer to have them in `.env`.

---

## 4. Syncing your local database branch

Run this whenever you switch Git branches:

```bash
npm run db:sync-branch
```

This updates your `.env` file with:

```env
DATABASE_URL=...
NEON_BRANCH=...
GIT_BRANCH=...
```

After running this, restart the dev server.

Example:

```bash
git checkout james-add-staff-fields
npm run db:sync-branch
npm run dev
```

If your dev server was already running, stop it and start it again:

```bash
Ctrl + C
npm run dev
```

This is needed because Next/Payload will not always reload the changed `DATABASE_URL` while the server is already running.

---

## 5. What autopush means

Autopush means Payload is allowed to push schema changes directly to the connected database.

This can be useful while quickly testing locally, but it can also be dangerous because it may change the database schema without creating a migration file.

For proper team work, migrations are safer because they create a clear history of database changes.

### Recommended rule

Use autopush only for quick local experiments.

Use migrations for any real schema change that will be committed to Git.

### Safe default

For normal development, use:

```env
AUTOPUSH=false
```

This means schema changes should not be silently pushed to the database. Instead, you should create and run migrations.

---

## 6. Normal development workflow

### Step 1: Create a feature branch

Use your name at the start of the branch:

```bash
git checkout -b james-add-staff-bio-field
```

### Step 2: Sync to your Neon branch

```bash
npm run db:sync-branch
```

Check your `.env` and make sure it says something like:

```env
NEON_BRANCH=james
GIT_BRANCH=james-add-staff-bio-field
```

### Step 3: Start the dev server

```bash
npm run dev
```

### Step 4: Make your Payload schema change

For example, you might edit a collection or global config and add a field.

Example:

```ts
{
  name: 'bio',
  type: 'textarea',
  localized: true,
}
```

### Step 5: Create a migration

Run:

```bash
npm run payload -- migrate:create add-staff-bio-field
```

Use a clear migration name.

Good names:

```bash
add-staff-bio-field
add-study-banner-field
create-contact-page-global
update-research-category-schema
```

Bad names:

```bash
fix
changes
migration1
test
```

### Step 6: Review the migration file

Payload will generate a migration file. Read it before running it.

Check for risky operations such as:

- Dropping tables
- Dropping columns
- Adding a required field with no default
- Renaming columns in a way that may lose data
- Large unexpected changes unrelated to your work

Be extra careful if you see warnings about data loss.

### Step 7: Run the migration locally

```bash
npm run payload -- migrate
```

This applies the migration to your currently connected Neon branch.

So if your `.env` has:

```env
NEON_BRANCH=james
```

then the migration runs against the `james` Neon branch, not production.

### Step 8: Regenerate Payload types if needed

If your schema change affects generated types, run:

```bash
npm run generate:types
```

If your admin UI/import map needs updating, run:

```bash
npm run generate:importmap
```

### Step 9: Test your change

Run:

```bash
npm run lint
npm run build
```

If tests are relevant, run:

```bash
npm run test
```

Or run the smaller test commands:

```bash
npm run test:int
npm run test:e2e
```

### Step 10: Commit the schema and migration together

A schema change and its migration should be committed together.

Example:

```bash
git add .
git commit -m "Add staff bio field migration"
git push origin james-add-staff-bio-field
```

---

## 7. How to check migration status

To see which migrations have run:

```bash
npm run payload -- migrate:status
```

Use this before and after running migrations if you are unsure what state your database is in.

---

## 8. How to apply migrations after pulling from main

When you pull new code from `main`, there may be new migration files from other teammates.

Run:

```bash
git pull origin main
npm run db:sync-branch
npm run payload -- migrate
npm run dev
```

This keeps your local Neon branch up to date with the latest schema.

---

## 9. How to safely make a database change

Use this checklist:

```bash
# 1. Start from latest main
git checkout main
git pull origin main

# 2. Create your feature branch
git checkout -b james-my-change

# 3. Connect to the correct Neon branch
npm run db:sync-branch

# 4. Start dev
npm run dev

# 5. Make Payload schema changes

# 6. Create migration
npm run payload -- migrate:create my-change-name

# 7. Review generated migration

# 8. Apply migration to your Neon branch
npm run payload -- migrate

# 9. Regenerate types if needed
npm run generate:types

# 10. Test
npm run lint
npm run build

# 11. Commit
git add .
git commit -m "Add migration for my change"
git push origin james-my-change
```

---

## 10. What not to do

Do not manually edit `DATABASE_URL` unless you know exactly what you are doing.

Do not make schema changes directly on `main`.

Do not create branches that do not start with an approved owner name.

Do not commit schema changes without the migration file.

Do not leave autopush enabled for serious shared work.

Do not ignore migration warnings about data loss.

Do not run migrations if your `.env` is pointing at the wrong Neon branch.

---

## 11. Common commands

| Task                           | Command                                            |
| ------------------------------ | -------------------------------------------------- |
| Install dependencies           | `npm install`                                      |
| Sync Git branch to Neon branch | `npm run db:sync-branch`                           |
| Start dev server               | `npm run dev`                                      |
| Safe dev restart on Windows    | `npm run devsafe`                                  |
| Create a migration             | `npm run payload -- migrate:create migration-name` |
| Run migrations                 | `npm run payload -- migrate`                       |
| Check migration status         | `npm run payload -- migrate:status`                |
| Generate Payload types         | `npm run generate:types`                           |
| Generate Payload import map    | `npm run generate:importmap`                       |
| Lint                           | `npm run lint`                                     |
| Build                          | `npm run build`                                    |
| Run all tests                  | `npm run test`                                     |
| Run integration tests          | `npm run test:int`                                 |
| Run e2e tests                  | `npm run test:e2e`                                 |

---

## 12. Troubleshooting

### Neon CLI not found

If you see an error saying Neon CLI was not found, run:

```bash
npm install
```

Then try again:

```bash
npm run db:sync-branch
```

### `.env` changed but app still uses the old database

Restart the dev server:

```bash
Ctrl + C
npm run dev
```

### My branch is pointing to production

Check your branch name:

```bash
git branch --show-current
```

If it does not start with one of the approved names, rename it or create a new branch.

Example:

```bash
git checkout -b james-correct-branch-name
npm run db:sync-branch
```

### Migration generated too many changes

Stop and do not run it yet.

Possible causes:

- Your local database is out of sync.
- You are connected to the wrong Neon branch.
- Autopush previously changed the database without a migration.
- Someone else changed the schema and you have not pulled latest `main`.

Try:

```bash
git pull origin main
npm run db:sync-branch
npm run payload -- migrate:status
```

Then review the migration again.

---

## 13. Team rule of thumb

Before making a schema change, ask:

> Will this change the database structure?

If yes, create a migration.

Examples that need migrations:

- Adding a new collection
- Adding a new global
- Adding a field
- Removing a field
- Changing field requirements
- Changing relationships
- Changing upload/media fields
- Changing localization structure

Examples that usually do not need migrations:

- Changing frontend layout
- Updating React components
- Editing CSS/Tailwind classes
- Changing text that is not stored in Payload schema
- Updating Zod validation only, unless it also reflects a Payload schema change

---

## 14. Recommended pull request checklist

Before opening a PR, make sure:

- Your branch name starts with your name.
- You ran `npm run db:sync-branch`.
- Your `.env` was pointing to your own Neon branch while testing.
- Any Payload schema change has a migration file.
- The migration file was reviewed.
- You ran `npm run payload -- migrate` successfully.
- You regenerated Payload types if needed.
- You ran lint/build/tests where appropriate.
- You did not commit `.env`.

---

## 15. Simple explanation for teammates

When you switch Git branches, run:

```bash
npm run db:sync-branch
```

When you change the Payload schema, run:

```bash
npm run payload -- migrate:create clear-migration-name
npm run payload -- migrate
```

Then commit both the code change and the generated migration file.

That is the main workflow.
