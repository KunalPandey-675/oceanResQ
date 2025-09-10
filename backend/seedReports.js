const mongoose = require('mongoose');
const HazardReport = require('./models/HazardReport');

// MongoDB connection
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/oceanresq', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB for seeding');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

// Sample report data for map testing
const sampleReports = [
  {
    location: {
      lat: 19.0760,
      lng: 72.8777,
      details: "Marine Drive, Mumbai, Maharashtra, India"
    },
    hazardType: "High Waves",
    severity: "High Risk",
    description: "Extremely high waves observed near Marine Drive. Strong undertow currents detected. Public advised to avoid water activities.",
    status: "Active",
    contact: {
      name: "Coastal Guard Mumbai",
      phone: "+91-22-1234567",
      email: "guard.mumbai@coastguard.gov.in"
    },
    verified: true,
    verifiedBy: "Mumbai Coastal Authority"
  },
  {
    location: {
      lat: 15.2993,
      lng: 74.1240,
      details: "Calangute Beach, Goa, India"
    },
    hazardType: "Rip Current",
    severity: "Critical Emergency",
    description: "Dangerous rip current spotted at Calangute Beach. Several rescue operations ongoing. Beach temporarily closed to swimmers.",
    status: "Active",
    contact: {
      name: "Goa Lifeguard Service",
      phone: "+91-832-9876543",
      email: "lifeguard@goa.gov.in"
    },
    verified: true,
    verifiedBy: "Goa Tourism Department"
  },
  {
    location: {
      lat: 13.0827,
      lng: 80.2707,
      details: "Marina Beach, Chennai, Tamil Nadu, India"
    },
    hazardType: "Marine Debris",
    severity: "Moderate Risk",
    description: "Significant amount of plastic debris and fishing nets washed ashore. Cleanup operations in progress. Swimming not recommended.",
    status: "Under Review",
    contact: {
      name: "Chennai Municipal Corporation",
      phone: "+91-44-1234567",
      email: "marine@chennai.gov.in"
    },
    verified: false
  },
  {
    location: {
      lat: 11.9416,
      lng: 79.8083,
      details: "Promenade Beach, Puducherry, India"
    },
    hazardType: "Weather Events",
    severity: "Low Risk",
    description: "Light rain and mild winds expected. Sea conditions are generally calm. Normal precautions advised for water activities.",
    status: "Resolved",
    contact: {
      name: "Puducherry Port Authority",
      phone: "+91-413-1234567",
      email: "port@puducherry.gov.in"
    },
    verified: true,
    verifiedBy: "Puducherry Maritime Department"
  },
  {
    location: {
      lat: 8.0883,
      lng: 77.0644,
      details: "Kovalam Beach, Kerala, India"
    },
    hazardType: "Storm Surge",
    severity: "High Risk",
    description: "Storm surge warning issued for Kovalam Beach area. Water levels rising rapidly. Immediate evacuation of low-lying areas recommended.",
    status: "Active",
    contact: {
      name: "Kerala State Disaster Management",
      phone: "+91-471-9876543",
      email: "disaster@kerala.gov.in"
    },
    verified: true,
    verifiedBy: "Kerala Coastal Authority"
  },
  {
    location: {
      lat: 17.6868,
      lng: 83.2185,
      details: "Visakhapatnam Beach, Andhra Pradesh, India"
    },
    hazardType: "Coastal Erosion",
    severity: "Moderate Risk",
    description: "Ongoing coastal erosion observed along the shoreline. Infrastructure assessment in progress. Public access restricted in affected areas.",
    status: "Under Review",
    contact: {
      name: "Andhra Pradesh Coastal Management",
      phone: "+91-891-1234567",
      email: "coastal@ap.gov.in"
    },
    verified: false
  },
  {
    location: {
      lat: 21.2787,
      lng: 81.8661,
      details: "Raigarh Coast, Chhattisgarh, India"
    },
    hazardType: "Other",
    severity: "Low Risk",
    description: "Unusual fish behavior reported by local fishermen. Marine biology team investigating. No immediate threat to public safety.",
    status: "Closed",
    contact: {
      name: "Local Fishermen Association",
      phone: "+91-7762-123456",
      email: "fishermen@raigarh.org"
    },
    verified: true,
    verifiedBy: "Marine Research Institute"
  },
  {
    location: {
      lat: 20.2961,
      lng: 85.8245,
      details: "Puri Beach, Odisha, India"
    },
    hazardType: "High Waves",
    severity: "Moderate Risk",
    description: "Moderate to high wave activity at Puri Beach. Lifeguards on high alert. Swimmers advised to stay close to shore and follow safety guidelines.",
    status: "Active",
    contact: {
      name: "Puri Beach Management",
      phone: "+91-6752-123456",
      email: "beach@puri.gov.in"
    },
    verified: true,
    verifiedBy: "Odisha Coastal Police"
  }
];

const seedReports = async () => {
  try {
    await connectDB();
    
    // Clear existing reports (optional - remove this line if you want to keep existing data)
    console.log('Clearing existing reports...');
    await HazardReport.deleteMany({});
    
    // Insert sample reports
    console.log('Inserting sample reports...');
    const reports = await HazardReport.insertMany(sampleReports);
    
    console.log(`Successfully seeded ${reports.length} hazard reports:`);
    reports.forEach((report, index) => {
      console.log(`${index + 1}. ${report.hazardType} at ${report.location.details} (${report.severity})`);
    });
    
    console.log('\nDatabase seeding completed!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

// Run the seeder if this file is executed directly
if (require.main === module) {
  seedReports();
}

module.exports = { seedReports, sampleReports };
