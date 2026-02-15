# BizLaunch 🚀

**Accelerating Business Launch in Bangladesh with Confidence.**

BizLaunch is the all-in-one marketplace connecting entrepreneurs with verified tax, legal, and compliance experts. From company registration to VAT filing, we simplify the bureaucratic process for businesses in Bangladesh.

## ✨ Features

- **Role-Based Authentication**: Secure sign-up/login for both Clients (Business Owners) and Professionals (Service Providers) using Supabase Auth.
- **Comprehensive Service Catalog**: Dedicated pages for browsing legal, tax, and compliance services.
- **Interactive Dashboard**: Manage service requests, track application status, and view profile details.
- **Modern UI/UX**: Built with a premium glassmorphism design system using Tailwind CSS, featuring smooth animations and responsive layouts.
- **Seamless Compliance**: Integration with verified experts for Company Registration, Trade License, VAT/Tax Filing, and more.

## 🛠 Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router, Turbopack)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Authentication**: [Supabase Auth](https://supabase.com/auth)
- **Database**: [PostgreSQL](https://www.postgresql.org/) (via Supabase)
- **ORM**: [Prisma](https://www.prisma.io/)
- **State Management**: React Hooks & Context
- **Deployment**: [Vercel](https://vercel.com/)

## 🚀 Getting Started

Follow these steps to set up the project locally.

### Prerequisites

- **Node.js**: Ensure you have Node.js installed (v18+ recommended).
- **Package Manager**: This project uses `pnpm`.

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/bizlaunch.git
    cd bizlaunch
    ```

2.  **Install dependencies:**
    ```bash
    pnpm install
    ```

3.  **Environment Setup:**
    Create a `.env` file in the root directory modeled after `.env.example`:
    ```bash
    cp .env.example .env
    ```
    Fill in your Supabase credentials and Database URL:
    ```env
    # Database (Supabase Connection Pooling)
    DATABASE_URL="postgresql://postgres.[REF]:[PASS]@aws-0-us-east-1.pooler.supabase.com:6543/postgres?pgbouncer=true"
    
    # Direct Connection (for Migrations)
    DIRECT_URL="postgresql://postgres.[REF]:[PASS]@aws-0-us-east-1.pooler.supabase.com:5432/postgres"

    # Supabase Auth
    NEXT_PUBLIC_SUPABASE_URL="https://[YOUR-PROJECT-REF].supabase.co"
    NEXT_PUBLIC_SUPABASE_ANON_KEY="[YOUR-ANON-KEY]"
    ```

4.  **Database Setup:**
    Generate the Prisma client:
    ```bash
    pnpm prisma generate
    ```
    Push the schema to your database (if setting up fresh):
    ```bash
    pnpm prisma db push
    ```

5.  **Run Development Server:**
    ```bash
    pnpm dev
    ```

    Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📂 Project Structure

```
bizlaunch/
├── prisma/             # Database schema and migrations
│   └── schema.prisma
├── public/             # Static assets
├── src/
│   ├── app/            # Next.js App Router pages
│   │   ├── api/        # API Routes (Auth sync, etc.)
│   │   ├── dashboard/  # Protected User Dashboard
│   │   ├── services/   # Services Listing Page
│   │   ├── auth/       # Authentication pages (login/signup)
│   │   └── ...
│   ├── components/     # Reusable UI components (Navbar, Spinner, etc.)
│   ├── lib/            # Utilities (Prisma, Supabase clients)
│   └── hooks/          # Custom React hooks
└── ...
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License.
