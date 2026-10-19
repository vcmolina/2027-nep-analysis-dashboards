# Deploying to GitHub Pages

The codebase has been configured for direct deployment to **GitHub Pages**.

---

### Method 1: Automated Deployment via GitHub Actions (Recommended)

A GitHub Actions workflow is pre-configured at `.github/workflows/deploy.yml`.

1. **Push your code** to your GitHub repository on `main` or `master`.
2. Go to your repository on GitHub.
3. Click **Settings** > **Pages** (in the left sidebar under *Code and automation*).
4. Under **Build and deployment** > **Source**, select **GitHub Actions**.
5. Once selected, push a commit (or navigate to the **Actions** tab and click **Run workflow**).
6. GitHub will automatically run `npm ci`, build your project, and publish it to:
   ```
   https://<your-username>.github.io/<repository-name>/
   ```

---

### Method 2: Manual / Custom Branch Deployment

If you prefer building locally and pushing the `dist` folder to a `gh-pages` branch:

1. Build the production bundle:
   ```bash
   npm run build
   ```
2. The `dist/` directory includes:
   - `dist/index.html` (with relative asset paths `./assets/...`)
   - `dist/.nojekyll` (bypasses GitHub Jekyll filters)
   - `dist/404.html` (SPA fallback router)
3. Deploy to the `gh-pages` branch using git or the `gh-pages` npm package.
4. In GitHub **Settings** > **Pages**, set **Source** to **Deploy from a branch** and select `gh-pages` / `root`.

---

### What was configured:
- **`vite.config.ts`**: Configured `base: './'` so bundle scripts and stylesheets resolve relatively on any repository name or custom domain.
- **`public/.nojekyll`**: Tells GitHub Pages to skip Jekyll processing so assets and special files are served without modification.
- **`public/404.html`**: Handles SPA routing and direct URL access without 404 errors.
- **`.github/workflows/deploy.yml`**: Official GitHub Actions deployment workflow for automated builds.
