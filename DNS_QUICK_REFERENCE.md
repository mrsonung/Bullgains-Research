# 🚀 DNS Quick Reference for bullgains.in

## 📋 **GoDaddy DNS Records to Add**

### 1. API Subdomain (Backend)
```
Type: CNAME
Name: api
Value: your-render-app.onrender.com
TTL: 600
```

### 2. Main Domain (Frontend - for later)
```
Type: A
Name: @
Value: [Frontend hosting IP - TBD]
TTL: 600
```

### 3. WWW Redirect
```
Type: CNAME
Name: www
Value: bullgains.in
TTL: 600
```

## 🔧 **Render Configuration**

### Service Settings:
- **Name**: bullgains-api
- **Root Directory**: server
- **Build Command**: npm install
- **Start Command**: npm start

### Environment Variables:
```
NODE_ENV=production
CLIENT_URL=https://bullgains.in
MONGODB_URI=mongodb+srv://support_db_user:jXRh8Tj5eUh0bMlv@cluster0.laq8ugt.mongodb.net/bullgains-research?retryWrites=true&w=majority&appName=Cluster0
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRE=7d
ENABLE_SEED=false
```

## 🧪 **Test Commands**

```bash
# Test API health
curl https://api.bullgains.in/api/health

# Test from browser
https://api.bullgains.in/api/health
```

## ⏱️ **Expected Timeline**
- Render deployment: 5-10 minutes
- DNS propagation: 5-30 minutes
- SSL activation: 5-15 minutes
- **Total**: 15-55 minutes

