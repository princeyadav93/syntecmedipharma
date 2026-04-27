# Syntec Medipharma

B2B pharmaceutical e-commerce platform providing authentic medicines to pharmacies, hospitals, and distributors.

## Tech Stack

- **Framework**: Next.js 15.5 with App Router
- **Language**: TypeScript 5.9
- **Frontend**: React 19, Tailwind CSS, Framer Motion
- **Backend**: Node.js API Routes
- **Database**: MongoDB with Mongoose
- **State Management**: Zustand
- **Authentication**: JWT with HTTP-only cookies
- **Image Hosting**: Cloudinary

## Prerequisites

- Node.js 18+ and npm
- MongoDB connection string
- JWT_SECRET (minimum 32 characters)

## Setup

1. Clone the repository
2. Copy environment variables:
    ```bash
    cp .env.example .env.local
    ```
3. Fill in `.env.local` with your configuration:
    - `MONGODB_URI`: MongoDB connection string
    - `JWT_SECRET`: Random 32+ character string

4. Install dependencies:

    ```bash
    npm install
    ```

5. Run development server:
    ```bash
    npm run dev
    ```

Open [http://localhost:3000](http://localhost:3000)

## Available Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Project Structure

```
src/
├── app/                 # Next.js App Router pages and API routes
├── components/          # React components (layout, admin, user)
├── lib/                 # Utilities (auth, db, validation, rate-limit, error handling)
├── models/              # Mongoose schemas
└── store/               # Zustand state management
```

## Key Features

- **Admin Dashboard**: Product management with create, read, update, delete
- **Product Catalog**: User-facing product browsing with filters
- **Authentication**: Secure JWT-based admin login
- **Image Management**: Cloudinary integration for product images
- **Input Validation**: Zod schema validation for all endpoints
- **Rate Limiting**: Protection against brute force and abuse
- **Error Handling**: Structured error handling with custom error classes

## API Endpoints

### Authentication

- `POST /api/auth/login` - Admin login
- `POST /api/auth/sign-up` - Admin registration
- `POST /api/auth/logout` - Admin logout
- `GET /api/auth/me` - Get current user

### Products

- `GET /api/products` - List all products
- `GET /api/products/[id]` - Get product details
- `POST /api/products` - Create product (admin only)
- `PUT /api/products/[id]` - Update product (admin only)
- `DELETE /api/products/[id]` - Delete product (admin only)

### Forms

- `POST /api/form` - Submit contact form

## Validation & Error Handling

All API endpoints use:

- **Zod** for input validation (see `lib/schemas.ts`)
- **Custom error classes** for structured error handling (see `lib/errors.ts`)
- **Rate limiting** to prevent abuse (see `lib/rate-limit.ts`)
- **Standardized API responses** (see `lib/api-response.ts`)

## Security

- Passwords hashed with bcrypt
- JWT tokens with 5-hour expiration
- HTTP-only cookies prevent XSS
- CSRF protection with SameSite=strict
- Rate limiting on all endpoints
- Input validation on all requests
- Environment variables for secrets
