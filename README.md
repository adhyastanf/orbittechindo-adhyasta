Email : opal@gmail.com
Password : password

TMDB_API_KEY=eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkNjQ0NjVmODM1ZDAyNzExNGZkNDY5YWZkNGUyZGU3MiIsIm5iZiI6MTY1NzcyMzYxNy44OCwic3ViIjoiNjJjZWRhZTEyZGM5ZGMwMDU0ZDQ3MTZmIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.pX67OQuIBI4ATaZJKPqwcNCgjJ1IUPSL-UcYkwI96zU

# TMDB Movie App

## Overview
A movie browsing application built using Next.js and TMDB API. The app features infinite scrolling, search functionality, filtering, authentication, and server-side rendering for detailed movie pages.

## Tech Stack
- **Next.js** – Framework for React with server-side rendering capabilities.
- **TMDB API** – Provides movie data.
- **TanStack Query** – Used for data fetching and infinite scrolling.
- **Zustand** – State management for search and filter functionality.
- **Framer Motion** – Applied for animations in the homepage infinite scroll.
- **Next.js API Routes** – Used for authentication (mocked accounts).
- **Middleware** – Used for route protection.

## Technical Implementations
1. **Data Fetching**
   - `TanStack Query` is used for fetching data with `infiniteScroll`.
   - Prefetching of data on the home page for optimized performance.
   - Movie details are fetched using **server-side rendering (SSR)**.

2. **State Management**
   - `Zustand` is used to manage search state.
   - Filtering options are stored and managed using `Zustand`.

3. **UI Enhancements**
   - A carousel is implemented on the home page.
   - Loading and error states are properly handled with dedicated UI elements.
   - `Framer Motion` is integrated to enhance user experience in infinite scrolling.

4. **Authentication & Protection**
   - A mock authentication system is implemented using Next.js API routes.
   - User state is stored temporarily; it is lost upon reload.
   - **Middleware** is used to protect routes that require authentication.

## Decision-Making Notes
1. **Infinite Scroll as a Key Feature**
   - Instead of implementing multiple key features, the project focuses on an efficient infinite scroll experience.

2. **Client-side vs Server-side Fetching**
   - Home page data is prefetched for smoother browsing.
   - The detail page uses **server-side rendering (SSR)** for better SEO and performance.

3. **Mock Authentication**
   - Authentication is handled via Next.js API routes with pre-defined mock accounts.
   - User state is not persisted to avoid unnecessary backend complexity.

4. **Middleware for Protection**
   - Middleware is implemented to restrict access to protected routes based on authentication state.

## API Key Setup
To use the TMDB API, add your API key in the environment variables:
```env
NEXT_PUBLIC_TMDB_API_KEY=your_api_key_here
```

## Installation & Running the Project
```bash
git clone <repo-url>
npm install
npm run dev
```

## Future Improvements
- Implement persistent authentication.
- Enhance filtering options for better movie discovery.
- Improve UI animations for better user engagement.

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
