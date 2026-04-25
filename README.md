# 🎬 Movie Watchlist API

A REST API for managing a personal movie watchlist. Built with Node.js, Express, Prisma, and PostgreSQL (Neon).

## Features

- User authentication with JWT (register, login)
- Browse and manage movies
- Add movies to your personal watchlist
- Track watch status (Planned, Watching, Completed, Dropped)
- Rate and add notes to watchlist items

## Tech Stack

- **Runtime** — Node.js
- **Framework** — Express.js
- **ORM** — Prisma v7
- **Database** — PostgreSQL (Neon)
- **Auth** — JWT + bcrypt
- **Validation** — Zod

## Getting Started

### Prerequisites

- Node.js v18+
- A [Neon](https://neon.tech) PostgreSQL database

### Installation

```bash
git clone https://github.com/your-username/movieWatchlist.git
cd movieWatchlist
npm install
```

### Environment Variables

Create a `.env` file in the root:

```env
DATABASE_URL="postgresql://user:password@host/dbname?sslmode=require"
JWT_SECRET="your_jwt_secret"
JWT_EXPIRES_IN="7d"
NODE_ENV="development"
```

### Database Setup

```bash
npx prisma migrate dev
npx prisma generate
```

### Seed Movies

```bash
node prisma/seed.js
```

### Run the Server

```bash
npm run dev
```

Server runs on `http://localhost:6969`

## API Endpoints

### Auth

| Method | Endpoint         | Description         | Auth |
| ------ | ---------------- | ------------------- | ---- |
| POST   | `/auth/register` | Register a new user | ✅   |
| POST   | `/auth/login`    | Login and get token | ✅   |

### Movies

| Method | Endpoint      | Description     | Auth |
| ------ | ------------- | --------------- | ---- |
| GET    | `/movies`     | Get all movies  | ✅   |
| POST   | `/movies`     | Add a new movie | ✅   |
| PATCH  | `/movies/:id` | Update a movie  | ✅   |
| DELETE | `/movies/:id` | Delete a movie  | ✅   |

### Watchlist

| Method | Endpoint         | Description            | Auth |
| ------ | ---------------- | ---------------------- | ---- |
| GET    | `/watchlist`     | Get your watchlist     | ✅   |
| POST   | `/watchlist`     | Add movie to watchlist | ✅   |
| PATCH  | `/watchlist/:id` | Update watchlist item  | ✅   |
| DELETE | `/watchlist/:id` | Remove from watchlist  | ✅   |

## Data Models

### User

```
id, name, email, password, createdAt
```

### Movie

```
id, title, overview, releaseYear, genres, runTime, posterUrl, createdBy, createdAt
```

### WatchListItem

```
id, userId, movieId, status, rating, notes, createdAt, updatedAt
```

### WatchList Status

```
PLANNED | WATCHING | COMPLETED | DROPPED
```

## Project Structure

```
src/
├── config/
│   └── db.js
├── controllers/
│   ├── auth.controller.js
│   ├── movie.controller.js
│   └── watchList.controller.js
├── middleware/
│   ├── verifyToken.js
│   └── validateRequest.js
├── routes/
│   ├── auth.routes.js
│   ├── movie.routes.js
│   └── watchList.routes.js
├── utils/
│   └── generateToken.js
└── server.js
prisma/
├── schema.prisma
├── migrations/
└── seed.js
```
