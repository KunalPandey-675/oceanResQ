import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Globe, 
  Languages, 
  CheckCircle, 
  Users, 
  MessageSquare,
  ArrowRight,
  Volume2,
  Download,
  Settings,
  Flag
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const MultilingualSupport = () => {
  const { t, currentLanguage, switchLanguage, availableLanguages } = useLanguage();
  const [selectedLanguage, setSelectedLanguage] = useState(currentLanguage);

  const supportedLanguages = [
    { 
      code: 'en', 
      name: 'English', 
      nativeName: 'English', 
      flag: '🇺🇸', 
      speakers: '1.5B+',
      coverage: '100%',
      features: ['Voice', 'Text', 'Emergency']
    },
    { 
      code: 'hi', 
      name: 'Hindi', 
      nativeName: 'हिन्दी', 
      flag: '🇮🇳', 
      speakers: '600M+',
      coverage: '95%',
      features: ['Voice', 'Text', 'Emergency']
    },
    { 
      code: 'es', 
      name: 'Spanish', 
      nativeName: 'Español', 
      flag: '🇪🇸', 
      speakers: '500M+',
      coverage: '90%',
      features: ['Text', 'Emergency']
    },
    { 
      code: 'zh', 
      name: 'Chinese', 
      nativeName: '中文', 
      flag: '🇨🇳', 
      speakers: '1.1B+',
      coverage: '85%',
      features: ['Text', 'Emergency']
    },
    { 
      code: 'ar', 
      name: 'Arabic', 
      nativeName: 'العربية', 
      flag: '🇸🇦', 
      speakers: '400M+',
      coverage: '80%',
      features: ['Text', 'Emergency']
    },
    { 
      code: 'pt', 
      name: 'Portuguese', 
      nativeName: 'Português', 
      flag: '🇧🇷', 
      speakers: '260M+',
      coverage: '85%',
      features: ['Text', 'Emergency']
    },
    { 
      code: 'fr', 
      name: 'French', 
      nativeName: 'Français', 
      flag: '🇫🇷', 
      speakers: '280M+',
      coverage: '90%',
      features: ['Text', 'Emergency']
    },
    { 
      code: 'ja', 
      name: 'Japanese', 
      nativeName: '日本語', 
      flag: '🇯🇵', 
      speakers: '125M+',
      coverage: '80%',
      features: ['Text']
    }
  ];

  const emergencyTranslations = {
    en: {
      title: 'Emergency Alert',
      message: 'High waves and rip currents reported at Marina Beach. Avoid swimming immediately.',
      action: 'Call Emergency Services: 911'
    },
    hi: {
      title: 'आपातकालीन चेतावनी',
      message: 'मरीना बीच पर ऊंची लहरें और तेज धाराएं रिपोर्ट की गई हैं। तुरंत तैराकी से बचें।',
      action: 'आपातकालीन सेवाओं को कॉल करें: 112'
    },
    es: {
      title: 'Alerta de Emergencia',
      message: 'Se reportan olas altas y corrientes de resaca en Marina Beach. Evite nadar inmediatamente.',
      action: 'Llame a Servicios de Emergencia: 112'
    },
    zh: {
      title: '紧急警报',
      message: '玛丽娜海滩报告有大浪和离岸流。请立即避免游泳。',
      action: '拨打紧急服务电话：110'
    }
  };

  const features = [
    {
      icon: MessageSquare,
      title: 'Real-time Translation',
      description: 'Instant translation of hazard reports and emergency alerts',
      languages: '8+ Languages'
    },
    {
      icon: Volume2,
      title: 'Voice Support',
      description: 'Audio announcements and voice-guided emergency protocols',
      languages: '5+ Languages'
    },
    {
      icon: Globe,
      title: 'Cultural Adaptation',
      description: 'Localized content respecting cultural norms and practices',
      languages: 'All Supported'
    },
    {
      icon: Users,
      title: 'Community Localization',
      description: 'Community-driven translations and local expertise',
      languages: 'Growing Daily'
    }
  ];

  const usageStats = [
    { metric: 'Global Users', value: '150K+', change: '+25%' },
    { metric: 'Languages', value: '8', change: '+2 new' },
    { metric: 'Translations/Day', value: '50K+', change: '+18%' },
    { metric: 'Accuracy Rate', value: '96.8%', change: '+2.1%' }
  ];

  const handleLanguageChange = (langCode) => {
    setSelectedLanguage(langCode);
    switchLanguage(langCode);
  };

  const playAudio = (text, lang) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = lang === 'hi' ? 'hi-IN' : lang === 'es' ? 'es-ES' : 'en-US';
      speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4 flex items-center justify-center">
            <Globe className="h-10 w-10 mr-4 text-primary-600" />
            Multilingual Support
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Breaking language barriers to serve global coastal communities with real-time ocean safety information
          </p>
        </motion.div>

        {/* Usage Statistics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12"
        >
          {usageStats.map((stat, index) => (
            <div key={stat.metric} className="card text-center">
              <p className="text-3xl font-bold text-primary-600 mb-2">{stat.value}</p>
              <p className="text-gray-900 font-medium mb-1">{stat.metric}</p>
              <p className="text-sm text-green-600 font-medium">{stat.change}</p>
            </div>
          ))}
        </motion.div>

        {/* Language Selector */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="card mb-12"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <Languages className="h-6 w-6 mr-3 text-primary-600" />
            Select Your Language
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {supportedLanguages.map((language) => (
              <motion.button
                key={language.code}
                onClick={() => handleLanguageChange(language.code)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`p-4 rounded-xl border-2 transition-all duration-200 text-left ${
                  selectedLanguage === language.code
                    ? 'border-primary-500 bg-primary-50 shadow-md'
                    : 'border-gray-200 hover:border-primary-300 hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-3xl">{language.flag}</span>
                  {selectedLanguage === language.code && (
                    <CheckCircle className="h-5 w-5 text-primary-600" />
                  )}
                </div>
                <h3 className="font-bold text-gray-900">{language.name}</h3>
                <p className="text-sm text-gray-600 mb-2">{language.nativeName}</p>
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span>{language.speakers} speakers</span>
                  <span>{language.coverage} ready</span>
                </div>
                <div className="flex flex-wrap gap-1 mt-2">
                  {language.features.map((feature) => (
                    <span key={feature} className="px-2 py-1 bg-primary-100 text-primary-700 text-xs rounded-full">
                      {feature}
                    </span>
                  ))}
                </div>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Demo Translation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="card mb-12"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Emergency Alert Translation Demo</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {Object.entries(emergencyTranslations).slice(0, 4).map(([lang, translation]) => {
              const langInfo = supportedLanguages.find(l => l.code === lang);
              return (
                <div key={lang} className="p-4 bg-red-50 border border-red-200 rounded-lg">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-2">
                      <span className="text-2xl">{langInfo?.flag}</span>
                      <span className="font-bold text-gray-900">{langInfo?.name}</span>
                    </div>
                    <button
                      onClick={() => playAudio(translation.message, lang)}
                      className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors duration-200"
                      title="Play audio"
                    >
                      <Volume2 className="h-4 w-4" />
                    </button>
                  </div>
                  <h3 className="font-bold text-red-800 mb-2">{translation.title}</h3>
                  <p className="text-red-700 mb-3">{translation.message}</p>
                  <p className="text-sm font-medium text-red-600">{translation.action}</p>
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* Features */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="mb-12"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            Comprehensive Language Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  viewport={{ once: true }}
                  className="card hover:shadow-lg transition-shadow duration-200"
                >
                  <div className="flex items-start space-x-4">
                    <div className="p-3 bg-primary-100 rounded-lg">
                      <Icon className="h-6 w-6 text-primary-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
                      <p className="text-gray-600 mb-3">{feature.description}</p>
                      <span className="inline-flex items-center px-3 py-1 bg-green-100 text-green-800 text-sm font-medium rounded-full">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        {feature.languages}
                      </span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Community Contribution */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0, duration: 0.6 }}
          className="card bg-gradient-to-r from-blue-50 to-green-50 border border-blue-200 mb-12"
        >
          <div className="text-center">
            <Users className="h-12 w-12 text-blue-600 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Community-Powered Translations</h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Help us expand language support! Join our community of translators and local experts 
              to make ocean safety accessible to everyone in their native language.
            </p>
            <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <button className="btn-primary inline-flex items-center">
                <Languages className="h-4 w-4 mr-2" />
                Become a Translator
              </button>
              <button className="btn-secondary inline-flex items-center">
                <Download className="h-4 w-4 mr-2" />
                Translation Guidelines
              </button>
            </div>
          </div>
        </motion.div>

        {/* Language Settings */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="card"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <Settings className="h-6 w-6 mr-3 text-primary-600" />
            Language Preferences
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Current Settings</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="font-medium text-gray-700">Primary Language</span>
                  <span className="text-primary-600 font-medium">
                    {supportedLanguages.find(l => l.code === selectedLanguage)?.name}
                  </span>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="font-medium text-gray-700">Voice Alerts</span>
                  <label className="flex items-center">
                    <input type="checkbox" className="form-checkbox text-primary-600" defaultChecked />
                    <span className="ml-2 text-sm text-gray-600">Enabled</span>
                  </label>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="font-medium text-gray-700">Auto-Translate Social Media</span>
                  <label className="flex items-center">
                    <input type="checkbox" className="form-checkbox text-primary-600" defaultChecked />
                    <span className="ml-2 text-sm text-gray-600">Enabled</span>
                  </label>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Emergency Languages</h3>
              <p className="text-gray-600 mb-4 text-sm">
                Select additional languages for emergency alerts in your area
              </p>
              <div className="space-y-2">
                {supportedLanguages.slice(0, 4).map((lang) => (
                  <label key={lang.code} className="flex items-center p-2 hover:bg-gray-50 rounded">
                    <input 
                      type="checkbox" 
                      className="form-checkbox text-primary-600" 
                      defaultChecked={lang.code === selectedLanguage}
                    />
                    <span className="ml-3 text-2xl">{lang.flag}</span>
                    <span className="ml-2 font-medium text-gray-700">{lang.name}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
          
          <div className="mt-6 pt-6 border-t border-gray-200 text-center">
            <button className="btn-primary">
              Save Language Preferences
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default MultilingualSupport;
