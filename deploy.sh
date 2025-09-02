#!/bin/bash

# Deploy script for GitHub Pages
# This script builds on main branch and pushes only the build contents to website branch

set -e  # Exit on any error

echo "🚀 Starting deployment to GitHub Pages..."

# Check if we're on main branch
current_branch=$(git branch --show-current)
if [ "$current_branch" != "main" ]; then
    echo "❌ Please run this script from the main branch"
    exit 1
fi

# Check if node_modules exists, if not install dependencies
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
fi

# Build the project on main branch
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

# Create a temporary directory to store built files
echo "📦 Creating temporary build directory..."
mkdir -p ../temp-build
cp -r out/* ../temp-build/ 2>/dev/null || true
cp out/.nojekyll ../temp-build/ 2>/dev/null || true

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

# Clear all files except .git
echo "🧹 Clearing website branch..."
find . -mindepth 1 -maxdepth 1 ! -name '.git' -exec rm -rf {} + 2>/dev/null || true

# Copy build contents from temporary directory to root level
echo "📋 Copying build contents to root level..."
cp -r ../temp-build/* . 2>/dev/null || true
cp ../temp-build/.nojekyll . 2>/dev/null || true

# Clean up temporary directory
echo "🧹 Cleaning up temporary files..."
rm -rf ../temp-build

# Stage and commit the build contents at root level
echo "💾 Staging and committing build contents..."
git add .
git commit -m "Deploy to GitHub Pages - $(date)" || echo "No changes to commit"

# Push to website branch
echo "⬆️ Pushing to website branch..."
git push origin website

# Switch back to main branch
echo "🔄 Switching back to main branch..."
git checkout main

echo "✅ Deployment completed successfully!"
echo "🌐 Your site should be available at: https://5oni.github.io/shree-laptop"
echo "⏰ It may take a few minutes for GitHub Pages to update"
