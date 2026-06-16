# Human Nutrition Unit

## Project Overview

**Project Name:** Human Nutrition Unit Website

**Project Management:**  
[Github Projects](https://github.com/orgs/uoa-compsci399-s1-2026/projects/36/views/3)

**Video of the Human Nutrition Website**
https://www.youtube.com/watch?v=Yl3zqdddD4g 


**Description:**  
The Human Nutrition Unit Website is a modern web platform developed for the Human Nutrition Unit at The University of Auckland. The purpose of the project is to provide the research unit with a more professional, modern, and accessible online presence that better represents its work, research activities, team members, and contributions to the field of human nutrition.

The website was designed to improve how the unit shares information with students, researchers, collaborators, and the wider public. It includes features for content management, research presentation, responsive layouts, and scalable content updates through a headless CMS architecture.

The project was built using Next.js and Payload CMS to create a performant and maintainable full-stack application.
> [Final Report](https://docs.google.com/document/d/1Rt-uJvo9WYMho5W4CtirrSa2cJvkS4EerBVExlulh28/edit?usp=sharing)
---

## Technologies Used

- Next.js 16
- React 19
- Tailwind CSS 4
- Payload CMS 3
- PostgreSQL
- Zod
- TypeScript
- AWS Bedrock Runtime
- AWS Translate
- AWS S3 Storage
- Nodemailer
- ESLint
- Prettier
- Husky
- Vitest
- Playwright

---

## Installation & Setup

### Prerequisites

- Node.js 24.x
- npm 11.x
- PostgreSQL
- Git

### Clone the Repository and Install Dependencies

```bash
git clone https://github.com/uoa-compsci399-s1-2026/capstone-project-s1-2026-team-7.git
cd capstone-project-s1-2026-team-7
npm install
```

### Environment Variables

Copy `.env.example` to `.env` and configure the required environment variables.

```bash
cp .env.example .env
```

### Running the Project

Start the development server:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

Start the production server:

```bash
npm run start
```

---

## Useful Scripts

```bash
npm run lint
npm run test
npm run test:int
npm run test:e2e
npm run generate:types
npm run generate:importmap
npm run createmigration
npm run clean
npm run export:research
npm run import:research
```

---

## Usage Examples

### Features

- Responsive modern website design
- Content management using Payload CMS
- Research and publication presentation
- Team and staff profile pages
- Research data management
- AI and translation integrations
- Scalable full-stack architecture

### Example Workflow

1. Administrators log into the CMS dashboard
2. Staff information or research content is updated
3. Website content automatically reflects the latest updates
4. Visitors browse research projects, publications, and team information

---

## Deployment

Live Website:  
https://capstone-project-s1-2026-team-7.vercel.app/

---

## Future Plans

- Add publication search functionality
- Improve accessibility compliance
- Expand research data visualisation
- Add analytics dashboard
- Improve mobile optimisation
- Add role-based content editing

---

## Acknowledgements

Special thanks to:

- The Human Nutrition Unit at The University of Auckland
- Payload CMS Documentation
- Next.js Documentation
- Tailwind CSS Documentation
- Lecturers, tutors, and collaborators who provided guidance and feedback
- Lawrence Li for helping out on tech decisions
- Jennifer for being an insightful client

---

## Contributors

- James Mullane — Full Stack Developer
- Carl Misquitta — Full Stack Developer
- Rahul Rajasingh — Full Stack Developer
- Ayush Kumar — Frontend Developer and Designer
- Lam Kam Wei — Full Stack Developer
- Kelvin Mensah — Frontend Developer and Designer

---

## License

This project is licensed under the MIT License.
