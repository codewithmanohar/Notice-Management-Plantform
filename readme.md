# 🎓 University Notice Management Platform

A web-based application that allows universities to manage, approve, and distribute notices efficiently to faculty and students. It features role-based access control, faculty approval workflow, real-time notifications, and a modern responsive UI.

---

## 🚀 Features

### 🔐 Role-Based Access
- **Admin**
  - Manage notices (create, edit, delete)
  - View and approve faculty registrations
  - Monitor system settings
- **Faculty**
  - Post academic notices (after approval)
- **Student**
  - View, search, and filter notices

### 📨 Notice Management
- Add notice with:
  - Title, description, category
  - Attachments (PDF, images)
  - Publish/expiry date
- Auto-hide expired notices
- Category-based filtering (Exam, Events, Academic, General)
- Search and sort notices by title/date

### 👨‍🏫 Faculty Approval System
- Admin can view pending faculty requests
- View full profile in a styled modal
- Approve or reject with status update

### 🌗 Theming
- Light/Dark mode toggle
- White, black, and dark blue branding

### 📱 Responsive UI
- Tailwind CSS-based layout
- Responsive sidebar & topbar
- Mobile drawer navigation

---

## 🧑‍💻 Tech Stack

| Tech          | Use                          |
|---------------|-------------------------------|
| React.js      | Frontend framework             |
| Tailwind CSS  | Styling and responsiveness     |
| Zustand       | Lightweight state management   |
| React Router  | Client-side routing            |
| Lucide Icons  | Icons for UI components        |
| Node.js + Express *(Optional)* | Backend server |
| MongoDB       | Database (Mongoose models)     |

---

## 📁 Project Structure (Frontend)

