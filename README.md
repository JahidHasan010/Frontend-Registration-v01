# 🎓 Lincoln Online Student Face Registration System

A modern, high-performance biometric enrollment portal built with **React 18**, **Vite**, and **Ant Design**. This system allows students to register their details and capture high-quality face images for AI-based processing.

## 🚀 Features

- **Real-time Face Capture:** Integrated webcam support with a mirrored preview for intuitive user positioning.
- **Smart Validation:** Mandates a minimum of 5 and a maximum of 10 face captures to ensure data quality.
- **Progress Tracking:** Dynamic progress bars and image previews provide instant feedback during enrollment.
- **Secure Proxying:** Custom Vercel and Vite proxy configurations to bypass "Mixed Content" security issues and ensure seamless communication with the backend.
- **Responsive UI:** Optimized for desktop and tablet views using Ant Design's grid system and custom CSS.

## 🛠️ Tech Stack

- **Frontend:** React.js, Vite
- **UI Framework:** Ant Design (antd)
- **Networking:** Axios
- **Routing:** React Router DOM
- **Backend (External):** FastAPI (AWS EC2)

## 📦 Installation

1. **Clone the repository:**
   ```bash
   git clone <your-repo-url>
   cd reg3
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Run locally:**
   ```bash
   npm run dev
   ```
   The app will be available at `http://localhost:5173`.

## 🌐 Deployment

This project is optimized for **Vercel**. 

- The `vercel.json` file handles the API proxying from `https` (frontend) to `http` (backend).
- Ensure your backend on AWS (`13.210.28.221:8000`) is running and allows inbound traffic on port 8000.

## 📁 Project Structure

```text
src/
├── pages/         # Register and Success pages
├── services/      # Axios API configuration
├── styles/        # Custom camera and layout CSS
├── App.jsx        # Routing logic
└── main.jsx       # App entry point
public/            # Static assets (favicon, etc.)
vercel.json        # Vercel deployment configuration
```

---
*Developed for Lincoln University Online Registration.*
