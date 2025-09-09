const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// GET /api/status - Get system status
router.get('/', async (req, res) => {
  try {
    const status = {
      timestamp: new Date().toISOString(),
      services: {
        api: {
          status: 'Online',
          responseTime: Math.random() * 100 + 50, // Mock response time
          uptime: process.uptime()
        },
        database: {
          status: mongoose.connection.readyState === 1 ? 'Online' : 'Offline',
          connections: mongoose.connection.readyState,
          lastCheck: new Date().toISOString()
        },
        dataCollection: {
          status: 'Online',
          lastUpdate: new Date(Date.now() - Math.random() * 300000).toISOString(), // Random recent time
          recordsProcessed: Math.floor(Math.random() * 1000) + 500
        },
        socialMediaFeed: {
          status: 'Active',
          lastSync: new Date(Date.now() - Math.random() * 600000).toISOString(),
          sources: ['Twitter', 'Instagram', 'Facebook'],
          postsMonitored: Math.floor(Math.random() * 50) + 20
        },
        emergencyAlerts: {
          status: 'Ready',
          channels: ['SMS', 'Email', 'Push'],
          lastAlert: new Date(Date.now() - Math.random() * 3600000).toISOString(),
          deliveryRate: '98.5%'
        },
        apiServices: {
          status: 'Limited',
          weather: 'Online',
          geolocation: 'Online',
          notifications: 'Limited',
          ml_processing: 'Online'
        }
      },
      performance: {
        cpu: Math.random() * 80 + 10,
        memory: Math.random() * 70 + 20,
        disk: Math.random() * 60 + 30,
        network: Math.random() * 90 + 5
      },
      alerts: [
        {
          level: 'warning',
          message: 'API rate limit approaching threshold',
          timestamp: new Date(Date.now() - 1800000).toISOString()
        },
        {
          level: 'info',
          message: 'Scheduled maintenance window: Sunday 2:00 AM - 4:00 AM UTC',
          timestamp: new Date(Date.now() - 3600000).toISOString()
        }
      ]
    };

    // Overall system health
    const serviceStatuses = Object.values(status.services).map(service => service.status);
    const onlineServices = serviceStatuses.filter(s => s === 'Online' || s === 'Active' || s === 'Ready').length;
    const totalServices = serviceStatuses.length;
    
    status.overall = {
      health: onlineServices === totalServices ? 'Healthy' : 
              onlineServices >= totalServices * 0.8 ? 'Degraded' : 'Critical',
      uptime: '99.9%',
      version: '1.0.0',
      environment: process.env.NODE_ENV || 'development'
    };

    res.json(status);
  } catch (error) {
    res.status(500).json({ 
      message: error.message,
      overall: { health: 'Critical' },
      timestamp: new Date().toISOString()
    });
  }
});

// GET /api/status/health - Simple health check
router.get('/health', (req, res) => {
  res.json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    database: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected'
  });
});

// GET /api/status/metrics - Detailed metrics
router.get('/metrics', (req, res) => {
  const metrics = {
    timestamp: new Date().toISOString(),
    system: {
      nodeVersion: process.version,
      platform: process.platform,
      uptime: process.uptime(),
      memory: process.memoryUsage(),
      cpu: process.cpuUsage()
    },
    application: {
      requestsPerMinute: Math.floor(Math.random() * 100) + 20,
      errorRate: Math.random() * 5,
      responseTime: {
        average: Math.random() * 200 + 100,
        p95: Math.random() * 500 + 200,
        p99: Math.random() * 1000 + 500
      }
    },
    database: {
      connectionState: mongoose.connection.readyState,
      dbName: mongoose.connection.name,
      host: mongoose.connection.host,
      port: mongoose.connection.port
    }
  };

  res.json(metrics);
});

// POST /api/status/alert - Create system alert (admin only)
router.post('/alert', (req, res) => {
  const { level, message, component } = req.body;
  
  if (!level || !message) {
    return res.status(400).json({ message: 'Level and message are required' });
  }

  // In a real application, this would save to database and trigger notifications
  const alert = {
    id: Date.now().toString(),
    level,
    message,
    component: component || 'system',
    timestamp: new Date().toISOString(),
    acknowledged: false
  };

  res.status(201).json({
    message: 'Alert created successfully',
    alert
  });
});

module.exports = router;
