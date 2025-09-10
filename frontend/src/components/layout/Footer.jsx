import React from 'react';
import { Link } from 'react-router-dom';
import { Waves, Github, Twitter, Mail, Phone, MapPin } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

const Footer = () => {
  const { t } = useLanguage();

  const footerLinks = {
    platform: [
      { name: t('nav.dashboard'), href: '/dashboard' },
      { name: t('nav.alerts'), href: '/alerts' },
      { name: t('nav.verification'), href: '/verification' },
      { name: t('nav.report'), href: '/report' },
    ],
    resources: [
      { name: 'API Documentation', href: '/docs' },
      { name: 'Safety Guidelines', href: '/safety' },
      { name: 'Emergency Contacts', href: '/emergency' },
      { name: 'Training Materials', href: '/training' },
    ],
    legal: [
      { name: 'Privacy Policy', href: '/privacy' },
      { name: 'Terms of Service', href: '/terms' },
      { name: 'Cookie Policy', href: '/cookies' },
      { name: 'Data Protection', href: '/data-protection' },
    ]
  };

  const socialLinks = [
    { icon: Github, href: 'https://github.com/ResQ', label: 'GitHub' },
    { icon: Twitter, href: 'https://twitter.com/ResQ', label: 'Twitter' },
    { icon: Mail, href: 'mailto:contact@ResQ.com', label: 'Email' },
  ];

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="col-span-1 lg:col-span-1">
            <div className="flex items-center space-x-3 mb-4">
              <div className="p-2 bg-gradient-to-br from-ocean-500 to-primary-600 rounded-lg">
                <Waves className="h-6 w-6 text-white" />
              </div>
              <div>
                <span className="text-2xl font-bold text-white">OceanResQ</span>
                <p className="text-sm text-gray-400 -mt-1">Ocean Safety</p>
              </div>
            </div>
            <p className="text-gray-400 mb-6 max-w-sm">
              Protecting coastal communities through real-time ocean hazard reporting 
              and advanced social media analytics.
            </p>
            
            {/* Emergency Contact */}
            <div className="bg-red-900/20 border border-red-800 rounded-lg p-4 mb-6">
              <h4 className="text-red-300 font-semibold mb-2 flex items-center">
                <Phone className="h-4 w-4 mr-2" />
                Emergency Contacts
              </h4>
              <div className="space-y-1 text-sm">
                <p>🇮🇳 India: 112</p>
                <p>🌊 Coast Guard: 1-800-424-8802</p>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex space-x-4">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors duration-200"
                    aria-label={social.label}
                  >
                    <Icon className="h-5 w-5" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Platform Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Platform</h3>
            <ul className="space-y-3">
              {footerLinks.platform.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-gray-400 hover:text-white transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Resources</h3>
            <ul className="space-y-3">
              {footerLinks.resources.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-gray-400 hover:text-white transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal & Contact */}
          <div>
            <h3 className="text-white font-semibold mb-4">Legal & Contact</h3>
            <ul className="space-y-3 mb-6">
              {footerLinks.legal.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-gray-400 hover:text-white transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Contact Info */}
            <div className="space-y-2">
              <div className="flex items-center text-sm text-gray-400">
                <Mail className="h-4 w-4 mr-2" />
                support@ResQ.com
              </div>
              <div className="flex items-center text-sm text-gray-400">
                <MapPin className="h-4 w-4 mr-2" />
                Global Operations
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-6 text-sm text-gray-400">
              <p>&copy; 2025 OceanResQ. All rights reserved.</p>
              <div className="flex items-center space-x-4">
                <span className="flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                  System Status: Operational
                </span>
                <span>API v1.0</span>
              </div>
            </div>
            
            <div className="mt-4 md:mt-0 text-sm text-gray-400">
              <p>Built with ❤️ for ocean safety</p>
            </div>
          </div>
        </div>

        {/* Emergency Banner */}
        <div className="mt-8 bg-gradient-to-r from-red-900/30 to-orange-900/30 border border-red-800/50 rounded-lg p-4">
          <p className="text-center text-red-200 font-medium">
            🚨 For immediate life-threatening emergencies, always contact your local emergency services first
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
