import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MessageSquare, 
  Bot, 
  User, 
  Send, 
  AlertTriangle, 
  Waves, 
  Phone,
  Clock,
  MapPin,
  ExternalLink
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const ChatBotAlerts = () => {
  const { t } = useLanguage();
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const alertSources = [
    { name: 'Twitter', color: 'bg-blue-500', count: 12 },
    { name: 'WhatsApp', color: 'bg-green-500', count: 8 },
    { name: 'Instagram', color: 'bg-purple-500', count: 5 },
    { name: 'Facebook', color: 'bg-blue-600', count: 3 }
  ];

  const initialMessages = [
    {
      id: 1,
      type: 'bot',
      content: '🤖 Welcome to OceanResQ Alert System! I monitor social media and messaging platforms for ocean hazard reports.',
      timestamp: new Date(Date.now() - 60000),
      severity: 'info'
    },
    {
      id: 2,
      type: 'alert',
      content: '🌊 ALERT: High waves reported at Marina Beach, Chennai via Twitter',
      timestamp: new Date(Date.now() - 45000),
      severity: 'moderate',
      source: 'Twitter',
      location: 'Marina Beach, Chennai',
      link: '#'
    },
    {
      id: 3,
      type: 'alert',
      content: '⚠️ WARNING: Rip current spotted at Juhu Beach, Mumbai via WhatsApp group',
      timestamp: new Date(Date.now() - 30000),
      severity: 'high',
      source: 'WhatsApp',
      location: 'Juhu Beach, Mumbai',
      link: '#'
    },
    {
      id: 4,
      type: 'alert',
      content: '🚨 CRITICAL: Storm surge approaching Puri Beach, Odisha via emergency services',
      timestamp: new Date(Date.now() - 15000),
      severity: 'critical',
      source: 'Emergency Services',
      location: 'Puri Beach, Odisha',
      link: '#'
    }
  ];

  const mockAlerts = [
    {
      type: 'alert',
      content: '🌊 New hazard report: Marine debris at Goa Beach via Instagram',
      severity: 'low',
      source: 'Instagram',
      location: 'Goa Beach',
      link: '#'
    },
    {
      type: 'alert',
      content: '⚠️ Weather warning: High winds expected at Kovalam Beach via Twitter',
      severity: 'moderate',
      source: 'Twitter',
      location: 'Kovalam Beach',
      link: '#'
    },
    {
      type: 'alert',
      content: '🚨 Emergency alert: Tsunami watch issued for Chennai coast',
      severity: 'critical',
      source: 'Emergency Services',
      location: 'Chennai Coast',
      link: '#'
    }
  ];

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'low': return 'border-l-green-500 bg-green-50';
      case 'moderate': return 'border-l-yellow-500 bg-yellow-50';
      case 'high': return 'border-l-orange-500 bg-orange-50';
      case 'critical': return 'border-l-red-500 bg-red-50';
      default: return 'border-l-blue-500 bg-blue-50';
    }
  };

  const getSeverityIcon = (severity) => {
    switch (severity) {
      case 'critical': return '🚨';
      case 'high': return '⚠️';
      case 'moderate': return '🌊';
      case 'low': return 'ℹ️';
      default: return '💬';
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const addMessage = (message) => {
    const newMessage = {
      id: Date.now(),
      timestamp: new Date(),
      ...message
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    // Add user message
    addMessage({
      type: 'user',
      content: inputMessage
    });

    const userInput = inputMessage.toLowerCase();
    setInputMessage('');

    // Simulate bot typing
    setIsTyping(true);
    
    setTimeout(() => {
      setIsTyping(false);
      
      // Bot responses based on user input
      if (userInput.includes('status') || userInput.includes('update')) {
        addMessage({
          type: 'bot',
          content: '📊 Current status: 28 active alerts across all platforms. Last update: 2 minutes ago.',
          severity: 'info'
        });
      } else if (userInput.includes('emergency') || userInput.includes('critical')) {
        addMessage({
          type: 'bot',
          content: '🚨 Showing only CRITICAL alerts. Contact emergency services immediately if you witness any of these hazards.',
          severity: 'critical'
        });
      } else if (userInput.includes('location') || userInput.includes('near')) {
        addMessage({
          type: 'bot',
          content: '📍 Please share your location to show nearby alerts, or specify a beach/area name.',
          severity: 'info'
        });
      } else {
        addMessage({
          type: 'bot',
          content: '🤖 I can help you with alert status, emergency protocols, location-based alerts, or specific hazard information. What would you like to know?',
          severity: 'info'
        });
      }
    }, 1500);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Simulate incoming alerts
  useEffect(() => {
    const interval = setInterval(() => {
      const randomAlert = mockAlerts[Math.floor(Math.random() * mockAlerts.length)];
      addMessage({
        ...randomAlert,
        id: Date.now()
      });
    }, 15000); // New alert every 15 seconds

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    setMessages(initialMessages);
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4 flex items-center justify-center">
            <MessageSquare className="h-10 w-10 mr-4 text-primary-600" />
            ChatBot Alerts
          </h1>
          <p className="text-lg text-gray-600">
            Real-time ocean hazard alerts from social media and messaging platforms
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Alert Sources Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="lg:col-span-1"
          >
            <div className="card">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Alert Sources</h2>
              <div className="space-y-4">
                {alertSources.map((source) => (
                  <div key={source.name} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className={`w-3 h-3 rounded-full ${source.color}`}></div>
                      <span className="font-medium text-gray-900">{source.name}</span>
                    </div>
                    <span className="text-sm font-bold text-gray-600">{source.count}</span>
                  </div>
                ))}
              </div>

              <div className="mt-6 p-4 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg">
                <h3 className="font-bold mb-2 flex items-center">
                  <Phone className="h-4 w-4 mr-2" />
                  Emergency Contacts
                </h3>
                <div className="space-y-1 text-sm">
                  <p>🇮🇳 India: 112</p>
                  <p>🌊 Coast Guard: 1-800-424-8802</p>
                </div>
              </div>

              <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                <h3 className="font-bold text-blue-900 mb-2">Live Status</h3>
                <div className="flex items-center space-x-2 text-sm">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-blue-800">Monitoring Active</span>
                </div>
                <p className="text-xs text-blue-700 mt-1">Last update: 30 seconds ago</p>
              </div>
            </div>
          </motion.div>

          {/* Chat Interface */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="lg:col-span-3"
          >
            <div className="card h-[600px] flex flex-col">
              {/* Chat Header */}
              <div className="flex items-center justify-between p-4 border-b border-gray-200">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-primary-100 rounded-lg">
                    <Bot className="h-6 w-6 text-primary-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900">ResQ Alert Bot</h3>
                    <div className="flex items-center space-x-2 text-sm text-green-600">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                      <span>Online</span>
                    </div>
                  </div>
                </div>
                <div className="text-sm text-gray-500">
                  {messages.length} alerts today
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                <AnimatePresence>
                  {messages.map((message) => (
                    <motion.div
                      key={message.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3 }}
                      className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div className={`max-w-xs lg:max-w-md ${
                        message.type === 'user'
                          ? 'bg-primary-600 text-white rounded-l-lg rounded-tr-lg'
                          : message.type === 'alert'
                          ? `border-l-4 rounded-r-lg rounded-tl-lg p-4 ${getSeverityColor(message.severity)}`
                          : 'bg-gray-100 text-gray-900 rounded-r-lg rounded-tl-lg'
                      } p-3 shadow-sm`}>
                        
                        {/* Message Header for Alerts */}
                        {message.type === 'alert' && (
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center space-x-2">
                              <span className="text-lg">{getSeverityIcon(message.severity)}</span>
                              <span className="text-xs font-medium text-gray-600 uppercase">
                                {message.severity} Alert
                              </span>
                            </div>
                            <span className="text-xs text-gray-500">
                              {message.source}
                            </span>
                          </div>
                        )}

                        {/* Message Content */}
                        <p className={`${message.type === 'user' ? 'text-white' : 'text-gray-800'} mb-2`}>
                          {message.content}
                        </p>

                        {/* Alert Details */}
                        {message.type === 'alert' && message.location && (
                          <div className="space-y-2">
                            <div className="flex items-center space-x-2 text-sm text-gray-600">
                              <MapPin className="h-3 w-3" />
                              <span>{message.location}</span>
                            </div>
                            {message.link && (
                              <a
                                href={message.link}
                                className="inline-flex items-center space-x-1 text-sm text-blue-600 hover:text-blue-800"
                              >
                                <ExternalLink className="h-3 w-3" />
                                <span>View Source</span>
                              </a>
                            )}
                          </div>
                        )}

                        {/* Timestamp */}
                        <div className="flex items-center justify-end mt-2">
                          <span className={`text-xs ${
                            message.type === 'user' 
                              ? 'text-white/70' 
                              : 'text-gray-500'
                          }`}>
                            <Clock className="h-3 w-3 inline mr-1" />
                            {message.timestamp.toLocaleTimeString([], { 
                              hour: '2-digit', 
                              minute: '2-digit' 
                            })}
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>

                {/* Typing Indicator */}
                {isTyping && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="flex justify-start"
                  >
                    <div className="bg-gray-100 rounded-r-lg rounded-tl-lg p-3 shadow-sm">
                      <div className="typing-indicator">
                        <div className="typing-dot" style={{'--delay': '0ms'}}></div>
                        <div className="typing-dot" style={{'--delay': '150ms'}}></div>
                        <div className="typing-dot" style={{'--delay': '300ms'}}></div>
                      </div>
                    </div>
                  </motion.div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Chat Input */}
              <div className="border-t border-gray-200 p-4">
                <div className="flex space-x-3">
                  <input
                    type="text"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Ask about alerts, status, or emergency protocols..."
                    className="flex-1 input-field"
                  />
                  <button
                    onClick={handleSendMessage}
                    disabled={!inputMessage.trim()}
                    className="btn-primary px-4 py-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Send className="h-4 w-4" />
                  </button>
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  💡 Try asking: "Show status", "Emergency protocols", or "Alerts near me"
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ChatBotAlerts;
