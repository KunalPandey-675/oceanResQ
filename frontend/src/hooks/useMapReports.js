import { useState, useEffect, useCallback } from 'react';
import { reportsAPI, handleApiError } from '../services/api';
import toast from 'react-hot-toast';

const useMapReports = (initialFilters = {}) => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    severity: '',
    status: '',
    hazardType: '',
    ...initialFilters
  });

  const fetchReports = useCallback(async (customFilters = filters) => {
    try {
      setLoading(true);
      setError(null);
      
      // Filter out empty values
      const cleanFilters = Object.entries(customFilters)
        .filter(([_, value]) => value !== '' && value !== null && value !== undefined)
        .reduce((obj, [key, value]) => {
          obj[key] = value;
          return obj;
        }, {});

      const response = await reportsAPI.getMapData(cleanFilters);
      
      if (response.data && response.data.reports) {
        setReports(response.data.reports);
      } else {
        setReports([]);
      }
    } catch (err) {
      const errorInfo = handleApiError(err);
      setError(errorInfo.message);
      toast.error(`Failed to fetch reports: ${errorInfo.message}`);
      console.error('Error fetching map reports:', err);
    } finally {
      setLoading(false);
    }
  }, [filters]);

  const fetchNearbyReports = useCallback(async (lat, lng, radius = 10) => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await reportsAPI.getNearby(lat, lng, radius);
      setReports(response.data || []);
    } catch (err) {
      const errorInfo = handleApiError(err);
      setError(errorInfo.message);
      toast.error(`Failed to fetch nearby reports: ${errorInfo.message}`);
      console.error('Error fetching nearby reports:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  const updateFilter = useCallback((filterType, value) => {
    setFilters(prev => {
      const newFilters = {
        ...prev,
        [filterType]: value
      };
      return newFilters;
    });
  }, []);

  const clearFilters = useCallback(() => {
    setFilters({
      severity: '',
      status: '',
      hazardType: ''
    });
  }, []);

  const refreshReports = useCallback(() => {
    fetchReports();
  }, [fetchReports]);

  // Fetch reports when filters change
  useEffect(() => {
    fetchReports();
  }, [fetchReports]);

  // Get summary statistics
  const getReportsSummary = useCallback(() => {
    const summary = {
      total: reports.length,
      bySeverity: {},
      byStatus: {},
      byHazardType: {}
    };

    reports.forEach(report => {
      // Count by severity
      summary.bySeverity[report.severity] = (summary.bySeverity[report.severity] || 0) + 1;
      
      // Count by status
      summary.byStatus[report.status] = (summary.byStatus[report.status] || 0) + 1;
      
      // Count by hazard type
      summary.byHazardType[report.hazardType] = (summary.byHazardType[report.hazardType] || 0) + 1;
    });

    return summary;
  }, [reports]);

  // Get reports within date range
  const getReportsInDateRange = useCallback((startDate, endDate) => {
    return reports.filter(report => {
      const reportDate = new Date(report.createdAt);
      return reportDate >= startDate && reportDate <= endDate;
    });
  }, [reports]);

  // Get reports by coordinates bounds
  const getReportsInBounds = useCallback((bounds) => {
    const { north, south, east, west } = bounds;
    return reports.filter(report => {
      const { lat, lng } = report.location;
      return lat >= south && lat <= north && lng >= west && lng <= east;
    });
  }, [reports]);

  return {
    reports,
    loading,
    error,
    filters,
    updateFilter,
    clearFilters,
    fetchReports,
    fetchNearbyReports,
    refreshReports,
    getReportsSummary,
    getReportsInDateRange,
    getReportsInBounds
  };
};

export default useMapReports;