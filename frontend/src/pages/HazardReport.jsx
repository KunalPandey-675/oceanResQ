import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useDropzone } from 'react-dropzone';
import { 
  MapPin, 
  AlertTriangle, 
  Camera, 
  Upload, 
  Phone, 
  Mail, 
  User, 
  FileText,
  Loader,
  CheckCircle,
  X,
  Navigation
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { reportsAPI, handleApiError } from '../services/api';
import toast from 'react-hot-toast';

const HazardReport = () => {
  const { t } = useLanguage();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [locationLoading, setLocationLoading] = useState(false);
  const [formData, setFormData] = useState({
    lat: '',
    lng: '',
    locationDetails: '',
    hazardType: '',
    severity: '',
    description: '',
    contactName: '',
    contactPhone: '',
    contactEmail: '',
    evidence: []
  });

  const hazardTypes = [
    'Rip Current',
    'Storm Surge',
    'High Waves',
    'Marine Debris',
    'Weather Events',
    'Tsunami',
    'Coastal Erosion',
    'Other'
  ];

  const severityLevels = [
    { value: 'Low Risk', label: 'Low Risk', color: 'green' },
    { value: 'Moderate Risk', label: 'Moderate Risk', color: 'yellow' },
    { value: 'High Risk', label: 'High Risk', color: 'orange' },
    { value: 'Critical Emergency', label: 'Critical Emergency', color: 'red' }
  ];

  const emergencyNumbers = [
    { country: 'USA', number: '911', flag: '🇺🇸' },
    { country: 'India', number: '112', flag: '🇮🇳' },
    { country: 'Coast Guard', number: '1-800-424-8802', flag: '🌊' }
  ];

  const getCurrentLocation = () => {
    setLocationLoading(true);
    
    if (!navigator.geolocation) {
      toast.error('Geolocation is not supported by this browser');
      setLocationLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setCurrentLocation({ lat: latitude, lng: longitude });
        setFormData(prev => ({
          ...prev,
          lat: latitude.toString(),
          lng: longitude.toString()
        }));
        setLocationLoading(false);
        toast.success('Location detected successfully');
      },
      (error) => {
        console.error('Geolocation error:', error);
        toast.error('Unable to get your location. Please enter manually.');
        setLocationLoading(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 300000 // 5 minutes
      }
    );
  };

  const onDrop = (acceptedFiles) => {
    const newFiles = acceptedFiles.filter(file => {
      // Check file size (10MB limit)
      if (file.size > 10 * 1024 * 1024) {
        toast.error(`File ${file.name} is too large. Maximum size is 10MB.`);
        return false;
      }
      return true;
    });

    setFormData(prev => ({
      ...prev,
      evidence: [...prev.evidence, ...newFiles].slice(0, 5) // Limit to 5 files
    }));

    if (newFiles.length > 0) {
      toast.success(`${newFiles.length} file(s) added`);
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.gif'],
      'video/*': ['.mp4', '.avi', '.mov'],
      'application/pdf': ['.pdf'],
      'application/msword': ['.doc'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx']
    },
    maxFiles: 5
  });

  const removeFile = (index) => {
    setFormData(prev => ({
      ...prev,
      evidence: prev.evidence.filter((_, i) => i !== index)
    }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateForm = () => {
    const required = ['lat', 'lng', 'locationDetails', 'hazardType', 'severity', 'description'];
    const missing = required.filter(field => !formData[field]);
    
    if (missing.length > 0) {
      toast.error('Please fill in all required fields');
      return false;
    }

    // Validate coordinates
    const lat = parseFloat(formData.lat);
    const lng = parseFloat(formData.lng);
    
    if (isNaN(lat) || isNaN(lng) || lat < -90 || lat > 90 || lng < -180 || lng > 180) {
      toast.error('Please provide valid coordinates');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsSubmitting(true);
    
    try {
      const response = await reportsAPI.create(formData);
      
      toast.success('Hazard report submitted successfully!');
      
      // Reset form
      setFormData({
        lat: '',
        lng: '',
        locationDetails: '',
        hazardType: '',
        severity: '',
        description: '',
        contactName: '',
        contactPhone: '',
        contactEmail: '',
        evidence: []
      });
      setCurrentLocation(null);
      
      // Show confirmation
      setTimeout(() => {
        toast.success(`Report ID: ${response.data.reportId}`);
      }, 1000);
      
    } catch (error) {
      const errorInfo = handleApiError(error);
      toast.error(errorInfo.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    // Auto-detect location on page load
    getCurrentLocation();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-red-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {t('report.title')}
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {t('report.subtitle')}
          </p>
        </motion.div>

        {/* Emergency Alert */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl p-6 mb-8 shadow-lg"
        >
          <div className="flex items-start space-x-4">
            <AlertTriangle className="h-6 w-6 flex-shrink-0 mt-1" />
            <div className="flex-1">
              <h3 className="font-bold text-lg mb-2">{t('report.emergency')}</h3>
              <p className="mb-4">{t('report.emergencyText')}</p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {emergencyNumbers.map((emergency) => (
                  <a
                    key={emergency.number}
                    href={`tel:${emergency.number}`}
                    className="flex items-center space-x-2 bg-white/20 rounded-lg p-3 hover:bg-white/30 transition-colors duration-200"
                  >
                    <span className="text-2xl">{emergency.flag}</span>
                    <div>
                      <div className="font-bold">{emergency.number}</div>
                      <div className="text-sm opacity-90">{emergency.country}</div>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Report Form */}
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          onSubmit={handleSubmit}
          className="space-y-8"
        >
          {/* Location Information */}
          <div className="card">
            <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
              <MapPin className="h-5 w-5 mr-2 text-primary-600" />
              {t('report.locationInfo')}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Latitude *
                </label>
                <input
                  type="number"
                  name="lat"
                  step="any"
                  value={formData.lat}
                  onChange={handleInputChange}
                  placeholder="28.6175, 77.0951"
                  className="input-field"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Longitude *
                </label>
                <input
                  type="number"
                  name="lng"
                  step="any"
                  value={formData.lng}
                  onChange={handleInputChange}
                  placeholder="28.6175, 77.0951"
                  className="input-field"
                  required
                />
              </div>
            </div>

            <div className="mt-4">
              <button
                type="button"
                onClick={getCurrentLocation}
                disabled={locationLoading}
                className="btn-secondary flex items-center space-x-2"
              >
                {locationLoading ? (
                  <Loader className="h-4 w-4 animate-spin" />
                ) : (
                  <Navigation className="h-4 w-4" />
                )}
                <span>
                  {locationLoading ? 'Detecting...' : t('report.currentLocation')}
                </span>
              </button>
            </div>

            <div className="mt-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('report.additionalDetails')} *
              </label>
              <input
                type="text"
                name="locationDetails"
                value={formData.locationDetails}
                onChange={handleInputChange}
                placeholder="Marina Beach, Chennai or Pier 39, San Francisco"
                className="input-field"
                required
              />
            </div>
          </div>

          {/* Hazard Information */}
          <div className="card">
            <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
              <AlertTriangle className="h-5 w-5 mr-2 text-orange-600" />
              {t('report.hazardInfo')}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('report.hazardType')} *
                </label>
                <select
                  name="hazardType"
                  value={formData.hazardType}
                  onChange={handleInputChange}
                  className="input-field"
                  required
                >
                  <option value="">Select hazard type...</option>
                  {hazardTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('report.severityLevel')} *
                </label>
                <select
                  name="severity"
                  value={formData.severity}
                  onChange={handleInputChange}
                  className="input-field"
                  required
                >
                  <option value="">Select severity level...</option>
                  {severityLevels.map((level) => (
                    <option key={level.value} value={level.value}>
                      {level.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="mt-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('report.detailedDescription')} *
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows={4}
                placeholder="Describe the hazard, current conditions, and any immediate threats or observations..."
                className="input-field resize-none"
                maxLength={1000}
                required
              />
              <div className="text-right text-sm text-gray-500 mt-1">
                {formData.description.length}/1000 characters
              </div>
            </div>
          </div>

          {/* Supporting Evidence */}
          <div className="card">
            <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
              <Camera className="h-5 w-5 mr-2 text-green-600" />
              {t('report.supportingEvidence')}
            </h2>

            <div
              {...getRootProps()}
              className={`border-2 border-dashed rounded-xl p-8 text-center transition-colors duration-200 cursor-pointer ${
                isDragActive
                  ? 'border-primary-500 bg-primary-50'
                  : 'border-gray-300 hover:border-primary-400 hover:bg-gray-50'
              }`}
            >
              <input {...getInputProps()} />
              <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-lg font-medium text-gray-700 mb-2">
                {isDragActive
                  ? 'Drop files here...'
                  : 'Drag & drop files here, or click to browse'
                }
              </p>
              <p className="text-sm text-gray-500">
                Photos, videos, documents (Max 5 files, 10MB each)
              </p>
            </div>

            {formData.evidence.length > 0 && (
              <div className="mt-6 space-y-3">
                <h3 className="font-medium text-gray-900">Uploaded Files:</h3>
                {formData.evidence.map((file, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <FileText className="h-5 w-5 text-gray-500" />
                      <div>
                        <p className="font-medium text-gray-900">{file.name}</p>
                        <p className="text-sm text-gray-500">
                          {(file.size / 1024 / 1024).toFixed(2)} MB
                        </p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeFile(index)}
                      className="p-1 text-red-500 hover:text-red-700 transition-colors duration-200"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Contact Information */}
          <div className="card">
            <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
              <User className="h-5 w-5 mr-2 text-blue-600" />
              {t('report.contactInfo')}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('report.yourName')}
                </label>
                <input
                  type="text"
                  name="contactName"
                  value={formData.contactName}
                  onChange={handleInputChange}
                  placeholder="John Doe"
                  className="input-field"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('report.phoneNumber')}
                </label>
                <input
                  type="tel"
                  name="contactPhone"
                  value={formData.contactPhone}
                  onChange={handleInputChange}
                  placeholder="+1 (555) 123-4567"
                  className="input-field"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('report.emailAddress')}
                </label>
                <input
                  type="email"
                  name="contactEmail"
                  value={formData.contactEmail}
                  onChange={handleInputChange}
                  placeholder="john@example.com"
                  className="input-field"
                />
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="text-center">
            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-primary text-lg px-12 py-4 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <div className="flex items-center space-x-2">
                  <Loader className="h-5 w-5 animate-spin" />
                  <span>Submitting Report...</span>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5" />
                  <span>{t('report.submit')}</span>
                </div>
              )}
            </button>
          </div>
        </motion.form>
      </div>
    </div>
  );
};

export default HazardReport;
