# Deployment Guide for Vercel

This guide walks you through deploying the DIY Journal application to Vercel, a serverless platform optimized for Next.js applications.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Option 1: Deploy via GitHub (Recommended)](#option-1-deploy-via-github-recommended)
- [Option 2: Deploy via Vercel CLI](#option-2-deploy-via-vercel-cli)
- [Environment Variables](#environment-variables)
- [Custom Domain Setup](#custom-domain-setup)
- [Monitoring & Analytics](#monitoring--analytics)
- [Troubleshooting](#troubleshooting)
- [Performance Optimization](#performance-optimization)
- [Rollback & Versioning](#rollback--versioning)

---

## Prerequisites

Before deploying, ensure you have:

1. ✅ A GitHub account with the DIY Journal repository
2. ✅ A Vercel account (free tier available at [vercel.com](https://vercel.com))
3. ✅ Git configured locally
4. ✅ All code committed and pushed to GitHub
5. ✅ Node.js 18+ installed locally

### Create a Vercel Account

1. Go to [vercel.com](https://vercel.com)
2. Click **"Sign Up"**
3. Choose **"Continue with GitHub"**
4. Authorize Vercel to access your GitHub account
5. Your account is ready!

---

## Option 1: Deploy via GitHub (Recommended)

This is the easiest method and enables automatic deployments on every push.

### Step 1: Connect GitHub Repository

1. Log in to [vercel.com](https://vercel.com/dashboard)
2. Click **"Add New..."** → **"Project"**
3. Click **"Import Git Repository"**
4. Search for `DIY-Journal` repository
5. Click **"Import"**

### Step 2: Configure Project Settings

The default settings should work fine, but you can customize:

**Project Name:**
- Default: `diy-journal`
- Change if desired (this becomes your subdomain)

**Build Settings:**
- **Framework**: Next.js (auto-detected ✓)
- **Build Command**: `npm run build` (auto-detected ✓)
- **Output Directory**: `.next` (auto-detected ✓)
- **Install Command**: `npm install` (auto-detected ✓)

**Environment Variables:**
- Leave empty for now (none required for current version)
- See [Environment Variables](#environment-variables) section if needed

### Step 3: Click "Deploy"

Vercel will now:
1. Clone your repository
2. Install dependencies
3. Run the build process
4. Deploy to production

This typically takes **2-3 minutes** on first deploy.

### Step 4: Access Your Deployment

Once complete, you'll see:
- ✅ Deployment Status: **Ready**
- 🔗 Production URL: `https://diy-journal-xxxxx.vercel.app`
- 📊 Deployment Analytics & Logs

**That's it! Your app is live! 🎉**

---

## Option 2: Deploy via Vercel CLI

If you prefer deploying from your terminal:

### Step 1: Install Vercel CLI

```bash
npm i -g vercel
```

### Step 2: Login to Vercel

```bash
vercel login
```

This opens a browser to authenticate. Follow the prompts.

### Step 3: Deploy

```bash
# From your project directory
vercel
```

You'll be prompted to:
1. **Link to existing project?** → No (first time)
2. **Project name** → `diy-journal` (or your choice)
3. **Directory** → `./` (root)
4. **Build command** → `npm run build`
5. **Output directory** → `.next`
6. **Install command** → `npm install`

### Step 4: Verify Deployment

```bash
# View deployment status
vercel ls

# Open in browser
vercel --prod
```

---

## Environment Variables

### Current Status
The DIY Journal application **does not require environment variables** for basic functionality.

### Future Enhancements

If you add features requiring env vars, follow these steps:

### Add Environment Variables in Vercel

**Method 1: Via Dashboard**

1. Go to your Vercel project dashboard
2. Navigate to **Settings** → **Environment Variables**
3. Click **"Add New"**
4. Enter:
   - **Name**: `VARIABLE_NAME`
   - **Value**: Your value
   - **Environments**: Select Production, Preview, Development
5. Click **"Save"**

**Method 2: Via .env.local (Local Development)**

```bash
# .env.local (NOT committed to git)
NEXT_PUBLIC_API_URL=https://api.example.com
SECRET_API_KEY=your_secret_key
```

**Important**: Add `.env.local` to `.gitignore` to avoid exposing secrets!

### Environment Variable Types

| Type | Prefix | Usage | Visible In |
|------|--------|-------|-----------|
| Public | `NEXT_PUBLIC_` | Frontend code | Browser |
| Secret | None | Backend/API | Server only |
| System | `VERCEL_` | Built-in | All |

Example:
```typescript
// Public (visible to browser)
const apiUrl = process.env.NEXT_PUBLIC_API_URL;

// Secret (server-side only)
const dbPassword = process.env.DATABASE_PASSWORD;
```

---

## Custom Domain Setup

### Option A: Use a Domain You Own

1. **In Vercel Dashboard:**
   - Go to **Settings** → **Domains**
   - Click **"Add Domain"**
   - Enter your domain (e.g., `journal.yoursite.com`)

2. **In Your Domain Registrar:**
   - Go to DNS settings
   - Add a **CNAME record**:
     - Name: `journal` (or subdomain)
     - Value: `cname.vercel.app`
   - Or use Vercel's nameservers (easier but less flexible)

3. **Verify Domain:**
   - Vercel automatically checks periodically
   - Takes 5-48 hours to fully propagate

### Option B: Use Vercel Domain

1. In Vercel Dashboard → **Settings** → **Domains**
2. Click **"Add"** → **"Purchase New Domain"**
3. Follow the checkout process
4. Domain is ready instantly

### Example: journal.yourcompany.com

```
DNS Record Type: CNAME
Name: journal
Value: cname.vercel.app
TTL: 3600 (or default)
```

---

## Monitoring & Analytics

### Access Deployment Dashboard

1. Log in to [vercel.com/dashboard](https://vercel.com/dashboard)
2. Click on **DIY Journal** project
3. View:
   - 📊 **Analytics**: Traffic, response times, errors
   - 📈 **Deployments**: Deployment history
   - 🔧 **Build Logs**: Build process details
   - ⚡ **Function Metrics**: Serverless function performance

### Enable Vercel Analytics (Optional)

1. **Settings** → **Analytics**
2. Click **"Enable Web Analytics"**
3. Vercel injects tracking automatically
4. View real user metrics in dashboard

### Key Metrics to Monitor

| Metric | What It Means | Good Range |
|--------|---------------|-----------|
| **First Contentful Paint (FCP)** | Time to first content | < 1.8s |
| **Largest Contentful Paint (LCP)** | Time to largest element | < 2.5s |
| **Cumulative Layout Shift (CLS)** | Visual stability | < 0.1 |
| **API Response Time** | `/api/generate-pdf` speed | < 5s |
| **Deployment Success Rate** | Successful deploys | 100% |

---

## Automatic Deployments

Vercel automatically deploys when:

| Event | Behavior |
|-------|----------|
| **Push to main** | Deploy to production |
| **Push to other branches** | Deploy to preview |
| **Pull Request opened** | Create preview deployment |
| **PR commented with @vercel** | Re-deploy preview |
| **Merge to main** | Auto-deploy production |

### Preview Deployments

Every PR gets a unique preview URL:
- `https://diy-journal-pr-123.vercel.app`
- Share with team for review before merging
- Automatically cleaned up when PR is closed

### Disable Auto-Deploy (If Needed)

1. **Settings** → **Git**
2. Under "Deploy on Push": Click toggle to disable
3. Deploy manually via CLI or dashboard

---

## Rollback & Versioning

### Rollback to Previous Deployment

1. Go to **Deployments** tab
2. Find the previous working deployment
3. Click the **three dots** menu
4. Select **"Promote to Production"**
5. Confirm
6. ✅ Instantly reverted!

### View Deployment History

```bash
# Via CLI
vercel ls --prod

# Shows all production deployments with timestamps
```

### Example Rollback Scenario

```
Current: main branch has a bug
Previous: Commit abc123d was working
Fix: Rollback in <30 seconds

1. Go to Deployments
2. Find commit abc123d
3. Click Promote to Production
4. Done!
```

---

## Troubleshooting

### Deployment Failed

**Common Causes & Fixes:**

#### 1. Build Error

**Error**: `npm ERR! code ENOENT`

**Fix**:
```bash
# Verify locally first
npm install
npm run build

# If it works locally, check:
# - Node version matches (18+)
# - All dependencies listed in package.json
# - No hardcoded paths
```

#### 2. Memory Limit Exceeded

**Error**: `JavaScript heap out of memory`

**Fix**:
- Increase timeout in `vercel.json`:
```json
{
  "functions": {
    "api/**/*.ts": {
      "maxDuration": 60
    }
  }
}
```

#### 3. Missing Environment Variables

**Error**: `process.env.VARIABLE_NAME is undefined`

**Fix**:
1. Add to Vercel dashboard: **Settings** → **Environment Variables**
2. Or add to `.env.local` for local testing
3. Redeploy

### Slow Performance

**Diagnosis**:
1. Check Analytics dashboard
2. Look at build logs
3. Check function response times

**Optimization**:
- See [Performance Optimization](#performance-optimization) section

### Domain Not Working

**Steps to Debug**:

```bash
# Check DNS propagation
nslookup journal.yoursite.com

# Should return Vercel's IP address
# If not, wait for DNS to propagate (up to 48 hours)

# Test CNAME
dig journal.yoursite.com

# Should show cname.vercel.app
```

---

## Performance Optimization

### 1. Enable Compression

Already enabled by default in `next.config.ts`:
```typescript
export const nextConfig: NextConfig = {
  compress: true, // ✓ Enabled
}
```

### 2. Image Optimization

Add if using images:
```typescript
import Image from 'next/image';

<Image
  src="/image.png"
  width={400}
  height={300}
  alt="Description"
/>
```

### 3. Code Splitting

Next.js automatically handles this for you.

### 4. Cache Strategy

Set in `vercel.json`:
```json
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=3600, s-maxage=3600"
        }
      ]
    }
  ]
}
```

### 5. API Response Optimization

For `/api/generate-pdf`:
```typescript
// In route.ts
response.headers.set('Cache-Control', 'no-store'); // Don't cache PDFs
response.headers.set('Content-Encoding', 'gzip'); // Compress response
```

### 6. Monitor Core Web Vitals

In Vercel Dashboard:
1. **Analytics** tab
2. View FCP, LCP, CLS metrics
3. Optimize based on findings

---

## Monitoring Deployments

### Real-Time Logs

```bash
# Watch deployment logs
vercel logs --prod
```

### Build Logs

1. Dashboard → **Deployments**
2. Click on a deployment
3. Click **"View Build Logs"**
4. See real-time build process

### Function Logs

For API routes:
1. Dashboard → **Analytics**
2. Click **"Function"** tab
3. View `/api/generate-pdf` logs
4. See response times and errors

---

## Scaling & Limits

### Vercel Free Tier Limits

| Feature | Limit |
|---------|-------|
| **Bandwidth** | 100 GB/month |
| **Function Execution** | 100 seconds |
| **Build Time** | 45 minutes |
| **Concurrent Builds** | 1 |
| **Deployments/Month** | Unlimited |
| **Preview Deployments** | Unlimited |

### Upgrade to Pro

- $20/month
- 1000 GB bandwidth
- 60 second functions
- 4 concurrent builds
- Priority support

**When to Upgrade**:
- Production traffic > 100k users
- High PDF generation volume
- Need for advanced features

---

## Security

### Secrets Management

**Never commit secrets!**

```bash
# ❌ WRONG - Do not do this
API_KEY=sk_live_xxxxxx

# ✅ RIGHT - Use Vercel Environment Variables
# Set in: Settings → Environment Variables
```

### HTTPS

✅ Automatic on all Vercel deployments:
- Free SSL certificate (Let's Encrypt)
- Auto-renewal every 60 days
- No configuration needed

### Headers Security

Add to `next.config.ts`:
```typescript
const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
        ],
      },
    ];
  },
};
```

---

## Advanced: Custom vercel.json

The `vercel.json` file is already configured, but here's reference:

```json
{
  "name": "DIY Journal",
  "version": "0.1.0",
  "private": true,
  "description": "Create custom, printable PDF journals with personalized modules",
  "engines": {
    "node": ">=18.0.0",
    "npm": ">=9.0.0"
  },
  "buildCommand": "npm run build",
  "outputDirectory": ".next",
  "installCommand": "npm install",
  "env": {
    "NODE_ENV": "production"
  },
  "functions": {
    "api/**/*.ts": {
      "maxDuration": 30,
      "memory": 1024
    }
  },
  "headers": [
    {
      "source": "/api/generate-pdf",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "no-cache, no-store, must-revalidate"
        }
      ]
    }
  ]
}
```

---

## Step-by-Step Deployment Checklist

- [ ] Code committed and pushed to GitHub
- [ ] All tests passing locally (`npm run dev` works)
- [ ] No console errors or warnings
- [ ] Environment variables configured (if needed)
- [ ] Vercel account created
- [ ] GitHub repository connected to Vercel
- [ ] Project imported in Vercel
- [ ] Build settings verified
- [ ] First deployment triggered
- [ ] Production URL working
- [ ] PDF generation tested on production
- [ ] Custom domain configured (optional)
- [ ] Analytics enabled (optional)
- [ ] Team members invited (optional)

---

## Success Indicators

✅ Your deployment is successful when:

1. **Dashboard shows "Ready"** status
2. **Production URL is accessible** and loads quickly
3. **PDF generation works** on the live site
4. **All form inputs function** properly
5. **No console errors** in browser DevTools
6. **Build time < 2 minutes** (not unusual for first deploy)
7. **No failed deployments** in history

---

## Post-Deployment Tasks

### 1. Monitor First 24 Hours

- Watch analytics dashboard
- Check for error spikes
- Monitor response times

### 2. Set Up Alerts (Pro Plan)

- Failed deployments
- High error rates
- Performance degradation

### 3. Share with Team

```bash
# Get deployment URL
vercel ls --prod

# Share: https://diy-journal-xxxxx.vercel.app
```

### 4. Plan for Future

- Add more modules based on usage
- Scale if needed (upgrade plan)
- Gather user feedback
- Plan v2 features

---

## Useful Resources

- 📚 [Vercel Documentation](https://vercel.com/docs)
- 📚 [Next.js Deployment Guide](https://nextjs.org/learn/basics/deploying-nextjs-app)
- 🎯 [Vercel Analytics](https://vercel.com/analytics)
- 💬 [Vercel Support](https://vercel.com/support)
- 🔧 [GitHub Integration](https://vercel.com/docs/git)

---

## Quick Reference Commands

```bash
# Deploy via CLI
vercel

# Deploy to production
vercel --prod

# List deployments
vercel ls

# View logs
vercel logs

# Check project status
vercel status

# View environment variables
vercel env ls

# Redeploy current production
vercel --prod --yes

# View analytics
vercel analytics

# Help
vercel --help
```

---

## Troubleshooting Quick Links

| Issue | Solution |
|-------|----------|
| Build fails | Check build logs, run `npm run build` locally |
| Slow API | Check function logs, optimize PDF generation |
| 404 errors | Check routing, verify API endpoints |
| Domain issues | Check DNS propagation, verify CNAME record |
| Environment vars | Ensure set in Vercel dashboard |
| Out of memory | Increase function memory in `vercel.json` |

---

## Support

For deployment issues:

1. **Check Vercel Status**: https://www.vercelstatus.com/
2. **Read Error Logs**: Dashboard → Deployments → Build Logs
3. **Contact Support**: https://vercel.com/support
4. **GitHub Issues**: [Open an issue](https://github.com/michaelgoodrich33/DIY-Journal/issues)

---

**🚀 You're ready to deploy! Good luck!**

For questions or issues, refer to the [Troubleshooting](#troubleshooting) section or create a GitHub issue.
