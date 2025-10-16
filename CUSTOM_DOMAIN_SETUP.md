# 🌐 Custom Domain Setup Guide for bullgains.in

## Overview
This guide will help you set up your custom domain `bullgains.in` with your backend API deployed on Render.

## 🎯 **Domain Structure Plan**
- **Main Domain**: `bullgains.in` → Frontend (React app)
- **API Subdomain**: `api.bullgains.in` → Backend (Node.js API)
- **WWW**: `www.bullgains.in` → Redirects to main domain

---

## 📋 **Step 1: Deploy Backend to Render**

### 1.1 Create Render Account
1. Go to [render.com](https://render.com)
2. Click **"Get Started for Free"**
3. Sign up with your **GitHub account**
4. Authorize Render to access your repositories

### 1.2 Connect Your Repository
1. Click **"New +"** → **"Web Service"**
2. Select **"Build and deploy from a Git repository"**
3. Choose **"GitHub"** as your Git provider
4. Select your repository: **`Bullgains-Research`**
5. Click **"Connect"**

### 1.3 Configure Service Settings
```
Name: bullgains-api
Environment: Node
Region: Oregon (US West) or Frankfurt (EU)
Branch: main
Root Directory: server
Build Command: npm install
Start Command: npm start
```

### 1.4 Add Environment Variables
In the **Environment** section, add these variables:

```
NODE_ENV = production
CLIENT_URL = https://bullgains.in
MONGODB_URI = mongodb+srv://support_db_user:jXRh8Tj5eUh0bMlv@cluster0.laq8ugt.mongodb.net/bullgains-research?retryWrites=true&w=majority&appName=Cluster0
JWT_SECRET = your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRE = 7d
ENABLE_SEED = false
```

### 1.5 Deploy
1. Click **"Create Web Service"**
2. Wait for deployment to complete (5-10 minutes)
3. Note your **Render URL**: `https://your-app-name.onrender.com`

---

## 🌐 **Step 2: Configure Custom Domain in Render**

### 2.1 Add Custom Domain
1. Go to your service dashboard
2. Click **"Settings"** tab
3. Scroll down to **"Custom Domains"** section
4. Click **"Add Custom Domain"**
5. Enter: `api.bullgains.in`
6. Click **"Add"**

### 2.2 Get DNS Instructions
Render will show you DNS configuration instructions:
- **Type**: CNAME
- **Name**: api
- **Value**: `your-app-name.onrender.com`
- **TTL**: 3600

**📝 Note down these values - you'll need them for GoDaddy!**

---

## 🏠 **Step 3: Configure GoDaddy DNS**

### 3.1 Access GoDaddy DNS Management
1. Log into your [GoDaddy account](https://godaddy.com)
2. Go to **"My Products"**
3. Find your domain `bullgains.in`
4. Click **"DNS"** or **"Manage DNS"**

### 3.2 Add DNS Records

#### Record 1: API Subdomain (CNAME)
```
Type: CNAME
Name: api
Value: your-app-name.onrender.com
TTL: 600 (10 minutes)
```

#### Record 2: Main Domain (A Record)
```
Type: A
Name: @
Value: [Get this from Render or use a generic IP]
TTL: 600
```

#### Record 3: WWW Redirect (CNAME)
```
Type: CNAME
Name: www
Value: bullgains.in
TTL: 600
```

### 3.3 Remove/Update Existing Records
- Remove any conflicting A records
- Update existing CNAME records if needed
- Keep MX records for email (if you have email setup)

---

## 🔒 **Step 4: SSL Certificate Setup**

### 4.1 Automatic SSL (Recommended)
- Render automatically provides SSL certificates
- No additional configuration needed
- SSL will be active once DNS propagates

### 4.2 Verify SSL
After DNS propagation (5-30 minutes), test:
```bash
curl -I https://api.bullgains.in/api/health
```

Expected response:
```
HTTP/2 200
```

---

## 🧪 **Step 5: Testing Your Setup**

### 5.1 Test API Endpoints
```bash
# Health check
curl https://api.bullgains.in/api/health

# Expected response:
{
  "status": "OK",
  "timestamp": "2024-01-XX...",
  "uptime": 123.456
}
```

### 5.2 Test from Browser
Visit: `https://api.bullgains.in/api/health`

### 5.3 Test CORS
Your frontend should be able to make requests to:
- `https://api.bullgains.in/api/auth/login`
- `https://api.bullgains.in/api/users`
- `https://api.bullgains.in/api/blog`

---

## 🚀 **Step 6: Frontend Deployment (Next)**

After backend is working, deploy frontend to:
- **Vercel** (recommended for React)
- **Netlify**
- **Render** (same platform)

### Frontend Domain Structure:
- **Main**: `bullgains.in` → React app
- **API**: `api.bullgains.in` → Node.js backend

---

## ⏱️ **Timeline Expectations**

| Step | Time Required |
|------|---------------|
| Render deployment | 5-10 minutes |
| DNS propagation | 5-30 minutes |
| SSL activation | 5-15 minutes |
| **Total** | **15-55 minutes** |

---

## 🔧 **Troubleshooting**

### Common Issues:

#### 1. DNS Not Working
- **Check**: DNS propagation at [whatsmydns.net](https://whatsmydns.net)
- **Wait**: Up to 24 hours for full propagation
- **Verify**: DNS records in GoDaddy match Render instructions

#### 2. SSL Certificate Issues
- **Wait**: SSL activation can take 15-30 minutes
- **Check**: Render dashboard for SSL status
- **Verify**: Domain is properly configured

#### 3. CORS Errors
- **Update**: `CLIENT_URL` in Render environment variables
- **Check**: Frontend is making requests to correct domain

#### 4. 404 Errors
- **Verify**: API routes are working on Render URL
- **Check**: Environment variables are set correctly

---

## 📞 **Support Resources**

- **Render Support**: [render.com/docs](https://render.com/docs)
- **GoDaddy Support**: [help.godaddy.com](https://help.godaddy.com)
- **DNS Checker**: [whatsmydns.net](https://whatsmydns.net)

---

## ✅ **Success Checklist**

- [ ] Backend deployed to Render
- [ ] Custom domain added in Render
- [ ] DNS records configured in GoDaddy
- [ ] SSL certificate active
- [ ] API endpoints responding
- [ ] CORS configured correctly
- [ ] Health check endpoint working

---

**🎉 Once complete, your API will be live at: `https://api.bullgains.in`**
