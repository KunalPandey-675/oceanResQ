import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  CheckCircle2, 
  XCircle, 
  Clock, 
  Filter, 
  Search,
  AlertTriangle,
  ThumbsUp,
  ThumbsDown,
  Eye,
  MessageSquare,
  TrendingUp,
  Users,
  Zap,
  Shield
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const Verification = () => {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState('reports');
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const tabs = [
    { id: 'reports', label: 'User Reports', icon: CheckCircle2 },
    { id: 'social', label: 'Social Media', icon: MessageSquare },
    { id: 'verified', label: 'Verified Content', icon: Shield }
  ];

  const userReports = [
    {
      id: 1,
      title: 'High Waves at Marina Beach',
      location: 'Marina Beach, Chennai',
      time: '15 min ago',
      status: 'pending',
      severity: 'high',
      evidence: 3,
      description: 'Unusually high waves observed with strong undertow. Multiple people warned away from water.',
      submitter: 'Local Resident',
      confidence: 85
    },
    {
      id: 2,
      title: 'Rip Current Formation',
      location: 'Juhu Beach, Mumbai',
      time: '32 min ago',
      status: 'verified',
      severity: 'critical',
      evidence: 5,
      description: 'Strong rip current forming near the main swimming area. Lifeguards on scene.',
      submitter: 'Beach Patrol',
      confidence: 95
    },
    {
      id: 3,
      title: 'Marine Debris Accumulation',
      location: 'Kovalam Beach, Kerala',
      time: '1 hour ago',
      status: 'rejected',
      severity: 'low',
      evidence: 2,
      description: 'Large amount of plastic debris washed ashore.',
      submitter: 'Tourist',
      confidence: 45
    }
  ];

  const socialMediaPosts = [
    {
      id: 1,
      platform: 'Twitter',
      content: '🌊 Huge waves at #GoaBeach today! Be careful if you\'re planning to swim. #OceanSafety',
      author: '@beachgoer_goa',
      time: '5 min ago',
      engagement: { likes: 23, retweets: 8, replies: 4 },
      relevanceScore: 92,
      status: 'relevant',
      location: 'Goa Beach',
      verified: true
    },
    {
      id: 2,
      platform: 'Instagram',
      content: 'Beautiful sunset but noticed some strong currents near the pier. Stay safe everyone! 📸',
      author: '@mumbai_photographer',
      time: '18 min ago',
      engagement: { likes: 156, comments: 12, shares: 3 },
      relevanceScore: 78,
      status: 'pending',
      location: 'Mumbai Coastline',
      verified: false
    },
    {
      id: 3,
      platform: 'Facebook',
      content: 'Weather alert: High winds expected tomorrow morning along Chennai coast.',
      author: 'Chennai Weather Updates',
      time: '45 min ago',
      engagement: { likes: 89, comments: 15, shares: 23 },
      relevanceScore: 88,
      status: 'relevant',
      location: 'Chennai Coast',
      verified: true
    }
  ];

  const verifiedContent = [
    {
      id: 1,
      title: 'Storm Surge Warning Issued',
      source: 'Indian Meteorological Department',
      time: '2 hours ago',
      severity: 'critical',
      location: 'Odisha Coast',
      verification: 'Official',
      action: 'Beach closures implemented'
    },
    {
      id: 2,
      title: 'High Tide Advisory',
      source: 'Coast Guard Operations',
      time: '4 hours ago',
      severity: 'moderate',
      location: 'Kerala Backwaters',
      verification: 'Confirmed',
      action: 'Monitoring increased'
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'verified': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      case 'relevant': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'low': return 'text-green-600';
      case 'moderate': return 'text-yellow-600';
      case 'high': return 'text-orange-600';
      case 'critical': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const filteredReports = userReports.filter(report => {
    if (filter === 'all') return true;
    return report.status === filter;
  }).filter(report => 
    report.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    report.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredSocialMedia = socialMediaPosts.filter(post => {
    if (filter === 'all') return true;
    return post.status === filter;
  }).filter(post => 
    post.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4 flex items-center justify-center">
            <Shield className="h-10 w-10 mr-4 text-primary-600" />
            Verification Center
          </h1>
          <p className="text-lg text-gray-600">
            AI-powered verification of hazard reports and social media content
          </p>
        </motion.div>

        {/* Stats Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8"
        >
          {[
            { label: 'Reports Processed', value: '2,847', icon: CheckCircle2, color: 'blue' },
            { label: 'Accuracy Rate', value: '94.2%', icon: TrendingUp, color: 'green' },
            { label: 'Pending Review', value: '23', icon: Clock, color: 'yellow' },
            { label: 'AI Confidence', value: '89%', icon: Zap, color: 'purple' }
          ].map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={stat.label} className="card text-center">
                <div className={`inline-flex p-3 rounded-lg bg-${stat.color}-100 mb-4`}>
                  <Icon className={`h-6 w-6 text-${stat.color}-600`} />
                </div>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                <p className="text-sm text-gray-600">{stat.label}</p>
              </div>
            );
          })}
        </motion.div>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="mb-8"
        >
          <div className="flex space-x-1 bg-gray-100 rounded-lg p-1">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-md font-medium transition-all duration-200 ${
                    activeTab === tab.id
                      ? 'bg-white text-primary-600 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* Filters and Search */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 mb-8"
        >
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search reports or content..."
                className="pl-10 input-field"
              />
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Filter className="h-4 w-4 text-gray-500" />
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="input-field w-48"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="verified">Verified</option>
              <option value="rejected">Rejected</option>
              <option value="relevant">Relevant</option>
            </select>
          </div>
        </motion.div>

        {/* Content Sections */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          {/* User Reports Tab */}
          {activeTab === 'reports' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">User-Submitted Reports</h2>
              {filteredReports.map((report) => (
                <div key={report.id} className="card hover:shadow-lg transition-shadow duration-200">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-lg font-bold text-gray-900">{report.title}</h3>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(report.status)}`}>
                          {report.status.charAt(0).toUpperCase() + report.status.slice(1)}
                        </span>
                        <span className={`text-sm font-medium ${getSeverityColor(report.severity)}`}>
                          {report.severity.charAt(0).toUpperCase() + report.severity.slice(1)} Risk
                        </span>
                      </div>
                      <p className="text-gray-600 mb-3">{report.description}</p>
                      <div className="flex items-center space-x-6 text-sm text-gray-500">
                        <span>📍 {report.location}</span>
                        <span>⏰ {report.time}</span>
                        <span>👤 {report.submitter}</span>
                        <span>📎 {report.evidence} evidence files</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-primary-600 mb-1">
                        {report.confidence}%
                      </div>
                      <p className="text-xs text-gray-500">AI Confidence</p>
                      <div className="flex space-x-2 mt-3">
                        <button className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors duration-200">
                          <ThumbsUp className="h-4 w-4" />
                        </button>
                        <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200">
                          <ThumbsDown className="h-4 w-4" />
                        </button>
                        <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200">
                          <Eye className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Social Media Tab */}
          {activeTab === 'social' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900">Social Media Monitoring</h2>
                <div className="text-sm text-gray-500">
                  AI processes 10,000+ posts daily
                </div>
              </div>
              {filteredSocialMedia.map((post) => (
                <div key={post.id} className="card hover:shadow-lg transition-shadow duration-200">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                        post.platform === 'Twitter' ? 'bg-blue-100 text-blue-600' :
                        post.platform === 'Instagram' ? 'bg-purple-100 text-purple-600' :
                        'bg-blue-100 text-blue-600'
                      }`}>
                        <MessageSquare className="h-6 w-6" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <span className="font-medium text-gray-900">{post.platform}</span>
                        <span className="text-gray-600">@{post.author.replace('@', '')}</span>
                        <span className="text-sm text-gray-500">{post.time}</span>
                        {post.verified && (
                          <CheckCircle2 className="h-4 w-4 text-blue-500" />
                        )}
                      </div>
                      <p className="text-gray-800 mb-3">{post.content}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-6 text-sm text-gray-500">
                          <span>📍 {post.location}</span>
                          <span>💬 {Object.values(post.engagement).reduce((a, b) => a + b, 0)} interactions</span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <div className="text-right">
                            <div className="text-lg font-bold text-primary-600">
                              {post.relevanceScore}%
                            </div>
                            <p className="text-xs text-gray-500">Relevance</p>
                          </div>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(post.status)}`}>
                            {post.status.charAt(0).toUpperCase() + post.status.slice(1)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Verified Content Tab */}
          {activeTab === 'verified' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Verified Official Content</h2>
              {verifiedContent.map((content) => (
                <div key={content.id} className="card border-l-4 border-l-green-500 hover:shadow-lg transition-shadow duration-200">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-lg font-bold text-gray-900">{content.title}</h3>
                        <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          {content.verification}
                        </span>
                        <span className={`text-sm font-medium ${getSeverityColor(content.severity)}`}>
                          {content.severity.charAt(0).toUpperCase() + content.severity.slice(1)}
                        </span>
                      </div>
                      <div className="flex items-center space-x-6 text-sm text-gray-500 mb-3">
                        <span>🏛️ {content.source}</span>
                        <span>📍 {content.location}</span>
                        <span>⏰ {content.time}</span>
                      </div>
                      <p className="text-blue-700 font-medium">Action Taken: {content.action}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle2 className="h-8 w-8 text-green-500" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </motion.div>

        {/* ML Processing Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0, duration: 0.6 }}
          className="mt-12 card bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-200"
        >
          <div className="text-center">
            <Zap className="h-12 w-12 text-purple-600 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-2">AI-Powered Selective Ingestion</h3>
            <p className="text-gray-600 mb-4">
              Our advanced NLP and ML algorithms analyze thousands of social media posts and reports daily,
              filtering for ocean safety relevance with 94.2% accuracy.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">10,000+</div>
                <p className="text-sm text-gray-600">Posts Analyzed Daily</p>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">94.2%</div>
                <p className="text-sm text-gray-600">Accuracy Rate</p>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">12 sec</div>
                <p className="text-sm text-gray-600">Average Processing Time</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Verification;
