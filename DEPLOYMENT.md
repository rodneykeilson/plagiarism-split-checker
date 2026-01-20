# Deployment Guide

## GitHub Pages Deployment

This project is configured to deploy automatically to GitHub Pages using GitHub Actions.

### Automatic Deployment (Recommended)

1. **Enable GitHub Pages:**
   - Go to your repository Settings
   - Navigate to "Pages" section
   - Under "Build and deployment", select "GitHub Actions" as the source

2. **Push to Main Branch:**
   ```bash
   git push origin main
   ```
   
   The CI/CD pipeline will automatically:
   - ✅ Run all tests
   - ✅ Build the production bundle
   - ✅ Deploy to GitHub Pages

3. **Access Your Site:**
   - Your site will be available at: `https://yourusername.github.io/plagiarism-split-checker`
   - Update the `homepage` field in `package.json` with your actual GitHub username

### Manual Deployment (Alternative)

If you prefer manual deployment:

```bash
npm run deploy
```

This will:
1. Build the production bundle
2. Deploy to the `gh-pages` branch
3. Make your site live

### Configuration

**Important:** Update `package.json` before deploying:

```json
{
  "homepage": "https://YOUR_GITHUB_USERNAME.github.io/plagiarism-split-checker",
  "repository": {
    "url": "https://github.com/YOUR_GITHUB_USERNAME/plagiarism-split-checker.git"
  }
}
```

### CI/CD Pipeline

The GitHub Actions workflow (`.github/workflows/ci-cd.yml`) includes:

- **Test Stage:** Runs all unit tests with coverage
- **Build Stage:** Creates production build
- **Deploy Stage:** Deploys to GitHub Pages (only on main branch)

### Requirements

- GitHub repository with Actions enabled
- Node.js 18+ for builds
- Push access to the repository

### Troubleshooting

**Build Fails:**
- Check that all tests pass locally: `npm test`
- Verify build works: `npm run build`

**Deployment Fails:**
- Ensure GitHub Pages is enabled in repository settings
- Check that GitHub Actions has write permissions
- Verify `homepage` URL in `package.json` is correct

**Site Not Loading:**
- Wait 2-3 minutes after deployment
- Check GitHub Actions tab for deployment status
- Clear browser cache and try again

### Alternative: Vercel Deployment

For Vercel deployment (faster, with preview URLs):

1. Install Vercel CLI:
   ```bash
   npm i -g vercel
   ```

2. Deploy:
   ```bash
   vercel
   ```

3. For production:
   ```bash
   vercel --prod
   ```

**Vercel Benefits:**
- Instant preview deployments for PRs
- Automatic HTTPS
- Custom domains
- Edge network CDN
- Better performance analytics

### Alternative: Netlify Deployment

1. Connect your GitHub repository to Netlify
2. Build command: `npm run build`
3. Publish directory: `build`
4. Deploy!

**Netlify Benefits:**
- Drag-and-drop deployment
- Form handling
- Serverless functions support
- Split testing
- Analytics

## Recommendation

**For this project, GitHub Pages is recommended because:**
- ✅ Free hosting
- ✅ Integrated with GitHub
- ✅ Automated CI/CD pipeline included
- ✅ No additional account needed
- ✅ Perfect for static React apps

**Use Vercel if you need:**
- Preview deployments for PRs
- Custom serverless functions
- Better performance metrics
- Custom domains with easy setup
