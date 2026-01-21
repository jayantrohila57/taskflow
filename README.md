# Taskflow

<div align="center">

![Taskflow Logo](public/favicon.ico)

**A modern, multi-tenant task and project management platform built for teams and organizations.**

[![Next.js](https://img.shields.io/badge/Next.js-15.2.4-black?logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8.3-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Prisma](https://img.shields.io/badge/Prisma-6.6.0-black?logo=prisma)](https://www.prisma.io/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.1.3-06B6D4?logo=tailwindcss)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-green)](LICENSE)

[Live Demo](https://taskflow.app) • [Documentation](#documentation) • [Report Bug](https://github.com/your-org/taskflow/issues) • [Request Feature](https://github.com/your-org/taskflow/issues)

</div>

## 🚀 Overview

Taskflow is a comprehensive, enterprise-grade task and project management platform designed to streamline workflows for teams of all sizes. Built with modern web technologies and a focus on scalability, security, and user experience.

### ✨ Key Features

- 🔐 **Advanced Authentication**: Multi-provider auth with 2FA, passkeys, and secure session management
- 🏢 **Multi-Tenant Architecture**: Complete organization management with role-based access control
- 📋 **Task & Project Management**: Comprehensive workflow management with team collaboration
- 🌍 **Internationalization**: Multi-language support with RTL capabilities
- 📱 **PWA Ready**: Progressive Web App with offline support and push notifications
- 🎨 **Modern UI**: Beautiful, accessible interface with dark/light themes
- ⚡ **High Performance**: Optimized with caching, lazy loading, and modern web standards

## 🛠️ Tech Stack

### Frontend

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript with strict type checking
- **UI Components**: Radix UI + shadcn/ui
- **Styling**: Tailwind CSS 4.1.3
- **State Management**: tRPC + TanStack Query
- **Internationalization**: next-intl
- **Icons**: Lucide React

### Backend & Database

- **Database**: PostgreSQL
- **ORM**: Prisma 6.6.0
- **Authentication**: NextAuth.js v5 with Better Auth
- **API**: tRPC for type-safe APIs
- **Caching**: Redis
- **File Storage**: Configurable cloud storage

### Development Tools

- **Package Manager**: pnpm
- **Linting**: ESLint + Prettier
- **Testing**: Jest (configured)
- **Git Hooks**: Husky + lint-staged
- **Code Quality**: TypeScript strict mode

## 📁 Project Structure

```
taskflow/
├── src/
│   ├── app/                    # Next.js App Router
│   │   └── [locale]/          # Internationalized routes
│   │       ├── (public)/      # Public pages
│   │       ├── (protected)/   # Authenticated pages
│   │       ├── (handler)/     # User dashboard
│   │       └── (panel)/       # Admin panel
│   ├── modules/               # Feature modules
│   │   ├── auth/              # Authentication system
│   │   ├── organization/      # Multi-tenant features
│   │   ├── project/           # Project management
│   │   ├── task/              # Task management
│   │   ├── user/              # User management
│   │   └── ...
│   ├── components/            # Shared components
│   ├── packages/              # Internal packages
│   └── resources/             # Resources & configs
├── prisma/
│   └── schema/                # Database schema
├── public/                    # Static assets
└── docs/                      # Documentation
```

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- PostgreSQL database
- Redis server (optional, for caching)
- pnpm package manager

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/your-org/taskflow.git
   cd taskflow
   ```

2. **Install dependencies**

   ```bash
   pnpm install
   ```

3. **Set up environment variables**

   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

4. **Set up the database**

   ```bash
   pnpm db:push    # Push schema to database
   pnpm db:studio  # Open Prisma Studio (optional)
   ```

5. **Start the development server**

   ```bash
   pnpm dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Environment Variables

Create a `.env` file with the following variables:

```env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/taskflow"

# Authentication
AUTH_SECRET="your-auth-secret"
AUTH_GITHUB_ID="your-github-client-id"
AUTH_GITHUB_SECRET="your-github-client-secret"

# Redis (optional)
REDIS_USERNAME="your-redis-username"
REDIS_PASSWORD="your-redis-password"
REDIS_SOCKET_HOST="localhost"
REDIS_SOCKET_PORT=6379

# Web Push (for PWA notifications)
VAPID_PRIVATE_KEY="your-vapid-private-key"
NEXT_PUBLIC_VAPID_PUBLIC_KEY="your-vapid-public-key"

# Development
NODE_ENV="development"
USE_DEBUG_LOGS=true
```

## 📖 Documentation

### Core Features

#### 🔐 Authentication System

- **Multiple Providers**: Email/password, GitHub OAuth, Passkeys (WebAuthn)
- **Security Features**: 2FA with backup codes, session management, account lockout
- **Password Policies**: Complexity requirements, history tracking, secure reset flows

#### 🏢 Multi-Tenant Architecture

- **Organization Management**: Complete org hierarchy with branding and settings
- **Role-Based Access Control**: Granular permissions system
- **User Management**: Comprehensive profiles with preferences and security settings
- **Team Collaboration**: Team structures and project assignments

#### 📋 Task & Project Management

- **Task Management**: Create, assign, track, and manage tasks
- **Project Organization**: Project hierarchies with milestones and dependencies
- **Collaboration**: Real-time updates, comments, and file attachments
- **Analytics**: Dashboard with productivity metrics and reporting

#### 🌍 Internationalization

- **Supported Languages**: English, Hindi, Japanese, Slovak, Urdu
- **RTL Support**: Right-to-left language support
- **Localization**: Timezone, currency, and date format customization

### API Documentation

The API is built with tRPC for type-safe client-server communication. Key endpoints include:

- **Authentication**: `/api/auth/*` - Login, register, password reset
- **Users**: `/api/users/*` - User management and profiles
- **Organizations**: `/api/organizations/*` - Multi-tenant features
- **Projects**: `/api/projects/*` - Project management
- **Tasks**: `/api/tasks/*` - Task operations

### Database Schema

The database uses PostgreSQL with the following main entities:

- **Users**: User accounts with security features
- **Organizations**: Multi-tenant organization structure
- **Roles & Permissions**: RBAC system
- **Projects**: Project management entities
- **Tasks**: Task management with assignments
- **Sessions**: Secure session tracking

## 🧪 Development

### Available Scripts

```bash
# Development
pnpm dev              # Start development server with Turbo
pnpm dev-https        # Start with HTTPS

# Building
pnpm build            # Production build
pnpm start            # Start production server
pnpm preview          # Preview production build

# Database
pnpm db:generate      # Generate Prisma client
pnpm db:push          # Push schema to database
pnpm db:migrate       # Run migrations
pnpm db:studio        # Open Prisma Studio
pnpm db:reset         # Reset database

# Code Quality
pnpm lint             # Run ESLint
pnpm lint:fix         # Fix ESLint issues
pnpm typecheck        # Run TypeScript checks
pnpm format:check     # Check Prettier formatting
pnpm format:write     # Apply Prettier formatting
pnpm fix              # Fix all linting and formatting issues

# Testing
pnpm test             # Run tests
pnpm test:watch       # Run tests in watch mode

# Utilities
pnpm generate-icons   # Generate icon components
pnpm generate-screenshots  # Generate screenshots for documentation
```

### Code Style

This project uses:

- **ESLint** with Next.js and TypeScript configurations
- **Prettier** for code formatting
- **Husky** for Git hooks
- **lint-staged** for pre-commit checks

### Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

Please ensure your code follows the project's coding standards and includes appropriate tests.

## 🚀 Deployment

### Production Deployment

1. **Build the application**

   ```bash
   pnpm build
   ```

2. **Set up production environment variables**

   - All required environment variables must be set
   - `NODE_ENV` should be set to `production`
   - Database and Redis connections must be configured

3. **Database migrations**

   ```bash
   pnpm db:migrate
   ```

4. **Start the application**
   ```bash
   pnpm start
   ```

### Docker Deployment

A Docker configuration can be set up for containerized deployment. The application is designed to work with:

- **PostgreSQL** as the primary database
- **Redis** for caching and session storage
- **CDN** for static asset delivery

### Environment-Specific Considerations

- **Development**: Source maps enabled, debug logs, hot reload
- **Production**: Optimized builds, security headers, caching enabled
- **Testing**: Isolated test database, mock services

## 🔒 Security

Taskflow implements multiple security measures:

- **Authentication**: Secure password hashing, session management, 2FA
- **Authorization**: Role-based access control with granular permissions
- **Data Protection**: Input validation, SQL injection prevention, XSS protection
- **Infrastructure**: Security headers, HTTPS enforcement, secure cookies
- **Compliance**: GDPR considerations, data privacy controls

## 🌟 Roadmap

### Phase 1: Core Features ✅

- [x] Authentication system
- [x] Multi-tenant architecture
- [x] Basic task management
- [x] User management

### Phase 2: Enhanced Features 🔄

- [ ] Advanced project management
- [ ] Real-time collaboration
- [ ] File management system
- [ ] Advanced analytics

### Phase 3: Integrations 📋

- [ ] Third-party integrations (Slack, GitHub, etc.)
- [ ] API for external developers
- [ ] Webhook system
- [ ] Custom workflows

### Phase 4: Enterprise Features 📋

- [ ] Advanced security features
- [ ] Compliance tools
- [ ] Advanced reporting
- [ ] Custom branding

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Support

- **Documentation**: [Full documentation](https://docs.taskflow.app)
- **Issues**: [GitHub Issues](https://github.com/your-org/taskflow/issues)
- **Discussions**: [GitHub Discussions](https://github.com/your-org/taskflow/discussions)
- **Email**: support@taskflow.app

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- UI components by [shadcn/ui](https://ui.shadcn.com/)
- Icons by [Lucide](https://lucide.dev/)
- Database by [Prisma](https://www.prisma.io/)

---

<div align="center">

**Built with ❤️ by the Taskflow Team**

[![Twitter](https://img.shields.io/twitter/follow/taskflow?style=social)](https://twitter.com/taskflow)
[![GitHub stars](https://img.shields.io/github/stars/your-org/taskflow?style=social)](https://github.com/your-org/taskflow)

</div>
