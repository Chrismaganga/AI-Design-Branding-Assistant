# AI Design/Branding Assistant

A comprehensive AI-powered design and branding platform that generates logos, slogans, brand colors, domain names, and business names.

## Features

### Core Functionality
- **Logo Generation**: AI-powered logo creation with multiple styles
- **Slogan Generation**: Creative taglines and brand messaging
- **Brand Colors**: Color palette suggestions based on industry and preferences
- **Domain Name Suggestions**: Available domain name recommendations
- **Business Name Generator**: Creative business name ideas

### Integrations
- **Canva Integration**: Direct export to Canva for further editing
- **Figma Integration**: Seamless workflow with Figma
- **Printful Integration**: Direct to print-on-demand services

### Monetization Features
- **Brand Kit Downloads**: Premium downloadable brand packages
- **Logo Packs**: Pre-designed logo collections
- **Vector Exports**: SVG/PNG downloads for premium users
- **Designer Upsells**: Connect users with human designers

## Tech Stack

### Frontend
- **Next.js 14**: React framework with App Router
- **TypeScript**: Type-safe development
- **Tailwind CSS**: Modern styling
- **Framer Motion**: Smooth animations
- **React Hook Form**: Form handling
- **Zustand**: State management

### Backend
- **Django 4.2**: Python web framework
- **Django REST Framework**: API development
- **PostgreSQL**: Database
- **Celery**: Background tasks
- **Redis**: Caching and message broker

### AI/ML
- **OpenAI API**: Text generation and analysis
- **Stability AI**: Image generation
- **Custom ML Models**: Brand analysis and suggestions

## Project Structure

```
AI-Design-Branding-Assistant/
├── frontend/                 # Next.js application
│   ├── app/                 # App router pages
│   ├── components/          # Reusable components
│   ├── lib/                 # Utilities and configurations
│   └── public/              # Static assets
├── backend/                 # Django application
│   ├── core/               # Main Django project
│   ├── api/                # REST API endpoints
│   ├── branding/           # Branding app
│   └── users/              # User management
└── docs/                   # Documentation
```

## Getting Started

### Prerequisites
- Node.js 18+
- Python 3.11+
- PostgreSQL
- Redis

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd AI-Design-Branding-Assistant
   ```

2. **Frontend Setup**
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

3. **Backend Setup**
   ```bash
   cd backend
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   pip install -r requirements.txt
   python manage.py migrate
   python manage.py runserver
   ```

## Environment Variables

Create `.env.local` in the frontend directory:
```env
NEXT_PUBLIC_API_URL=http://localhost:8000/api
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_key
```

Create `.env` in the backend directory:
```env
SECRET_KEY=your_django_secret_key
DATABASE_URL=postgresql://user:password@localhost:5432/branding_db
OPENAI_API_KEY=your_openai_key
STRIPE_SECRET_KEY=your_stripe_secret
```

## API Documentation

The API documentation is available at `/api/docs/` when running the Django server.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests
5. Submit a pull request

## License

MIT License - see LICENSE file for details
