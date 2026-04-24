# SeaSense Backend Setup Guide

Welcome to the SeaSense Backend repository! This guide provides detailed step-by-step instructions for setting up the backend environment on your local machine for the first time.

## 📖 Architecture Overview

The backend is composed of two primary microservices:
1. **main-api (Port 3005):** A comprehensive NestJS server responsible for business logic, REST APIs, WebSocket telemetry, database operations, and serving the frontend dashboard application.
2. **gps-ingestion (Port 3000):** A lightweight high-performance Express server exclusively dedicated to continuously ingesting hardware GPS telemetry data.

---

## 💻 Prerequisites

Before you begin, ensure you have the following installed on your machine:
- **Node.js**: v20.x or higher (Download from [nodejs.org](https://nodejs.org/))
- **Git**: For version control.

*Note: Docker Desktop is completely optional but highly recommended if you want to skip manual database installation.*

---

## 🛠️ Step 1: Database & Infrastructure Setup

Both microservices rely heavily on a PostgreSQL database and a Redis instance for caching and inter-service communication. Because SeaSense uses advanced geographical features, the **PostGIS** extension for PostgreSQL is strictly required.

You have two choices for setting this up: **Using Docker** or a **Native Windows Installation**.

### Option A: Using Docker Compose (Fastest & Recommended)
1. Open your terminal and navigate to the `main-api` directory:
   ```bash
   cd backend/main-api
   ```
2. Start the Database and Redis containers in the background using Docker Compose:
   ```bash
   docker-compose up -d
   ```
   *This commands runs the `postgres:15` and `redis:7` images locally on port `5432` and `6379` respectively.*

3. **Critical PostGIS Requirement:** Enable the PostGIS extension inside your running Postgres container:
   ```bash
   docker exec -it <YOUR_POSTGRES_CONTAINER_NAME> psql -U postgres -d sea_sense -c "CREATE EXTENSION IF NOT EXISTS postgis;"
   ```
   *(Hint: You can find your container name by running `docker ps`)*

### Option B: Native Windows Installation (Detailed Manual Setup)
If you prefer not to use Docker, follow these steps to install PostgreSQL and PostGIS natively on your Windows PC.

**1. Install PostgreSQL Base Server:**
1. Download the PostgreSQL 15 (or higher) Interactive Installer for Windows from [EnterpriseDB](https://www.enterprisedb.com/downloads/postgres-postgresql-downloads).
2. Run the installer. Keep the default installation directory.
3. During setup, you will be prompted to set a password for the default `postgres` superuser. Note this down (for local dev, setting it to `postgres` is easiest).
4. Keep the default port as `5432` and the locale as `Default locale`.
5. **IMPORTANT:** On the final screen of the installer, **check the box** that says "Launch Stack Builder at exit" before clicking Finish.

**2. Install PostGIS Extension via Stack Builder:**
1. Stack Builder will open automatically. Select your PostgreSQL installation from the dropdown menu and click Next.
2. In the application categories, expand **"Spatial Extensions"** and check the box next to **PostGIS X.X** (e.g., PostGIS 3.3 or the latest available).
3. Click Next to download the extension. Once downloaded, it will launch the PostGIS installer.
4. Agree to all default settings in the PostGIS installer (click Yes/Next through the prompts).

**3. Create the Database & Enable PostGIS:**
1. Open **pgAdmin 4** (which was installed automatically alongside PostgreSQL).
2. Connect to your local server using the `postgres` password you set earlier.
3. Create a new database named `sea_sense`:
   - Right-click "Databases" -> Create -> Database.
   - Name it `sea_sense` and click Save.
4. Enable the PostGIS extension on the new database:
   - Right-click the newly created `sea_sense` database and select **Query Tool**.
   - Paste the following command and execute it (using the play button or F5):
     ```sql
     CREATE EXTENSION postgis;
     ```

---

## ⚙️ Step 2: Environment Variables Configuration

Both services require their respective `.env` files. Ensure you have the following configurations. *If you set a different password in the native Windows Postgres setup, ensure the `DATABASE_URL` below is updated accordingly.*

### 1. Main API `.env`
Navigate to `backend/main-api/` and create/verify the `.env` file:
```env
# Server Port
PORT=3005
NODE_ENV=development

# Database (Update password here if changed during Postgres setup)
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/sea_sense?schema=public"

# Redis Server
REDIS_HOST=localhost
REDIS_PORT=6379

# Authentication
JWT_SECRET="sea_sense_secret_2026"
JWT_EXPIRATION="1d"

# Configuration
LOG_LEVEL=info
PRISMA_CLIENT_ENGINE_TYPE="binary"
```

### 2. GPS Ingestion `.env`
Navigate to `backend/gps-ingestion/` and create/verify the `.env` file:
```env
# Server Port (Notice this is different from main-api)
PORT=3000

# Database
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/sea_sense?schema=public"

# Redis Server
REDIS_HOST=localhost
REDIS_PORT=6379

# Configuration
LOG_LEVEL=debug
PRISMA_CLIENT_ENGINE_TYPE="library"
```

---

## 📥 Step 3: Package Installation & Database Init

You must configure node modules and generate the Object-Relational Mapper (Prisma) files for each specific service independently.

### 1. Main API (`backend/main-api`)
Open a terminal in `backend/main-api` and run:
```bash
# Install dependencies
npm install

# Generate Prisma Client 
npx prisma generate

# Apply Schema / Initialize Database Tables
npx prisma db push
```

### 2. GPS Ingestion (`backend/gps-ingestion`)
Open a new terminal in `backend/gps-ingestion` and run:
```bash
# Install dependencies
npm install

# Generate Prisma Client
npx prisma generate
```

---

## 🚀 Step 4: Running the Backend

You will need to keep **two separate terminal windows** open, one for each service.

**Terminal 1: Start Main API**
```bash
cd backend/main-api
npm run start:dev
```
*(The Main API starts cleanly and will listen on `http://localhost:3005`)*

**Terminal 2: Start GPS Ingestion Server**
```bash
cd backend/gps-ingestion
npm run dev
```
*(The GPS Ingestion API server drops into listening mode on `http://localhost:3000`)*

---

## ✅ Step 5: Verification

To ensure everything is working seamlessly:
1. Verify **Main API**: Open a browser or use Postman to send a GET request to `http://localhost:3005`. You should see the standard NestJS welcome response.
2. Verify **GPS Ingestion**: Send a test GET request to `http://localhost:3000/api/gps`. It should return a JSON array `[]` representing the locally ingested telemetry data logs.
3. Verify **Frontend Integration**: Be sure to verify your SeaSense Admin Dashboard (`admin-panel/.env.local`) points to the Main API port perfectly:
   ```env
   NEXT_PUBLIC_SOCKET_URL="http://localhost:3005"
   NEXT_PUBLIC_API_URL="http://localhost:3005"
   ```

## 🚨 Common Troubleshooting Tips

- **Password Authentication Failed:** If you used the Native Windows Installer and your server is crashing, verify that `postgres:postgres` inside `DATABASE_URL` matches the password you generated during installation.
- **Port Conflicts:** If `PORT 3005` or `3000` says *Address already in use*, use your terminal/task manager to kill the hanging Node processes occupying those ports.
- **Prisma Client Issues:** If you encounter `Client query engine is not initialized` errors, make sure you ran `npx prisma generate` in **both** service folders. Double-check that your OS supports the specific `PRISMA_CLIENT_ENGINE_TYPE`.
