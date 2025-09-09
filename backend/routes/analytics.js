const express = require('express');
const router = express.Router();
const HazardReport = require('../models/HazardReport');

// GET /api/analytics - Get comprehensive analytics data
router.get('/', async (req, res) => {
  try {
    const { timeframe = '30d' } = req.query;
    
    // Calculate date range
    const now = new Date();
    let startDate;
    
    switch (timeframe) {
      case '7d':
        startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        break;
      case '30d':
        startDate = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
        break;
      case '90d':
        startDate = new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000);
        break;
      case '1y':
        startDate = new Date(now.getTime() - 365 * 24 * 60 * 60 * 1000);
        break;
      default:
        startDate = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
    }

    // Total reports count
    const totalReports = await HazardReport.countDocuments({
      createdAt: { $gte: startDate }
    });

    // Active incidents
    const activeIncidents = await HazardReport.countDocuments({
      status: { $in: ['Active', 'Under Review'] },
      createdAt: { $gte: startDate }
    });

    // Resolved today
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const resolvedToday = await HazardReport.countDocuments({
      status: 'Resolved',
      resolvedAt: { $gte: today }
    });

    // Average response time
    const avgResponseTime = await HazardReport.aggregate([
      {
        $match: {
          status: 'Resolved',
          responseTime: { $exists: true, $ne: null },
          createdAt: { $gte: startDate }
        }
      },
      {
        $group: {
          _id: null,
          avgTime: { $avg: '$responseTime' }
        }
      }
    ]);

    // Hazard type breakdown
    const hazardTypeBreakdown = await HazardReport.aggregate([
      {
        $match: { createdAt: { $gte: startDate } }
      },
      {
        $group: {
          _id: '$hazardType',
          count: { $sum: 1 },
          criticalCount: {
            $sum: {
              $cond: [{ $eq: ['$severity', 'Critical Emergency'] }, 1, 0]
            }
          }
        }
      },
      {
        $sort: { count: -1 }
      }
    ]);

    // Severity distribution
    const severityDistribution = await HazardReport.aggregate([
      {
        $match: { createdAt: { $gte: startDate } }
      },
      {
        $group: {
          _id: '$severity',
          count: { $sum: 1 }
        }
      }
    ]);

    // Daily trend for the last 7 days
    const dailyTrend = await HazardReport.aggregate([
      {
        $match: {
          createdAt: { $gte: new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000) }
        }
      },
      {
        $group: {
          _id: {
            year: { $year: '$createdAt' },
            month: { $month: '$createdAt' },
            day: { $dayOfMonth: '$createdAt' }
          },
          count: { $sum: 1 }
        }
      },
      {
        $sort: { '_id.year': 1, '_id.month': 1, '_id.day': 1 }
      }
    ]);

    // Status distribution
    const statusDistribution = await HazardReport.aggregate([
      {
        $match: { createdAt: { $gte: startDate } }
      },
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 }
        }
      }
    ]);

    // Geographic distribution (top 10 locations)
    const geographicDistribution = await HazardReport.aggregate([
      {
        $match: { createdAt: { $gte: startDate } }
      },
      {
        $group: {
          _id: '$location.details',
          count: { $sum: 1 },
          severityBreakdown: {
            $push: '$severity'
          }
        }
      },
      {
        $sort: { count: -1 }
      },
      {
        $limit: 10
      }
    ]);

    res.json({
      timeframe,
      summary: {
        totalReports,
        activeIncidents,
        resolvedToday,
        avgResponseTime: avgResponseTime.length > 0 ? Math.round(avgResponseTime[0].avgTime) : 0
      },
      breakdown: {
        hazardTypes: hazardTypeBreakdown,
        severity: severityDistribution,
        status: statusDistribution,
        geographic: geographicDistribution
      },
      trends: {
        daily: dailyTrend
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET /api/analytics/dashboard - Get dashboard-specific metrics
router.get('/dashboard', async (req, res) => {
  try {
    const now = new Date();
    const lastMonth = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Summary cards data
    const [
      totalReports,
      activeIncidents,
      resolvedToday,
      avgResponseTime
    ] = await Promise.all([
      HazardReport.countDocuments({ createdAt: { $gte: lastMonth } }),
      HazardReport.countDocuments({ status: { $in: ['Active', 'Under Review'] } }),
      HazardReport.countDocuments({ 
        status: 'Resolved',
        resolvedAt: { $gte: today }
      }),
      HazardReport.aggregate([
        {
          $match: {
            status: 'Resolved',
            responseTime: { $exists: true, $ne: null },
            createdAt: { $gte: lastMonth }
          }
        },
        {
          $group: {
            _id: null,
            avgTime: { $avg: '$responseTime' }
          }
        }
      ])
    ]);

    // Calculate percentage changes (mock data for demo)
    const changes = {
      totalReports: '+12%',
      activeIncidents: 'Requiring attention',
      resolvedToday: '+23% efficiency',
      avgResponseTime: '-15% from target'
    };

    // Hazard analytics for chart
    const hazardAnalytics = await HazardReport.aggregate([
      {
        $match: { createdAt: { $gte: lastMonth } }
      },
      {
        $group: {
          _id: '$hazardType',
          count: { $sum: 1 },
          change: { $sum: 1 } // This would be calculated properly in a real scenario
        }
      },
      {
        $sort: { count: -1 }
      }
    ]);

    // Add percentage changes to hazard analytics
    const hazardAnalyticsWithChanges = hazardAnalytics.map((item, index) => ({
      ...item,
      change: ['+12%', '+8%', '-3%', '+15%'][index] || '+5%'
    }));

    res.json({
      summary: {
        totalReports: {
          value: totalReports,
          change: changes.totalReports
        },
        activeIncidents: {
          value: activeIncidents,
          change: changes.activeIncidents
        },
        resolvedToday: {
          value: resolvedToday,
          change: changes.resolvedToday
        },
        avgResponseTime: {
          value: avgResponseTime.length > 0 ? Math.round(avgResponseTime[0].avgTime) : 4.2,
          change: changes.avgResponseTime
        }
      },
      hazardAnalytics: hazardAnalyticsWithChanges
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET /api/analytics/export - Export analytics data
router.get('/export', async (req, res) => {
  try {
    const { format = 'json', timeframe = '30d' } = req.query;
    
    // Get analytics data
    const analyticsData = await getAnalyticsData(timeframe);
    
    if (format === 'csv') {
      // Convert to CSV format (simplified)
      const csv = convertToCSV(analyticsData);
      res.setHeader('Content-Type', 'text/csv');
      res.setHeader('Content-Disposition', 'attachment; filename=ResQ-analytics.csv');
      res.send(csv);
    } else {
      res.json(analyticsData);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Helper function to get analytics data
async function getAnalyticsData(timeframe) {
  // Implementation would be similar to the main analytics endpoint
  // Simplified for brevity
  return {
    timeframe,
    generated: new Date().toISOString(),
    summary: {
      totalReports: await HazardReport.countDocuments(),
      activeIncidents: await HazardReport.countDocuments({ status: { $in: ['Active', 'Under Review'] } })
    }
  };
}

// Helper function to convert data to CSV
function convertToCSV(data) {
  // Simplified CSV conversion
  const headers = ['Metric', 'Value'];
  const rows = [
    ['Total Reports', data.summary.totalReports],
    ['Active Incidents', data.summary.activeIncidents]
  ];
  
  return [headers, ...rows].map(row => row.join(',')).join('\n');
}

module.exports = router;
