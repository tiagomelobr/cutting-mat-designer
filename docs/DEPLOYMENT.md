# Deployment Guide for GitHub Pages

## Quick Start

This project is configured for automatic deployment to GitHub Pages using GitHub Actions.

## Steps to Deploy

### 1. Create GitHub Repository

```bash
# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit: Cutting Mat Layout Generator"

# Create repository on GitHub, then:
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
git branch -M main
git push -u origin main
```

### 2. Configure Repository Name

**Important:** Update `vite.config.ts` with your actual repository name:

```typescript
export default defineConfig({
  plugins: [react()],
  base: '/YOUR_REPO_NAME/', // ⚠️ Change this to match your repo name
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
  },
})
```

For example, if your repo is `cutting-mat-generator`, use:
```typescript
base: '/cutting-mat-generator/',
```

### 3. Enable GitHub Pages

1. Go to your repository on GitHub
2. Click **Settings** → **Pages**
3. Under **Source**, select **GitHub Actions**
4. Save

### 4. Deploy

Simply push to the main branch:

```bash
git add .
git commit -m "Update base path for deployment"
git push
```

The GitHub Actions workflow (`.github/workflows/deploy.yml`) will automatically:
- Install dependencies
- Build the project
- Deploy to GitHub Pages

### 5. Access Your Site

After deployment (usually takes 1-2 minutes), your site will be available at:

```
https://YOUR_USERNAME.github.io/YOUR_REPO_NAME/
```

## Manual Deployment (Alternative Method)

If you prefer manual deployment:

1. Install gh-pages:
```bash
npm install -D gh-pages
```

2. Deploy:
```bash
npm run deploy
```

## Troubleshooting

### Assets Not Loading (404 errors)

- **Problem:** CSS, JS, or images return 404
- **Solution:** Ensure `base` in `vite.config.ts` matches your repository name exactly, including case

### GitHub Actions Fails

- **Problem:** Build fails in GitHub Actions
- **Solution:** Check that all dependencies are listed in `package.json`, not just `devDependencies`

### Page Shows Old Version

- **Problem:** Changes don't appear after deployment
- **Solution:** Hard refresh (Ctrl+Shift+R) or clear browser cache

### Permissions Error in GitHub Actions

- **Problem:** `Error: Resource not accessible by integration`
- **Solution:** 
  1. Go to Settings → Actions → General
  2. Under "Workflow permissions", select "Read and write permissions"
  3. Save and re-run the workflow

## Local Testing of Production Build

To test the production build locally before deploying:

```bash
# Build the project
npm run build

# Preview the build
npm run preview
```

The preview will be available at `http://localhost:4173/YOUR_REPO_NAME/`

## Updating the Deployment

After making changes:

```bash
git add .
git commit -m "Your commit message"
git push
```

GitHub Actions will automatically rebuild and redeploy.

## Custom Domain (Optional)

To use a custom domain:

1. Add a `CNAME` file to the `public/` directory containing your domain
2. Configure DNS settings with your domain provider
3. Enable HTTPS in GitHub Pages settings

## Environment Variables

This app doesn't require any environment variables - everything runs client-side!

## Need Help?

- Check the [GitHub Actions tab](https://github.com/YOUR_USERNAME/YOUR_REPO_NAME/actions) for build logs
- Review the [GitHub Pages documentation](https://docs.github.com/en/pages)
