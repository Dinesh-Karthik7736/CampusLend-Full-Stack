# 🌱 CampusLend: A Trust-Based P2P Sharing Platform

CampusLend is a **full-stack web application** that fosters a **sustainable sharing economy** within university campuses.  
It enables students to **lend, borrow, and barter** items such as textbooks, electronics, and lab equipment — reducing consumer waste and building a stronger, collaborative community.

---

## ✨ Key Features

- 🔒 **Secure, Closed-Loop Community**  
  Verified registration via university email ensures a trusted, hyperlocal network.

- 🔄 **P2P Lending & Bartering**  
  Users can list items for lending or bartering, with configurable availability dates.

- ⭐ **Trust Scoring System**  
  Each user has a visible trust score that reflects their reliability.

- 💬 **Real-Time Chat**  
  Built with **Firebase Realtime Database** for instant, one-on-one communication.

- 🔔 **Real-Time Notifications**  
  Powered by **Socket.IO** for immediate alerts (requests, approvals, reminders).

- 🛎️ **Persistent Notification Panel**  
  A dedicated bell icon shows historical notifications at a glance.

- ⚖️ **Formal Complaint System**  
  Users can file disputes, which auto-triggers an **email escalation workflow** to higher authorities.

- 📊 **Dynamic Dashboard**  
  Personalized dashboards to manage items, requests, and track loan statuses.

---

## 🛠️ Tech Stack & Architecture

### 🎨 Frontend
- **React.js** – Responsive, component-driven UI  
- **Tailwind CSS** – Modern, utility-first styling  
- **React Router** – Client-side navigation  
- **Axios** – Secure API communication  

### ⚙️ Backend
- **Node.js + Express.js** – REST API server  
- **Mongoose** – ODM for MongoDB  
- **Socket.IO** – Real-time notifications  
- **Nodemailer** – Email automation for complaints  
- **JWT** – Authentication & API security  

### 🗄️ Database & Cloud Services
- **MongoDB Atlas** – Cloud-hosted NoSQL database  
- **Firebase Authentication** – Secure Google Sign-In  
- **Firebase Realtime Database** – Live chat system  
- **Firebase Storage** – Profile picture & file uploads  

---

## 📸 Screenshots  

> _(Add screenshots of your running application here for best impact)_

| Login Page | User Dashboard |
|------------|----------------|
| ![Login Screenshot](<img width="1919" height="903" alt="Screenshot 2025-08-23 161115" src="https://github.com/user-attachments/assets/70517cf7-b674-469e-8c09-99ba1884d359" />
) | ![Dashboard Screenshot](<img width="1851" height="819" alt="Screenshot 2025-08-23 161817" src="https://github.com/user-attachments/assets/9e8311cc-0ebe-40d0-8a77-e9347c33c0c9" />
) |

| My Requests | Real-Time Chat |
|-------------|----------------|
| ![Requests Screenshot](<img width="1829" height="822" alt="Screenshot 2025-08-23 161802" src="https://github.com/user-attachments/assets/387126d3-30aa-44da-ac98-1006307852fe" />
) | ![Chat Screenshot](<img width="1506" height="819" alt="Screenshot 2025-08-23 161749" src="https://github.com/user-attachments/assets/5317c485-c223-4151-8c49-5b862a52da26" />
) |

---

## 🚀 Getting Started

Follow these steps to run the project locally:

### ✅ Prerequisites
- [Node.js](https://nodejs.org/) (v18 or later)  
- npm  
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) account  
- [Firebase Project](https://firebase.google.com/) with **Auth, Realtime DB, Storage** enabled  
- Gmail account with a **16-digit App Password** (for Nodemailer)

---

### 1️⃣ Backend Setup

```bash
cd backend
npm install
