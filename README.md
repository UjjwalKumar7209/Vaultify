# Vaultify

Vaultify is a modern full-stack web application built with **Next.js (App Router)** and **Express.js** that allows users to securely manage **notes and links** with authentication and a clean, responsive UI.

---

## 🚀 Features

- **Token-based Authentication:** Secure Login and Logout functionality.
- **Auth-Aware Navigation:** Navbar dynamically updates based on the user's login status.
- **Notes Management:** Create and manage personal text-based notes.
- **Links Management:** Store and organize important URLs.
- **Modern UI:** Responsive glassmorphism design built with Tailwind CSS.
- **Next.js 14 Patterns:** Fully utilizes the App Router and Server/Client component architecture.

---

## 🛠 Tech Stack

### Frontend (Client)
- **Framework:** Next.js 16 (App Router)
- **Library:** React
- **Styling:** Tailwind CSS
- **Icons:** Lucide Icons

### Backend (Server)
- **Runtime:** Node.js
- **Framework:** Express.js
- **ORM:** Prisma
- **Database:** PostgreSQL

---

## ⚙️ Setup and Installation

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/vaultify.git
cd vaultify
```

### 2. Frontend Setup (Client)
```bash
# Install frontend dependencies
cd client
npm install
```

Create a `.env.local` file in the `client` directory:
```env
BACKEND_URL="http://localhost:8000"
```

### 3. Backend Setup (Server)
```bash
# Install backend dependencies
cd ../server
npm install
```

Create a `.env` file in the `server` directory:
```env
DATABASE_URL=postgresql://user:password@host:5432/dbname?sslmode=verify-full
PORT = 8000
JWT_SECRET=password
```

### 4. Database Setup
```bash
# Inside the server directory
npx prisma generate
npx prisma migrate dev
```

---

## 🚀 Running the Application

### Start the Backend Server
```bash
# In the server directory
cd server
npm start
# or
nodemon dist/index.js
```

Backend runs on: `http://localhost:8000`

### Start the Frontend (New Terminal)
```bash
# In the client directory
cd client
npm run dev
```

Frontend runs on: `http://localhost:3000`

---

## 🔐 Authentication Flow

1. **Login:** The user authenticates and the server returns a token.
2. **Storage:** The auth token is stored in localStorage.
3. **Logout:** Clears the token from storage and redirects the user to the landing page.

---

## 📝 Technical Notes

- **Separated Architecture:** Frontend and backend are completely decoupled for better scalability and deployment flexibility.
- **Database Security:** The PostgreSQL connection uses SSL configuration to ensure encrypted data transfer.
- **ORM Benefits:** Prisma provides type-safe database queries and automatic migrations, all managed in the server directory.
- **UI Consistency:** Used a "Client-side-only" rendering pattern for auth-dependent components to ensure the UI remains consistent after the initial load.

---

## 🔮 Future Improvements

- [ ] Refresh token support for long-lived sessions.
- [ ] Route protection middleware (Edge middleware).
- [ ] Search and filtering for notes and links.

---

## 📄 License

This project is intended for learning and portfolio purposes.