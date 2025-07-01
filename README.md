# Gasify

A modern SaaS platform for online gas cylinder booking and delivery, featuring a React + TailwindCSS frontend and a Node.js/Express + MongoDB backend.

---

## 🚀 Features

- **User:** Online gas booking, booking history, secure payments, live tracking, and instant quotes.
- **Admin:** Approve/reject bookings, post notices, view analytics (charts), and manage all bookings.
- **Modern UI:** Fully responsive, mobile-first, and accessible design using TailwindCSS.
- **Authentication:** Firebase for user login; admin access via a secure password modal (no backend admin dependency).
- **Chatbot:** Integrated Chatbase AI support widget.

---

## 🗂️ Project Structure

```
gasagency/
  backend/      # Node.js/Express API, MongoDB, Firebase Admin
  frontend/     # React app, TailwindCSS, Vite, Swiper, Chart.js
```

---

## ⚙️ Backend Setup

### 1. Prerequisites

- Node.js (v16+ recommended)
- MongoDB Atlas account (or local MongoDB for testing)
- Firebase project (for user authentication)

### 2. Environment Variables

Create a `backend/.env` file with:

```
MONGO_URI=your_mongodb_atlas_connection_string
PORT=5000
```

### 3. Firebase Admin

- Place your Firebase service account JSON as `backend/firebaseServiceAccount.json`.

### 4. Install Dependencies

```bash
cd backend
npm install
```

### 5. Start the Backend

```bash
node server.js
# or for development with auto-reload:
npx nodemon server.js
```

The backend will run on `http://localhost:5000`.

---

## 💻 Frontend Setup

### 1. Prerequisites

- Node.js (v16+ recommended)

### 2. Install Dependencies

```bash
cd frontend
npm install
```

### 3. Start the Frontend

```bash
npm run dev
```

The frontend will run on `http://localhost:5173` (default Vite port).

---

## 🔑 Admin Access

- Click "Admin Access" on the homepage.
- Enter the password: **gasify1234**
- You will be redirected to `/admin/dashboard` with full admin privileges (no email or backend check required).

---

## 🛡️ Security Notes

- **Admin access is now frontend-only and protected by a hardcoded password.**
- **Do NOT use this approach in production for sensitive data.** For real-world apps, always use secure backend authentication for admin features.

---

## 📊 Analytics & Features

- **Charts:** Booking status, payment mode usage, bookings per day/week (Chart.js).
- **Bookings:** Approve/reject, view all, filter by status.
- **Notices:** Post and view notices for all users.

---

## 🤖 Chatbot Integration

- Chatbase AI widget is embedded and configured in `frontend/index.html`.
- To customize, edit the Chatbase config or visit your Chatbase dashboard.

---

## 📝 Scripts

### Backend

- `npm start` — Start server
- `npx nodemon server.js` — Start server with auto-reload

### Frontend

- `npm run dev` — Start dev server
- `npm run build` — Build for production
- `npm run preview` — Preview production build

---

## 🧪 Testing

1. Register/login as a user to book cylinders.
2. Use "Admin Access" with the password to manage bookings and notices.
3. All admin features (approve/reject, post notices, analytics) should work without any backend admin check.

---

## 📦 Tech Stack

- **Frontend:** React, TailwindCSS, Vite, Swiper, Chart.js, React Hot Toast, React Icons
- **Backend:** Node.js, Express, MongoDB (Mongoose), Firebase Admin, Nodemailer
- **Auth:** Firebase Authentication (for users)
- **Chatbot:** Chatbase

---

## 📄 License

This project is for educational/demo purposes. For production, implement secure admin authentication and follow best security practices.
