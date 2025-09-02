#!/bin/bash

# Deploy script for GitHub Pages
# This script builds the Next.js app locally and pushes to gh-pages branch

set -e  # Exit on any error

echo "🚀 Starting deployment to GitHub Pages..."

# Check if we're on main branch
current_branch=$(git branch --show-current)
if [ "$current_branch" != "main" ]; then
    echo "❌ Please run this script from the main branch"
    exit 1
fi

# Build the project
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

# Commit current changes to main branch first
echo "💾 Committing changes to main branch..."
git add .
git commit -m "Update source code" || echo "No changes to commit on main branch"

# Push main branch
echo "⬆️ Pushing main branch..."
git push origin main

# Switch to gh-pages branch (create if it doesn't exist)
echo "🔄 Switching to gh-pages branch..."
if git show-ref --verify --quiet refs/heads/gh-pages; then
    git checkout gh-pages
    git pull origin gh-pages
else
    git checkout --orphan gh-pages
    git rm -rf . || true
fi

# Copy built files
echo "📋 Copying built files..."
cp -r out/* .
cp out/.nojekyll . 2>/dev/null || true

# Add and commit changes
echo "💾 Committing built files..."
git add .
git commit -m "Deploy to GitHub Pages - $(date)" || echo "No changes to commit"

# Push to gh-pages branch
echo "⬆️ Pushing to gh-pages branch..."
git push origin gh-pages

# Switch back to main branch
echo "🔄 Switching back to main branch..."
git checkout main

echo "✅ Deployment completed successfully!"
echo "🌐 Your site should be available at: https://5oni.github.io/shree-laptop"
echo "⏰ It may take a few minutes for GitHub Pages to update"
