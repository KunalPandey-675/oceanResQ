const express = require('express');
const router = express.Router();
const HazardReport = require('../models/HazardReport');
const multer = require('multer');
const path = require('path');

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ 
  storage: storage,
  limits: {
    fileSize: 10 * 1024 * 1024 // 10MB limit
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif|pdf|doc|docx/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);
    
    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error('Invalid file type'));
    }
  }
});

// GET /api/reports - Get all reports with pagination and filtering
router.get('/', async (req, res) => {
  try {
    const { 
      page = 1, 
      limit = 10, 
      status, 
      severity, 
      hazardType,
      sortBy = 'createdAt',
      sortOrder = 'desc'
    } = req.query;

    const query = {};
    if (status) query.status = status;
    if (severity) query.severity = severity;
    if (hazardType) query.hazardType = hazardType;

    const sortOptions = {};
    sortOptions[sortBy] = sortOrder === 'desc' ? -1 : 1;

    const reports = await HazardReport.find(query)
      .sort(sortOptions)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .select('-__v');

    const total = await HazardReport.countDocuments(query);

    res.json({
      reports,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET /api/reports/recent - Get recent reports for dashboard
router.get('/recent', async (req, res) => {
  try {
    const recentReports = await HazardReport.find()
      .sort({ createdAt: -1 })
      .limit(10)
      .select('hazardType severity location.details status createdAt');

    res.json(recentReports);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET /api/reports/:id - Get single report
router.get('/:id', async (req, res) => {
  try {
    const report = await HazardReport.findById(req.params.id);
    if (!report) {
      return res.status(404).json({ message: 'Report not found' });
    }
    res.json(report);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST /api/reports - Create new report
router.post('/', upload.array('evidence', 5), async (req, res) => {
  try {
    const reportData = {
      location: {
        lat: parseFloat(req.body.lat),
        lng: parseFloat(req.body.lng),
        details: req.body.locationDetails
      },
      hazardType: req.body.hazardType,
      severity: req.body.severity,
      description: req.body.description,
      contact: {
        name: req.body.contactName,
        phone: req.body.contactPhone,
        email: req.body.contactEmail
      }
    };

    // Handle file uploads
    if (req.files && req.files.length > 0) {
      reportData.evidence = req.files.map(file => ({
        filename: file.filename,
        originalName: file.originalname,
        mimetype: file.mimetype,
        size: file.size,
        url: `/uploads/${file.filename}`
      }));
    }

    const report = new HazardReport(reportData);
    await report.save();

    res.status(201).json({ 
      message: 'Report submitted successfully', 
      reportId: report._id,
      report: report
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// PUT /api/reports/:id - Update report status
router.put('/:id', async (req, res) => {
  try {
    const allowedUpdates = ['status', 'assignedTo', 'verified', 'verifiedBy'];
    const updates = Object.keys(req.body)
      .filter(key => allowedUpdates.includes(key))
      .reduce((obj, key) => {
        obj[key] = req.body[key];
        return obj;
      }, {});

    if (updates.verified && !updates.verifiedBy) {
      updates.verifiedAt = new Date();
    }

    const report = await HazardReport.findByIdAndUpdate(
      req.params.id,
      updates,
      { new: true, runValidators: true }
    );

    if (!report) {
      return res.status(404).json({ message: 'Report not found' });
    }

    res.json({ message: 'Report updated successfully', report });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE /api/reports/:id - Delete report
router.delete('/:id', async (req, res) => {
  try {
    const report = await HazardReport.findByIdAndDelete(req.params.id);
    if (!report) {
      return res.status(404).json({ message: 'Report not found' });
    }
    res.json({ message: 'Report deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET /api/reports/location/nearby - Get reports near a location
router.get('/location/nearby', async (req, res) => {
  try {
    const { lat, lng, radius = 10 } = req.query; // radius in km
    
    const reports = await HazardReport.find({
      location: {
        $near: {
          $geometry: {
            type: 'Point',
            coordinates: [parseFloat(lng), parseFloat(lat)]
          },
          $maxDistance: radius * 1000 // Convert km to meters
        }
      }
    }).limit(20);

    res.json(reports);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
