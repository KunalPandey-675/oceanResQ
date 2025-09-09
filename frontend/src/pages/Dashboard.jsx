import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  RefreshCw, 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle2, 
  Clock,
  BarChart3,
  Activity,
  Waves,
  MapPin,
  Calendar
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useLanguage } from '../context/LanguageContext';
import { analyticsAPI, reportsAPI, statusAPI, handleApiError } from '../services/api';
import toast from 'react-hot-toast';

const Dashboard = () => {
  const { t } = useLanguage();
  const [isLoading, setIsLoading] = useState(true);
  const [dashboardData, setDashboardData] = useState(null);
  const [recentReports, setRecentReports] = useState([]);
  const [systemStatus, setSystemStatus] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  const fetchDashboardData = async () => {
    try {
      setIsLoading(true);
      const [analyticsResponse, reportsResponse, statusResponse] = await Promise.all([
        analyticsAPI.getDashboard(),
        reportsAPI.getRecent(),
        statusAPI.getStatus()
      ]);

      setDashboardData(analyticsResponse.data);
      setRecentReports(reportsResponse.data);
      setSystemStatus(statusResponse.data);
    } catch (error) {
      const errorInfo = handleApiError(error);
      toast.error(errorInfo.message);
      console.error('Dashboard fetch error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await fetchDashboardData();
    setRefreshing(false);
    toast.success('Data refreshed successfully');
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'Low Risk': return 'bg-green-100 text-green-800';
      case 'Moderate Risk': return 'bg-yellow-100 text-yellow-800';
      case 'High Risk': return 'bg-orange-100 text-orange-800';
      case 'Critical Emergency': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active': return 'bg-red-100 text-red-800';
      case 'Under Review': return 'bg-yellow-100 text-yellow-800';
      case 'Resolved': return 'bg-green-100 text-green-800';
      case 'Closed': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatTimeAgo = (date) => {
    const now = new Date();
    const reportDate = new Date(date);
    const diffInMinutes = Math.floor((now - reportDate) / (1000 * 60));
    
    if (diffInMinutes < 60) return `${diffInMinutes} min ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)} hours ago`;
    return `${Math.floor(diffInMinutes / 1440)} days ago`;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="spinner w-8 h-8 mx-auto mb-4"></div>
          <p className="text-gray-600">{t('common.loading')}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-ocean-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex justify-between items-start mb-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              {t('dashboard.title')}
            </h1>
            <p className="text-lg text-gray-600">
              {t('dashboard.subtitle')}
            </p>
          </motion.div>
          
          <motion.button
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            onClick={handleRefresh}
            disabled={refreshing}
            className="btn-secondary flex items-center space-x-2"
          >
            <RefreshCw className={`h-4 w-4 ${refreshing ? 'animate-spin' : ''}`} />
            <span>{t('dashboard.refreshData')}</span>
          </motion.button>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {dashboardData?.summary && [
            {
              title: t('dashboard.totalReports'),
              value: dashboardData.summary.totalReports.value || '1,247',
              change: dashboardData.summary.totalReports.change || '+12% from last month',
              icon: BarChart3,
              color: 'blue'
            },
            {
              title: t('dashboard.activeIncidents'),
              value: dashboardData.summary.activeIncidents.value || '23',
              change: dashboardData.summary.activeIncidents.change || 'Requiring attention',
              icon: AlertTriangle,
              color: 'yellow'
            },
            {
              title: t('dashboard.resolvedToday'),
              value: dashboardData.summary.resolvedToday.value || '89',
              change: dashboardData.summary.resolvedToday.change || '+23% efficiency',
              icon: CheckCircle2,
              color: 'green'
            },
            {
              title: t('dashboard.avgResponseTime'),
              value: `${dashboardData.summary.avgResponseTime.value || '4.2'} min`,
              change: dashboardData.summary.avgResponseTime.change || '-15% from target',
              icon: Clock,
              color: 'purple'
            }
          ].map((card, index) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                className="card hover:shadow-lg"
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-600 mb-1">
                      {card.title}
                    </p>
                    <p className="text-3xl font-bold text-gray-900">
                      {card.value}
                    </p>
                    <p className="text-sm text-gray-500 mt-1">
                      {card.change}
                    </p>
                  </div>
                  <div className={`p-3 rounded-lg bg-${card.color}-100`}>
                    <Icon className={`h-6 w-6 text-${card.color}-600`} />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Reports */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="lg:col-span-2"
          >
            <div className="card">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900 flex items-center">
                  <Activity className="h-5 w-5 mr-2 text-primary-600" />
                  {t('dashboard.recentReports')}
                </h2>
                <span className="text-sm text-gray-500">
                  Latest hazard reports from the community
                </span>
              </div>

              <div className="space-y-4">
                {recentReports.length > 0 ? recentReports.map((report) => (
                  <div key={report._id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200">
                    <div className="flex items-center space-x-4">
                      <div className="p-2 bg-white rounded-lg shadow-sm">
                        <Waves className="h-5 w-5 text-ocean-600" />
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900">{report.hazardType}</h3>
                        <div className="flex items-center space-x-2 text-sm text-gray-500">
                          <MapPin className="h-3 w-3" />
                          <span>{report.location.details}</span>
                          <span>•</span>
                          <span>{formatTimeAgo(report.createdAt)}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getSeverityColor(report.severity)}`}>
                        {report.severity.replace(' Risk', '').replace(' Emergency', '')}
                      </span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(report.status)}`}>
                        {report.status}
                      </span>
                    </div>
                  </div>
                )) : (
                  <div className="text-center py-8 text-gray-500">
                    <Waves className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                    <p>No recent reports available</p>
                  </div>
                )}
              </div>
            </div>
          </motion.div>

          {/* System Status */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            className="space-y-6"
          >
            {/* Hazard Analytics */}
            <div className="card">
              <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                <TrendingUp className="h-5 w-5 mr-2 text-primary-600" />
                {t('dashboard.hazardAnalytics')}
              </h2>
              
              {dashboardData?.hazardAnalytics && (
                <div className="space-y-4">
                  {dashboardData.hazardAnalytics.slice(0, 4).map((item) => (
                    <div key={item._id} className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-700">{item._id}</span>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm font-bold text-gray-900">{item.count}</span>
                        <span className="text-xs text-green-600 font-medium">+12%</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* System Status */}
            <div className="card">
              <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                <Activity className="h-5 w-5 mr-2 text-primary-600" />
                {t('dashboard.systemStatus')}
              </h2>
              
              <div className="space-y-3">
                {systemStatus?.services && Object.entries(systemStatus.services).map(([key, service]) => (
                  <div key={key} className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700 capitalize">
                      {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      service.status === 'Online' || service.status === 'Active' || service.status === 'Ready'
                        ? 'bg-green-100 text-green-800'
                        : service.status === 'Limited'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {service.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Monthly Hazard Analytics Chart */}
        {dashboardData?.hazardAnalytics && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.6 }}
            className="mt-8"
          >
            <div className="card">
              <h2 className="text-xl font-bold text-gray-900 mb-6">
                Monthly Hazard Type Breakdown
              </h2>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={dashboardData.hazardAnalytics}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis 
                      dataKey="_id" 
                      stroke="#6b7280"
                      fontSize={12}
                      tickLine={false}
                    />
                    <YAxis 
                      stroke="#6b7280"
                      fontSize={12}
                      tickLine={false}
                    />
                    <Tooltip 
                      contentStyle={{
                        backgroundColor: 'white',
                        border: 'none',
                        borderRadius: '8px',
                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                      }}
                    />
                    <Bar 
                      dataKey="count" 
                      fill="url(#colorGradient)"
                      radius={[4, 4, 0, 0]}
                    />
                    <defs>
                      <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#1e40af" stopOpacity={0.6}/>
                      </linearGradient>
                    </defs>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
