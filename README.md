# Easier Qurban Experience (`EQExp`)

# Table of Contents

1. [Descriptions](#1-descriptions)
2. [Tech Stacks](#2-tech-stacks)
3. [Prerequisites](#3-prerequisites)
   - [Softwares](#a-softwares)
   - [Environment variables](#b-environment-variables)
4. [Installations](#4-installations)
5. [Contribution](#5-contribution)
6. [License](#6-license)

## 1. Descriptions

`EQExp` is abbreviated to `Easier Qurban Experience` a web application that can help qurban committees and citizens track the qurban process. You can learn more about this web app through the article series [here](https://blogs.achmadk.dev/series/hackathon-intl-july-2022).

This web app initially use as my participation to [PlanetScale](https://planetscale.com/?utm_source=hashnode&utm_medium=hackathon&utm_campaign=announcement_article) and [Hashnode](https://hashnode.com/?source=planetscale_hackathon_announcement) hackathon

## 2. Tech Stacks

- **Next.js** to provide both frontend and backend of the `EQExp` App.
- **Prisma** to connect backend with ~~MySQL~~ PostgreSQL database provided by **~~PlanetScale~~ Supabase**.
- **Clerk** to provide user management of this app.
- **Workbox** to make the `EQExp` app a Progressive Web App.

## 3. Prerequisites

### a. Softwares

- Node.JS LTS version 20.x.y
- Yarn version 4.x.y

### b. Environment Variables

- Google Cloud account to get OAuth 2.0 Client ID, to enable users login with google account via Clerk.
- Clerk account to get values of `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` and `CLERK_SECRET_KEY`. Follow more instructions from the Clerk to log in with your Google account properly.
- Because we use JWT for encryption, you can use generated `k` value from [mkjwk.org](https://mkjwk.org) to fill `NEXT_PUBLIC_JWT_SECRET_KEY` environment variable. I use `oct` with key size 2048, signature key use, and HS256 algorithm.

## 4. Installations

1. Execute `yarn install` to install dependencies defined in the `package.json` file.
2. Execute `yarn prisma migrate dev` to do a database migration.
3. Execute `yarn prisma db seed` to do a database seeding.
4. Execute `yarn next` to start development with a local server.

## 5. Contribution

Contribution is welcome. Please read [CONTRIBUTING.md file](CONTRIBUTING.md) for more information.

## 6. License

MIT

@ 2022 Achmad Kurnianto
