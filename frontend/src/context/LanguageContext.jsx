import React, { createContext, useContext, useState } from 'react';

const LanguageContext = createContext();

const translations = {
  en: {
    // Navigation
    nav: {
      home: 'Home',
      dashboard: 'Dashboard',
      alerts: 'ChatBot Alerts',
      verification: 'Verification',
      multilingual: 'Multilingual',
      report: 'Report Hazard',
    },
    // Landing Page
    landing: {
      title: 'ResQ',
      subtitle: 'Integrated Platform for Crowdsourced Ocean Hazard Reporting',
      description: 'Real-time monitoring and analysis of ocean hazards through community reporting and social media analytics',
      getStarted: 'Get Started',
      learnMore: 'Learn More',
      features: {
        dashboard: {
          title: 'Web Dashboard',
          description: 'Comprehensive view of ocean safety data and analytics'
        },
        chatbot: {
          title: 'ChatBot Alerts',
          description: 'Real-time alerts from social media and messaging platforms'
        },
        verification: {
          title: 'Verification',
          description: 'AI-powered verification of hazard reports and social content'
        },
        multilingual: {
          title: 'Multilingual Support',
          description: 'Support for multiple languages to serve global communities'
        }
      }
    },
    // Dashboard
    dashboard: {
      title: 'Ocean Safety Dashboard',
      subtitle: 'Real-time monitoring and analysis of ocean hazards',
      totalReports: 'Total Reports',
      activeIncidents: 'Active Incidents',
      resolvedToday: 'Resolved Today',
      avgResponseTime: 'Avg Response Time',
      recentReports: 'Recent Reports',
      hazardAnalytics: 'Hazard Analytics',
      systemStatus: 'System Status',
      refreshData: 'Refresh Data'
    },
    // Hazard Report
    report: {
      title: 'Submit Ocean Hazard Report',
      subtitle: 'Help protect your community by reporting ocean hazards and safety concerns',
      locationInfo: 'Location Information',
      currentLocation: 'Current Location',
      additionalDetails: 'Additional location details (beach name, landmarks, etc.)',
      hazardInfo: 'Hazard Information',
      hazardType: 'Hazard Type',
      severityLevel: 'Severity Level',
      detailedDescription: 'Detailed Description',
      supportingEvidence: 'Supporting Evidence',
      takePhoto: 'Take Photo',
      uploadFiles: 'Upload Files',
      contactInfo: 'Contact Information (Optional)',
      yourName: 'Your name',
      phoneNumber: 'Phone number',
      emailAddress: 'Email address',
      emergency: 'Emergency Situation?',
      emergencyText: 'If this is a life-threatening emergency, call emergency services immediately:',
      submit: 'Submit Hazard Report'
    },
    // Common
    common: {
      loading: 'Loading...',
      error: 'Error',
      success: 'Success',
      cancel: 'Cancel',
      confirm: 'Confirm',
      delete: 'Delete',
      edit: 'Edit',
      save: 'Save',
      close: 'Close',
      back: 'Back',
      next: 'Next',
      previous: 'Previous',
      search: 'Search',
      filter: 'Filter',
      sort: 'Sort',
      export: 'Export',
      import: 'Import',
      refresh: 'Refresh'
    }
  },
  hi: {
    // Navigation
    nav: {
      home: 'होम',
      dashboard: 'डैशबोर्ड',
      alerts: 'चैटबॉट अलर्ट',
      verification: 'सत्यापन',
      multilingual: 'बहुभाषी',
      report: 'खतरा रिपोर्ट करें',
    },
    // Landing Page
    landing: {
      title: 'ResQ',
      subtitle: 'समुद्री खतरा रिपोर्टिंग और सोशल मीडिया एनालिटिक्स का एकीकृत प्लेटफॉर्म',
      description: 'सामुदायिक रिपोर्टिंग और सोशल मीडिया एनालिटिक्स के माध्यम से समुद्री खतरों की रीयल-टाइम निगरानी और विश्लेषण',
      getStarted: 'शुरू करें',
      learnMore: 'और जानें',
      features: {
        dashboard: {
          title: 'वेब डैशबोर्ड',
          description: 'समुद्री सुरक्षा डेटा और एनालिटिक्स का व्यापक दृश्य'
        },
        chatbot: {
          title: 'चैटबॉट अलर्ट',
          description: 'सोशल मीडिया और मैसेजिंग प्लेटफॉर्म से रीयल-टाइम अलर्ट'
        },
        verification: {
          title: 'सत्यापन',
          description: 'खतरा रिपोर्ट और सामाजिक सामग्री का AI-संचालित सत्यापन'
        },
        multilingual: {
          title: 'बहुभाषी समर्थन',
          description: 'वैश्विक समुदायों की सेवा के लिए कई भाषाओं का समर्थन'
        }
      }
    },
    // Dashboard
    dashboard: {
      title: 'समुद्री सुरक्षा डैशबोर्ड',
      subtitle: 'समुद्री खतरों की रीयल-टाइम निगरानी और विश्लेषण',
      totalReports: 'कुल रिपोर्ट',
      activeIncidents: 'सक्रिय घटनाएं',
      resolvedToday: 'आज हल किए गए',
      avgResponseTime: 'औसत प्रतिक्रिया समय',
      recentReports: 'हाल की रिपोर्ट',
      hazardAnalytics: 'खतरा विश्लेषण',
      systemStatus: 'सिस्टम स्थिति',
      refreshData: 'डेटा रीफ्रेश करें'
    },
    // Hazard Report
    report: {
      title: 'समुद्री खतरा रिपोर्ट जमा करें',
      subtitle: 'समुद्री खतरों और सुरक्षा चिंताओं की रिपोर्ट करके अपने समुदाय की सुरक्षा में मदद करें',
      locationInfo: 'स्थान की जानकारी',
      currentLocation: 'वर्तमान स्थान',
      additionalDetails: 'अतिरिक्त स्थान विवरण (समुद्र तट का नाम, स्थलचिह्न, आदि)',
      hazardInfo: 'खतरा जानकारी',
      hazardType: 'खतरा प्रकार',
      severityLevel: 'गंभीरता स्तर',
      detailedDescription: 'विस्तृत विवरण',
      supportingEvidence: 'सहायक साक्ष्य',
      takePhoto: 'फोटो लें',
      uploadFiles: 'फ़ाइलें अपलोड करें',
      contactInfo: 'संपर्क जानकारी (वैकल्पिक)',
      yourName: 'आपका नाम',
      phoneNumber: 'फोन नंबर',
      emailAddress: 'ईमेल पता',
      emergency: 'आपातकालीन स्थिति?',
      emergencyText: 'यदि यह जीवन-घातक आपातकाल है, तो तुरंत आपातकालीन सेवाओं को कॉल करें:',
      submit: 'खतरा रिपोर्ट जमा करें'
    },
    // Common
    common: {
      loading: 'लोड हो रहा है...',
      error: 'त्रुटि',
      success: 'सफलता',
      cancel: 'रद्द करें',
      confirm: 'पुष्टि करें',
      delete: 'हटाएं',
      edit: 'संपादित करें',
      save: 'सहेजें',
      close: 'बंद करें',
      back: 'वापस',
      next: 'अगला',
      previous: 'पिछला',
      search: 'खोजें',
      filter: 'फ़िल्टर',
      sort: 'क्रमबद्ध करें',
      export: 'निर्यात',
      import: 'आयात',
      refresh: 'रीफ्रेश'
    }
  }
};

export const LanguageProvider = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState('en');

  const t = (key) => {
    const keys = key.split('.');
    let value = translations[currentLanguage];
    
    for (const k of keys) {
      value = value?.[k];
    }
    
    return value || key;
  };

  const switchLanguage = (lang) => {
    if (translations[lang]) {
      setCurrentLanguage(lang);
    }
  };

  const value = {
    currentLanguage,
    switchLanguage,
    t,
    availableLanguages: Object.keys(translations)
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
