import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Waves, 
  BarChart3, 
  MessageSquare, 
  CheckCircle, 
  Globe, 
  ArrowRight, 
  Shield, 
  Users, 
  Zap,
  AlertTriangle,
  TrendingUp,
  Clock,
  Award
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const LandingPage = () => {
  const { t } = useLanguage();

  const features = [
    {
      icon: BarChart3,
      title: t('landing.features.dashboard.title'),
      description: t('landing.features.dashboard.description'),
      color: 'from-blue-500 to-blue-600',
      link: '/dashboard',
    },
    {
      icon: MessageSquare,
      title: t('landing.features.chatbot.title'),
      description: t('landing.features.chatbot.description'),
      color: 'from-green-500 to-green-600',
      link: '/alerts',
    },
    {
      icon: CheckCircle,
      title: t('landing.features.verification.title'),
      description: t('landing.features.verification.description'),
      color: 'from-purple-500 to-purple-600',
      link: '/verification',
    },
    {
      icon: Globe,
      title: t('landing.features.multilingual.title'),
      description: t('landing.features.multilingual.description'),
      color: 'from-orange-500 to-orange-600',
      link: '/multilingual',
    },
  ];

  const stats = [
    { label: 'Active Users', value: '10,000+', icon: Users },
    { label: 'Reports Processed', value: '50,000+', icon: BarChart3 },
    { label: 'Lives Protected', value: '25,000+', icon: Shield },
    { label: 'Response Time', value: '< 5 min', icon: Clock },
  ];

  const testimonials = [
    {
      name: 'Dr. Sarah Chen',
      role: 'Marine Safety Director',
      content: 'ResQ has revolutionized how we monitor and respond to ocean hazards. The real-time alerts have saved countless lives.',
      avatar: '👩‍⚕️',
    },
    {
      name: 'Captain Miguel Rodriguez',
      role: 'Coast Guard Operations',
      content: 'The social media analytics help us identify emerging threats before they become critical. Invaluable tool for marine safety.',
      avatar: '👨‍✈️',
    },
    {
      name: 'Lisa Thompson',
      role: 'Beach Safety Coordinator',
      content: 'The multilingual support ensures we can serve our diverse coastal communities effectively. Amazing platform!',
      avatar: '👩‍💼',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-ocean-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <div>
                <motion.h1 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.8 }}
                  className="text-5xl lg:text-6xl font-bold"
                >
                  <span className="text-gradient">{t('landing.title')}</span>
                </motion.h1>
                <motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.8 }}
                  className="text-xl lg:text-2xl text-gray-600 mt-4 font-medium"
                >
                  {t('landing.subtitle')}
                </motion.p>
                <motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.8 }}
                  className="text-lg text-gray-500 mt-4 leading-relaxed"
                >
                  {t('landing.description')}
                </motion.p>
              </div>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.8 }}
                className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4"
              >
                <Link
                  to="/dashboard"
                  className="btn-primary group inline-flex items-center justify-center"
                >
                  {t('landing.getStarted')}
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-200" />
                </Link>
                <Link
                  to="/report"
                  className="btn-danger group inline-flex items-center justify-center"
                >
                  <AlertTriangle className="mr-2 h-5 w-5" />
                  Report Emergency
                </Link>
              </motion.div>
            </motion.div>

            {/* Right Column - Visual */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="relative"
            >
              <div className="relative bg-gradient-to-br from-ocean-500 to-primary-600 rounded-3xl p-8 shadow-2xl">
                <div className="absolute inset-0 bg-white/10 rounded-3xl backdrop-blur-sm"></div>
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center space-x-3">
                      <Waves className="h-8 w-8 text-white" />
                      <span className="text-white text-xl font-bold">Ocean Safety</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                      <span className="text-white text-sm">Live</span>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="bg-white/20 rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <span className="text-white font-medium">Active Alerts</span>
                        <span className="text-yellow-300 font-bold">23</span>
                      </div>
                    </div>
                    <div className="bg-white/20 rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <span className="text-white font-medium">Resolved Today</span>
                        <span className="text-green-300 font-bold">89</span>
                      </div>
                    </div>
                    <div className="bg-white/20 rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <span className="text-white font-medium">Response Time</span>
                        <span className="text-blue-300 font-bold">4.2 min</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Floating elements */}
              <motion.div
                animate={{ y: [-10, 10, -10] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute -top-4 -right-4 bg-white rounded-full p-4 shadow-lg"
              >
                <Shield className="h-6 w-6 text-green-500" />
              </motion.div>
              <motion.div
                animate={{ y: [10, -10, 10] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute -bottom-4 -left-4 bg-white rounded-full p-4 shadow-lg"
              >
                <TrendingUp className="h-6 w-6 text-blue-500" />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  viewport={{ once: true }}
                  className="text-center"
                >
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary-500 to-ocean-500 rounded-full mb-4">
                    <Icon className="h-8 w-8 text-white" />
                  </div>
                  <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
                  <div className="text-gray-600">{stat.label}</div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Comprehensive Ocean Safety Platform
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Advanced technology meets community vigilance to create the most effective ocean hazard monitoring system.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -5, scale: 1.02 }}
                  className="group"
                >
                  <Link to={feature.link} className="block">
                    <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 h-full">
                      <div className={`inline-flex p-4 rounded-xl bg-gradient-to-r ${feature.color} mb-6 group-hover:scale-110 transition-transform duration-300`}>
                        <Icon className="h-8 w-8 text-white" />
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-primary-600 transition-colors duration-300">
                        {feature.title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed mb-6">
                        {feature.description}
                      </p>
                      <div className="flex items-center text-primary-600 font-medium group-hover:translate-x-2 transition-transform duration-300">
                        Explore Feature
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Trusted by Marine Safety Professionals
            </h2>
            <p className="text-xl text-gray-600">
              See what experts are saying about ResQ
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
                className="bg-gray-50 rounded-2xl p-8 border border-gray-100"
              >
                <div className="flex items-center mb-6">
                  <div className="text-4xl mr-4">{testimonial.avatar}</div>
                  <div>
                    <h4 className="font-bold text-gray-900">{testimonial.name}</h4>
                    <p className="text-gray-600 text-sm">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-gray-700 italic leading-relaxed">
                  "{testimonial.content}"
                </p>
                <div className="flex text-yellow-400 mt-4">
                  {[...Array(5)].map((_, i) => (
                    <span key={i}>⭐</span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary-600 to-ocean-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-white">
              Ready to Enhance Ocean Safety?
            </h2>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Join thousands of users who trust ResQ to keep their communities safe. 
              Start monitoring, reporting, and protecting today.
            </p>
            <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6">
              <Link
                to="/dashboard"
                className="inline-flex items-center justify-center px-8 py-4 bg-white text-primary-600 font-bold rounded-lg hover:bg-gray-50 transition-colors duration-200 shadow-lg"
              >
                <BarChart3 className="mr-2 h-5 w-5" />
                View Dashboard
              </Link>
              <Link
                to="/report"
                className="inline-flex items-center justify-center px-8 py-4 bg-red-600 text-white font-bold rounded-lg hover:bg-red-700 transition-colors duration-200 shadow-lg"
              >
                <AlertTriangle className="mr-2 h-5 w-5" />
                Report Hazard
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
