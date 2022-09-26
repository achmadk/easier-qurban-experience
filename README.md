# Easier Qurban Experience (`EQExp`)

# Table of Contents
1. [Descriptions](#descriptions)
2. [Tech Stacks](#tech-stacks)
3. [Prerequisites](#3-prerequisites)
    - [Softwares](#a-softwares)
    - [Environment variables](#b-environment-variables)
4. [Installations](#4-installations)
5. [License](#5-license)

## 1. Descriptions
`EQExp` is abbreviated of `Easier Qurban Experience` a web application which can help qurban committees and citizens to track qurban process. You can learn more about this web app through article series [here](https://blogs.achmadk.dev/series/hackathon-intl-july-2022).  

This web app initially use as my participation to [PlanetScale](https://planetscale.com/?utm_source=hashnode&utm_medium=hackathon&utm_campaign=announcement_article) and [Hashnode](https://hashnode.com/?source=planetscale_hackathon_announcement) hackathon

## 2. Tech Stacks
- **Next.js** to provide both frontend and backend of `EQExp` App.
- **Prisma** to connect backend with MySQL database provided by **PlanetScale**.
- **Clerk** to provide user management of this app.
- **WindiCSS** as alternative to TailwindCSS.
- **Workbox** to make `EQExp` app as Progressive Web App.

## 3. Prerequisites
### a. Softwares
- Node.JS LTS version 16.x.y
- Yarn version 3.x.y
### b. Environment Variables
- Installed MySQL locally, at least to fill `SHADOW_DATABASE_URL` environment variable. You can also use `DATABASE_URL` from PlanetScale to connect MySQL remotely.
- Google Cloud account to get OAuth 2.0 Client ID, in order to enable users login with google account via Clerk.
- Clerk account to get value of `NEXT_PUBLIC_CLERK_FRONTEND_API`, `CLERK_API_KEY`, and `CLERK_JWT_KEY`. Follow more instructions from Clerk in order to login with google account properly.
- Because we use JWT for encryption, you can use generated `k` value from [mkjwk.org](https://mkjwk.org) to fill `NEXT_PUBLIC_JWT_SECRET_KEY` environment variable. I use `oct` with key size 2048, signature key use, and HS256 algorithm.

## 4. Installations
1. Execute `yarn install` to install dependencies defined in `package.json` file.
2. Execute `yarn prisma migrate dev` to do a database migration.
3. Execute `yarn prisma db seed` to do a database seeding.
4. Execute `yarn next` to start development with local server.
## 5. License
MIT

@ 2022 Achmad Kurnianto