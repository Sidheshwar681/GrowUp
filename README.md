# GrowUp

Full-stack starter for GrowUp with:
- React frontend
- Express + MongoDB backend
- JWT authentication
- Redux auth state

## Requirements

- Node.js `v16+` and `npm`
- MongoDB Community Server
- Git
- Postman

## Install Requirements

### Node.js and npm

Check installed versions:

```powershell
node -v
npm -v
```

### MongoDB (Windows)

Install via `winget`:

```powershell
winget install --id MongoDB.Server --source winget --accept-package-agreements --accept-source-agreements
```

Then verify:

```powershell
mongod --version
```

## Project Structure

```text
client/
  src/                # React app
  server/             # Express API
    src/
    postman/
```

## Environment Variables

Create local env files from examples:

```powershell
Copy-Item .env.example .env
Copy-Item .\server\.env.example .\server\.env
```

`server/.env`:

```env
MONGODB_URI=mongodb://127.0.0.1:27017/smartbridge
JWT_SECRET=replace_with_a_long_random_secret
JWT_ACCESS_EXPIRES_IN=15m
JWT_REFRESH_DAYS=14
BCRYPT_SALT_ROUNDS=12
CLIENT_URL=http://localhost:3000
DEFAULT_ADMIN_EMAIL=
STOCK_QUOTE_PROVIDER=auto
FINNHUB_API_KEY=
PORT=5000
```

`STOCK_QUOTE_PROVIDER` options:
- `auto` (default): tries Finnhub first when `FINNHUB_API_KEY` exists, then Yahoo
- `finnhub`: prioritize Finnhub, fallback to Yahoo
- `yahoo`: prioritize Yahoo, fallback to Finnhub

`/.env`:

```env
REACT_APP_API_URL=http://localhost:5000
```

## Install Dependencies

Frontend:

```powershell
npm install
```

Backend:

```powershell
cd .\server
npm install
```

## Run Application

Start backend API:

```powershell
cd .\server
npm run dev
```

Start frontend app (new terminal):

```powershell
npm start
```

Frontend URL: `http://localhost:3000`  
Backend URL: `http://localhost:5000`

## API Endpoints

- `GET /api/health`
- `GET /api/market/indexes`
- `POST /api/auth/register`
- `POST /api/auth/login`
- `POST /api/auth/refresh` (refresh-token cookie required)
- `POST /api/auth/logout`
- `POST /api/auth/logout-all` (Bearer token required)
- `GET /api/auth/me` (Bearer token required)
- `GET /api/stocks` (Bearer token required)
- `GET /api/stocks/quotes?symbols=AAPL,MSFT` (Bearer token required)
- `GET /api/stocks/quotes/stream?symbols=AAPL,MSFT` (SSE, Bearer token required)

## Postman Testing

Import this collection:

- `server/postman/SmartBridge.postman_collection.json` (GrowUp API collection)

Steps:
1. Run `Register`
2. Run `Login`
3. Copy `token` from login response
4. Set collection variable `token`
5. Run `Get Current User`

## Git Version Control

Initialize and commit:

```powershell
git init
git add .
git commit -m "Initial GrowUp full-stack setup"
```

If the repo already exists:

```powershell
git status
git add .
git commit -m "Add backend auth API, env config, and Postman collection"
```
