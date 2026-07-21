<div align="center">

# ⚙️ SERVICE MANAGER

**A modern, intuitive web dashboard for real-time Linux systemd service administration.**

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![MaterialUI](https://img.shields.io/badge/MUI-007FFF?style=for-the-badge&logo=mui&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Status](https://img.shields.io/badge/Status-In_Development-orange?style=for-the-badge)

</div>

---

## 📌 Overview

**Service Manager** is a sleek web application designed to simplify Linux server administration. Say goodbye to juggling complex CLI commands (`systemctl status`, `journalctl`) across multiple terminals. 

With **Service Manager**, system administrators and DevOps teams can monitor, control, and inspect all `systemd` daemons in real time through a unified, high-performance web dashboard.

---

## ✨ Key Features

- 📊 **Real-time Metrics Overview:** Live counters for active, stopped, and total daemons at a glance.
- ⚡ **Instant Control:** Effortlessly start, stop, or restart system services with a single click.
- 🔍 **Detailed Daemon Inspection:** View detailed load paths, vendor preset status, active runtime states, and documentation links.
- 🎯 **Smart Filtering:** Quickly filter services by execution status (Running, Stopped, Failed).
- 🌙 **Dark-Themed Command Center:** Modern dark UI tailored for system administrators working in high-density environments.
- 🔐 **Lightweight Configuration:** Designed to work via `.conf` files for authentication without heavy backend dependencies.

---

## 🛠️ Tech Stack

- **Frontend Core:** [ReactJS](https://react.dev/)
- **Build Tool:** [Vite](https://vitejs.dev/)
- **UI & Styling:** [Tailwind CSS](https://tailwindcss.com/) & [Material-UI (MUI)](https://mui.com/)
- **Icons:** Material Icons & Custom SVG Badges

---

## 🚀 Quick Start

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) (v18+) and `npm` installed.

### Installation

1. **Clone the repository:**
   ```bash
   git clone [https://github.com/fymijoro/service-manager.git](https://github.com/fymijoro/service-manager.git)
   cd service-manager
   ```

2. **Install dependencies:**
    ```bash
    npm install
    ```

3. **Run the development server:**
    ```bash
    npm run dev
    ```

**Then:**
    Open your browser and navigate to http://localhost:5173

---

## 🗺️ Roadmap & Future Enhancements

+ [x] Responsive Frontend Mockup & Dashboard UI

+ [x] Dynamic Service Status Filtering & Daemon Cards

+ [ ] Lightweight .conf file authentication system

+ [ ] Backend API integration (Node.js / Go) for live systemctl IPC execution

+ [ ] Live WebSocket streaming for real-time log tailing (journalctl)

---

## Meet the Team

Developed with 🤍❤️💚 by Tracker Team — IT students at ENI Fianarantsoa 🇲🇬 (École Nationale d'Informatique) passionate about systems administration, infrastructure management, and open-source tooling.