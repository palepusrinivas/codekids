import { useState, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';
import { handleAnchorClick } from '@/lib/smooth-scroll';
import {
  ArrowDown, Calendar, CheckCircle, Crown, Download, FileText, Gift, Info,
  MessageSquare, Phone, PlayCircle, Rocket, ShieldCheck, Sparkles, Star,
  Trophy, Users, Video, Cpu, BookOpen, Loader2
} from 'lucide-react';
import Image from '@/components/Image';
import { GlassCard } from '@/components/ui/glass-card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { FormMessage, FormFieldError } from '@/components/ui/form-message';
import {
  validateName,
  validateEmail,
  validatePhone,
  validateMessage,
  validateSelect,
  formatPhoneNumber
} from '@/lib/form-validation';
import { formatPricingEmail, sendEmail } from '@/lib/email-service';
import {
  staggerContainer,
  staggerItem,
  smoothTransition,
  springTransition
} from '@/lib/animations';

// Enhanced scroll reveal variants
const fadeInUp = {
  initial: { opacity: 0, y: 60, filter: 'blur(10px)' },
  whileInView: { opacity: 1, y: 0, filter: 'blur(0px)' },
  viewport: { once: true, margin: '-100px' },
  transition: { ...smoothTransition, duration: 0.8 }
};

const fadeInLeft = {
  initial: { opacity: 0, x: -50, filter: 'blur(10px)' },
  whileInView: { opacity: 1, x: 0, filter: 'blur(0px)' },
  viewport: { once: true, margin: '-100px' },
  transition: { ...smoothTransition, duration: 0.8 }
};

const fadeInRight = {
  initial: { opacity: 0, x: 50, filter: 'blur(10px)' },
  whileInView: { opacity: 1, x: 0, filter: 'blur(0px)' },
  viewport: { once: true, margin: '-100px' },
  transition: { ...smoothTransition, duration: 0.8 }
};

// Scroll Reveal Component
function ScrollReveal({ 
  children, 
  delay = 0, 
  direction = 'up',
  className = '' 
}: { 
  children: React.ReactNode; 
  delay?: number; 
  direction?: 'up' | 'down' | 'left' | 'right';
  className?: string;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  const directionMap = {
    up: { y: 60, x: 0 },
    down: { y: -60, x: 0 },
    left: { x: -60, y: 0 },
    right: { x: 60, y: 0 },
  };

  const { x, y } = directionMap[direction];

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x, y, filter: 'blur(10px)' }}
      animate={isInView ? { opacity: 1, x: 0, y: 0, filter: 'blur(0px)' } : {}}
      transition={{
        duration: 0.8,
        delay,
        ease: [0.6, -0.05, 0.01, 0.99],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

const testimonials = [
  {
    type: 'parent',
    name: 'Mrs. Meera Kapoor',
    role: 'Parent of 7th Class Student',
    text: 'My son used to play games all day. Now he builds his own games and robots! The fees are very reasonable for the value they provide.',
    rating: 5,
    image: '/assest/parents2.jpg',
  },
  {
    type: 'principal',
    name: 'Dr. Ramesh Kumar',
    role: 'Principal, Partner School',
    text: 'We partnered with CodeKids_JR for our Tinkering Lab. The pricing model worked perfectly for our budget, and students are excited about technology again.',
    rating: 5,
    image: '/assest/codekids_jr testimonial2.jpg',
  },
  {
    type: 'student',
    name: 'Aarav Sharma',
    role: '8th Class Student',
    text: 'I built my first robot and a mini website. I never thought coding could be this fun!',
    rating: 5,
    image: '/assest/codekids_jr testimonial.jpg',
  },
];

const faqs = [
  {
    q: 'Are these prices final for all CodeKids_JR courses?',
    a: 'Yes. The same monthly pricing applies across all CodeKids_JR courses — Coding, Robotics, AI, IoT, Game Dev, Web & App Development. Simple and transparent.',
  },
  {
    q: 'Is the 50% discount permanent?',
    a: 'This is a special launch offer for early enrollments. Schools and parents who join now can lock in this pricing for the chosen duration (3, 6, or 12 months).',
  },
  {
    q: 'Do you offer trial classes?',
    a: 'Yes. We offer a free demo class so students and parents can experience the teaching style, curriculum, and interaction before enrolling.',
  },
  {
    q: 'Is there any registration fee or hidden charge?',
    a: 'No hidden charges. Any optional materials or extra kits will be clearly communicated in advance, especially for advanced robotics or IoT projects.',
  },
  {
    q: 'Can schools get custom pricing?',
    a: 'Yes. School partnerships with bulk students, long-term programs, or lab setups can receive additional institutional discounts and custom packages.',
  },
];

export default function CodeKidsJrPricingPage() {
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    class: '',
    mode: '',
    phone: '',
    email: '',
    city: '',
    message: '',
  });

  const [errors, setErrors] = useState<Partial<Record<string, string>>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{ type: 'success' | 'error' | null; message: string }>({ type: null, message: '' });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    handleFieldChange(e);
  };

  const handleBlur = (field: string) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    validateField(field, formData[field as keyof typeof formData]);
  };

  const validateField = (field: string, value: string) => {
    let validationResult: { isValid: boolean; error?: string } | undefined;

    switch (field) {
      case 'name':
        validationResult = validateName(value);
        break;
      case 'email':
        validationResult = validateEmail(value);
        break;
      case 'phone':
        validationResult = validatePhone(value, true);
        break;
      case 'role':
        validationResult = validateSelect(value, true);
        break;
      case 'mode':
        validationResult = validateSelect(value, true);
        break;
      case 'message':
        validationResult = validateMessage(value, false);
        break;
      default:
        return;
    }

    if (!validationResult || !validationResult.isValid) {
      setErrors((prev) => ({ ...prev, [field]: validationResult?.error || 'Invalid value' }));
    } else {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    const nameValidation = validateName(formData.name);
    if (!nameValidation.isValid && nameValidation.error) {
      newErrors.name = nameValidation.error;
    }

    const emailValidation = validateEmail(formData.email);
    if (!emailValidation.isValid && emailValidation.error) {
      newErrors.email = emailValidation.error;
    }

    const phoneValidation = validatePhone(formData.phone, true);
    if (!phoneValidation.isValid && phoneValidation.error) {
      newErrors.phone = phoneValidation.error;
    }

    const roleValidation = validateSelect(formData.role, true);
    if (!roleValidation.isValid && roleValidation.error) {
      newErrors.role = roleValidation.error;
    }

    const modeValidation = validateSelect(formData.mode, true);
    if (!modeValidation.isValid && modeValidation.error) {
      newErrors.mode = modeValidation.error;
    }

    if (formData.message) {
      const messageValidation = validateMessage(formData.message, false);
      if (!messageValidation.isValid && messageValidation.error) {
        newErrors.message = messageValidation.error;
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitStatus({ type: null, message: '' });

    // Mark all required fields as touched
    const requiredFields = ['name', 'role', 'mode', 'phone', 'email'];
    const newTouched: Record<string, boolean> = {};
    requiredFields.forEach((field) => {
      newTouched[field] = true;
    });
    if (formData.message) newTouched.message = true;
    setTouched(newTouched);

    if (!validateForm()) {
      setSubmitStatus({ type: 'error', message: 'Please fix the errors in the form before submitting.' });
      return;
    }

    setIsSubmitting(true);

    try {
      // Format phone number
      const formattedData = {
        ...formData,
        phone: formatPhoneNumber(formData.phone),
      };

      // Send email to codekidstech2025@gmail.com
      const emailData = formatPricingEmail(formattedData);
      const emailResult = await sendEmail(emailData);

      if (!emailResult.success) {
        throw new Error(emailResult.error || 'Failed to send email');
      }

      console.log('Form submitted and email sent:', formattedData);

      setSubmitStatus({
        type: 'success',
        message: 'Thank you! Our team will contact you within 24 hours with detailed pricing and schedules.',
      });

      // Reset form
      setFormData({
        name: '',
        role: '',
        class: '',
        mode: '',
        phone: '',
        email: '',
        city: '',
        message: '',
      });
      setTouched({});
      setErrors({});

      // Clear success message after 5 seconds
      setTimeout(() => {
        setSubmitStatus({ type: null, message: '' });
      }, 5000);
    } catch (error) {
      setSubmitStatus({
        type: 'error',
        message: 'Something went wrong. Please try again later or contact us directly at +91 800 893 7902.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhoneNumber(e.target.value);
    setFormData((prev) => ({ ...prev, phone: formatted }));
    
    // Real-time validation for phone
    if (formatted.length > 0) {
      const phoneValidation = validatePhone(formatted, true);
      if (!phoneValidation.isValid && phoneValidation.error) {
        setErrors((prev) => ({ ...prev, phone: phoneValidation.error }));
      } else if (formatted.length === 10 && phoneValidation.isValid) {
        setErrors((prev) => {
          const newErrors = { ...prev };
          if ('phone' in newErrors) {
            const { phone, ...rest } = newErrors;
            return rest;
          }
          return newErrors;
        });
      }
    } else {
      setErrors((prev) => {
        if ('phone' in prev) {
          const { phone, ...rest } = prev;
          return rest;
        }
        return prev;
      });
    }
  };
  
  // Enhanced real-time validation
  const handleFieldChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
    
    // Real-time validation for email if touched
    if (name === 'email' && touched.email && value.length > 0) {
      const emailValidation = validateEmail(value);
      if (!emailValidation.isValid && emailValidation.error) {
        setErrors((prev) => ({ ...prev, email: emailValidation.error }));
      } else if (emailValidation.isValid) {
        setErrors((prev) => {
          if ('email' in prev) {
            const { email, ...rest } = prev;
            return rest;
          }
          return prev;
        });
      }
    }
    
    // Real-time validation for name if touched
    if (name === 'name' && touched.name && value.length > 0) {
      const nameValidation = validateName(value);
      if (!nameValidation.isValid && nameValidation.error) {
        setErrors((prev) => ({ ...prev, name: nameValidation.error }));
      } else if (nameValidation.isValid) {
        setErrors((prev) => {
          if ('name' in prev) {
            const { name, ...rest } = prev;
            return rest;
          }
          return prev;
        });
      }
    }
  };

  return (
    <>
      <Helmet>
        <title>CodeKids Jr Pricing | Affordable Tech Education for Kids | CodeKids Technologies</title>
        <meta name="description" content="CodeKids Jr offers affordable tech education for kids aged 6-16. Online classes starting at ₹100/month, offline classes at ₹150/month. Coding, Robotics, AI, IoT, Game Development courses." />
        <meta name="keywords" content="codekids jr pricing, kids coding classes price, robotics classes for kids, affordable coding courses, online coding classes for kids, offline coding classes" />
      </Helmet>
      <div className="min-h-screen relative bg-gradient-to-b from-[#0F1A30] via-[#050814] to-[#0F1A30]">
        {/* Animated Background */}
        <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDMwaC0yVjBoMnoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-20" />
          <motion.div
            animate={{
              x: [0, 100, 0],
              y: [0, 100, 0],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: 'linear',
            }}
            className="absolute top-20 left-20 w-72 h-72 bg-[#FF4FD8]/10 rounded-full blur-3xl"
          />
          <motion.div
            animate={{
              x: [0, -100, 0],
              y: [0, -100, 0],
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: 'linear',
            }}
            className="absolute bottom-20 right-20 w-96 h-96 bg-[#00E0FF]/10 rounded-full blur-3xl"
          />
        </div>

        {/* Hero Section */}
        <section className="relative min-h-[90vh] flex items-center pt-20 md:pt-0 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-900/80 via-blue-900/80 to-cyan-900/80 dark:from-purple-950/90 dark:via-blue-950/90 dark:to-cyan-950/90" />
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzBoLTJWMGgyeiIvPjwvZz48L2c+PC9zdmc+')] opacity-20" />

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-20">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Left Content */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-white space-y-8"
              >
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2 }}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm border border-white/30"
                >
                  <Sparkles className="h-4 w-4" />
                  <span className="text-sm font-medium">Ages 6–16 • Coding • Robotics • AI • IoT • Game Dev</span>
                </motion.div>

                <div>
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 font-heading leading-tight">
                    World-Class Tech Education for Kids at Just{' '}
                    <span className="block bg-gradient-to-r from-[#FF4FD8] via-[#00E0FF] to-[#3B7CFF] bg-clip-text text-transparent">
                      ₹100–₹150/Month
                    </span>
                  </h1>
                  <p className="text-xl md:text-2xl text-white/90 mb-6 leading-relaxed font-medium">
                    Future-ready skills in Coding, Robotics, AI, IoT, Game Development and more — at pocket-friendly prices designed for every student and every school.
                  </p>
                </div>

                <ul className="space-y-3">
                  {[
                    'Offline classes starting at only ₹150/month per student',
                    'Online live classes starting at just ₹100/month per student',
                    'Summer & Winter Camps at ₹300 only (after 50% OFF)',
                    '3, 6, and 12 month learning journeys',
                  ].map((item, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 + index * 0.1 }}
                      className="flex items-center gap-3 text-lg"
                    >
                      <CheckCircle className="h-6 w-6 text-[#00E0FF] flex-shrink-0" />
                      <span>{item}</span>
                    </motion.li>
                  ))}
                </ul>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, ...smoothTransition }}
                  className="flex flex-col sm:flex-row gap-4"
                >
                  <motion.div
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    transition={springTransition}
                  >
                    <Link
                      to="#pricing-plans"
                      onClick={(e) => handleAnchorClick(e, '#pricing-plans')}
                      className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-[#00E0FF] to-[#3B7CFF] text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-200"
                    >
                      View Pricing & Plans
                      <motion.div
                        animate={{ y: [0, -3, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                      >
                        <ArrowDown className="h-5 w-5" />
                      </motion.div>
                    </Link>
                  </motion.div>
                  <motion.div
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    transition={springTransition}
                  >
                    <Link
                      to="#contact-form"
                      onClick={(e) => handleAnchorClick(e, '#contact-form')}
                      className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full border-2 border-[#FF4FD8] text-white font-semibold hover:bg-[#FF4FD8] transition-all duration-200"
                    >
                      Book Free Demo Class
                      <Calendar className="h-5 w-5" />
                    </Link>
                  </motion.div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 }}
                  className="flex items-center gap-2 text-sm text-white/90 font-medium"
                >
                  <Sparkles className="h-4 w-4 text-[#FF4FD8]" />
                  <span>Special bulk discounts for schools & principals. Partner with CodeKids_JR for your students.</span>
                </motion.div>
              </motion.div>

              {/* Right Content */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 }}
                className="relative"
              >
                <div className="relative h-[600px] rounded-3xl overflow-hidden">
                  <Image
                    src="/assest/kids robotics.jpg"
                    alt="Kids learning coding and robotics"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

                  <motion.div
                    animate={{
                      y: [0, -10, 0],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                    className="absolute bottom-6 left-6 right-6 glass-card p-6 bg-white/20 backdrop-blur-xl border border-white/30"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <ShieldCheck className="h-6 w-6 text-white" />
                      <h3 className="text-xl font-bold text-white">Trusted by Schools, Loved by Parents</h3>
                    </div>
                    <p className="text-white/90 text-sm">Robotics • Coding • AI for Kids</p>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Pricing Intro Section */}
        <section id="pricing-intro" className="relative py-20 z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <ScrollReveal direction="up" className="text-center max-w-4xl mx-auto">
              <motion.h2 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-4xl md:text-5xl font-bold mb-6 font-heading text-white"
              >
                Simple, Transparent & Affordable Pricing
              </motion.h2>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-xl text-white mb-8 leading-relaxed font-semibold"
              >
                One pricing model for all CodeKids_JR courses — Coding, Robotics, AI, IoT, Game Development, Web & App Development.
              </motion.p>
              <motion.div
                variants={staggerContainer}
                initial="initial"
                whileInView="animate"
                viewport={{ once: true, margin: '-50px' }}
                className="flex flex-wrap justify-center gap-4"
              >
                {['No hidden charges', 'Same pricing for all courses', 'Special offers for schools & principals', 'Pay monthly, cancel anytime'].map((item, index) => (
                  <motion.div
                    key={index}
                    variants={staggerItem}
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    transition={springTransition}
                    className="px-6 py-3 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white text-sm font-medium cursor-pointer"
                  >
                    {item}
                  </motion.div>
                ))}
              </motion.div>
            </ScrollReveal>
          </div>
        </section>

        {/* Pricing Plans Section */}
        <section id="pricing-plans" className="relative py-20 z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <ScrollReveal direction="up" className="text-center mb-16">
              <motion.h2
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-4xl md:text-5xl font-bold mb-4 font-heading text-white"
              >
                Monthly Plans for Individual Students
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-xl text-white/90 font-medium"
              >
                Same pricing applies to all CodeKids_JR courses (ages 6–16).
              </motion.p>
            </ScrollReveal>

            <div className="grid md:grid-cols-2 gap-8 mb-12">
              {/* Offline Plan */}
              <motion.div
                {...fadeInLeft}
                whileHover={{ y: -5, scale: 1.02 }}
                transition={springTransition}
              >
                <GlassCard className="relative h-full bg-gradient-to-br from-[#00E0FF]/40 via-[#3B7CFF]/35 to-[#00E0FF]/40 border-2 border-[#00E0FF]/50 p-8 backdrop-blur-xl shadow-2xl" style={{ backgroundColor: 'rgba(15, 26, 48, 0.95)' }}>
                  <div className="absolute top-4 right-4 px-4 py-2 rounded-full bg-gradient-to-r from-[#00E0FF] to-[#3B7CFF] text-white text-sm font-semibold">
                    Most Popular for Schools
                  </div>

                  <div className="mb-6">
                    <h3 className="text-3xl font-bold mb-2 font-heading text-white">Offline Classes</h3>
                    <p className="text-white mb-6 font-semibold">In-person classes at your center or partner school.</p>

                    <div className="mb-4">
                      <div className="flex items-baseline gap-2 mb-2">
                        <span className="text-5xl font-bold text-white">₹150</span>
                        <span className="text-xl text-white/50 line-through">₹300</span>
                      </div>
                      <p className="text-white text-sm font-semibold">per student per month</p>
                    </div>

                    <p className="text-sm text-white/80 mb-6 font-medium">Available as 3, 6, and 12-month programs.</p>
                  </div>

                  <div className="space-y-4 mb-8">
                    <h4 className="font-semibold text-white text-lg">Highlights:</h4>
                    <ul className="space-y-2">
                      {['2 classes per week', 'All JR courses included: Coding, Robotics, AI, IoT, Game Dev, Web & App Dev', 'Modern, fully equipped lab experience', 'Resources & kits provided during sessions'].map((item, index) => (
                        <li key={index} className="flex items-start gap-2 text-white">
                          <CheckCircle className="h-5 w-5 text-[#00E0FF] flex-shrink-0 mt-0.5" />
                          <span className="font-semibold">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="space-y-4 mb-8">
                    <h4 className="font-semibold text-white text-lg">Bonuses:</h4>
                    <ul className="space-y-2">
                      {['Free eBooks & learning materials', 'Access to kids community group', 'Progress tracking for parents', 'Certificate of Completion'].map((item, index) => (
                        <li key={index} className="flex items-start gap-2 text-white">
                          <Gift className="h-5 w-5 text-[#FFC857] flex-shrink-0 mt-0.5" />
                          <span className="font-semibold">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    transition={springTransition}
                  >
                    <Link
                      to="#contact-form"
                      onClick={(e) => handleAnchorClick(e, '#contact-form')}
                      className="block w-full py-4 rounded-full bg-gradient-to-r from-[#00E0FF] to-[#3B7CFF] text-white font-semibold text-center hover:shadow-xl transition-all duration-200"
                    >
                      <span className="flex items-center justify-center gap-2">
                        Enroll in Offline Classes
                        <motion.div
                          animate={{ x: [0, 5, 0] }}
                          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                        >
                          <Rocket className="h-5 w-5" />
                        </motion.div>
                      </span>
                    </Link>
                  </motion.div>
                </GlassCard>
              </motion.div>

              {/* Online Plan */}
              <motion.div
                {...fadeInRight}
                whileHover={{ y: -5, scale: 1.02 }}
                transition={springTransition}
              >
                <GlassCard className="relative h-full bg-gradient-to-br from-[#FF4FD8]/40 via-[#FF4FD8]/35 to-[#FF4FD8]/40 border-2 border-[#FF4FD8]/50 p-8 backdrop-blur-xl shadow-2xl" style={{ backgroundColor: 'rgba(15, 26, 48, 0.95)' }}>
                  <div className="absolute top-4 right-4 px-4 py-2 rounded-full bg-gradient-to-r from-[#FF4FD8] to-[#FF4FD8] text-white text-sm font-semibold">
                    Best for Home Learning
                  </div>

                  <div className="mb-6">
                    <h3 className="text-3xl font-bold mb-2 font-heading text-white">Online Live Classes</h3>
                    <p className="text-white mb-6 font-semibold">Learn from anywhere with live interactive sessions.</p>

                    <div className="mb-4">
                      <div className="flex items-baseline gap-2 mb-2">
                        <span className="text-5xl font-bold text-white">₹100</span>
                        <span className="text-xl text-white/50 line-through">₹200</span>
                      </div>
                      <p className="text-white text-sm font-semibold">per student per month</p>
                    </div>

                    <p className="text-sm text-white/80 mb-6 font-medium">Available as 3, 6, and 12-month programs.</p>
                  </div>

                  <div className="space-y-4 mb-8">
                    <h4 className="font-semibold text-white text-lg">Highlights:</h4>
                    <ul className="space-y-2">
                      {['2 live classes per week', 'All JR courses: Coding, Robotics basics, AI for Kids, Game Dev, Web & App basics', 'Session recordings for revision', 'Doubt clearing & project guidance'].map((item, index) => (
                        <li key={index} className="flex items-start gap-2 text-white">
                          <CheckCircle className="h-5 w-5 text-[#FF4FD8] flex-shrink-0 mt-0.5" />
                          <span className="font-semibold">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="space-y-4 mb-8">
                    <h4 className="font-semibold text-white text-lg">Bonuses:</h4>
                    <ul className="space-y-2">
                      {['Free eBooks & project files', 'Access to kids coding community', 'Parent progress reports', 'Certificate of Completion'].map((item, index) => (
                        <li key={index} className="flex items-start gap-2 text-white">
                          <Gift className="h-5 w-5 text-[#FFC857] flex-shrink-0 mt-0.5" />
                          <span className="font-semibold">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    transition={springTransition}
                  >
                    <Link
                      to="#contact-form"
                      onClick={(e) => handleAnchorClick(e, '#contact-form')}
                      className="block w-full py-4 rounded-full bg-gradient-to-r from-[#FF4FD8] to-[#FF4FD8] text-white font-semibold text-center hover:shadow-xl transition-all duration-200"
                    >
                      <span className="flex items-center justify-center gap-2">
                        Start Online Learning
                        <motion.div
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                        >
                          <PlayCircle className="h-5 w-5" />
                        </motion.div>
                      </span>
                    </Link>
                  </motion.div>
                </GlassCard>
              </motion.div>
            </div>

            <motion.div {...fadeInUp} className="text-center space-y-4">
              <div className="flex items-center justify-center gap-2 text-white">
                <Info className="h-5 w-5 text-[#00E0FF]" />
                <p className="text-sm font-semibold">Pricing is per student per month. Discounted launch pricing (50% OFF) valid for a limited period.</p>
              </div>
              <a
                href="/assest/codekids_jr brochure.pdf"
                download
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full border-2 border-white/30 text-white font-semibold hover:bg-white/10 transition-all duration-200 active:scale-95 min-h-[48px] touch-manipulation"
              >
                Download Full JR Brochure with Pricing
                <Download className="h-5 w-5" />
              </a>
            </motion.div>
          </div>
        </section>

        {/* Duration Section */}
        <section id="duration-section" className="relative py-20 z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <ScrollReveal direction="up" className="text-center mb-12">
              <motion.h2
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-4xl md:text-5xl font-bold mb-4 font-heading text-white"
              >
                Choose Your Learning Journey
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-xl text-white font-semibold"
              >
                Flexible durations for every family and school.
              </motion.p>
            </ScrollReveal>

            <motion.div
              {...fadeInUp}
              whileHover={{ scale: 1.01 }}
              transition={smoothTransition}
            >
              <GlassCard className="bg-gradient-to-br from-white/25 via-white/20 to-white/25 border-2 border-white/40 p-8 backdrop-blur-xl shadow-2xl" style={{ backgroundColor: 'rgba(15, 26, 48, 0.95)' }}>
                <div className="overflow-x-auto">
                  <motion.table
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2, ...smoothTransition }}
                    className="w-full"
                  >
                    <thead>
                      <tr className="border-b border-white/20">
                        <th className="text-left py-4 px-6 text-white font-semibold">Plan</th>
                        <th className="text-center py-4 px-6 text-white font-semibold">3 Months</th>
                        <th className="text-center py-4 px-6 text-white font-semibold">6 Months</th>
                        <th className="text-center py-4 px-6 text-white font-semibold">1 Year</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-white/10">
                        <td className="py-4 px-6 text-white font-bold">Offline Classes (per student)</td>
                        <td className="py-4 px-6 text-center text-white font-bold">₹450<br /><span className="text-sm text-white/80 font-semibold">(150 × 3)</span></td>
                        <td className="py-4 px-6 text-center text-white font-bold">₹900<br /><span className="text-sm text-white/80 font-semibold">(150 × 6)</span></td>
                        <td className="py-4 px-6 text-center text-white font-bold">₹1,800<br /><span className="text-sm text-white/80 font-semibold">(150 × 12)</span></td>
                      </tr>
                      <tr>
                        <td className="py-4 px-6 text-white font-bold">Online Classes (per student)</td>
                        <td className="py-4 px-6 text-center text-white font-bold">₹300<br /><span className="text-sm text-white/80 font-semibold">(100 × 3)</span></td>
                        <td className="py-4 px-6 text-center text-white font-bold">₹600<br /><span className="text-sm text-white/80 font-semibold">(100 × 6)</span></td>
                        <td className="py-4 px-6 text-center text-white font-bold">₹1,200<br /><span className="text-sm text-white/80 font-semibold">(100 × 12)</span></td>
                      </tr>
                    </tbody>
                  </motion.table>
                </div>
                <p className="mt-6 text-center text-white text-sm font-semibold">
                  Schools opting for long-term partnerships (6–12 months) get additional institutional discounts and custom schedules.
                </p>
                <div className="mt-8 text-center">
                  <Link
                    to="#principal-offer"
                    onClick={(e) => handleAnchorClick(e, '#principal-offer')}
                    className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-[#00E0FF] to-[#3B7CFF] text-white font-semibold hover:shadow-xl hover:scale-105 transition-all duration-200 active:scale-95"
                  >
                    Talk to Our Academic Advisor
                    <Phone className="h-5 w-5" />
                  </Link>
                </div>
              </GlassCard>
            </motion.div>
          </div>
        </section>

        {/* Camp Pricing Section */}
        <section id="camp-pricing" className="relative py-20 z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <ScrollReveal direction="up" className="text-center mb-12">
              <motion.h2
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-4xl md:text-5xl font-bold mb-4 font-heading text-white"
              >
                Summer & Winter Camps
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-xl text-white font-semibold"
              >
                High-impact short-term programs in Robotics, Coding, AI, IoT & 3D Printing.
              </motion.p>
            </ScrollReveal>

            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <motion.div {...fadeInLeft}>
                <GlassCard className="bg-gradient-to-br from-[#FF4FD8]/45 via-[#FF4FD8]/35 to-[#FF4FD8]/45 border-2 border-[#FF4FD8]/50 p-8 backdrop-blur-xl shadow-2xl" style={{ backgroundColor: 'rgba(15, 26, 48, 0.95)' }}>
                  <div className="mb-6">
                    <div className="inline-block px-4 py-2 rounded-full bg-gradient-to-r from-[#FF4FD8] to-[#FF4FD8] text-white text-sm font-semibold mb-4">
                      50% OFF Launch Offer
                    </div>
                    <h3 className="text-3xl font-bold mb-4 font-heading text-white">Camp Pricing (Online & Offline)</h3>
                    <div className="flex items-baseline gap-2 mb-2">
                      <span className="text-5xl font-bold text-white">₹300</span>
                      <span className="text-xl text-white/60 line-through">₹600</span>
                    </div>
                    <p className="text-white text-sm mb-6 font-semibold">per student per camp</p>
                  </div>

                  <ul className="space-y-3 mb-8">
                    {['STEM camps for 3rd to 10th Standard', 'Fun + practical project-based learning', 'Robotics • IoT • 3D Printing • Coding • Game Dev', 'Final Project Showcase for parents', 'Certificate of Training'].map((item, index) => (
                      <li key={index} className="flex items-start gap-2 text-white">
                        <CheckCircle className="h-5 w-5 text-[#FF4FD8] flex-shrink-0 mt-0.5" />
                        <span className="font-semibold">{item}</span>
                      </li>
                    ))}
                  </ul>

                  <Link
                    to="#contact-form"
                    onClick={(e) => handleAnchorClick(e, '#contact-form')}
                    className="block w-full py-4 rounded-full bg-gradient-to-r from-[#FF4FD8] to-[#FF4FD8] text-white font-semibold text-center hover:shadow-xl hover:scale-105 transition-all duration-200 active:scale-95"
                  >
                    <span className="flex items-center justify-center gap-2">
                      Reserve Camp Seat
                      <Calendar className="h-5 w-5" />
                    </span>
                  </Link>
                </GlassCard>
              </motion.div>

              <motion.div {...fadeInRight}>
                <div className="relative h-[500px] rounded-3xl overflow-hidden">
                  <Image
                    src="/assest/students learning.jpg"
                    alt="Kids in camp working on projects"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Principal Offer Section */}
        <section id="principal-offer" className="relative py-20 z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <ScrollReveal direction="up" className="text-center mb-12">
              <motion.h2
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-4xl md:text-5xl font-bold mb-4 font-heading text-white"
              >
                Special Partnership Discounts for Schools & Principals
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-xl text-white font-semibold"
              >
                Make your school a future-ready technology campus with CodeKids_JR.
              </motion.p>
            </ScrollReveal>

            <div className="grid lg:grid-cols-2 gap-12">
              <motion.div {...fadeInLeft} className="space-y-8">
                <div>
                  <h3 className="text-2xl font-bold mb-6 font-heading text-white">Exclusive Benefits for School Management</h3>
                  <ul className="space-y-3 mb-8">
                    {['Special discounted pricing for bulk student enrollments', 'Custom schedules and exclusive batches for your school', 'On-campus Tinkering Lab setup support (Robotics, IoT, 3D Printing)', 'Co-branded certificates for your school', 'Teacher training and support for school staff'].map((item, index) => (
                      <li key={index} className="flex items-start gap-2 text-white">
                        <Star className="h-5 w-5 text-[#FFC857] flex-shrink-0 mt-0.5" />
                        <span className="font-semibold">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <GlassCard className="bg-gradient-to-br from-[#FFC857]/45 via-[#FFC857]/35 to-[#FFC857]/45 border-2 border-[#FFC857]/50 p-6 backdrop-blur-xl shadow-2xl" style={{ backgroundColor: 'rgba(15, 26, 48, 0.95)' }}>
                  <div className="flex items-center gap-3 mb-4">
                    <Crown className="h-8 w-8 text-[#FFC857]" />
                    <h4 className="text-xl font-bold font-heading text-white">Principal&apos;s Special Offer</h4>
                  </div>
                  <p className="text-white leading-relaxed font-semibold">
                    Get an extra <strong className="text-white font-bold">10–20% institutional discount</strong> for annual partnerships and whole-school programs.
                  </p>
                </GlassCard>
              </motion.div>

              <motion.div {...fadeInRight} className="space-y-8">
                <GlassCard className="bg-gradient-to-br from-white/25 via-white/20 to-white/25 border-2 border-white/40 p-6 backdrop-blur-xl shadow-2xl" style={{ backgroundColor: 'rgba(15, 26, 48, 0.95)' }}>
                  <MessageSquare className="h-8 w-8 text-[#00E0FF] mb-4" />
                  <p className="text-lg text-white italic mb-6 leading-relaxed font-semibold">
                    &quot;CodeKids_JR transforms classrooms into innovation hubs. Our students now build robots, apps, and AI projects — not just write exams.&quot;
                  </p>
                  <div>
                    <p className="text-white font-bold">Sample School Principal</p>
                    <p className="text-white font-semibold text-sm">Principal, Partner School</p>
                  </div>
                </GlassCard>

                <div className="flex flex-col gap-4">
                  <Link
                    to="#contact-form"
                    onClick={(e) => handleAnchorClick(e, '#contact-form')}
                    className="flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-[#00E0FF] to-[#3B7CFF] text-white font-semibold hover:shadow-xl hover:scale-105 transition-all duration-200 active:scale-95"
                  >
                    Schedule Call with Academic Team
                    <Phone className="h-5 w-5" />
                  </Link>
                  <Link
                    to="#contact-form"
                    onClick={(e) => handleAnchorClick(e, '#contact-form')}
                    className="flex items-center justify-center gap-2 px-8 py-4 rounded-full border-2 border-[#FF4FD8] text-white font-semibold hover:bg-[#FF4FD8]/10 transition-all duration-200 active:scale-95"
                  >
                    Download School Partnership Deck
                    <FileText className="h-5 w-5" />
                  </Link>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Value Section */}
        <section id="value-section" className="relative py-20 z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <ScrollReveal direction="up" className="text-center mb-12">
              <motion.h2
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-4xl md:text-5xl font-bold mb-4 font-heading text-white"
              >
                So Much More Than Just Classes
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-xl text-white font-semibold"
              >
                Every CodeKids_JR student gets these powerful extras — included in the same price.
              </motion.p>
            </ScrollReveal>

            <motion.div
              variants={staggerContainer}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true, margin: '-50px' }}
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {[
                { icon: Cpu, title: 'Real Hands-on Experience', text: 'Kids build real robots, apps, games, IoT systems, and AI mini-projects instead of just theory.' },
                { icon: Trophy, title: 'Certificates & Project Portfolio', text: 'Every child gets Certificates of Completion, Excellence, and a project portfolio to showcase their skills.' },
                { icon: BookOpen, title: 'Free Resources & Kits', text: 'Free eBooks, coding worksheets, and access to robotics / IoT kits during class.' },
                { icon: Users, title: 'Parents & Teacher Meetings', text: 'Regular parent meetings and teacher interactions to track progress and career guidance.' },
                { icon: Gift, title: 'Goodies, Gifts & Scholarships', text: 'Merit students get goodies, rewards, and scholarship opportunities.' },
                { icon: MessageSquare, title: 'Community & Support', text: "Safe kids' community groups, doubt-solving support, and a motivating learning environment." },
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  variants={staggerItem}
                  whileHover={{ y: -8, scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  transition={springTransition}
                >
                  <GlassCard className="h-full text-center p-6 bg-gradient-to-b from-white/25 via-white/20 to-white/25 border border-white/40 backdrop-blur-xl shadow-xl" style={{ backgroundColor: 'rgba(15, 26, 48, 0.95)' }}>
                    <motion.div
                      whileHover={{ rotate: [0, -10, 10, -10, 0], scale: 1.1 }}
                      transition={{ duration: 0.5 }}
                    >
                      <feature.icon className="h-12 w-12 text-[#00E0FF] mx-auto mb-4" />
                    </motion.div>
                    <h3 className="text-xl font-bold mb-3 font-heading text-white">{feature.title}</h3>
                    <p className="text-white leading-relaxed font-semibold">{feature.text}</p>
                  </GlassCard>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Social Proof Section */}
        <section id="social-proof" className="relative py-20 z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <ScrollReveal direction="up" className="text-center mb-12">
              <motion.h2
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-4xl md:text-5xl font-bold mb-4 font-heading text-white"
              >
                Loved by Parents, Trusted by Schools
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-xl text-white font-semibold"
              >
                Real stories from families and institutions who chose CodeKids_JR.
              </motion.p>
            </ScrollReveal>

            <motion.div
              variants={staggerContainer}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true, margin: '-50px' }}
              className="grid md:grid-cols-3 gap-8 mb-12"
            >
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={index}
                  variants={staggerItem}
                  whileHover={{ y: -5, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  transition={springTransition}
                >
                  <GlassCard className="h-full p-6 bg-gradient-to-b from-white/25 via-white/20 to-white/25 border border-white/40 backdrop-blur-xl shadow-xl" style={{ backgroundColor: 'rgba(15, 26, 48, 0.95)' }}>
                    <div className="flex items-center gap-4 mb-4">
                      <motion.div
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        transition={springTransition}
                        className="relative h-16 w-16 rounded-full overflow-hidden ring-2 ring-white/40"
                      >
                        <div className="absolute inset-0">
                          <Image
                            src={testimonial.image}
                            alt={testimonial.name}
                            fill
                            className="object-cover rounded-full"
                            sizes="(max-width: 768px) 100vw, 33vw"
                          />
                        </div>
                      </motion.div>
                      <div>
                        <h4 className="font-semibold text-white text-lg">{testimonial.name}</h4>
                        <p className="text-sm text-white font-medium">{testimonial.role}</p>
                      </div>
                    </div>
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.2, ...smoothTransition }}
                      className="flex gap-1 mb-3"
                    >
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, scale: 0 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.3 + i * 0.1, type: 'spring', stiffness: 200 }}
                        >
                          <Star className="h-4 w-4 text-[#FFC857] fill-[#FFC857]" />
                        </motion.div>
                      ))}
                    </motion.div>
                    <motion.p
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.4, ...smoothTransition }}
                      className="text-white italic leading-relaxed font-semibold"
                    >
                      &quot;{testimonial.text}&quot;
                    </motion.p>
                  </GlassCard>
                </motion.div>
              ))}
            </motion.div>

            <motion.div {...fadeInUp} className="text-center">
              <motion.div
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                transition={springTransition}
              >
                <Link
                  to="#contact-form"
                  onClick={(e) => handleAnchorClick(e, '#contact-form')}
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-[#FF4FD8] to-[#FF4FD8] text-white font-semibold hover:shadow-xl transition-all duration-200"
                >
                  Join the CodeKids_JR Family
                  <motion.div
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                  >
                    <Rocket className="h-5 w-5" />
                  </motion.div>
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* FAQ Section */}
        <section id="faq" className="relative py-20 z-10">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-center mb-12"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-4 font-heading text-white">
                Frequently Asked Questions
              </h2>
              <p className="text-white/70 text-lg">
                Common questions about CodeKids_JR pricing and programs
              </p>
            </motion.div>

            <motion.div
              variants={staggerContainer}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true, margin: '-50px' }}
            >
              <Accordion type="single" collapsible className="space-y-4">
                {faqs.map((faq, index) => (
                  <motion.div
                    key={index}
                    variants={staggerItem}
                    whileHover={{ x: 5 }}
                    transition={smoothTransition}
                  >
                    <AccordionItem
                      value={`item-${index}`}
                      className="glass-card border-2 border-white/20 hover:border-[#00E0FF]/40 rounded-xl overflow-hidden transition-all duration-300"
                    >
                      <AccordionTrigger className="px-6 py-4 text-left text-white hover:text-[#00E0FF] transition-colors">
                        {faq.q}
                      </AccordionTrigger>
                      <AccordionContent className="px-6 pb-4 text-white leading-relaxed font-semibold">
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={smoothTransition}
                        >
                          {faq.a}
                        </motion.div>
                      </AccordionContent>
                    </AccordionItem>
                  </motion.div>
                ))}
              </Accordion>
            </motion.div>
          </div>
        </section>

        {/* Contact Form Section */}
        <section id="contact-form" className="relative py-20 z-10">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <ScrollReveal direction="up">
              <GlassCard className="bg-gradient-to-br from-[#FF4FD8]/45 via-[#00E0FF]/35 to-[#FF4FD8]/45 border-2 border-[#FF4FD8]/50 p-8 md:p-12 backdrop-blur-xl shadow-2xl" style={{ backgroundColor: 'rgba(15, 26, 48, 0.95)' }}>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="text-center mb-8"
                >
                  <h2 className="text-4xl md:text-5xl font-bold mb-4 font-heading text-white">
                    Get Detailed Pricing, Schedules & Demo Access
                  </h2>
                  <p className="text-xl text-white font-semibold">
                    Whether you&apos;re a parent or a school principal, we&apos;re here to help you design the perfect plan.
                  </p>
                </motion.div>

                {submitStatus.type && (
                  <FormMessage
                    type={submitStatus.type}
                    message={submitStatus.message}
                    className="mb-6"
                  />
                )}

                <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-white font-semibold mb-2">Full Name *</label>
                      <input
                        id="name"
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        onBlur={() => handleBlur('name')}
                        className={`w-full px-4 py-3 rounded-lg bg-white/10 border text-white placeholder-white/40 transition-all ${
                          errors.name && touched.name
                            ? 'border-red-500 focus:ring-red-500'
                            : 'border-white/20 focus:ring-[#00E0FF]'
                        } focus:outline-none focus:ring-2`}
                        placeholder="Enter your full name"
                        aria-invalid={errors.name && touched.name ? 'true' : 'false'}
                        aria-describedby={errors.name && touched.name ? 'name-error' : undefined}
                      />
                      {errors.name && touched.name && (
                        <FormFieldError id="name-error" error={errors.name} />
                      )}
                    </div>
                    <div>
                      <label htmlFor="role" className="block text-white font-semibold mb-2">Role *</label>
                      <select
                        id="role"
                        name="role"
                        value={formData.role}
                        onChange={handleInputChange}
                        onBlur={() => handleBlur('role')}
                        className={`w-full px-4 py-3 rounded-lg bg-white/10 border text-white transition-all ${
                          errors.role && touched.role
                            ? 'border-red-500 focus:ring-red-500'
                            : 'border-white/20 focus:ring-[#00E0FF]'
                        } focus:outline-none focus:ring-2`}
                        style={{ colorScheme: 'dark' }}
                        aria-invalid={errors.role && touched.role ? 'true' : 'false'}
                        aria-describedby={errors.role && touched.role ? 'role-error' : undefined}
                      >
                        <option value="">Select your role</option>
                        <option value="parent">Parent</option>
                        <option value="student">Student</option>
                        <option value="principal">Principal</option>
                        <option value="school-owner">School Owner</option>
                      </select>
                      {errors.role && touched.role && (
                        <FormFieldError id="role-error" error={errors.role} />
                      )}
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-white font-medium mb-2">Child&apos;s Class / Grade</label>
                      <input
                        type="text"
                        name="class"
                        value={formData.class}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-blue-300 focus:outline-none focus:ring-2 focus:ring-[#00E0FF]"
                        placeholder="e.g., 7th Standard"
                      />
                    </div>
                    <div>
                      <label htmlFor="mode" className="block text-white font-semibold mb-2">Preferred Mode *</label>
                      <select
                        id="mode"
                        name="mode"
                        value={formData.mode}
                        onChange={handleInputChange}
                        onBlur={() => handleBlur('mode')}
                        className={`w-full px-4 py-3 rounded-lg bg-white/10 border text-white transition-all ${
                          errors.mode && touched.mode
                            ? 'border-red-500 focus:ring-red-500'
                            : 'border-white/20 focus:ring-[#00E0FF]'
                        } focus:outline-none focus:ring-2`}
                        style={{ colorScheme: 'dark' }}
                        aria-invalid={errors.mode && touched.mode ? 'true' : 'false'}
                        aria-describedby={errors.mode && touched.mode ? 'mode-error' : undefined}
                      >
                        <option value="">Select mode</option>
                        <option value="online">Online</option>
                        <option value="offline">Offline</option>
                        <option value="both">Both</option>
                      </select>
                      {errors.mode && touched.mode && (
                        <FormFieldError id="mode-error" error={errors.mode} />
                      )}
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="phone" className="block text-white font-semibold mb-2">Mobile Number *</label>
                      <input
                        id="phone"
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handlePhoneChange}
                        onBlur={() => handleBlur('phone')}
                        maxLength={10}
                        className={`w-full px-4 py-3 rounded-lg bg-white/10 border text-white placeholder-white/40 transition-all ${
                          errors.phone && touched.phone
                            ? 'border-red-500 focus:ring-red-500'
                            : 'border-white/20 focus:ring-[#00E0FF]'
                        } focus:outline-none focus:ring-2`}
                        placeholder="10-digit phone number"
                        aria-invalid={errors.phone && touched.phone ? 'true' : 'false'}
                        aria-describedby={errors.phone && touched.phone ? 'phone-error' : undefined}
                      />
                      {errors.phone && touched.phone && (
                        <FormFieldError id="phone-error" error={errors.phone} />
                      )}
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-white font-semibold mb-2">Email *</label>
                      <input
                        id="email"
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        onBlur={() => handleBlur('email')}
                        className={`w-full px-4 py-3 rounded-lg bg-white/10 border text-white placeholder-white/40 transition-all ${
                          errors.email && touched.email
                            ? 'border-red-500 focus:ring-red-500'
                            : 'border-white/20 focus:ring-[#00E0FF]'
                        } focus:outline-none focus:ring-2`}
                        placeholder="your.email@example.com"
                        aria-invalid={errors.email && touched.email ? 'true' : 'false'}
                        aria-describedby={errors.email && touched.email ? 'email-error' : undefined}
                      />
                      {errors.email && touched.email && (
                        <FormFieldError id="email-error" error={errors.email} />
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-white font-medium mb-2">City</label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-blue-300 focus:outline-none focus:ring-2 focus:ring-[#00E0FF]"
                      placeholder="Enter your city"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-white font-semibold mb-2">Message / Requirements</label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      onBlur={() => handleBlur('message')}
                      rows={4}
                      maxLength={1000}
                      className={`w-full px-4 py-3 rounded-lg bg-white/10 border text-white placeholder-white/40 transition-all resize-none ${
                        errors.message && touched.message
                          ? 'border-red-500 focus:ring-red-500'
                          : 'border-white/20 focus:ring-[#00E0FF]'
                      } focus:outline-none focus:ring-2`}
                      placeholder="Tell us about your requirements..."
                      aria-invalid={errors.message && touched.message ? 'true' : 'false'}
                      aria-describedby={errors.message && touched.message ? 'message-error' : 'message-help'}
                    />
                    <p id="message-help" className="text-xs text-white/60 mt-1">
                      {formData.message.length}/1000 characters
                    </p>
                    {errors.message && touched.message && (
                      <FormFieldError id="message-error" error={errors.message} />
                    )}
                  </div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3, ...smoothTransition }}
                    className="flex flex-col sm:flex-row gap-4 pt-4"
                  >
                    <motion.button
                      type="submit"
                      disabled={isSubmitting}
                      whileHover={!isSubmitting ? { scale: 1.05, y: -2 } : {}}
                      whileTap={!isSubmitting ? { scale: 0.95 } : {}}
                      transition={springTransition}
                      className="flex-1 flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-[#00E0FF] to-[#3B7CFF] text-white font-semibold hover:shadow-xl transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="h-5 w-5 animate-spin" />
                          Submitting...
                        </>
                      ) : (
                        <>
                          Request Call & Detailed Pricing
                          <motion.div
                            animate={{ x: [0, 3, 0] }}
                            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                          >
                            <Phone className="h-5 w-5" />
                          </motion.div>
                        </>
                      )}
                    </motion.button>
                    <motion.div
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      transition={springTransition}
                    >
                      <Link
                        to="/contact?type=demo"
                        className="flex-1 flex items-center justify-center gap-2 px-8 py-4 rounded-full border-2 border-[#FF4FD8] text-white font-semibold hover:bg-[#FF4FD8]/10 transition-all duration-200"
                      >
                        Book Free Demo Class
                        <motion.div
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                        >
                          <Video className="h-5 w-5" />
                        </motion.div>
                      </Link>
                    </motion.div>
                  </motion.div>

                  <p className="text-center text-white text-sm font-semibold">
                    Response within 24 hours. Our academic advisor will help you choose the right course and duration based on your child&apos;s interests and school requirements.
                  </p>
                </form>
              </GlassCard>
            </ScrollReveal>
          </div>
        </section>
      </div>
    </>
  );
}
