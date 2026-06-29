# 🏠 Property Rental & Booking Platform

A full-stack Property Rental & Booking Platform where property owners can list rental properties, tenants can discover and book properties, and administrators can manage the entire system through a role-based dashboard.

## 🌐 Live Demo

* **Frontend:** https://your-client-url.vercel.app
* **Backend:** https://your-server-url.onrender.com

---

# 📌 Project Purpose

This platform connects property owners and tenants in a secure and transparent rental marketplace. Owners can publish rental properties, tenants can search, book, pay reservation fees, and leave reviews, while administrators monitor users, properties, bookings, and transactions.

---

# ✨ Key Features

## 🔐 Authentication & Authorization

* Email & Password Authentication
* Google Social Login
* JWT Authentication
* Protected Routes
* Role-Based Access Control
* Three User Roles

  * Tenant
  * Owner
  * Admin

---

## 🏡 Property Management

* Add New Property
* Update Property
* Delete Property
* Property Approval System
* Property Rejection Feedback
* Featured Properties
* Property Search
* Backend Filtering
* Backend Sorting
* Pagination

---

## 📅 Booking System

* Book Property
* Booking Requests
* Booking Status
* Pending
* Approved
* Rejected
* Booking History

---

## 💳 Online Payment

* Stripe Payment Integration
* Secure Payment Processing
* Transaction History
* Payment Success Page

---

## ❤️ Favorites

* Add Property to Favorites
* Remove Favorite
* Favorite List

---

## ⭐ Review System

* Property Ratings
* Customer Reviews
* Dynamic Review Display

---

## 📊 Dashboard

### Tenant Dashboard

* My Bookings
* Favorites
* Profile

### Owner Dashboard

* Dashboard Analytics
* Total Earnings
* Total Properties
* Total Bookings
* Monthly Earnings Chart
* Add Property
* My Properties
* Booking Requests

### Admin Dashboard

* Manage Users
* Change User Role
* Manage Properties
* Approve / Reject Properties
* Booking Management
* Transaction Management

---

## 🎨 UI Features

* Responsive Design
* Framer Motion Animations
* Loading Page
* Custom Error Page
* Modern Card Layout
* Consistent Design System

---

# 🛠️ Technologies Used

## Frontend

* React
* React Router DOM
* Tailwind CSS
* DaisyUI
* Framer Motion
* React Icons
* React Hook Form
* React Hot Toast
* Axios
* Stripe React SDK
* Recharts
* SweetAlert2

---

## Backend

* Node.js
* Express.js
* MongoDB
* JWT
* Stripe API
* CORS
* dotenv

---

# 📦 NPM Packages

### Client

```bash
react
react-router-dom
tailwindcss
daisyui
axios
framer-motion
react-hook-form
react-hot-toast
react-icons
sweetalert2
recharts
@stripe/react-stripe-js
@stripe/stripe-js
```

### Server

```bash
express
mongodb
jsonwebtoken
cors
dotenv
stripe
cookie-parser
```

---

# 📂 Folder Structure

```
client/
│
├── src
│   ├── components
│   ├── pages
│   ├── layouts
│   ├── routes
│   ├── hooks
│   ├── providers
│   ├── api
│   ├── utils
│   └── assets
│
server/
│
├── routes
├── middleware
├── config
├── utils
└── index.js
```

---

# 🔒 Environment Variables

## Client (.env)

```env
VITE_API_URL=
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=
VITE_STRIPE_PUBLISHABLE_KEY=
```

## Server (.env)

```env
PORT=
MONGODB_URI=
JWT_SECRET=
STRIPE_SECRET_KEY=
```

---

# 🚀 Installation

## Clone Repository

```bash
git clone <client-repository-url>
git clone <server-repository-url>
```

## Client

```bash
cd client
npm install
npm run dev
```

## Server

```bash
cd server
npm install
npm run dev
```

---

# 👤 Demo Credentials

## Admin

```
Email:
Password:
```

## Owner

```
Email:
Password:
```

## Tenant

```
Email:
Password:
```

---

# 📈 Future Improvements

* Dark / Light Theme
* Share Property
* PDF Earnings Report
* Email Notifications
* Wishlist Recommendation System

---

# 👨‍💻 Author

**Ridoy Ahamed**

---

## 📜 License

This project was developed as part of the Programming Hero Level-2 Assignment (A10_CAT-008) and is intended for educational purposes.
