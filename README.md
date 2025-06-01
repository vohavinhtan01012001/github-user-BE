# GitHub User Auth Backend

A Node.js backend service for GitHub user search and authentication application.

## Project Structure

```
app-be/
├── src/
│   ├── config/           # Configuration files
│   ├── controllers/     # Request handlers
│   ├── entities/        # TypeORM entities
│   ├── middleware/      # Express middlewares
│   ├── services/        # Business logic
│   ├── utils/          # Utility functions
│   └── app.ts          # Express app setup
├── .env                # Environment variables
├── .env.sample        # Environment variables template
└── package.json
```

## Prerequisites

- Node.js (v18 or higher)
- MySQL (v8.0 or higher)
- Firebase project with Phone Authentication enabled

## Setup Instructions

1. Clone the repository
```bash
git clone <repository-url>
cd app-be
```

2. Install dependencies
```bash
npm install
```

3. Configure environment variables
```bash
cp .env.sample .env
```
Edit `.env` file with your configuration:
- Database credentials
- Firebase Admin SDK configuration
- Server port (default: 5000)
- NODE_ENV (development/production)

4. Initialize database
```bash
# Create database
mysql -u root -p
CREATE DATABASE github_user_auth;
```

5. Start the development server
```bash
npm run dev
```

The server will start on http://localhost:5000 (or the port specified in .env)

## Development

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint
- `npm run test` - Run tests 