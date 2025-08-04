
# Sahla LMS - The All-in-One Platform to Build Your Learning Empire



**Sahla** (سهلة - Arabic for "Easy") is a powerful, multi-tenant Learning Management System (LMS) built with a modern technology stack. It empowers educators, developers, and entrepreneurs to launch their own branded online learning platforms with unparalleled ease and power. From intuitive course creation and AI-powered tools to seamless payment processing and a drag-and-drop landing page builder, Sahla handles the complexities so you can focus on what you do best: educating and inspiring.

**Live Demo:** `https://sahla-lms.vercel.app/` 

## ✨ Key Features

Sahla is packed with features designed to provide a world-class experience for both platform administrators and students.

*   **🏢 Multi-Tenancy Architecture:** Launch multiple, fully-isolated learning platforms, each with its own unique subdomain, branding, courses, and user base, all managed from a single codebase.
*   **💳 Stripe Integration for Payments & Subscriptions:** Monetize your content effortlessly. Sell courses individually or offer subscription plans with secure payment processing handled by Stripe. Webhooks are configured for real-time updates on enrollments and plan upgrades.
*   **🛠️ Advanced Course & Content Management:**
    *   **Rich Course Structure:** Organize content with chapters and lessons.
    *   **Multiple Lesson Types:** Engage students with diverse content formats including **video lessons**, interactive **quizzes**, and hands-on **coding playgrounds**.
    *   **Rich Text Editor:** Create beautiful and detailed course descriptions using a Tiptap-based WYSIWYG editor.
*   **🤖 AI-Powered Quiz Generation:** (Pro Plan Feature) Save hours of content creation time by automatically generating relevant quiz questions on any topic using the OpenRouter AI API.
*   **💻 Interactive Coding Playgrounds:** A standout feature for technical courses!
    *   **Live Code Execution:** Powered by the Judge0 API, students can run code in various languages directly in the browser.
    *   **Web & Server-Side Support:** Supports both frontend (HTML, CSS, JS) playgrounds with a live preview and popular backend languages (Python, C++, TypeScript, etc.).
    *   **Submission History:** Students can track their attempts and review past submissions.
*   **🎨 Drag-and-Drop Landing Page Builder:** No coding required! Admins can create and customize a beautiful, responsive public landing page for their platform using an integrated instance of **Puck.js**.
*   **📊 Admin & Analytics Dashboard:**
    *   Gain insights into your platform's performance with key metrics like total revenue, enrollments, and user sign-ups.
    *   Visualize trends with interactive charts for enrollments and top-performing courses.
    *   Manage students, courses, and platform settings from a centralized admin panel.
*   **🎓 Student Experience & Certification:**
    *   **Personalized Dashboard:** Students can track their progress across all enrolled courses.
    *   **Lesson Completion Tracking:** A clear path for students to follow, unlocking lessons as they progress.
    *   **PDF Certificate Generation:** Award verifiable PDF certificates upon course completion to motivate students and validate their skills.
    *   **Public Verification Page:** Each certificate comes with a unique link to a public page to verify its authenticity.
*   **💬 Comments & Discussion:** Foster a community of learners with a built-in commenting system on each lesson, allowing for replies and instructor interaction.
*   **☁️ S3-Compatible File Storage:** Securely upload and stream course materials like videos and images using a robust file handling system compatible with AWS S3, Cloudflare R2, and more.

## 🚀 Tech Stack

Sahla is built with a modern, scalable, and type-safe technology stack.

| Category          | Technologies                                                                                                   |
| ----------------- | -------------------------------------------------------------------------------------------------------------- |
| **Framework**     | [Next.js](https://nextjs.org/) (App Router), [React](https://react.dev/)                                         |
| **Language**      | [TypeScript](https://www.typescriptlang.org/)                                                                  |
| **Database**      | [PostgreSQL](https://www.postgresql.org/) with [Prisma](https://www.prisma.io/) ORM                            |
| **Styling**       | [Tailwind CSS](https://tailwindcss.com/), [shadcn/ui](https://ui.shadcn.com/), [Radix UI](https://www.radix-ui.com/) |
| **Authentication**| [Better Auth](https://better-auth.dev/)                                                                        |
| **Payments**      | [Stripe](https://stripe.com/)                                                                                  |
| **File Storage**  | S3-Compatible (e.g., [Cloudflare R2](https://www.cloudflare.com/developer-platform/r2/))                         |
| **Emails**        | [Resend](https://resend.com/)                                                                                  |
| **AI Services**   | [OpenRouter](https://openrouter.ai/)                                                                           |
| **Code Execution**| [Judge0](https://judge0.com/)                                                                                  |
| **Page Builder**  | [Puck.js](https://puck.js.org/)                                                                                |
| **Deployment**    | [Vercel](https://vercel.com/)                                                                                  |

## ⚙️ Getting Started

Follow these steps to get a local instance of Sahla up and running.

### Prerequisites

*   Node.js (v18 or later)
*   pnpm
*   PostgreSQL database (e.g., via Docker, Neon, or a local installation)

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/sahla-lms.git
cd sahla-lms
```

### 2. Install Dependencies

```bash
pnpm install
```

### 3. Set Up Environment Variables

Create a `.env` file in the root of the project by copying the example file:

```bash
cp .env.example .env
```

Now, fill in the `.env` file with your credentials for the various services:

```dotenv
# .env

# Database (e.g., from Neon or local PostgreSQL)
DATABASE_URL="postgresql://user:password@host:port/database"

# Better Auth
BETTER_AUTH_SECRET="generate_a_strong_secret"
BETTER_AUTH_URL="http://localhost:3000"

# Social Auth (GitHub Example)
AUTH_GITHUB_CLIENT_ID="your_github_client_id"
AUTH_GITHUB_SECRET="your_github_client_secret"

# Email Service
RESEND_API_KEY="your_resend_api_key"

# S3-Compatible File Storage (e.g., Cloudflare R2)
AWS_ACCESS_KEY_ID="your_access_key_id"
AWS_SECRET_ACCESS_KEY="your_secret_access_key"
AWS_ENDPOINT_URL_S3="your_s3_endpoint_url" # e.g., https://<account_id>.r2.cloudflarestorage.com
NEXT_PUBLIC_AWS_ENDPOINT_URL_S3="your_public_s3_url" # e.g., https://pub-....r2.dev
AWS_REGION="auto"
NEXT_PUBLIC_S3_BUCKET_NAME_IMAGES="your_bucket_name"

# AI Service for Quiz Generation
OPEN_ROUTER_API_KEY="your_open_router_api_key"

# Code Execution Service
JUDGE0_API_KEY="your_judge0_rapidapi_key"

# Stripe for Payments
STRIPE_SECRET_KEY="sk_test_..."
STRIPE_WEBHOOK_SECRET="whsec_..."
```

### 4. Set Up the Database

Run the Prisma migrations to set up your database schema.

```bash
pnpm prisma migrate dev
```

### 5. Run the Development Server

```bash
pnpm dev
```

The application will be available at `http://localhost:3000`. You can create your first platform by navigating to `http://localhost:3000/start`.

## Project Structure

*   `app/(sahla)/`: Contains the routes for the main marketing website (`/`, `/pricing`, `/about`, etc.).
*   `app/s/[subdomain]/`: The core multi-tenant application. All platform-specific logic resides here.
    *   `(public)/`: Public-facing pages for a tenant (landing page, course catalog).
    *   `admin/`: The admin dashboard for platform owners.
    *   `dashboard/`: The dashboard for enrolled students.
*   `lib/`: Core logic, utilities, database client (Prisma), and service integrations (Stripe, Resend, etc.).
*   `components/`: Shared React components used throughout the application, including a rich `ui` library based on shadcn/ui.
*   `prisma/`: Database schema and migrations.
*   `hooks/`: Custom React hooks for shared client-side logic.

## 🤝 Contributing

Contributions are welcome! If you'd like to contribute, please fork the repository and use a feature branch. Pull requests are warmly welcome.

1.  Fork the repository.
2.  Create your feature branch (`git checkout -b feature/amazing-feature`).
3.  Commit your changes (`git commit -m 'Add some amazing feature'`).
4.  Push to the branch (`git push origin feature/amazing-feature`).
5.  Open a Pull Request.

## 📜 License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.
