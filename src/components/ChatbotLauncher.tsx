import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Phone, Mail, ExternalLink, Sparkles, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface Message {
  id: string;
  text: string;
  sender: 'bot' | 'user';
  timestamp: Date;
  quickReplies?: QuickReply[];
  actionButton?: {
    text: string;
    onClick: () => void;
    icon?: React.ReactNode;
  };
}

interface QuickReply {
  text: string;
  action: string;
}

const CONTACT_PHONE = '+918008937902';
const CONTACT_PHONE_CLEAN = '918008937902';
const CONTACT_EMAIL = 'codekidstech2025@gmail.com';
const WHATSAPP_MESSAGE = 'Hello! I\'m interested in CodeKids Technologies courses. Can you please provide more information?';

export default function ChatbotLauncher() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  // Initialize with welcome message
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const welcomeMessage: Message = {
        id: '1',
        text: 'Hello! 👋 Welcome to CodeKids Technologies. I\'m here to help you with information about our coding courses, programs, and services. How can I assist you today?',
        sender: 'bot',
        timestamp: new Date(),
        quickReplies: [
          { text: '📚 Course Information', action: 'courses' },
          { text: '💼 CodeKids Pro', action: 'pro' },
          { text: '🏫 CodeKids Jr', action: 'jr' },
          { text: '💬 Chat on WhatsApp', action: 'whatsapp' },
          { text: '📞 Contact Us', action: 'contact' },
        ],
      };
      setMessages([welcomeMessage]);
    }
  }, [isOpen, messages.length]);

  // Auto scroll to bottom when new messages arrive - Optimized with throttling
  useEffect(() => {
    if (messagesEndRef.current) {
      // Use requestAnimationFrame for smoother scrolling
      requestAnimationFrame(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
      });
    }
  }, [messages, isTyping]);

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen]);

  const simulateTyping = () => {
    setIsTyping(true);
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        setIsTyping(false);
        resolve();
      }, 1000 + Math.random() * 1000);
    });
  };

  const handleQuickReply = async (action: string) => {
    let responseText = '';
    let quickReplies: QuickReply[] = [];
    let actionButton;

    switch (action) {
      case 'courses':
        responseText = 'We offer comprehensive coding courses for all ages! 🚀\n\n• **CodeKids Jr** (Ages 6-16): Robotics, AI, Coding, IoT, STEM Labs\n• **CodeKids Pro** (Ages 18-26): Job-ready tech training with placement assistance\n\nWhich program interests you?';
        quickReplies = [
          { text: 'CodeKids Jr Details', action: 'jr' },
          { text: 'CodeKids Pro Details', action: 'pro' },
          { text: 'Pricing', action: 'pricing' },
        ];
        break;

      case 'jr':
        responseText = '🏫 **CodeKids Jr** - Perfect for Schools & Students (Ages 6-16)\n\n✨ **Features:**\n• Robotics & IoT Projects\n• AI & Machine Learning\n• Web Development\n• STEM Lab Setups\n• Summer/Winter Camps\n• Certificate Programs\n\n💰 **Pricing:**\n• Online: ₹100/month\n• Offline: ₹150/month\n• Camps: ₹300\n\nWould you like to know more or contact us?';
        quickReplies = [
          { text: 'View Pricing Page', action: 'jr-pricing' },
          { text: 'Contact via WhatsApp', action: 'whatsapp' },
          { text: 'Call Now', action: 'call' },
        ];
        actionButton = {
          text: 'View CodeKids Jr',
          onClick: () => navigate('/codekids-jr'),
          icon: <ExternalLink className="h-4 w-4" />,
        };
        break;

      case 'pro':
        responseText = '💼 **CodeKids Pro** - Job-Ready Tech Training (Ages 18-26)\n\n🎯 **What You Get:**\n• Full Stack Development\n• AI/ML & Data Science\n• Cloud & DevOps\n• Cybersecurity\n• Placement Assistance\n• Internship Opportunities\n• Portfolio Building\n• Resume Optimization\n\n💰 **Pricing:**\n• 3 Months: ₹15,000\n• 6 Months: ₹30,000\n• 1 Year: ₹50,000\n• Crash Courses: ₹1,500 - ₹3,000\n\nReady to start your tech career?';
        quickReplies = [
          { text: 'View Pricing', action: 'pro-pricing' },
          { text: 'WhatsApp Us', action: 'whatsapp' },
          { text: 'Schedule Demo', action: 'demo' },
        ];
        actionButton = {
          text: 'Explore CodeKids Pro',
          onClick: () => navigate('/codekids-pro'),
          icon: <ExternalLink className="h-4 w-4" />,
        };
        break;

      case 'pricing':
        responseText = '💵 **Course Pricing Overview:**\n\n**CodeKids Jr (Ages 6-16):**\n• Online Classes: ₹100/month\n• Offline Classes: ₹150/month\n• Camps: ₹300 (online/offline)\n\n**CodeKids Pro (Ages 18-26):**\n• 3 Months: ₹15,000\n• 6 Months: ₹30,000\n• 1 Year: ₹50,000\n• Crash Courses: ₹1,500 - ₹3,000\n\nWould you like detailed pricing or to speak with our team?';
        quickReplies = [
          { text: 'CodeKids Jr Pricing', action: 'jr-pricing' },
          { text: 'CodeKids Pro Pricing', action: 'pro-pricing' },
          { text: 'Contact Sales', action: 'whatsapp' },
        ];
        break;

      case 'jr-pricing':
        responseText = `📋 For detailed **CodeKids Jr** pricing and enrollment information, visit our pricing page. You can also contact us directly for special school or group discounts!`;
        actionButton = {
          text: 'View Pricing Page',
          onClick: () => navigate('/codekids-jr/pricing'),
          icon: <ExternalLink className="h-4 w-4" />,
        };
        quickReplies = [
          { text: 'Contact via WhatsApp', action: 'whatsapp' },
          { text: 'Call Now', action: 'call' },
        ];
        break;

      case 'pro-pricing':
        responseText = `📋 For detailed **CodeKids Pro** pricing, course details, and enrollment, visit our pricing page. Limited seats available - enroll today!`;
        actionButton = {
          text: 'View Pricing Page',
          onClick: () => navigate('/codekids-pro/pricing'),
          icon: <ExternalLink className="h-4 w-4" />,
        };
        quickReplies = [
          { text: 'WhatsApp Us', action: 'whatsapp' },
          { text: 'Book Free Demo', action: 'demo' },
        ];
        break;

      case 'contact':
        responseText = `📞 **Contact Information:**\n\n📱 **Phone:** ${CONTACT_PHONE}\n📧 **Email:** ${CONTACT_EMAIL}\n📍 **Address:** Plot no 264, Flat no 102 & 202, Road no 14, Swamy Ayyappa society, Madhapur, 500081 Hyderabad, Telangana, India\n\n💬 **Quick Actions:**`;
        quickReplies = [
          { text: '💬 WhatsApp Now', action: 'whatsapp' },
          { text: '📞 Call Now', action: 'call' },
          { text: '📧 Send Email', action: 'email' },
        ];
        break;

      case 'whatsapp':
        responseText = `💬 **Chat with us on WhatsApp!**\n\nGet instant responses from our team. We're available from 9 AM to 7 PM IST and typically respond within a few minutes.\n\nClick the button below to start chatting!`;
        actionButton = {
          text: '💬 Open WhatsApp Chat',
          onClick: () => {
            const whatsappUrl = `https://wa.me/${CONTACT_PHONE_CLEAN}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;
            window.open(whatsappUrl, '_blank');
          },
          icon: <ExternalLink className="h-4 w-4" />,
        };
        quickReplies = [
          { text: '📚 Back to Courses', action: 'courses' },
          { text: '📞 Call Instead', action: 'call' },
          { text: '📧 Email Us', action: 'email' },
        ];
        break;

      case 'call':
        responseText = `📞 Our team is available from 9 AM to 7 PM IST. Click below to call us directly!`;
        actionButton = {
          text: `Call ${CONTACT_PHONE}`,
          onClick: () => window.location.href = `tel:${CONTACT_PHONE_CLEAN}`,
          icon: <Phone className="h-4 w-4" />,
        };
        break;

      case 'email':
        responseText = `📧 Send us an email and we'll respond within 24 hours. Click below to open your email client!`;
        actionButton = {
          text: `Email ${CONTACT_EMAIL}`,
          onClick: () => window.location.href = `mailto:${CONTACT_EMAIL}?subject=Inquiry about CodeKids Technologies`,
          icon: <Mail className="h-4 w-4" />,
        };
        break;

      case 'demo':
        responseText = `🎯 **Book Your Free Demo Session!**\n\nExperience our courses firsthand with a free demo session. Our expert instructors will guide you through our curriculum and answer all your questions.\n\nClick below to schedule or contact us directly!`;
        actionButton = {
          text: 'Schedule Free Demo',
          onClick: () => navigate('/contact'),
          icon: <Clock className="h-4 w-4" />,
        };
        quickReplies = [
          { text: 'WhatsApp to Schedule', action: 'whatsapp' },
          { text: 'Call to Book', action: 'call' },
        ];
        break;

      default:
        responseText = 'Thank you for your interest! Would you like to know more about our courses or contact us directly?';
        quickReplies = [
          { text: 'Course Info', action: 'courses' },
          { text: 'Contact Us', action: 'contact' },
          { text: 'View Website', action: 'website' },
        ];
    }

    // Add bot response
    await simulateTyping();
    const botMessage: Message = {
      id: Date.now().toString(),
      text: responseText,
      sender: 'bot',
      timestamp: new Date(),
      quickReplies,
      actionButton,
    };
    setMessages((prev) => [...prev, botMessage]);
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simple keyword-based responses
    const lowerInput = inputValue.toLowerCase();
    let response = '';

    if (lowerInput.includes('hello') || lowerInput.includes('hi') || lowerInput.includes('hey')) {
      response = 'Hello! 👋 How can I help you today? You can ask about our courses, pricing, or contact information.';
    } else if (lowerInput.includes('price') || lowerInput.includes('cost') || lowerInput.includes('fee')) {
      await handleQuickReply('pricing');
      return;
    } else if (lowerInput.includes('contact') || lowerInput.includes('phone') || lowerInput.includes('call')) {
      await handleQuickReply('contact');
      return;
    } else if (lowerInput.includes('whatsapp') || lowerInput.includes('chat')) {
      await handleQuickReply('whatsapp');
      return;
    } else if (lowerInput.includes('course') || lowerInput.includes('program')) {
      await handleQuickReply('courses');
      return;
    } else if (lowerInput.includes('jr') || lowerInput.includes('junior') || lowerInput.includes('school')) {
      await handleQuickReply('jr');
      return;
    } else if (lowerInput.includes('pro') || lowerInput.includes('graduate') || lowerInput.includes('job')) {
      await handleQuickReply('pro');
      return;
    } else {
      response = `I understand you're asking about "${inputValue}". For more detailed information, please:\n\n• Visit our website sections\n• 💬 Chat with us on WhatsApp: ${CONTACT_PHONE}\n• 📞 Call us: ${CONTACT_PHONE}\n\nI'm here to help! Would you like to know about our courses or chat with us directly?`;
    }

    await simulateTyping();
    const botMessage: Message = {
      id: (Date.now() + 1).toString(),
      text: response,
      sender: 'bot',
      timestamp: new Date(),
      quickReplies: [
        { text: '💬 Chat on WhatsApp', action: 'whatsapp' },
        { text: '📚 Courses Info', action: 'courses' },
        { text: '📞 Contact Us', action: 'contact' },
      ],
    };
    setMessages((prev) => [...prev, botMessage]);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Floating Chat Button */}
      <motion.button
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-4 right-3 sm:bottom-6 sm:right-4 md:right-6 h-12 w-12 sm:h-14 sm:w-14 md:h-16 md:w-16 rounded-full bg-ck-gradient-main text-white shadow-2xl flex items-center justify-center z-50 hover:shadow-3xl transition-shadow duration-300 touch-manipulation min-h-[48px] min-w-[48px] sm:min-h-[56px] sm:min-w-[56px] md:min-h-[64px] md:min-w-[64px]"
        aria-label="Open chat"
      >
        <AnimatePresence>
          {!isOpen && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              className="absolute -top-1 -right-1 h-5 w-5 bg-red-500 rounded-full flex items-center justify-center"
            >
              <span className="text-xs font-bold">1</span>
            </motion.div>
          )}
        </AnimatePresence>
        <MessageCircle className="h-7 w-7" />
        <motion.div
          className="absolute inset-0 rounded-full bg-white/20"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed bottom-20 sm:bottom-28 md:bottom-32 right-2 sm:right-4 md:right-6 left-2 sm:left-auto w-[calc(100vw-1rem)] sm:w-[calc(100vw-2rem)] md:w-96 h-[calc(100vh-6rem)] sm:h-[600px] max-h-[600px] glass-card z-50 flex flex-col shadow-2xl border border-white/10 max-w-md"
            style={{ maxHeight: 'calc(100vh - 8rem)' }}
          >
            {/* Header */}
            <div className="bg-ck-gradient-main p-4 rounded-t-2xl flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="h-10 w-10 rounded-full bg-white/20 flex items-center justify-center border-2 border-white/30">
                    <Sparkles className="h-5 w-5 text-white" />
                  </div>
                  <div className="absolute -bottom-1 -right-1 h-3 w-3 bg-green-500 rounded-full border-2 border-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-white font-heading">CodeKids Assistant</h3>
                  <p className="text-xs text-white/90 flex items-center gap-1">
                    <span className="h-2 w-2 bg-green-400 rounded-full animate-pulse" />
                    Online • Usually replies instantly
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="h-8 w-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors active:scale-95"
                aria-label="Close chat"
              >
                <X className="h-5 w-5 text-white" />
              </button>
            </div>

            {/* Messages Container */}
            <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-gradient-to-b from-transparent to-secondary/5">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex gap-2 ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {message.sender === 'bot' && (
                    <div className="h-8 w-8 rounded-full bg-ck-gradient-main flex-shrink-0 flex items-center justify-center">
                      <Sparkles className="h-4 w-4 text-white" />
                    </div>
                  )}
                  <div className={`max-w-[75%] ${message.sender === 'user' ? 'order-2' : ''}`}>
                    <div
                      className={`p-3 rounded-2xl ${
                        message.sender === 'user'
                          ? 'bg-primary text-white rounded-tr-sm'
                          : 'glass-card bg-white/10 dark:bg-black/20 text-foreground rounded-tl-sm'
                      }`}
                    >
                      <p className="text-sm whitespace-pre-line leading-relaxed">{message.text}</p>
                      {message.actionButton && (
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={message.actionButton.onClick}
                          className="mt-3 w-full px-4 py-2 rounded-lg bg-white/20 hover:bg-white/30 text-white text-sm font-semibold flex items-center justify-center gap-2 transition-colors"
                        >
                          {message.actionButton.icon}
                          {message.actionButton.text}
                        </motion.button>
                      )}
                    </div>
                    {message.quickReplies && message.quickReplies.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-2">
                        {message.quickReplies.map((reply, index) => (
                          <motion.button
                            key={index}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => handleQuickReply(reply.action)}
                            className="px-3 py-1.5 sm:py-2 text-xs sm:text-sm rounded-full bg-secondary hover:bg-primary hover:text-white text-foreground transition-all duration-200 border border-border hover:border-primary min-h-[36px] sm:min-h-[40px] touch-manipulation"
                          >
                            {reply.text}
                          </motion.button>
                        ))}
                      </div>
                    )}
                  </div>
                  {message.sender === 'user' && (
                    <div className="h-8 w-8 rounded-full bg-primary flex-shrink-0 flex items-center justify-center order-3">
                      <span className="text-white text-xs font-bold">You</span>
                    </div>
                  )}
                </motion.div>
              ))}

              {/* Typing Indicator */}
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex gap-2"
                >
                  <div className="h-8 w-8 rounded-full bg-ck-gradient-main flex-shrink-0 flex items-center justify-center">
                    <Sparkles className="h-4 w-4 text-white" />
                  </div>
                  <div className="glass-card p-3 rounded-2xl rounded-tl-sm">
                    <div className="flex gap-1">
                      {[0, 1, 2].map((i) => (
                        <motion.div
                          key={i}
                          className="h-2 w-2 bg-primary rounded-full"
                          animate={{ y: [0, -8, 0] }}
                          transition={{
                            duration: 0.6,
                            repeat: Infinity,
                            delay: i * 0.2,
                          }}
                        />
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-3 sm:p-4 border-t border-border bg-white/5 dark:bg-black/10">
              <div className="flex gap-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type your message..."
                  className="flex-1 px-3 sm:px-4 py-2 sm:py-2.5 rounded-full bg-secondary border border-border focus:outline-none focus:ring-2 focus:ring-primary text-sm sm:text-base text-foreground placeholder:text-muted-foreground min-h-[44px] touch-manipulation"
                />
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={handleSendMessage}
                  disabled={!inputValue.trim()}
                  className="h-11 w-11 sm:h-10 sm:w-10 rounded-full bg-ck-gradient-main text-white flex items-center justify-center hover:shadow-lg transition-shadow disabled:opacity-50 disabled:cursor-not-allowed min-h-[44px] min-w-[44px] touch-manipulation"
                  aria-label="Send message"
                >
                  <Send className="h-4 w-4 sm:h-5 sm:w-5" />
                </motion.button>
              </div>
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 mt-2">
                <div className="flex items-center gap-1.5 sm:gap-2 text-[10px] sm:text-xs text-muted-foreground">
                  <Phone className="h-3 w-3 flex-shrink-0" />
                  <span className="break-words">Need help? Call {CONTACT_PHONE}</span>
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleQuickReply('whatsapp')}
                  className="flex items-center gap-1.5 px-3 py-1.5 sm:py-2 text-xs font-semibold rounded-full bg-green-500 hover:bg-green-600 text-white transition-colors min-h-[36px] sm:min-h-[40px] touch-manipulation w-full sm:w-auto"
                  aria-label="Chat on WhatsApp"
                >
                  <span>💬</span>
                  <span>WhatsApp</span>
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
