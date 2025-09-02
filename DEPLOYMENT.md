# Deployment Guide

This project uses a local build and deploy approach for GitHub Pages.

## Setup

1. **Create environment file**: Copy `.env.example` to `.env.local` and add your Supabase credentials:
   ```bash
   cp .env.example .env.local
   ```

2. **Add your Supabase environment variables** to `.env.local`:
   ```
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

## Deployment

### Option 1: Using npm script (Recommended)
```bash
npm run deploy
```

### Option 2: Using the script directly
```bash
./deploy.sh
```

## How it works

1. **Builds** the Next.js app locally with your environment variables
2. **Commits** any changes to the `main` branch
3. **Switches** to the `gh-pages` branch
4. **Copies** the built files from `out/` to the root of `gh-pages`
5. **Pushes** the `gh-pages` branch to GitHub
6. **Switches** back to `main` branch

## Repository Structure

- **`main` branch**: Contains your Next.js source code
- **`gh-pages` branch**: Contains the built static files for GitHub Pages

## GitHub Pages Setup

1. Go to your repository settings
2. Navigate to "Pages" section
3. Set source to "Deploy from a branch"
4. Select `gh-pages` branch
5. Select `/ (root)` folder

## Troubleshooting

- Make sure you have your Supabase environment variables set in `.env.local`
- Ensure you're on the `main` branch when running the deploy script
- Check that your GitHub Pages is set to deploy from the `gh-pages` branch
