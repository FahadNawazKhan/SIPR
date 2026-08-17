# SIPR - Simple NFC Water Tracker

"Drink. Tap. Continue."

SIPR is a personal, mobile-first PWA for single-user water intake tracking using standard NFC sticker URLs.

## Project Structure

```text
SIPR/
├── client/     # React + Vite + Tailwind CSS + PWA (Deploy to Vercel)
└── server/     # Node.js + Express + MongoDB Atlas (Deploy to Render)
```

---

## 🚀 Deployment Guide

### 1. Backend Deployment (Render)

1. Create a **Web Service** on [Render](https://render.com).
2. Connect your GitHub repository.
3. Configure the service settings:
   - **Root Directory**: `server`
   - **Environment**: `Node`
   - **Build Command**: `pnpm install`
   - **Start Command**: `node server.js`
4. Add Environment Variables on Render:
   - `MONGO_URI`: `mongodb+srv://faddukhan3_db_user:8YLSbo4CmIJrGg6T@cluster0.xemjckv.mongodb.net/sipr?retryWrites=true&w=majority`
   - `CLIENT_URL`: `https://your-sipr-frontend.vercel.app` *(Your Vercel URL)*
5. Deploy the Web Service. Copy your live backend URL (e.g. `https://sipr-backend.onrender.com`).

---

### 2. Frontend Deployment (Vercel)

1. Create a **New Project** on [Vercel](https://vercel.com).
2. Import your GitHub repository.
3. Configure project settings:
   - **Root Directory**: `client`
   - **Framework Preset**: `Vite`
   - **Build Command**: `pnpm build`
   - **Output Directory**: `dist`
4. Add Environment Variables on Vercel:
   - `VITE_API_URL`: `https://sipr-backend.onrender.com/api` *(Replace with your Render backend URL + `/api`)*
5. Deploy. Vercel automatically applies `client/vercel.json` rewrites for client-side routing.

---

### 3. NFC Sticker Setup

Program your physical NFC sticker with the URL of your live Vercel app:
```text
https://your-sipr-frontend.vercel.app/tap/water-bottle
```

When you tap the sticker with your phone:
```text
Phone taps NFC tag
  ↓
Opens https://your-sipr-frontend.vercel.app/tap/water-bottle
  ↓
SIPR PWA processes route & calls Render backend
  ↓
+1 L logged to MongoDB Atlas
  ↓
Shows confirmation (+1 L Logged) & redirects to Dashboard
```

---

## Local Development

### 1. Install Dependencies
```bash
pnpm install
```

### 2. Seed NFC Tag
```bash
pnpm seed
```

### 3. Start Development Servers
```bash
pnpm dev:server
pnpm dev:client
```
