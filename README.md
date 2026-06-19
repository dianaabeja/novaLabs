# Ad Astra Labs Frontend

A modern Angular 20 frontend for showcasing a configurable public site and a lightweight CMS demo. The project is designed to present tenant-specific content, navigation, sections, certifications, FAQs, and media assets in a polished, maintainable way.

## Overview

- Built with Angular 20 and standalone components
- Uses environment-based configurations for local, stage, and production setups
- Includes a demo CMS flow for editing content directly in the browser
- Ready for deployment to Vercel with a static SPA rewrite configuration

## Tech Stack

- Angular 20
- TypeScript
- RxJS
- SCSS
- Vercel deployment configuration

## Project Structure

```text
src/
├── app/
│   ├── core/               # shared infrastructure and interceptors
│   ├── data-access/        # DTOs, repositories, adapters, and API sources
│   ├── features/
│   │   ├── cms/            # CMS demo pages and editing flow
│   │   └── site/           # public site rendering and navigation
│   └── shared/             # reusable pipes and helpers
├── environments/           # environment-specific config files
└── styles.scss             # global styles
```

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Run the development server

```bash
npm start
```

The app will be available at:

- http://localhost:4200

### 3. Build for production

```bash
npm run build
```

## Available Scripts

```bash
npm start           # start the development server
npm run start:local # start with local environment config
npm run start:stage # start with stage environment config
npm run build       # production build
npm run build:local # local build
npm run build:stage # stage build
npm test            # run unit tests
```

## Environment Configuration

The project includes multiple environment files:

- `src/environments/environment.ts` for default development settings
- `src/environments/environment.local.ts` for local testing
- `src/environments/environment.stage.ts` for staging
- `src/environments/environment.production.ts` for production

## Deployment

The frontend is configured for deployment on Vercel using [vercel.json](vercel.json).

## Notes

This repository focuses on the frontend presentation layer. If you are working with the API or CMS backend, refer to the related backend documentation in the workspace for full end-to-end setup instructions.
