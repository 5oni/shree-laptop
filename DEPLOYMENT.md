# Deployment Guide

This project uses GitHub Actions for automatic deployment to GitHub Pages.

## Setup

### 1. GitHub Repository Secrets

Go to your repository → **Settings** → **Secrets and variables** → **Actions** and add:

- `NEXT_PUBLIC_SUPABASE_URL`: Your Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Your Supabase anonymous key

### 2. GitHub Pages Settings

Go to your repository → **Settings** → **Pages** and set:

- **Source**: GitHub Actions
- The workflow will automatically deploy to GitHub Pages

## How It Works

1. **Push to main branch** triggers the deployment
2. **GitHub Actions** builds your Next.js app with environment variables
3. **Automatically deploys** to GitHub Pages
4. **Your site** is available at `https://5oni.github.io/shree-laptop`

## Local Development

```bash
# Install dependencies
npm install

# Create .env.local with your Supabase credentials
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# Run development server
npm run dev
```

## Benefits

- ✅ **Automatic deployment** on every push
- ✅ **Secure environment variables** in GitHub secrets
- ✅ **No local deployment scripts** needed
- ✅ **Professional CI/CD** pipeline
- ✅ **Works from any machine** - no local setup required