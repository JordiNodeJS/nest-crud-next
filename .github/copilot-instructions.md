ch# GitHub Copilot Instructions for NestJS-Next.js Monorepo

## Project Structure

This is a monorepo containing:

- `backend/`: NestJS application connected to PostgreSQL
- `frontend/`: Next.js application

## Backend (NestJS)

The backend is built with NestJS and has the following characteristics:

- PostgreSQL database running in Docker
- RESTful API structure following NestJS conventions
- Database entities are defined in `backend/src/entities/`
- Controllers are in `backend/src/controllers/`
- Services handle business logic in `backend/src/services/`
- DTOs are used for data validation and transfer
- TypeORM is used for database interactions
- Environment variables are stored in `.env` files

## Frontend (Next.js)

The frontend is built with Next.js and has the following characteristics:

- React-based components
- Uses the App Router structure with pages in `frontend/app/`
- API calls to the backend
- Components are stored in `frontend/components/`
- State management (specify which library if applicable)
- Styling approach (CSS, Tailwind, etc.)

## Common Tasks

### Backend

- Creating a new entity:

  1. Define entity in `backend/src/entities/`
  2. Create DTOs in `backend/src/dto/`
  3. Create service in `backend/src/services/`
  4. Create controller in `backend/src/controllers/`
  5. Add to module imports as needed

- Running migrations:

  ```
  cd backend
  pnpm run migration:generate -- -n MigrationName
  pnpm run migration:run
  ```

- Starting the server:
  ```
  cd backend
  pnpm run start:dev
  ```

### Frontend

- Creating a new page:

  1. Add new file as `page.tsx` in a new directory under `frontend/app/`
  2. Import necessary components
  3. Set up data fetching using App Router data fetching methods

- Starting the development server:
  ```
  cd frontend
  pnpm run dev
  ```

### Docker

- Starting the database:
  ```
  docker-compose up -d
  ```

## Testing

- Backend tests:

  ```
  cd backend
  pnpm run test
  ```

- Frontend tests:
  ```
  cd frontend
  pnpm run test
  ```
