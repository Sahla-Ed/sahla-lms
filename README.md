# Sahla LMS - The All-in-One Platform to Build Your Learning Empire

**Sahla** (سهلة - Arabic for "Easy") is a powerful, multi-tenant Learning Management System (LMS) built with a modern technology stack. It empowers educators, developers, and entrepreneurs to launch their own branded online learning platforms with unparalleled ease and power. From intuitive course creation and AI-powered tools to seamless payment processing and a drag-and-drop landing page builder, Sahla handles the complexities so you can focus on what you do best: educating and inspiring.

**Deployment:** `https://sahlah.tech`

## ✨ Key Features

Sahla is packed with features designed to provide a world-class experience for both platform administrators and students.

- **🏢 Multi-Tenancy Architecture:** Launch multiple, fully-isolated learning platforms, each with its own unique subdomain, branding, courses, and user base, all managed from a single codebase.
- **🌍 Full Internationalization (i18n):** Built from the ground up with `next-intl` to support multiple languages (English & Arabic included). The system intelligently serves the correct language based on tenant settings, user preferences, or browser headers.
- **💳 Stripe Integration for Payments & Subscriptions:** Monetize your content effortlessly. Sell courses individually or offer subscription plans (`Free`/`Pro`) with secure payment processing handled by Stripe. Webhooks are configured for real-time updates on enrollments and plan status.
- **🛠️ Advanced Course & Content Management:**
  - **Rich Course Structure:** Organize content logically with chapters and lessons.
  - **Diverse Lesson Types:** Engage students with multiple content formats, including **video lessons**, interactive **quizzes**, and hands-on **coding playgrounds**.
  - **Rich Text Editor:** Create beautiful and detailed course descriptions using a powerful Tiptap-based WYSIWYG editor.
- **🎨 Drag-and-Drop Landing Page Builder:** No coding required! Admins can create and customize a beautiful, responsive public landing page for their platform using an integrated instance of **Puck.js**.
- **💻 Interactive Coding Playgrounds:** A standout feature for technical courses!
  - **Live Code Execution:** Powered by the **Judge0 API**, students can write and run code in various languages directly in the browser.
  - **Web & Server-Side Support:** Supports both frontend (HTML, CSS, JS) playgrounds with a live preview and popular backend languages (Python, C++, TypeScript, etc.).
  - **Submission History:** Students can track their attempts, review past submissions, and load previous code to continue their work.
- **🤖 AI-Powered Quiz Generation (Pro Plan Feature):** Save hours of content creation time by automatically generating relevant quiz questions on any topic using a powerful generative AI model.
- **📊 Admin & Analytics Dashboard:**
  - Gain insights into your platform's performance with key metrics like total revenue, student counts, and new enrollments.
  - Visualize trends with interactive charts for enrollments and top-performing courses.
  - Manage the entire course lifecycle, student data, billing, and platform settings from a centralized admin panel.
  - View and respond to messages from your platform's contact form.
- **🎓 Student Experience & Certification:**
  - **Personalized Dashboard:** Students can track their progress across all enrolled courses and quickly resume learning.
  - **Lesson Completion Tracking:** A clear path for students to follow, with progress visualization and lesson locking to ensure sequential learning.
  - **PDF Certificate Generation:** Award verifiable PDF certificates upon course completion to motivate students and validate their skills.
  - **Public Verification Page:** Each certificate includes a unique link to a public page to verify its authenticity.
- **💬 Community & Engagement:** Foster a community of learners with a built-in commenting system on each lesson, allowing for nested replies and instructor interaction.
- **☁️ S3-Compatible File Storage:** Securely upload and stream course materials like videos and images using a robust file handling system compatible with AWS S3, Cloudflare R2, and more.

## 🚀 Tech Stack

Sahla is built with a modern, scalable, and type-safe technology stack.

| Category | Technologies |
| --- | --- |
| **Framework** | [Next.js](https://nextjs.org/) (App Router), [React](https://react.dev/) |
| **Language** | [TypeScript](https://www.typescriptlang.org/) |
| **Database** | [PostgreSQL](https://www.postgresql.org/) with [Prisma](https://www.prisma.io/) ORM |
| **Styling** | [Tailwind CSS](https://tailwindcss.com/), [shadcn/ui](https://ui.shadcn.com/), [Radix UI](https://www.radix-ui.com/) |
| **Authentication** | [Better Auth](https://better-auth.dev/) |
| **Internationalization**| [next-intl](https://next-intl-docs.vercel.app/) |
| **Payments** | [Stripe](https://stripe.com/) |
| **File Storage** | S3-Compatible (e.g., [Cloudflare R2](https://www.cloudflare.com/developer-platform/r2/)) |
| **Emails** | [Resend](https://resend.com/) |
| **AI Services** | [Google AI](https://ai.google/) (via API for Quiz Generation) |
| **Code Execution** | [Judge0](https://judge0.com/) |
| **Page Builder** | [Puck.js](https://puck.js.org/) |
| **Deployment** | [Vercel](https://vercel.com/) |

## ⚙️ Getting Started

Follow these steps to get a local instance of Sahla up and running.

### Prerequisites

- Node.js (v18 or later)
- pnpm
- PostgreSQL database (e.g., via Docker, Neon, or a local installation)

### 1. Clone the Repository

```bash
git clone https://github.com/B-a-d-r-a-n/sahla-lms.git
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

# AI Service for Quiz Generation (Google AI API Key)
OPEN_ROUTER_API_KEY="your_google_ai_api_key"

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

- `app/(sahla)/`: Routes for the main marketing website (e.g., `sahla.com`, `/pricing`, `/about`).
- `app/s/[subdomain]/`: The core multi-tenant application logic. All platform-specific routes reside here.
  - `(public)/`: Publicly accessible pages for a tenant (e.g., `my-school.sahla.com`, course catalog).
  - `admin/`: The admin dashboard for platform owners (e.g., `my-school.sahla.com/admin`).
  - `dashboard/`: The dashboard for enrolled students (e.g., `my-school.sahla.com/dashboard`).
  - `api/`: Tenant-specific API routes.
- `components/`: Shared React components, including a rich `ui` library based on shadcn/ui.
- `lib/`: Core logic, utilities, database client (Prisma), auth configuration, and service integrations.
- `prisma/`: Database schema (`schema.prisma`) and migration history.
- `hooks/`: Custom React hooks for shared client-side logic (e.g., course progress, confetti).
- `messages/`: Internationalization (i18n) translation files for English and Arabic.
- `middleware.ts`: The heart of the multi-tenancy and i18n routing, responsible for URL rewriting and locale detection.

## 🤝 Contributing

Contributions are welcome! If you'd like to contribute, please fork the repository and use a feature branch. Pull requests are warmly welcome.

1.  Fork the repository.
2.  Create your feature branch (`git checkout -b feature/amazing-feature`).
3.  Commit your changes (`git commit -m 'Add some amazing feature'`).
4.  Push to the branch (`git push origin feature/amazing-feature`).
5.  Open a Pull Request.

## 📜 License

This project is licensed under the MIT License - see the LICENSE file for details.
