# 🌐 DNS Configuration for bullgains.in

## 📋 **Exact DNS Records for Your GoDaddy Account**

### **Record 1: API Subdomain (Backend)**
```
Type: CNAME
Name: api
Value: [Your Render App URL - Get this from Render dashboard]
TTL: 600
Priority: -
```

### **Record 2: Main Domain (Frontend - for later)**
```
Type: A
Name: @
Value: [Frontend hosting IP - Will be provided when you deploy frontend]
TTL: 600
Priority: -
```

### **Record 3: WWW Redirect**
```
Type: CNAME
Name: www
Value: bullgains.in
TTL: 600
Priority: -
```

## 🎯 **Your Project Structure**
```
bullgains.in (main domain)
├── Frontend (React app) - https://bullgains.in
└── api.bullgains.in (API subdomain)
    └── Backend (Node.js API) - https://api.bullgains.in
```

## 🚀 **Step-by-Step for Your Project**

### **Step 1: Deploy Backend to Render**
1. Go to [render.com](https://render.com)
2. Create new Web Service
3. Connect your GitHub repo: `Bullgains-Research`
4. Set Root Directory: `server`
5. Add Environment Variables:
   ```
   NODE_ENV=production
   CLIENT_URL=https://bullgains.in
   MONGODB_URI=mongodb+srv://support_db_user:jXRh8Tj5eUh0bMlv@cluster0.laq8ugt.mongodb.net/bullgains-research?retryWrites=true&w=majority&appName=Cluster0
   JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
   JWT_EXPIRE=7d
   ENABLE_SEED=false
   ```

### **Step 2: Get Your Render URL**
After deployment, you'll get a URL like:
- `https://bullgains-api-xyz.onrender.com`

### **Step 3: Configure GoDaddy DNS**
1. Log into [GoDaddy](https://godaddy.com)
2. Go to DNS Management for `bullgains.in`
3. Add these **exact records**:

#### **API Subdomain Record:**
```
Type: CNAME
Name: api
Value: bullgains-api-xyz.onrender.com (replace with your actual Render URL)
TTL: 600
```

#### **WWW Redirect Record:**
```
Type: CNAME
Name: www
Value: bullgains.in
TTL: 600
```

### **Step 4: Test Your API**
After DNS propagation (5-30 minutes):
```bash
curl https://api.bullgains.in/api/health
```

Expected response:
```json
{
  "status": "OK",
  "timestamp": "2024-01-XX...",
  "uptime": 123.456
}
```

## 🔧 **Environment Variables for Your Project**

### **Backend (Render)**
```
NODE_ENV=production
CLIENT_URL=https://bullgains.in
MONGODB_URI=mongodb+srv://support_db_user:jXRh8Tj5eUh0bMlv@cluster0.laq8ugt.mongodb.net/bullgains-research?retryWrites=true&w=majority&appName=Cluster0
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRE=7d
ENABLE_SEED=false
```

### **Frontend (Future - Vercel/Netlify)**
```
REACT_APP_API_URL=https://api.bullgains.in
REACT_APP_SOCKET_URL=https://api.bullgains.in
```

## 🎯 **Your Final URLs**
- **Main Website**: `https://bullgains.in` (React frontend)
- **API**: `https://api.bullgains.in` (Node.js backend)
- **WWW Redirect**: `https://www.bullgains.in` → `https://bullgains.in`

## ⏱️ **Timeline**
- Render deployment: 5-10 minutes
- DNS propagation: 5-30 minutes
- SSL activation: 5-15 minutes
- **Total**: 15-55 minutes

## 🧪 **Testing Commands**
```bash
# Test API health
curl https://api.bullgains.in/api/health

# Test from browser
https://api.bullgains.in/api/health

# Test CORS (from your frontend)
fetch('https://api.bullgains.in/api/health')
```

## 📞 **If You Need Help**
1. **DNS Check**: [whatsmydns.net](https://whatsmydns.net)
2. **Render Support**: [render.com/docs](https://render.com/docs)
3. **GoDaddy Support**: [help.godaddy.com](https://help.godaddy.com)

---

**🎉 Once complete, your API will be live at: `https://api.bullgains.in`**
