# Deployment Guide - Bullgains Research

This guide covers various deployment options for the Bullgains Research application, including frontend and backend deployment strategies.

## 🚀 Deployment Overview

The application consists of two main components:
- **Frontend**: React application (can be deployed to Vercel, Netlify, or any static hosting)
- **Backend**: Node.js API server (can be deployed to Heroku, Railway, DigitalOcean, AWS, etc.)

## 📋 Pre-deployment Checklist

### Environment Setup
- [ ] Set up MongoDB database (MongoDB Atlas recommended)
- [ ] Configure environment variables
- [ ] Set up domain and SSL certificates
- [ ] Configure email service (for notifications)
- [ ] Set up analytics and monitoring

### Security Checklist
- [ ] Change default JWT secret
- [ ] Set up proper CORS configuration
- [ ] Configure rate limiting
- [ ] Set up security headers
- [ ] Enable HTTPS

## 🌐 Frontend Deployment

### Option 1: Vercel (Recommended)

1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Deploy**
   ```bash
   cd frontend
   vercel --prod
   ```

3. **Configure Environment Variables**
   - Go to Vercel Dashboard → Project Settings → Environment Variables
   - Add all variables from `.env.example`

4. **Custom Domain** (Optional)
   - Add your domain in Vercel Dashboard
   - Configure DNS records as instructed

### Option 2: Netlify

1. **Build the project**
   ```bash
   cd frontend
   npm run build
   ```

2. **Deploy**
   - Drag and drop the `dist` folder to Netlify
   - Or connect your Git repository

3. **Configure Environment Variables**
   - Site Settings → Environment Variables
   - Add all required variables

4. **Configure Redirects**
   Create `public/_redirects` file:
   ```
   /*    /index.html   200
   ```

## 🖥️ Backend Deployment

### Option 1: Heroku

1. **Install Heroku CLI**
   ```bash
   # macOS
   brew install heroku/brew/heroku
   
   # Windows
   # Download from https://devcenter.heroku.com/articles/heroku-cli
   ```

2. **Login and Create App**
   ```bash
   heroku login
   heroku create bullgains-api
   ```

3. **Configure Environment Variables**
   ```bash
   heroku config:set NODE_ENV=production
   heroku config:set MONGODB_URI=your_mongodb_atlas_uri
   heroku config:set JWT_SECRET=your_jwt_secret
   heroku config:set CLIENT_URL=https://your-frontend-domain.com
   ```

4. **Deploy**
   ```bash
   cd server
   git init
   git add .
   git commit -m "Initial commit"
   git push heroku main
   ```

### Option 2: Railway

1. **Connect Repository**
   - Go to [Railway.app](https://railway.app)
   - Connect your GitHub repository

2. **Configure Environment Variables**
   - Add all required environment variables
   - Set NODE_ENV=production

3. **Deploy**
   - Railway automatically detects Node.js
   - Sets up deployment pipeline

## 🗄️ Database Setup

### MongoDB Atlas (Recommended)

1. **Create Cluster**
   - Go to [MongoDB Atlas](https://www.mongodb.com/atlas)
   - Create new cluster
   - Choose free tier for development

2. **Configure Security**
   - Create database user
   - Whitelist IP addresses (0.0.0.0/0 for all IPs)
   - Get connection string

3. **Environment Variable**
   ```env
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/bullgains-research?retryWrites=true&w=majority
   ```

## 🔒 SSL/HTTPS Setup

### Let's Encrypt (Free)

1. **Install Certbot**
   ```bash
   sudo apt install certbot python3-certbot-nginx
   ```

2. **Get Certificate**
   ```bash
   sudo certbot --nginx -d your-domain.com
   ```

3. **Auto-renewal**
   ```bash
   sudo crontab -e
   # Add: 0 12 * * * /usr/bin/certbot renew --quiet
   ```

## 📊 Monitoring & Analytics

### Application Monitoring

1. **PM2 Monitoring**
   ```bash
   pm2 monit
   pm2 logs
   ```

2. **Uptime Monitoring**
   - Set up UptimeRobot or Pingdom
   - Monitor API endpoints

3. **Error Tracking**
   - Integrate Sentry for error tracking
   - Set up alerts for critical errors

## 🔧 Environment Variables

### Production Environment Variables

**Backend (.env)**
```env
NODE_ENV=production
PORT=5000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/bullgains-research
JWT_SECRET=your_super_secure_jwt_secret_here
JWT_EXPIRE=7d
CLIENT_URL=https://your-frontend-domain.com
ALPHA_VANTAGE_API_KEY=your_alpha_vantage_key
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password
```

**Frontend (.env)**
```env
VITE_API_URL=https://your-api-domain.com
VITE_APP_NAME=Bullgains Research
VITE_SOCKET_URL=https://your-api-domain.com
VITE_GOOGLE_ANALYTICS_ID=your_ga_id
VITE_ENABLE_ANALYTICS=true
```

---

**Happy Deploying! 🚀**

*This deployment guide covers the most common deployment scenarios. For specific hosting provider documentation, refer to their official guides.*
