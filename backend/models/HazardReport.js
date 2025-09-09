const mongoose = require('mongoose');

const hazardReportSchema = new mongoose.Schema({
  location: {
    lat: { type: Number, required: true },
    lng: { type: Number, required: true },
    details: { type: String, required: true }
  },
  hazardType: {
    type: String,
    required: true,
    enum: ['Rip Current', 'Storm Surge', 'High Waves', 'Marine Debris', 'Weather Events', 'Tsunami', 'Coastal Erosion', 'Other']
  },
  severity: {
    type: String,
    required: true,
    enum: ['Low Risk', 'Moderate Risk', 'High Risk', 'Critical Emergency']
  },
  description: {
    type: String,
    required: true,
    maxlength: 1000
  },
  evidence: [{
    filename: String,
    originalName: String,
    mimetype: String,
    size: Number,
    url: String
  }],
  contact: {
    name: { type: String, maxlength: 100 },
    phone: { type: String, maxlength: 20 },
    email: { type: String, maxlength: 100 }
  },
  status: {
    type: String,
    enum: ['Active', 'Under Review', 'Resolved', 'Closed'],
    default: 'Active'
  },
  priority: {
    type: Number,
    min: 1,
    max: 5,
    default: function() {
      const severityMap = {
        'Low Risk': 1,
        'Moderate Risk': 2,
        'High Risk': 4,
        'Critical Emergency': 5
      };
      return severityMap[this.severity] || 2;
    }
  },
  assignedTo: {
    type: String,
    default: null
  },
  resolvedAt: {
    type: Date,
    default: null
  },
  responseTime: {
    type: Number, // in minutes
    default: null
  },
  source: {
    type: String,
    enum: ['Web Form', 'Social Media', 'API', 'Mobile App'],
    default: 'Web Form'
  },
  verified: {
    type: Boolean,
    default: false
  },
  verifiedBy: {
    type: String,
    default: null
  },
  verifiedAt: {
    type: Date,
    default: null
  }
}, {
  timestamps: true
});

// Indexes for better query performance
hazardReportSchema.index({ location: '2dsphere' });
hazardReportSchema.index({ hazardType: 1, severity: 1 });
hazardReportSchema.index({ status: 1 });
hazardReportSchema.index({ createdAt: -1 });

// Virtual for response time calculation
hazardReportSchema.virtual('actualResponseTime').get(function() {
  if (this.resolvedAt && this.createdAt) {
    return Math.round((this.resolvedAt - this.createdAt) / (1000 * 60)); // in minutes
  }
  return null;
});

// Pre-save middleware to calculate response time
hazardReportSchema.pre('save', function(next) {
  if (this.isModified('status') && this.status === 'Resolved' && !this.resolvedAt) {
    this.resolvedAt = new Date();
    this.responseTime = Math.round((this.resolvedAt - this.createdAt) / (1000 * 60));
  }
  next();
});

module.exports = mongoose.model('HazardReport', hazardReportSchema);
