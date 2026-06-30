# 🎨 ArtHub

ArtHub is a full-stack online artwork marketplace where artists can showcase and sell their artwork while buyers can explore, purchase, and manage their collections. The platform provides secure authentication, payment integration, user role management, artwork management, and an intuitive browsing experience.

## 🌐 Live Website

**Client:** https://arthub-blue.vercel.app

**Server:** https://arthub-server-pied.vercel.app

---

## 🎯 Project Purpose

The goal of ArtHub is to provide a modern digital marketplace where:

- Artists can upload and manage their artwork.
- Buyers can browse, search, filter, and purchase artworks.
- Administrators can manage users, artworks, and transactions.
- Secure authentication and online payments create a complete marketplace experience.

---

## ✨ Key Features

- 🔐 Email & Google Authentication using Better Auth
- 👤 User Profile Management
- 🎨 Add, Edit, Delete, and View Artworks
- 🔍 Search artworks by title or artist
- 🏷️ Category Filtering
- 📊 Price & Date Sorting
- 📄 Client-side Pagination
- ❤️ Purchase Artwork
- 💳 Stripe Payment Integration
- 🖼️ Personal Purchased Gallery
- 💬 Artwork Comment System
- ⭐ Subscription Plans
- 👨‍💼 Admin Dashboard
- 📈 Analytics Dashboard
- 👥 User Role Management
- 📦 Transaction Management
- 📱 Fully Responsive Design
- ⚡ Loading Skeletons and Empty States
- ☁️ Image Upload with ImgBB

---

## 🛠️ Technologies Used

### Frontend

- Next.js 16
- React 19
- Tailwind CSS
- HeroUI
- Better Auth
- Stripe
- React icons
- React Hot Toast
- Recharts

### Backend

- Node.js
- Express.js
- MongoDB Atlas
- Stripe
- CORS
- Dotenv

---

## 📦 NPM Packages Used

### Client

- @heroui/react
- @better-auth/react
- react-hook-form
- axios
- framer-motion
- react-hot-toast
- next
- react
- react-dom
- tailwindcss
- Recharts
- React icons

### Server

- express
- mongodb
- cors
- dotenv
- stripe

---

## 📂 Project Structure

Client

- Authentication
- Browse Artworks
- Artwork Details
- Dashboard
- User Profile
- Purchased Gallery
- Admin Panel

Server

- REST API
- MongoDB Collections
- Payment API
- Artwork API
- User API
- Subscription API
- Purchase API
- Comment API

---

## 🚀 Installation

### Clone the repository

```bash
git clone <your-client-repository-url>
```

### Install dependencies

```bash
npm install
```

### Start development server

```bash
npm run dev
```

---

## 🔑 Environment Variables

Create a `.env.local` file for the client and a `.env` file for the server.

### Client

```env
NEXT_PUBLIC_API_URL=
NEXT_PUBLIC_AUTH_URL=
NEXT_PUBLIC_IMGBB_API_KEY=
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
```

### Server

```env
MONGODB_URI=
DB_NAME=
STRIPE_SECRET_KEY=
```

---

## 👨‍💻 Author

**Mehedi Hasan Niloy **

---

## 📜 License

This project was created for educational purposes.
