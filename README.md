# 🛍️ Modern Fullstack E-Commerce Enterprise

A high-performance, secure, and scalable e-commerce platform built with the latest **Next.js 16**, **TypeScript**, and **Supabase**. This project features a robust admin dashboard, seamless checkout flow, and comprehensive user profile management.

🚀 **Live Demo:** [https://fullstack-e-commerce-six.vercel.app](https://fullstack-e-commerce-six.vercel.app)

---

## ✨ Features

### 👤 User Side
* **Shopping Experience**: Browse all products with a modern UI and view detailed product information.
* **Cart Management**: Add products to cart, increment/decrement quantities, and real-time total calculation.
* **Seamless Checkout**: Integrated order process including shipping address selection and payment method.
* **Profile Management**: 
    * Update personal information & change password.
    * Manage multiple shipping addresses and payment methods.
    * **Avatar Upload**: Change profile picture directly using Supabase Storage.

### 🔐 Admin Dashboard
* **Product & Category Management**: Full CRUD (Create, Read, Update, Delete) functionality for products and categories.
* **User Management**: 
    * View all registered users.
    * Ability to block/deactivate user accounts.
    * Manage user roles (e.g., switching between USER and ADMIN).
* **Order Monitoring**: View detailed order history and transaction details.

---

## 🛠️ Tech Stack & Libraries

### Core
* **Next.js 16 (App Router)**: The foundation for Server Components, Actions, and optimized routing.
* **React 19**: Utilizing the latest UI rendering features.
* **TypeScript**: Ensures type safety and reduces runtime errors.
* **Prisma ORM**: Type-safe database client to interact with PostgreSQL.

### Authentication & Security
* **Next-Auth (Auth.js v5)**: Secure authentication with Google Provider and Prisma Adapter.
* **Bcryptjs**: For hashing and securing user passwords.
* **Zod**: Schema validation for every input and API request.

### UI/UX (Styling)
* **Tailwind CSS 4.0**: Utility-first CSS for rapid and modern styling.
* **Shadcn UI & Radix UI**: High-quality, accessible UI components (Dialog, Dropdown, Tabs, etc.).
* **Lucide React**: Beautiful and consistent iconography.
* **Sonner**: Sleek toast notifications for user feedback.

### State Management & Utilities
* **Zustand**: Lightweight and fast state management for the shopping cart.
* **TanStack Table**: Advanced data tables for Admin lists.
* **Use-Debounce**: Optimizing search and filter performance.
* **Date-fns**: Handling and formatting complex dates.

---

## ⚙️ Environment Variables

Create a `.env` file in the root directory and add the following variables:

```
# Database (Prisma)
DATABASE_URL=your_postgresql_database_url

# Supabase (Storage & API)
SUPABASE_SECRETE_KEY=your_supabase_service_role_key
SUPABSE_BASE_API_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_SECRET_KEY=your_supabase_anon_key
NEXT_PUBLIC_SUPABASE_BASE_URL=your_supabase_project_url

# Auth.js (Next-Auth)
AUTH_SECRET=your_auth_secret_any_long_string
AUTH_TRUST_HOST=true
AUTH_GOOGLE_ID=your_google_client_id
AUTH_GOOGLE_SECRET=your_google_client_secret

```
---


```
🚀 Getting Started

Clone the repository:

git clone (https://github.com/herihermansyah/fullstack-e-commerce.git)
cd fullstack-e-commerce

pnpm install

Setup Database:
pnpm prisma generate
pnpm prisma db push

Run Development Server:
pnpm dev

Build for Production:
pnpm build

```
---
🙌 Contributions
Contributions are always welcome! Feel free to submit issues or pull requests to improve this boilerplate.

## 👨‍💻 Author
**Heri Hermansyah**
* 🔗 [LinkedIn](https://www.linkedin.com/in/heri-hermansyah/)
* 🔗 [GitHub](https://github.com/herihermansyah)

📜 License
This project is open-source under the MIT License.
