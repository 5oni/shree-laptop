# Shree Laptop - NextJS App

A modern laptop e-commerce website built with Next.js and Supabase, designed for deployment on GitHub Pages.

## Features

- **Product Management**: Add, edit, and delete laptop and accessory products
- **Image Upload**: Upload product images to Supabase Storage
- **Admin Authentication**: Secure admin login with Supabase Auth
- **Responsive Design**: Mobile-first design with dark mode support
- **Static Export**: Optimized for GitHub Pages deployment

## Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **Storage**: Supabase Storage
- **Deployment**: GitHub Pages

## Quick Start

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd nextjs-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up Supabase**
   - Follow the detailed setup guide in [SUPABASE_SETUP.md](./SUPABASE_SETUP.md)
   - Create your Supabase project and configure the database

4. **Environment variables**
   ```bash
   cp .env.example .env.local
   ```
   Update `.env.local` with your Supabase credentials:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
   ```

5. **Run development server**
   ```bash
   npm run dev
   ```

## Project Structure

```
src/
├── app/                    # Next.js app router pages
│   ├── admin/             # Admin dashboard pages
│   ├── contact/           # Contact page
│   ├── login/             # Admin login page
│   └── page.tsx           # Homepage
├── components/            # React components
│   ├── admin/             # Admin-specific components
│   ├── layout/            # Layout components
│   └── ui/                # Reusable UI components
├── lib/                   # Utility libraries
│   ├── context/           # React contexts
│   └── services/          # Service layer (Supabase)
└── types/                 # TypeScript type definitions
```

## Supabase Setup

This project uses Supabase for:
- **Database**: PostgreSQL for product and contact data
- **Authentication**: Admin user management
- **Storage**: Product image uploads
- **Row Level Security**: Secure data access

See [SUPABASE_SETUP.md](./SUPABASE_SETUP.md) for detailed setup instructions.

## Security Features

- **Row Level Security (RLS)**: Database-level security policies
- **Client-side only**: No server-side secrets exposed
- **Public read access**: Products and contact info are publicly readable
- **Authenticated write access**: Only authenticated users can modify data
- **Secure storage**: Image uploads with proper access controls

## Deployment

### GitHub Pages

1. **Enable GitHub Pages** in your repository settings
2. **Add secrets** to your repository:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
3. **Push to main branch** - GitHub Actions will automatically deploy

### Manual Deployment

```bash
npm run build
# The 'out' directory contains your static site
```

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `NEXT_PUBLIC_SUPABASE_URL` | Your Supabase project URL | Yes |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Your Supabase anonymous key | Yes |

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run setup:admin` - Show admin setup instructions

### Adding New Features

1. **Database changes**: Update Supabase schema and RLS policies
2. **New components**: Add to `src/components/`
3. **New pages**: Add to `src/app/`
4. **Service functions**: Add to `src/lib/services/`

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is private and proprietary to Shree Laptop Solutions.

## Support

For support or questions, please contact the development team or refer to the Supabase documentation.