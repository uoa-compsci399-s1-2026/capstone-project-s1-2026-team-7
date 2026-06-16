# Human Nutrition Unit Website

## Project Overview

**Project Name:** Human Nutrition Unit Website

**Project Management:**  
[GitHub Projects](https://github.com/orgs/uoa-compsci399-s1-2026/projects/36/views/3)

**Video of the Human Nutrition Website:**  
https://www.youtube.com/watch?v=Yl3zqdddD4g

**Description:**  
The Human Nutrition Unit Website is a modern web platform developed for the Human Nutrition Unit at The University of Auckland. The project gives the unit a professional, accessible, and maintainable online presence that better presents its research, studies, staff, collaborations, and public engagement work.

The website supports multiple audiences, including research participants, students, researchers, collaborators, donors, and the wider public. Public users can learn about the unit, view current studies, explore research outputs, read staff profiles, find collaboration information, and access contact and donation pathways. Administrators can manage website content through Payload CMS without needing a developer for routine content changes.

The project was built with Next.js and Payload CMS to provide a full-stack website with a modern frontend, CMS-backed content editing, PostgreSQL data storage, AWS S3 media storage, translation support, and research CSV import/export tools.

> [Final Report](https://docs.google.com/document/d/1Rt-uJvo9WYMho5W4CtirrSa2cJvkS4EerBVExlulh28/edit?usp=sharing)

---

## Technologies Used

### Languages and Runtime

| Technology           | Version / Notes                                                           |
| -------------------- | ------------------------------------------------------------------------- |
| TypeScript           | 5.7.3                                                                     |
| JavaScript / Node.js | Node.js 22.x                                                              |
| npm                  | >=10 and <12                                                              |
| CSS                  | Tailwind CSS ^4.2.2                                                       |
| PostgreSQL           | Used through Payload CMS. Can be local PostgreSQL or hosted through Neon. |

### Main Runtime Libraries

| Library / Tool              | Package                        | Version   |
| --------------------------- | ------------------------------ | --------- |
| Next.js                     | `next`                         | 16.2.6    |
| React                       | `react`                        | ^19.2.4   |
| React DOM                   | `react-dom`                    | 19.2.4    |
| Payload CMS                 | `payload`                      | 3.85.1    |
| Payload PostgreSQL adapter  | `@payloadcms/db-postgres`      | 3.85.1    |
| Payload Next.js integration | `@payloadcms/next`             | 3.85.1    |
| Payload Rich Text Lexical   | `@payloadcms/richtext-lexical` | 3.85.1    |
| Payload SEO plugin          | `@payloadcms/plugin-seo`       | 3.85.1    |
| Payload S3 storage          | `@payloadcms/storage-s3`       | 3.85.1    |
| Payload Nodemailer email    | `@payloadcms/email-nodemailer` | 3.85.1    |
| Payload UI                  | `@payloadcms/ui`               | 3.85.1    |
| AWS S3 SDK                  | `@aws-sdk/client-s3`           | ^3.1045.0 |
| AWS Translate SDK           | `@aws-sdk/client-translate`    | ^3.1045.0 |
| Tailwind CSS                | `tailwindcss`                  | ^4.2.2    |
| Tailwind PostCSS plugin     | `@tailwindcss/postcss`         | ^4.2.2    |
| Zod                         | `zod`                          | ^4.3.6    |
| Sharp                       | `sharp`                        | 0.34.2    |
| GraphQL                     | `graphql`                      | ^16.8.1   |
| Embla Carousel React        | `embla-carousel-react`         | ^8.6.0    |
| Embla Carousel Auto Scroll  | `embla-carousel-auto-scroll`   | ^8.6.0    |
| GSAP                        | `gsap`                         | ^3.15.0   |
| Lenis                       | `lenis`                        | ^1.3.23   |
| Lucide React                | `lucide-react`                 | ^1.8.0    |
| clsx                        | `clsx`                         | ^2.1.1    |
| tailwind-merge              | `tailwind-merge`               | ^3.5.0    |
| dotenv                      | `dotenv`                       | 16.4.7    |
| cross-env                   | `cross-env`                    | ^7.0.3    |

### Development, Testing, and Tooling Libraries

| Library / Tool        | Package                  | Version   |
| --------------------- | ------------------------ | --------- |
| Next env loader       | `@next/env`              | 16.2.6    |
| ESLint                | `eslint`                 | ^9.16.0   |
| Next ESLint config    | `eslint-config-next`     | 16.2.6    |
| Prettier              | `prettier`               | ^3.8.1    |
| Husky                 | `husky`                  | ^9.1.7    |
| Vitest                | `vitest`                 | 4.1.8     |
| Playwright            | `@playwright/test`       | 1.58.2    |
| Testing Library React | `@testing-library/react` | 16.3.0    |
| jsdom                 | `jsdom`                  | 28.0.0    |
| tsx                   | `tsx`                    | 4.21.0    |
| Neon CLI              | `neonctl`                | ^2.22.0   |
| PostCSS               | `postcss`                | ^8.5.10   |
| Autoprefixer          | `autoprefixer`           | ^10.4.27  |
| Vite React plugin     | `@vitejs/plugin-react`   | 4.5.2     |
| Vite TSConfig Paths   | `vite-tsconfig-paths`    | 6.0.5     |
| Node.js types         | `@types/node`            | ^22.19.17 |
| React types           | `@types/react`           | 19.2.14   |
| React DOM types       | `@types/react-dom`       | 19.2.3    |

### Dependency Overrides

The project uses dependency overrides to keep some transitive packages on controlled versions.

| Package                           | Pinned version |
| --------------------------------- | -------------- |
| dompurify                         | 3.4.10         |
| postcss                           | `$postcss`     |
| esbuild                           | 0.28.1         |
| axios                             | 1.17.0         |
| diff                              | 5.2.2          |
| yaml                              | 2.8.3          |
| @esbuild-kit/core-utils / esbuild | 0.28.1         |

---

## Installation Requirements

Before running the project on a new machine, install the following.

### 1. Node.js and npm

This project is configured for:

- **Node.js 22.x**
- **npm >=10 and <12**

Check your installed versions:

```bash
node -v
npm -v
```

If the versions do not match, install Node.js 22. A version manager such as nvm is recommended so the project runs consistently across machines.

### 2. Git

Git is required to clone the repository and for Husky hooks to work properly.

```bash
git --version
```

### 3. PostgreSQL Database

Payload CMS uses PostgreSQL for content storage. You can use either:

- A local PostgreSQL database installed on your machine, or
- A hosted PostgreSQL database such as Neon.

The database connection string must be added to the `.env` file as `DATABASE_URL`.

### 4. AWS Account and Credentials

AWS credentials are required for features that use cloud storage or translation, including:

- S3 media and document storage
- Research CSV import and export storage
- AWS Translate

The app may start without using every AWS feature, but uploads, translations, and CSV storage will not work correctly unless the AWS variables are configured.

### 5. SMTP Email Account

SMTP credentials are required for email features such as the contact form and Payload email sending. This can use a university SMTP server, Gmail SMTP, or another transactional email service.

### 6. Playwright Browsers

Playwright is used for end-to-end testing. After installing npm packages, install the Playwright browsers with:

```bash
npx playwright install
```

---

## Local Setup

### 1. Clone the Repository

```bash
git clone https://github.com/uoa-compsci399-s1-2026/capstone-project-s1-2026-team-7.git
cd capstone-project-s1-2026-team-7
```

### 2. Install Dependencies

```bash
npm install
```

This installs all project dependencies from `package.json`, including Next.js, Payload CMS, React, Tailwind CSS, Vitest, Playwright, ESLint, Prettier, AWS SDK packages, and Payload packages.

If `package.json` has changed, run `npm install` again so `package-lock.json` is updated as well.

### 3. Create the Environment File

Copy the example environment file:

```bash
cp .env.example .env
```

On Windows PowerShell, use:

```powershell
Copy-Item .env.example .env
```

Then fill in the required values in `.env`.

### 4. Initialise Payload

After the environment variables are set, run:

```bash
npm run payload:init
```

This confirms that Payload can load the project configuration and connect to the required services.

### 5. Run the Development Server

```bash
npm run dev
```

After the server starts, open:

```text
http://localhost:3000
```

Payload admin can be accessed at:

```text
http://localhost:3000/admin
```

---

## Required Environment Variables

The project needs the following environment variables to run properly.

### Core App Variables

```env
DATABASE_URL=
PAYLOAD_SECRET=
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

| Variable               | Required    | Purpose                                                                                |
| ---------------------- | ----------- | -------------------------------------------------------------------------------------- |
| `DATABASE_URL`         | Yes         | PostgreSQL connection string used by Payload CMS.                                      |
| `PAYLOAD_SECRET`       | Yes         | Secret key used by Payload CMS for authentication and security.                        |
| `NEXT_PUBLIC_SITE_URL` | Recommended | Public site URL used for metadata. For local development, use `http://localhost:3000`. |

### Database and Neon Variables

```env
AUTOPUSH=false
NEON_API_KEY=
NEON_PROJECT_ID=
NEON_BRANCH=
```

| Variable          | Required                      | Purpose                                                                                                                                                             |
| ----------------- | ----------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `AUTOPUSH`        | Optional                      | When set to `true`, Payload pushes schema changes directly to the database. For team development, keep this as `false` unless intentionally using autopush locally. |
| `NEON_API_KEY`    | Required for `db:sync-branch` | Used by the Neon branch sync script.                                                                                                                                |
| `NEON_PROJECT_ID` | Required for `db:sync-branch` | Identifies the Neon project to sync with.                                                                                                                           |
| `NEON_BRANCH`     | Optional                      | Can be written by the Neon branch sync script to record the active branch.                                                                                          |

### AWS and S3 Variables

```env
AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
AWS_REGION=ap-southeast-2
S3_REGION=ap-southeast-2
S3_BUCKET=
```

| Variable                | Required                | Purpose                                                        |
| ----------------------- | ----------------------- | -------------------------------------------------------------- |
| `AWS_ACCESS_KEY_ID`     | Yes for AWS features    | AWS access key for S3 and Translate.                           |
| `AWS_SECRET_ACCESS_KEY` | Yes for AWS features    | AWS secret key for S3 and Translate.                           |
| `AWS_REGION`            | Yes for AWS features    | AWS region used by AWS Translate and as a fallback region.     |
| `S3_REGION`             | Yes for uploads/storage | Region of the S3 bucket.                                       |
| `S3_BUCKET`             | Yes for uploads/storage | S3 bucket used for media, documents, and research CSV storage. |

The code also supports `AWS_ACCESS_KEY` as a fallback for the access key, but `AWS_ACCESS_KEY_ID` is recommended.

### Email and SMTP Variables

```env
SMTP_HOST=
SMTP_PORT=587
SMTP_USER=
SMTP_PASS=
EMAIL_FROM_ADDRESS=noreply@example.com
EMAIL_FROM_NAME=Human Nutrition Unit
```

| Variable             | Required               | Purpose                          |
| -------------------- | ---------------------- | -------------------------------- |
| `SMTP_HOST`          | Yes for email features | SMTP server host.                |
| `SMTP_PORT`          | Yes for email features | SMTP server port. Usually `587`. |
| `SMTP_USER`          | Yes for email features | SMTP username.                   |
| `SMTP_PASS`          | Yes for email features | SMTP password.                   |
| `EMAIL_FROM_ADDRESS` | Recommended            | Default sender email address.    |
| `EMAIL_FROM_NAME`    | Recommended            | Default sender name.             |

### Research and API Variables

```env
OPENALEX_API_KEY=
CROSSREF_MAILTO=
CRON_SECRET=
```

| Variable           | Required                   | Purpose                                                                                              |
| ------------------ | -------------------------- | ---------------------------------------------------------------------------------------------------- |
| `OPENALEX_API_KEY` | Optional                   | Used for OpenAlex research category suggestions. If missing, the app can fall back to keyword logic. |
| `CROSSREF_MAILTO`  | Recommended                | Email address sent to Crossref for polite API usage.                                                 |
| `CRON_SECRET`      | Required for cron endpoint | Secret used to protect the research export processing cron route.                                    |

---

## Useful Scripts

| Command                      | Purpose                                                                                     |
| ---------------------------- | ------------------------------------------------------------------------------------------- |
| `npm run dev`                | Starts the development server.                                                              |
| `npm run devsafe`            | Removes `.next` and starts the development server again. Useful if the cache causes issues. |
| `npm run build`              | Builds the project for production.                                                          |
| `npm run start`              | Starts the production build. Run `npm run build` first.                                     |
| `npm run lint`               | Runs ESLint.                                                                                |
| `npm run lint:fix`           | Runs ESLint and automatically fixes issues where possible.                                  |
| `npm run test:int`           | Runs integration tests with Vitest.                                                         |
| `npm run test:e2e`           | Runs Playwright end-to-end tests.                                                           |
| `npm run test`               | Runs both integration and end-to-end tests.                                                 |
| `npm run generate:types`     | Generates Payload CMS TypeScript types.                                                     |
| `npm run generate:importmap` | Generates the Payload admin import map.                                                     |
| `npm run payload`            | Runs Payload CLI commands.                                                                  |
| `npm run db:sync-branch`     | Runs the Neon branch sync script.                                                           |
| `npm run clean`              | Removes `.next` and `node_modules`. Run `npm install` after using it.                       |
| `npm run payload:init`       | Initialises and validates the Payload CMS configuration.                                    |
| `npm run export:research`    | Exports research data.                                                                      |
| `npm run import:research`    | Imports research data from CSV.                                                             |

> Note: `npm run createmigration`, `npm run seed:team`, and `npm run seed:homepage` are not listed in the current `package.json`, so they are not included as supported scripts.

---

## First Time Setup Checklist

1. Install Node.js 22.x.
2. Install npm version 10 or 11.
3. Install Git.
4. Set up PostgreSQL locally or through Neon.
5. Clone the repository.
6. Run `npm install`.
7. Copy `.env.example` to `.env`.
8. Fill in `DATABASE_URL` and `PAYLOAD_SECRET`.
9. Add AWS and S3 values if you need uploads, translations, or CSV storage.
10. Add SMTP values if you need email or contact form functionality.
11. Run `npm run payload:init`.
12. Run `npx playwright install` if you need end-to-end tests.
13. Run `npm run dev`.
14. Open `http://localhost:3000` and `http://localhost:3000/admin`.

---

## Usage Examples

### Public Website Usage

- Visitors can view the homepage to learn about the Human Nutrition Unit.
- Prospective participants can browse current studies and read study details.
- Researchers and collaborators can explore collaboration areas and contact pathways.
- Users can view staff profiles and research information.
- Donors can find donation information through the donations page.

### Admin Workflow

1. An administrator logs into the Payload CMS dashboard at `/admin`.
2. The administrator updates homepage content, staff profiles, studies, research information, images, or page text.
3. The frontend website reads the CMS content and displays the latest version to public users.
4. Research data can be imported or exported through the research CSV tools.

### Development Workflow

1. Create or switch to a feature branch.
2. Run `npm install` if dependencies have changed.
3. Configure `.env` with the correct database and service credentials.
4. Run `npm run dev` while developing.
5. Run `npm run lint` and tests before submitting a pull request.

---

## Common Setup Issues

### Node Version Problems

If dependencies fail to install or the app behaves unexpectedly, check that Node.js is version 22.x:

```bash
node -v
```

The project is configured for Node 22.x.

### Missing Database Connection

If Payload fails to start, check that `DATABASE_URL` exists in `.env` and points to a working PostgreSQL database.

### Missing Payload Secret

If authentication or Payload startup fails, make sure `PAYLOAD_SECRET` is set in `.env`.

### Missing AWS Credentials

If translation, media upload, document upload, or CSV import/export fails, check:

```env
AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
AWS_REGION=
S3_REGION=
S3_BUCKET=
```

### Package Lock Out of Date

If dependencies were added or changed, run:

```bash
npm install
```

This updates `package-lock.json` to match `package.json`.

### Playwright Browser Issues

If Playwright tests fail because browsers are missing, run:

```bash
npx playwright install
```

### Next.js Cache Issues

If the development server acts strangely, run:

```bash
npm run devsafe
```

This removes `.next` and starts the development server again.

---

## Production Build

Create a production build:

```bash
npm run build
```

Start the production server:

```bash
npm run start
```

---

## Deployment

Live Website:  
Live Deployment](https://hnu-uoa.vercel.app/)

This deployed website should remain available until the final mark has been released.

For deployment, make sure the hosting provider has the same environment variables as the local `.env` file, especially:

- `DATABASE_URL`
- `PAYLOAD_SECRET`
- AWS and S3 variables
- SMTP variables
- `NEXT_PUBLIC_SITE_URL`
- `CRON_SECRET`, if cron routes are used

---

## Future Plans

- Add more advanced publication search and filtering.
- Improve accessibility testing and compliance.
- Expand research data visualisation.
- Add analytics or reporting tools for administrators.
- Continue improving mobile optimisation.
- Improve long-term deployment and database migration workflows.

---

## Acknowledgements

Special thanks to:

- The Human Nutrition Unit at The University of Auckland.
- Jennifer for acting as an insightful client and providing feedback.
- The lecturers, tutors, and project supervisors who supported the team.
- Payload CMS documentation.
- Next.js documentation.
- Tailwind CSS documentation.
- React documentation.
- Neon documentation.
- AWS documentation.

---

## Contributors

- James Mullane, Full Stack Developer
- Carl Misquitta, Full Stack Developer
- Rahul Rajasingh, Full Stack Developer
- Ayush Kumar, Frontend Developer and UX Designer
- Lam Kam Wei, Full Stack Developer
- Kelvin Mensah, Frontend Developer and Designer

---

## License

This project is licensed under the MIT License.
