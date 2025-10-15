# 🚀 Bullgains Backend Deployment to Render

## Prerequisites
- GitHub repository with your code
- Render account (free tier available)
- GoDaddy domain: `bullgains.in`

## Step 1: Prepare Your Repository

### Files Created/Updated:
- ✅ `server/render.yaml` - Render configuration
- ✅ `server/package.json` - Updated with build scripts
- ✅ `server/Procfile` - Process file for deployment

## Step 2: Deploy to Render

### 2.1 Create Render Account
1. Go to [render.com](https://render.com)
2. Sign up with your GitHub account
3. Connect your GitHub repository

### 2.2 Create New Web Service
1. Click **"New +"** → **"Web Service"**
2. Connect your GitHub repository
3. Select your repository: `Bullgains-Research`
4. Choose **"Build and deploy from a subdirectory"**
5. Set **Root Directory**: `server`

### 2.3 Configure Service Settings
```
Name: bullgains-api
Environment: Node
Region: Oregon (US West)
Branch: main
Root Directory: server
Build Command: npm install
Start Command: npm start
```

### 2.4 Environment Variables
Add these environment variables in Render dashboard:

```
NODE_ENV=production
CLIENT_URL=https://bullgains.in
MONGODB_URI=mongodb+srv://support_db_user:jXRh8Tj5eUh0bMlv@cluster0.laq8ugt.mongodb.net/bullgains-research?retryWrites=true&w=majority&appName=Cluster0
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRE=7d
ENABLE_SEED=false
```

### 2.5 Advanced Settings
- **Health Check Path**: `/api/health`
- **Auto-Deploy**: Yes (from main branch)
- **Pull Request Previews**: Yes

## Step 3: Custom Domain Setup

### 3.1 In Render Dashboard
1. Go to your service → **Settings** → **Custom Domains**
2. Add custom domain: `api.bullgains.in`
3. Render will provide DNS instructions

### 3.2 In GoDaddy DNS Management
1. Log into your GoDaddy account
2. Go to **DNS Management** for `bullgains.in`
3. Add these DNS records:

```
Type: CNAME
Name: api
Value: your-render-app.onrender.com
TTL: 600

Type: A
Name: @
Value: [IP from Render]
TTL: 600

Type: CNAME
Name: www
Value: bullgains.in
TTL: 600
```

## Step 4: SSL Certificate
- Render automatically provides SSL certificates
- Your API will be available at: `https://api.bullgains.in`

## Step 5: Frontend Deployment (Optional)
For your React frontend, you can deploy to:
- **Vercel** (recommended)
- **Netlify**
- **Render** (same platform)

## Step 6: Testing Your Deployment

### Health Check
```bash
curl https://api.bullgains.in/api/health
```

### Expected Response
```json
{
  "status": "OK",
  "timestamp": "2024-01-XX...",
  "uptime": 123.456
}
```

## Troubleshooting

### Common Issues:
1. **Build Fails**: Check Node.js version (Render uses Node 18+)
2. **Environment Variables**: Ensure all required vars are set
3. **Database Connection**: Verify MongoDB URI is correct
4. **CORS Issues**: Update CLIENT_URL to your frontend domain

### Logs
- View logs in Render dashboard → **Logs** tab
- Check for any error messages during deployment

## Cost
- **Free Tier**: 750 hours/month (enough for small projects)
- **Paid Plans**: Start at $7/month for always-on service

## Next Steps
1. Deploy backend to Render
2. Configure custom domain
3. Deploy frontend to Vercel/Netlify
4. Update frontend API URLs
5. Test full application

---
**Need Help?** Check Render documentation or contact support.
