# ResQ - Ocean Safety Platform

A comprehensive full-stack application for crowdsourced ocean hazard reporting and social media analytics.

## 🚀 Features

### Frontend (React + Vite)
- **Landing Page**: Hero section with animated feature cards
- **Dashboard**: Real-time ocean safety analytics with charts
- **Hazard Report Form**: Complete form with file uploads and location detection
- **ChatBot Alerts**: Real-time alerts from social media platforms
- **Verification System**: AI-powered content verification
- **Multilingual Support**: 8+ languages with real-time translation

### Backend (Node.js + Express)
- **RESTful API**: Complete CRUD operations for hazard reports
- **File Upload**: Support for photos, videos, documents
- **Analytics Engine**: Comprehensive data analysis and reporting
- **System Status**: Real-time monitoring and health checks
- **MongoDB Integration**: Robust data storage with Mongoose

### Key Technologies
- **Frontend**: React 18, Vite, Tailwind CSS, Framer Motion
- **Backend**: Node.js, Express.js, MongoDB, Mongoose
- **Additional**: Recharts, React Leaflet, React Dropzone

## 📋 Prerequisites

- Node.js (v16 or higher)
- MongoDB (local or cloud instance)
- npm or yarn package manager

## 🛠️ Installation & Setup

### 1. Clone the Repository
```bash
git clone <repository-url>
cd ResQ-project
```

### 2. Backend Setup
```bash
cd backend
npm install

# Create environment file
cp .env.example .env

# Edit .env with your configuration
# MONGODB_URI=mongodb://localhost:27017/ResQ
# PORT=5000
# etc.

# Start the backend server
npm run dev
```

### 3. Frontend Setup
```bash
cd frontend
npm install

# Start the development server
npm run dev
```

### 4. Database Setup
Make sure MongoDB is running and accessible at the URL specified in your `.env` file.

## 🚀 Running the Application

### Development Mode
1. Start MongoDB service
2. Run backend: `cd backend && npm run dev`
3. Run frontend: `cd frontend && npm run dev`
4. Open http://localhost:5173 in your browser

### Production Build
```bash
# Build frontend
cd frontend
npm run build

# The built files will be in the `dist` directory
```

## 📊 API Endpoints

### Reports
- `GET /api/reports` - Get all reports (with pagination)
- `GET /api/reports/:id` - Get single report
- `POST /api/reports` - Create new report
- `PUT /api/reports/:id` - Update report
- `DELETE /api/reports/:id` - Delete report
- `GET /api/reports/recent` - Get recent reports

### Analytics
- `GET /api/analytics` - Get analytics data
- `GET /api/analytics/dashboard` - Get dashboard metrics
- `GET /api/analytics/export` - Export analytics data

### Status
- `GET /api/status` - Get system status
- `GET /api/status/health` - Health check
- `GET /api/status/metrics` - Detailed metrics

### Upload
- `POST /api/upload/single` - Upload single file
- `POST /api/upload/multiple` - Upload multiple files
- `GET /api/upload/:filename` - Get file
- `DELETE /api/upload/:filename` - Delete file

## 🌟 Key Features Implemented

### 1. Dashboard Overview
- Real-time metrics (Total Reports, Active Incidents, etc.)
- Interactive charts using Recharts
- Recent reports list with status indicators
- System status monitoring

### 2. Hazard Report Form
- Location detection with geolocation API
- File upload with drag-and-drop support
- Form validation and error handling
- Emergency contact information

### 3. ChatBot Alerts
- Real-time alert simulation
- Chat-style interface with typing indicators
- Social media source tracking
- Emergency contact integration

### 4. Verification System
- User report verification workflow
- Social media content analysis
- AI confidence scoring
- Official content verification

### 5. Multilingual Support
- 8+ language support (English, Hindi, Spanish, Chinese, etc.)
- Real-time content translation
- Voice synthesis support
- Cultural adaptation features

## 🎨 Design System

### Colors
- Primary: Blue (#3B82F6)
- Ocean: Ocean Blue (#0EA5E9)
- Danger: Red (#EF4444)
- Success: Green (#10B981)

### Typography
- Font Family: Inter
- Responsive typography scales
- Consistent heading hierarchy

### Components
- Reusable button variants
- Consistent card designs
- Status badges and indicators
- Animated transitions

## 🔧 Configuration

### Environment Variables

#### Backend (.env)
```
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/ResQ
FRONTEND_URL=http://localhost:5173
JWT_SECRET=your_secret_key
```

#### Frontend
```
VITE_API_URL=http://localhost:5000/api
```

## 📱 Responsive Design

The application is fully responsive and works across:
- Desktop (1024px+)
- Tablet (768px - 1023px)
- Mobile (320px - 767px)

## 🔐 Security Features

- Input validation and sanitization
- File upload restrictions
- Rate limiting
- CORS configuration
- Helmet.js security headers

## 🚀 Deployment

### Frontend (Vercel/Netlify)
```bash
cd frontend
npm run build
# Deploy the dist/ directory
```

### Backend (Render/Heroku)
```bash
cd backend
# Set environment variables
# Deploy with Node.js buildpack
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions:
- Email: support@ResQ.com
- Documentation: [Project Docs]
- Issues: [GitHub Issues]

## 🙏 Acknowledgments

- React team for the amazing framework
- Tailwind CSS for the utility-first CSS framework
- MongoDB team for the database solution
- All contributors and beta testers
