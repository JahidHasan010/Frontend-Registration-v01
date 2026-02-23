# 📋 Project Plan: Lincoln Online Registration System

This document outlines the detailed plan and technical specifications for the Lincoln University Student Face Registration System.

## 1. Project Overview
A web-based biometric registration portal that captures student information and multiple high-resolution face images for AI-based processing and attendance verification.

## 2. Technical Architecture
The system follows a three-tier architecture:
1.  **Frontend (Presentation Tier):** React.js + Ant Design for UI/UX and hardware (webcam) integration.
2.  **API Gateway (Middleware):** Vercel Proxy (deployed) or Vite Proxy (local) to handle secure (HTTPS) to insecure (HTTP) tunneling.
3.  **Backend (Logic Tier):** FastAPI (hosted on AWS EC2) for data ingestion and image storage.

## 3. Implementation Workflow

### **Phase 1: Setup & Initialization**
- [x] Project scaffolding with Vite and React 18.
- [x] Dependency management (antd, axios, react-router-dom).
- [x] Global style and layout configuration (Ant Design reset).

### **Phase 2: Core Features Development**
- [x] **Webcam Integration:** `navigator.mediaDevices.getUserMedia` for real-time video streaming.
- [x] **Face Snapshot:** Canvas-based capturing with horizontal flipping for a mirrored user experience.
- [x] **Multi-Capture Logic:** Minimum 5 and maximum 10 image constraint with dynamic state updates.
- [x] **Form Validation:** Mandatory fields for student identification (ID, Faculty, Subjects).

### **Phase 3: Networking & Security**
- [x] **Base64 Encoding:** Converting captured canvas images to Base64 strings for JSON-friendly payload.
- [x] **Mixed Content Fix:** Implementing `vercel.json` and `vite.config.js` proxy configurations to resolve browser-level blocking.
- [x] **API Resilience:** Configured 20-second timeout for large image data uploads.

### **Phase 4: Polish & Deployment**
- [x] Responsive CSS for mobile/tablet compatibility.
- [x] Success page with post-registration redirect logic.
- [x] Favicon and brand assets implementation.

## 4. Security & Performance Considerations
- **HTTPS Enforcement:** The system **must** be hosted on HTTPS for browsers to grant camera access.
- **Data Compression:** Future updates should include image resizing on the client-side to reduce network bandwidth usage.
- **CORS Handling:** Backend on AWS must be configured to allow origins from `vercel.app`.

## 5. Future Roadmap
- **Face Liveness Detection:** Integrate a secondary check (blink detection or motion) to prevent spoofing with photos.
- **Auto-Capture:** Implement an AI model (like FaceAPI.js) to automatically capture images when a face is perfectly aligned.
- **Offline Support:** Local storage of registration data if the AWS server is temporarily unreachable.
- **Database Integration:** Moving from transient memory to a persistent PostgreSQL/MongoDB storage on the backend.

---
*Last Updated: February 17, 2026*
