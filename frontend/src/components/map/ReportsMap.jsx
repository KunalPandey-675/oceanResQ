import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { motion } from 'framer-motion';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { AlertTriangle, MapPin, Clock, Activity } from 'lucide-react';
import { reportsAPI, handleApiError } from '../../services/api';
import toast from 'react-hot-toast';

// Fix for default markers in React Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
});

// Custom icons for different severity levels
const createCustomIcon = (severity) => {
  const getIconColor = (severity) => {
    switch (severity) {
      case 'Low Risk': return '#10b981'; // green
      case 'Moderate Risk': return '#f59e0b'; // yellow
      case 'High Risk': return '#f97316'; // orange
      case 'Critical Emergency': return '#ef4444'; // red
      default: return '#6b7280'; // gray
    }
  };

  const getIconSize = (severity) => {
    switch (severity) {
      case 'Critical Emergency': return [35, 45];
      case 'High Risk': return [30, 40];
      case 'Moderate Risk': return [25, 35];
      case 'Low Risk': return [20, 30];
      default: return [25, 35];
    }
  };

  const color = getIconColor(severity);
  const size = getIconSize(severity);
  
  return L.divIcon({
    className: 'custom-marker',
    html: `
      <div style="
        background-color: ${color};
        width: ${size[0]}px;
        height: ${size[1]}px;
        border-radius: 50% 50% 50% 0;
        border: 3px solid white;
        transform: rotate(-45deg);
        box-shadow: 0 4px 8px rgba(0,0,0,0.3);
        display: flex;
        align-items: center;
        justify-content: center;
      ">
        <div style="
          transform: rotate(45deg);
          color: white;
          font-size: 12px;
          font-weight: bold;
        ">!</div>
      </div>
    `,
    iconSize: size,
    iconAnchor: [size[0] / 2, size[1]],
    popupAnchor: [0, -size[1] + 10],
  });
};

// Component to handle map updates
const MapUpdater = ({ center, zoom }) => {
  const map = useMap();
  
  useEffect(() => {
    if (center) {
      map.setView(center, zoom);
    }
  }, [center, zoom, map]);
  
  return null;
};

const ReportsMap = ({ reports: propReports, height = '500px', showControls = true }) => {
  const [reports, setReports] = useState(propReports || []);
  const [loading, setLoading] = useState(!propReports);
  const [selectedReport, setSelectedReport] = useState(null);
  const [mapCenter, setMapCenter] = useState([20.5937, 78.9629]); // Default to India
  const [mapZoom, setMapZoom] = useState(6);
  const [filters, setFilters] = useState({
    severity: '',
    status: '',
    hazardType: ''
  });

  // Fetch reports if not provided as props
  useEffect(() => {
    if (!propReports) {
      fetchReports();
    }
  }, [propReports, filters]);

  const fetchReports = async () => {
    try {
      setLoading(true);
      const response = await reportsAPI.getAll(filters);
      setReports(response.data.reports || []);
    } catch (error) {
      const errorInfo = handleApiError(error);
      toast.error(`Failed to fetch reports: ${errorInfo.message}`);
      console.error('Error fetching reports:', error);
    } finally {
      setLoading(false);
    }
  };

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'Low Risk': return 'bg-green-100 text-green-800 border-green-200';
      case 'Moderate Risk': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'High Risk': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'Critical Emergency': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active': return 'bg-red-100 text-red-800 border-red-200';
      case 'Under Review': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Resolved': return 'bg-green-100 text-green-800 border-green-200';
      case 'Closed': return 'bg-gray-100 text-gray-800 border-gray-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
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

  const handleMarkerClick = (report) => {
    setSelectedReport(report);
    setMapCenter([report.location.lat, report.location.lng]);
    setMapZoom(12);
  };

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  const clearFilters = () => {
    setFilters({
      severity: '',
      status: '',
      hazardType: ''
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-white rounded-xl shadow-lg overflow-hidden"
    >
      {/* Map Controls */}
      {showControls && (
        <div className="p-4 bg-gray-50 border-b">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center">
              <MapPin className="h-5 w-5 mr-2 text-primary-600" />
              Hazard Reports Map
            </h3>
            
            <div className="flex flex-wrap items-center gap-3">
              {/* Severity Filter */}
              <select
                value={filters.severity}
                onChange={(e) => handleFilterChange('severity', e.target.value)}
                className="px-3 py-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                <option value="">All Severities</option>
                <option value="Low Risk">Low Risk</option>
                <option value="Moderate Risk">Moderate Risk</option>
                <option value="High Risk">High Risk</option>
                <option value="Critical Emergency">Critical Emergency</option>
              </select>

              {/* Status Filter */}
              <select
                value={filters.status}
                onChange={(e) => handleFilterChange('status', e.target.value)}
                className="px-3 py-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                <option value="">All Statuses</option>
                <option value="Active">Active</option>
                <option value="Under Review">Under Review</option>
                <option value="Resolved">Resolved</option>
                <option value="Closed">Closed</option>
              </select>

              {/* Hazard Type Filter */}
              <select
                value={filters.hazardType}
                onChange={(e) => handleFilterChange('hazardType', e.target.value)}
                className="px-3 py-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                <option value="">All Types</option>
                <option value="Rip Current">Rip Current</option>
                <option value="Storm Surge">Storm Surge</option>
                <option value="High Waves">High Waves</option>
                <option value="Marine Debris">Marine Debris</option>
                <option value="Weather Events">Weather Events</option>
                <option value="Tsunami">Tsunami</option>
                <option value="Coastal Erosion">Coastal Erosion</option>
                <option value="Other">Other</option>
              </select>

              {/* Clear Filters */}
              <button
                onClick={clearFilters}
                className="px-3 py-1 text-sm bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors"
              >
                Clear
              </button>

              {/* Reports Count */}
              <span className="text-sm text-gray-500">
                {reports.length} report{reports.length !== 1 ? 's' : ''}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Map Container */}
      <div style={{ height }} className="relative">
        {loading ? (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100 z-10">
            <div className="text-center">
              <div className="w-8 h-8 border-4 border-primary-600 border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
              <p className="text-gray-600 text-sm">Loading reports...</p>
            </div>
          </div>
        ) : (
          <MapContainer
            center={mapCenter}
            zoom={mapZoom}
            style={{ height: '100%', width: '100%' }}
            className="z-0"
          >
            <MapUpdater center={mapCenter} zoom={mapZoom} />
            
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            
            {reports.map((report) => (
              <Marker
                key={report._id}
                position={[report.location.lat, report.location.lng]}
                icon={createCustomIcon(report.severity)}
                eventHandlers={{
                  click: () => handleMarkerClick(report),
                }}
              >
                <Popup className="custom-popup" maxWidth={300}>
                  <div className="p-2">
                    <div className="flex items-start justify-between mb-3">
                      <h4 className="font-semibold text-gray-900 text-sm">
                        {report.hazardType}
                      </h4>
                      <div className="flex items-center space-x-1 ml-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getSeverityColor(report.severity)}`}>
                          {report.severity.replace(' Risk', '').replace(' Emergency', '')}
                        </span>
                      </div>
                    </div>
                    
                    <div className="space-y-2 text-xs">
                      <div className="flex items-center text-gray-600">
                        <MapPin className="h-3 w-3 mr-1" />
                        <span className="truncate">{report.location.details}</span>
                      </div>
                      
                      <div className="flex items-center text-gray-600">
                        <Clock className="h-3 w-3 mr-1" />
                        <span>{formatTimeAgo(report.createdAt)}</span>
                      </div>
                      
                      <div className="flex items-center text-gray-600">
                        <Activity className="h-3 w-3 mr-1" />
                        <span className={`px-2 py-1 rounded-full font-medium border ${getStatusColor(report.status)}`}>
                          {report.status}
                        </span>
                      </div>
                    </div>
                    
                    {report.description && (
                      <div className="mt-3 pt-2 border-t border-gray-200">
                        <p className="text-xs text-gray-700 line-clamp-2">
                          {report.description}
                        </p>
                      </div>
                    )}
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        )}
      </div>

      {/* Map Legend */}
      <div className="p-4 bg-gray-50 border-t">
        <div className="flex flex-wrap items-center justify-between">
          <div className="flex items-center space-x-4">
            <span className="text-sm font-medium text-gray-700">Severity Levels:</span>
            <div className="flex items-center space-x-3">
              {[
                { level: 'Low Risk', color: '#10b981' },
                { level: 'Moderate Risk', color: '#f59e0b' },
                { level: 'High Risk', color: '#f97316' },
                { level: 'Critical Emergency', color: '#ef4444' }
              ].map(({ level, color }) => (
                <div key={level} className="flex items-center space-x-1">
                  <div
                    className="w-3 h-3 rounded-full border border-white shadow-sm"
                    style={{ backgroundColor: color }}
                  ></div>
                  <span className="text-xs text-gray-600">
                    {level.replace(' Risk', '').replace(' Emergency', '')}
                  </span>
                </div>
              ))}
            </div>
          </div>
          
          {selectedReport && (
            <button
              onClick={() => {
                setSelectedReport(null);
                setMapZoom(6);
                setMapCenter([20.5937, 78.9629]);
              }}
              className="text-sm text-primary-600 hover:text-primary-800 transition-colors"
            >
              Reset View
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ReportsMap;
