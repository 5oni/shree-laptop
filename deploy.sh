#!/bin/bash

# Deploy script for GitHub Pages
# This script builds the Next.js app on website branch and pushes only the build folder

set -e  # Exit on any error

echo "🚀 Starting deployment to GitHub Pages..."

# Check if we're on main branch
current_branch=$(git branch --show-current)
if [ "$current_branch" != "main" ]; then
    echo "❌ Please run this script from the main branch"
    exit 1
fi

# Switch to website branch (create if it doesn't exist)
echo "🔄 Switching to website branch..."
if git show-ref --verify --quiet refs/heads/website; then
    git checkout website
    git pull origin website 2>/dev/null || echo "Could not pull website, continuing..."
else
    git checkout --orphan website
fi

# Clear staging area to avoid conflicts
echo "🧹 Clearing staging area..."
git reset

# Remove out/ from .gitignore on website branch so we can commit it
echo "📝 Updating .gitignore for website branch..."
if [ -f ".gitignore" ]; then
    # Remove out/ line from .gitignore temporarily
    sed -i.bak '/^out\/$/d' .gitignore 2>/dev/null || sed -i '' '/^out\/$/d' .gitignore 2>/dev/null || true
fi

# Check if node_modules exists, if not install dependencies
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
fi

# Build the project on website branch
echo "📦 Building Next.js project..."
npm run build

# Check if build was successful
if [ ! -d "out" ]; then
    echo "❌ Build failed - 'out' directory not found"
    exit 1
fi

echo "✅ Build completed successfully"

# Create .nojekyll file to prevent Jekyll processing
echo "📝 Creating .nojekyll file..."
touch out/.nojekyll

# Add CNAME file if it exists
if [ -f "CNAME" ]; then
    echo "📝 Copying CNAME file..."
    cp CNAME out/CNAME
fi

# Move contents of out/ to root level
echo "📋 Moving build contents to root level..."
cp -r out/* . 2>/dev/null || true
cp out/.nojekyll . 2>/dev/null || true

# Stage and commit the build contents at root level
echo "💾 Staging and committing build contents..."
git add .
git commit -m "Deploy to GitHub Pages - $(date)" || echo "No changes to commit"

# Push to website branch
echo "⬆️ Pushing to website branch..."
git push origin website


git reset --hard
git clean -fd

# Switch back to main branch
echo "🔄 Switching back to main branch..."
git checkout main

# Restore original .gitignore on main branch
echo "📝 Restoring .gitignore on main branch..."
if [ -f ".gitignore.bak" ]; then
    mv .gitignore.bak .gitignore
fi

echo "✅ Deployment completed successfully!"
echo "🌐 Your site should be available at: https://5oni.github.io/shree-laptop"
echo "⏰ It may take a few minutes for GitHub Pages to update"
