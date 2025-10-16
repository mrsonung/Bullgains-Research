# Bullgains Research - SEBI Registered Trading & Research Platform

A complete, scalable, and visually compelling web application for **Bullgains Research** - a SEBI-registered research-based trading company. This platform provides expert market analysis, trading signals, portfolio management, and comprehensive investment insights.

![Bullgains Research](https://img.shields.io/badge/Status-Production%20Ready-brightgreen)
![React](https://img.shields.io/badge/React-18.2.0-blue)
![Node.js](https://img.shields.io/badge/Node.js-18+-green)
![MongoDB](https://img.shields.io/badge/MongoDB-6.0+-green)
![License](https://img.shields.io/badge/License-MIT-yellow)

## 🚀 Features

### Core Functionality
- **Real-time Market Analytics** - Live stock prices, market sentiment, and economic indicators
- **Expert Research Reports** - Comprehensive market analysis and trading insights
- **Trading Signals** - High-accuracy buy/sell recommendations with detailed analysis
- **Portfolio Management** - Professional portfolio tracking and optimization
- **User Authentication** - Secure JWT-based authentication with role-based access
- **Blog System** - Educational content and market updates with comments
- **Contact Management** - Customer inquiry handling and support system

### User Experience
- **Responsive Design** - Mobile-first approach with Tailwind CSS
- **Modern UI/UX** - Inspira UI components with Framer Motion animations
- **Real-time Updates** - Socket.IO integration for live market data
- **Accessibility** - WCAG compliant with proper ARIA labels and keyboard navigation
- **SEO Optimized** - Meta tags, structured data, and performance optimization

### Admin Features
- **Content Management** - Blog posts, services, and user management
- **Analytics Dashboard** - User engagement and market performance metrics
- **Contact Management** - Inquiry handling and response system
- **User Management** - Account management and role assignments

## 🛠️ Tech Stack

### Frontend
- **React 18** with Vite for fast development and building
- **Tailwind CSS** with custom Bullgains branding colors
- **Framer Motion** for smooth animations and transitions
- **React Router** for client-side routing
- **React Query** for efficient data fetching and caching
- **Socket.IO Client** for real-time updates
- **Lucide React** for consistent iconography
- **React Hook Form** for form validation and management

### Backend
- **Node.js** with Express.js framework
- **MongoDB** with Mongoose ODM for database management
- **JWT** for secure authentication and authorization
- **Socket.IO** for real-time communication
- **Bcryptjs** for password hashing and security
- **Express Validator** for input validation and sanitization
- **Helmet** for security headers and protection

### Development Tools
- **ESLint** and **Prettier** for code quality and formatting
- **Concurrently** for running frontend and backend simultaneously
- **Nodemon** for automatic server restarts during development

## 📁 Project Structure

```
bullgains-research/
├── frontend/                 # React frontend application
│   ├── src/
│   │   ├── components/      # Reusable UI components
│   │   │   ├── layout/      # Layout components (Navbar, Footer)
│   │   │   └── ...
│   │   ├── pages/          # Page components
│   │   │   ├── auth/       # Authentication pages
│   │   │   └── ...
│   │   ├── contexts/       # React Context providers
│   │   ├── services/       # API service functions
│   │   ├── hooks/          # Custom React hooks
│   │   └── assets/         # Static assets
│   ├── public/             # Public static files
│   └── package.json
├── server/                 # Express.js backend
│   ├── models/            # Mongoose schemas
│   ├── routes/            # API route handlers
│   ├── middleware/        # Custom middleware
│   ├── utils/             # Utility functions
│   └── package.json
├── package.json           # Root package.json for scripts
└── README.md
```

## 🚀 Getting Started

### Prerequisites

Before running this application, make sure you have the following installed:

- **Node.js** (v18 or higher)
- **npm** or **yarn**
- **MongoDB** (local installation or MongoDB Atlas)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd bullgains-research
   ```

2. **Install all dependencies**
   ```bash
   npm run install-all
   ```

3. **Environment Setup**
   
   Create environment files for both frontend and backend:

   **Backend (.env)**
   ```bash
   cp server/.env.example server/.env
   ```
   
   Edit `server/.env` with your configuration:
   ```env
   # Database
   MONGODB_URI=mongodb://localhost:27017/bullgains-research
   
   # JWT
   JWT_SECRET=your_super_secret_jwt_key_here
   JWT_EXPIRE=7d
   
   # Server
   PORT=5000
   NODE_ENV=development
   
   # Client
   CLIENT_URL=http://localhost:5173
   
   # Analytics API (for real-time stock data)
   ALPHA_VANTAGE_API_KEY=your_alpha_vantage_api_key_here
   ```

   **Frontend (.env)**
   ```bash
   cp frontend/.env.example frontend/.env
   ```
   
   Edit `frontend/.env`:
   ```env
   VITE_API_URL=http://localhost:5000
   VITE_APP_NAME=Bullgains Research
   ```

4. **Start the development servers**
   ```bash
   npm run dev
   ```

   This will start both the frontend (http://localhost:5173) and backend (http://localhost:5000) servers.

### Alternative Setup (Manual)

If you prefer to run the servers separately:

1. **Start the backend server**
   ```bash
   cd server
   npm install
   npm run dev
   ```

2. **Start the frontend server** (in a new terminal)
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

## 🎨 Customization

### Branding Colors

The application uses custom Bullgains branding colors defined in `frontend/tailwind.config.js`:

```javascript
colors: {
  bullgains: {
    blue: '#0F4C81',
    yellow: '#FFCB05',
    'blue-light': '#1E6BA8',
    'blue-dark': '#0A3A5C',
    'yellow-light': '#FFD700',
    'yellow-dark': '#E6B800',
  }
}
```

### Typography

The application uses **Poppins** font family for consistent, modern typography. The font is loaded from Google Fonts and configured in the Tailwind CSS configuration.

## 📊 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user
- `PUT /api/auth/profile` - Update user profile
- `PUT /api/auth/change-password` - Change password

### Blog
- `GET /api/blog` - Get all blog posts
- `GET /api/blog/:slug` - Get single blog post
- `POST /api/blog` - Create blog post (admin)
- `PUT /api/blog/:id` - Update blog post (admin)
- `DELETE /api/blog/:id` - Delete blog post (admin)

### Services
- `GET /api/services` - Get all services
- `GET /api/services/:slug` - Get single service
- `POST /api/services` - Create service (admin)
- `PUT /api/services/:id` - Update service (admin)
- `DELETE /api/services/:id` - Delete service (admin)

### Analytics
- `GET /api/analytics/market-overview` - Market overview data
- `GET /api/analytics/top-stocks` - Top performing stocks
- `GET /api/analytics/sector-performance` - Sector performance
- `GET /api/analytics/market-sentiment` - Market sentiment indicators

### Contact
- `POST /api/contact` - Submit contact form
- `GET /api/contact` - Get contact messages (admin)
- `PUT /api/contact/:id` - Update contact message (admin)

## 🔐 Authentication & Security

### JWT Authentication
- Secure token-based authentication
- Token expiration and refresh mechanisms
- Protected routes with role-based access control

### Password Security
- Bcrypt hashing with salt rounds
- Password strength validation
- Secure password reset functionality

### Security Headers
- Helmet.js for security headers
- CORS configuration
- Rate limiting for API endpoints
- Input validation and sanitization

## 📱 Responsive Design

The application is built with a mobile-first approach and includes:

- **Breakpoints**: sm (640px), md (768px), lg (1024px), xl (1280px), 2xl (1536px)
- **Flexible Grid System**: CSS Grid and Flexbox for responsive layouts
- **Touch-friendly Interface**: Optimized for mobile devices
- **Progressive Enhancement**: Works on all devices and browsers

## 🎭 Animations & Interactions

### Framer Motion
- Page transitions and route animations
- Staggered animations for lists and grids
- Hover effects and micro-interactions
- Loading states and skeleton screens

### CSS Animations
- Custom keyframe animations
- Smooth transitions and transforms
- Loading spinners and progress indicators
- Gradient animations and effects

## 🔧 Development Scripts

### Root Level Scripts
```bash
npm run dev          # Start both frontend and backend
npm run build        # Build frontend for production
npm run install-all  # Install all dependencies
npm start           # Start production server
```

### Frontend Scripts
```bash
npm run dev         # Start development server
npm run build       # Build for production
npm run preview     # Preview production build
npm run lint        # Run ESLint
```

### Backend Scripts
```bash
npm run dev         # Start with nodemon
npm start          # Start production server
npm test           # Run tests
```

## 🚀 Deployment

### Frontend Deployment (Vercel/Netlify)
1. Build the frontend:
   ```bash
   cd frontend
   npm run build
   ```

2. Deploy the `dist` folder to your hosting service

### Backend Deployment (Heroku/Railway/DigitalOcean)
1. Set up environment variables in your hosting platform
2. Configure MongoDB Atlas or your preferred database
3. Deploy the server folder

### Environment Variables for Production
```env
NODE_ENV=production
MONGODB_URI=your_production_mongodb_uri
JWT_SECRET=your_production_jwt_secret
CLIENT_URL=https://your-frontend-domain.com
```

## 📈 Performance Optimization

### Frontend Optimizations
- **Code Splitting**: Automatic route-based code splitting
- **Lazy Loading**: Components loaded on demand
- **Image Optimization**: Responsive images with proper formats
- **Caching**: React Query for efficient data caching
- **Bundle Analysis**: Optimized bundle sizes

### Backend Optimizations
- **Database Indexing**: Optimized MongoDB queries
- **Caching**: Redis for session and data caching
- **Compression**: Gzip compression for responses
- **Rate Limiting**: API rate limiting and throttling

## 🧪 Testing

### Frontend Testing
```bash
cd frontend
npm test           # Run tests
npm run test:coverage  # Run with coverage
```

### Backend Testing
```bash
cd server
npm test           # Run tests
npm run test:watch # Run tests in watch mode
```

## 📚 Documentation

### API Documentation
- Comprehensive API documentation with examples
- Request/response schemas
- Error handling and status codes
- Authentication requirements

### Component Documentation
- Storybook integration for component documentation
- Props and usage examples
- Accessibility guidelines
- Design system documentation

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines
- Follow the existing code style and conventions
- Write meaningful commit messages
- Add tests for new features
- Update documentation as needed
- Ensure accessibility compliance

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For support and questions:

- **Email**: support@bullgainsresearch.com
- **Documentation**: [Link to documentation]
- **Issues**: [GitHub Issues](https://github.com/your-repo/issues)

## 🙏 Acknowledgments

- **SEBI** for regulatory compliance guidelines
- **React Team** for the amazing framework
- **Tailwind CSS** for the utility-first CSS framework
- **Framer Motion** for smooth animations
- **MongoDB** for the flexible database solution

## 📊 Project Status

- ✅ **Backend API** - Complete
- ✅ **Frontend Application** - Complete
- ✅ **Authentication System** - Complete
- ✅ **Real-time Features** - Complete
- ✅ **Responsive Design** - Complete
- ✅ **SEO Optimization** - Complete
- 🔄 **Testing** - In Progress
- 🔄 **Documentation** - In Progress

---

**Built by the Bullgains Research Team**

*Empowering investors with expert market insights and professional trading guidance.*
<!-- #   B u l l g a i n s - R e s e a r c h 
 
  -->
