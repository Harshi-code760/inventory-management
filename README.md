# Inventory Management System — Frontend

A React application for managing inventory, built with JWT authentication, protected routes, and SendGrid-powered password reset.

## Live URL

https://inventory-management-1-wuat.onrender.com

## Tech Stack

- React 19
- React Router DOM
- Axios
- JWT Decode
- Create React App

## Features

- User registration and login
- JWT token storage with automatic refresh
- Protected routes — unauthenticated users redirected to login
- Full inventory CRUD — create, view, edit, delete items
- Category management inline on item creation
- Low stock badge indicator
- Filter items by low stock
- Editable user profile
- Forgot password and reset password flow

## Project Structure
```
frontend/
├── public/
│   └── _redirects        # React Router support on Render
├── src/
│   ├── api/
│   │   └── axios.js      # Axios instance with JWT interceptors
│   ├── components/
│   │   └── ProtectedRoute.js
│   ├── context/
│   │   └── AuthContext.js # Global auth state with JWT decode
│   ├── pages/
│   │   ├── Login.js
│   │   ├── Register.js
│   │   ├── Dashboard.js
│   │   ├── AddItem.js
│   │   ├── EditItem.js
│   │   ├── Profile.js
│   │   ├── ForgotPassword.js
│   │   └── ResetPassword.js
│   ├── App.js
│   └── App.test.js
└── package.json
```

## Local Setup

### Prerequisites
- Node.js 18+
- npm

### Steps
```bash
# Clone the repository
git clone https://github.com/Harshi-code760/inventory-management
cd inventory-management/frontend

# Install dependencies
npm install

# Create .env file
cp .env.example .env
# Edit .env with your backend URL

# Start the development server
npm start
```

### Environment Variables
```dotenv
REACT_APP_API_URL=http://localhost:8000/api/
```

## Running Tests
```bash
npm test
```

## Architecture Decisions

- **AuthContext** — global authentication state using React Context, stores decoded JWT user info so any component can access the current user without prop drilling
- **Axios interceptors** — automatically attach JWT Bearer token to every request, and handle token refresh on 401 responses before retrying the original request
- **ProtectedRoute component** — wraps any route that requires authentication, redirects unauthenticated users to login while showing a loading state during auth initialisation
- **Token refresh** — when a 401 is received, the interceptor attempts to refresh the access token using the stored refresh token before logging the user out, improving session continuity
- **Environment variables** — API base URL is configured via `REACT_APP_API_URL` so the same codebase works in development and production without code changes

## Deployment

Deployed on Render as a Static Site.

### Render Configuration
- **Build Command:** `npm install && npm run build`
- **Publish Directory:** `frontend/build`
- **Rewrite Rule:** `/* → /index.html` (required for React Router)

### Production Environment Variables
Set in Render dashboard:
- `REACT_APP_API_URL=https://inventory-management-7rem.onrender.com/api/`