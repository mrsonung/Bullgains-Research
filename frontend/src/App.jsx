import { Routes, Route } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import { SocketProvider } from './contexts/SocketContext'
import { ErrorBoundary } from './components/ErrorBoundary'
import { LoadingProvider } from './contexts/LoadingContext'

// Layout Components
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import ScrollToTop from './components/ScrollToTop'

// Page Components
import Home from './pages/Home'
import About from './pages/About'
import Services from './pages/Services'
import ServiceDetail from './pages/ServiceDetail'
import Compliance from './pages/Compliance'
import Blog from './pages/Blog'
import BlogPost from './pages/BlogPost'
import Contact from './pages/Contact'
import Team from './pages/Team'
import Infrastructure from './pages/Infrastructure'
import Disclosures from './pages/Disclosures'
import DisputeResolution from './pages/DisputeResolution'
import Disclaimer from './pages/Disclaimer'
import Disclosure from './pages/Disclosure'
import TermsConditions from './pages/TermsConditions'
import PrivacyPolicy from './pages/PrivacyPolicy'
import ServiceDeliveryPolicy from './pages/ServiceDeliveryPolicy'
import RefundCancellationPolicy from './pages/RefundCancellationPolicy'
import RiskShortTermInvestments from './pages/RiskShortTermInvestments'
import InvestorCharter from './pages/InvestorCharter'
import ODR from './pages/ODR'
import ODRCircular from './pages/ODRCircular'
import Login from './pages/auth/Login'
import Register from './pages/auth/Register'
import AdminPanel from './pages/AdminPanel'
import Dashboard from './pages/Dashboard'
import Profile from './pages/Profile'
import NotFound from './pages/NotFound'
import PaymentDetails from './pages/PaymentDetails'
import SearchResults from './pages/SearchResults'
import CustomerQuery from './pages/customerQuery'
import ComplaintBoard from './pages/ComplaintBoard'

// Protected Route Component
import ProtectedRoute from './components/ProtectedRoute'

function App() {
  return (
    <ErrorBoundary>
      <LoadingProvider>
        <AuthProvider>
          <SocketProvider>
            <div className="min-h-screen flex flex-col">
              <Navbar />
              <main className="flex-1">
                <ScrollToTop />
                <Routes>
                  {/* Public Routes */}
                  <Route path="/" element={<Home />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/services" element={<Services />} />
                  <Route path="/services/:slug" element={<ServiceDetail />} />
                  <Route path="/compliance" element={<Compliance />} />
                  <Route path="/customer-query" element={<CustomerQuery />} />
                  <Route path="/team" element={<Team />} />
                  <Route path="/infrastructure" element={<Infrastructure />} />
                  <Route path="/disclosures" element={<Disclosures />} />
                  <Route path="/dispute-resolution" element={<DisputeResolution />} />
                  <Route path="/blog" element={<Blog />} />
                  <Route path="/blog/:slug" element={<BlogPost />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/admin" element={<AdminPanel />} />
                  <Route path="/complaint-board" element={<ComplaintBoard />} />
                  {/* Policy & Compliance Pages */}
                  <Route path="/disclaimer" element={<Disclaimer />} />
                  <Route path="/disclosure" element={<Disclosure />} />
                  <Route path="/terms-conditions" element={<TermsConditions />} />
                  <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                  <Route path="/service-delivery-policy" element={<ServiceDeliveryPolicy />} />
                  <Route path="/refund-cancellation-policy" element={<RefundCancellationPolicy />} />
                  <Route path="/risk-short-term-investments" element={<RiskShortTermInvestments />} />
                  <Route path="/investor-charter" element={<InvestorCharter />} />
                  <Route path="/odr" element={<ODR />} />
                  <Route path="/odr-circular" element={<ODRCircular />} />
                  <Route path="/payment-details" element={<PaymentDetails />} />
                  <Route path="/search" element={<SearchResults />} />
                  
                  {/* Protected Routes */}
                  <Route path="/dashboard" element={
                    <ProtectedRoute>
                      <Dashboard />
                    </ProtectedRoute>
                  } />
                  <Route path="/profile" element={
                    <ProtectedRoute>
                      <Profile />
                    </ProtectedRoute>
                  } />
                  
                  {/* 404 Route */}
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </main>
              {/* <Footer /> */}
            </div>
          </SocketProvider>
        </AuthProvider>
      </LoadingProvider>
    </ErrorBoundary>
  )
}

export default App
