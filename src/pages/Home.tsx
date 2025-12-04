import { useState, useEffect, useRef, memo, useMemo, useCallback } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import SEO from '@/components/SEO';
import { generateOrganizationStructuredData } from '@/lib/seo-utils';
import { 
  Rocket, Sparkles, Trophy, Users, Lightbulb, Star, 
  Code, Brain, Zap, ChevronLeft, ChevronRight, CheckCircle, Award,
  ArrowRight, TrendingUp, Heart, Building2, GraduationCap,
  PlayCircle, Target, Briefcase, MessageSquare, Globe, Network,
  ExternalLink, Handshake, Quote, Download, UserCheck, FileText, Eye
} from 'lucide-react';
import { GlassCard } from '@/components/ui/glass-card';
import { handleAnchorClick, smoothScrollToElement } from '@/lib/smooth-scroll';
import Image from '@/components/Image';
import { 
  staggerContainer, staggerItem, springTransition
} from '@/lib/animations';
import { 
  MagneticButton, 
  ParallaxSection, 
  GlowEffect, 
  TextReveal, 
  ParticleBackground,
  ShimmerText,
  BlurFade,
  ImageReveal
} from '@/components/effects';

// Hero carousel slides
const heroSlides = [
  {
    title: 'Build a High-Paying Tech Career with CodeKids Pro',
    description: 'Master AI, Full-Stack, Data Science, Cybersecurity, UI/UX & More with',
    subDescription: 'LIVE classes, real projects, expert mentors, and a complete job-ready roadmap.',
    tagline: 'Your journey from beginner to professional starts here.',
    image: '/assest/home page slide1.png',
    type: 'pro',
    ctaButtons: [
      { label: 'Book a Free Demo Class', href: '/codekids-pro#contact', variant: 'primary' },
      { label: 'Explore Programs', href: '/codekids-pro', variant: 'secondary' },
    ],
  },
  {
    title: 'We Build Your Entire Career (Not Just Skills)',
    description: 'Resume ✔ Portfolio ✔ LinkedIn ✔ GitHub ✔ Job Portals ✔ Interview Prep',
    subDescription: 'At CodeKids Pro, we do more than teach — we build, optimize, and launch your entire career profile, including:',
    image: '/assest/home page slide 2.png',
    type: 'pro',
    features: [
      '✨ Resume created for you',
      '✨ Hosted portfolio website',
      '✨ LinkedIn & GitHub makeover',
      '✨ Naukri / Indeed profile optimization',
      '✨ Professional self-intro video',
      '✨ Mock interviews & placement support',
    ],
    tagline: 'Everything you need to stand out and get hired.',
    ctaButtons: [
      { label: 'See How We Make You Job-Ready', href: '/codekids-pro', variant: 'primary' },
      { label: 'Download Brochure', href: '/assest/codekids_pro Brochure.pdf', variant: 'secondary', download: true },
    ],
  },
  {
    title: 'Future-Ready Skills for Kids (Ages 6–16)',
    description: 'Coding, Robotics & AI Made Fun, Simple & Powerful',
    subDescription: 'Give your child the skills of tomorrow through interactive learning in',
    tagline: 'Coding • Robotics • AI • App Development • Design • Innovation',
    description2: 'With real projects, certificates, portfolio websites & live classes — your child becomes confident, creative, and future-ready.',
    image: '/assest/kids robotics.jpg',
    type: 'jr',
    ctaButtons: [
      { label: 'Book a Free Demo Class', href: '/codekids-jr#contact', variant: 'primary' },
      { label: 'Explore Courses', href: '/codekids-jr', variant: 'secondary' },
    ],
  },
  {
    title: 'A Complete Technology Education Program for Schools',
    description: 'Coding • Robotics • AI • Digital Skills • Innovation Labs',
    subDescription: 'CodeKids_Jr provides schools with a full plug-and-play solution:',
    image: '/assest/codekids jr learning.jpg',
    type: 'jr',
    features: [
      '✔ Curriculum + Lesson Plans',
      '✔ Robotics & AI Lab Setup',
      '✔ Trained Instructors',
      '✔ Project Assessments & Dashboard',
      '✔ Annual TechFest & Competitions',
    ],
    tagline: 'Empower your students with world-class future-skills without adding extra workload to your teachers.',
    ctaButtons: [
      { label: 'Partner With Us', href: '/codekids-jr#contact', variant: 'primary' },
      { label: 'Download School Proposal', href: '/assest/codekids_jr brochure.pdf', variant: 'secondary', download: true },
    ],
  },
];

// Programs overview
const programs = [
  {
    title: 'CodeKids Jr',
    description: 'Offline school programs for ages 6-17. Robotics, coding, and STEM camps with hands-on learning experiences.',
    icon: Rocket,
    color: 'from-pink-500 to-rose-500',
    href: '/codekids-jr',
    features: ['100+ Partner Schools', 'Hands-on Learning', 'Age 6-17'],
    image: '/assest/codekids jr learning.jpg',
    imageDescription: 'Students learning robotics and coding',
  },
  {
    title: 'CodeKids Pro',
    description: 'Online courses for graduates. Job-ready skills with placement assistance and industry projects.',
    icon: GraduationCap,
    color: 'from-purple-500 to-indigo-500',
    href: '/codekids-pro',
    features: ['95% Success Rate', 'Industry Projects', 'Job Placement'],
    image: '/assest/online classes.jpg',
    imageDescription: 'Professional coding and development training',
  },
];

// Gallery images for Learning in Action section
// Note: This is reserved for future use
// @ts-ignore - Reserved for future use
export const _galleryImages: any[] = [
  {
    src: '/assest/kids robotics.jpg',
    title: 'Robotics & Interaction',
    category: 'Robotics',
    description: 'Students learning hands-on robotics with interactive robots',
  },
  {
    src: '/assest/coding.jpg',
    title: 'Coding & Development',
    category: 'Programming',
    description: 'Immersive coding sessions to build real-world applications',
  },
  {
    src: '/assest/ai tools learning.jpg',
    title: 'AI & Machine Learning',
    category: 'Artificial Intelligence',
    description: 'Exploring AI concepts and machine learning algorithms',
  },
  {
    src: '/assest/drone.jpg',
    title: 'Drone Technology',
    category: 'Aerial Tech',
    description: 'Learning drone programming and aerial photography',
  },
  {
    src: '/assest/codekids jr learning.jpg',
    title: 'Interactive Learning',
    category: 'Education',
    description: 'Engaging classroom experiences with modern technology',
  },
  {
    src: '/assest/codekids jr projects.jpg',
    title: 'Project Building',
    category: 'Projects',
    description: 'Creating innovative projects and prototypes',
  },
  {
    src: '/assest/students learning.jpg',
    title: 'Collaborative Learning',
    category: 'Teamwork',
    description: 'Students working together on exciting projects',
  },
  {
    src: '/assest/codekids jr students classes.jpg',
    title: 'Classroom Innovation',
    category: 'Innovation',
    description: 'Modern learning environments fostering creativity',
  },
  {
    src: '/assest/online classes.jpg',
    title: 'Online Learning',
    category: 'Digital Education',
    description: 'Flexible online classes with expert instructors',
  },
  {
    src: '/assest/enjoy learning.jpg',
    title: 'Enjoy Learning',
    category: 'Engagement',
    description: 'Making learning fun and enjoyable for all students',
  },
  {
    src: '/assest/love to learn.jpg',
    title: 'Passion for Learning',
    category: 'Motivation',
    description: 'Inspiring students to develop a lifelong love for learning',
  },
  {
    src: '/assest/working.jpg',
    title: 'Hands-On Work',
    category: 'Practical Skills',
    description: 'Students applying their knowledge through practical projects',
  },
];

// Features with counter values
const features = [
  { icon: Users, value: 1250, suffix: '+', label: 'Students', description: 'Trusted by students across India', color: 'from-green-500 to-emerald-500' },
  { icon: Star, value: 4.9, suffix: '/5', label: 'Rating', description: 'Highly satisfied parents and schools', color: 'from-yellow-500 to-orange-500', isDecimal: true },
  { icon: Building2, value: 20, suffix: '+', label: 'Schools', description: 'Partnered with leading institutions', color: 'from-blue-500 to-cyan-500' },
  { icon: Trophy, value: 500, suffix: '+', label: 'Awards', description: 'Recognized excellence in education', color: 'from-purple-500 to-pink-500' },
];

// Key features
const keyFeatures = [
  { icon: Rocket, title: 'Hands-On Learning', description: 'Practical projects and real-world applications' },
  { icon: Code, title: 'Expert Instructors', description: 'Industry professionals and certified teachers' },
  { icon: Brain, title: 'Innovative Curriculum', description: 'Cutting-edge content aligned with industry needs' },
  { icon: Zap, title: 'Career Support', description: 'Placement assistance and career guidance' },
];

// Testimonials
const testimonials = [
  {
    name: 'Aarav Sharma',
    role: 'Grade 8 Student',
    school: 'Delhi Public School',
    text: 'The robotics camp changed my perspective on technology. I built my first robot and now I want to become a robotics engineer!',
    rating: 5,
    image: '/assest/codekids_jr testimonial.jpg',
  },
  {
    name: 'Priya Patel',
    role: 'Grade 10 Student',
    school: 'Ryan International School',
    text: 'Learning AI and coding through CodeKids has been amazing. The teachers are patient and make everything fun.',
    rating: 5,
    image: '/assest/codekids_jr testimonial2.jpg',
  },
  {
    name: 'Mrs. Meera Kapoor',
    relation: 'Mother of Grade 7 student',
    text: 'My daughter has become more confident and curious about technology. CodeKids has truly transformed her interest in STEM.',
    image: '/assest/parents.jpg',
  },
  {
    name: 'Arjun Reddy',
    role: 'Grade 9 Student',
    school: 'Kendriya Vidyalaya',
    text: 'I participated in the drone racing competition and won second place! It was the best experience ever.',
    rating: 5,
    image: '/assest/codekids_jr testimonial3.jpg',
  },
];

// Strategic Collaborations
const collaborations = [
  {
    name: 'CodingJr',
    logo: '/assest/coding_jr_logo.png',
    url: 'https://www.codingjr.online/',
    tagline: 'AI, Robotics & Coding for Schools',
    description: 'CodingJr is an Edu-Tech company specialising in delivering integrated technology curricula to schools in the fields of Artificial Intelligence, Robotics, Data Science, and Coding for young learners. Their ecosystem includes Virtual Labs, Animated Presentations, a Learning Mobile App, and AI-Based Assessments. CodingJr empowers schools to digitize and implement technology seamlessly, enhancing the learning experience for students across Grades 1–10.',
    features: [
      'Virtual labs for coding & robotics',
      'Animated video lessons',
      'AI-based adaptive assessments',
      'Mobile learning app for students',
      'Integrated school curriculum',
    ],
    cta: {
      label: 'Visit CodingJr',
      link: 'https://www.codingjr.online/',
    },
    color: 'from-pink-500 to-rose-500',
    icon: Rocket,
  },
  {
    name: 'Coding Pro',
    logo: '/assest/coding_pro.png',
    url: 'https://codingpro.online/',
    tagline: 'Advanced Tech Programs for College Students',
    description: 'Coding Pro is a leading Edu-Tech platform offering advanced and industry-aligned technology courses for Engineering and Degree students. Their programs include App Development, Web Development, Game Development, Artificial Intelligence, Cyber Security, IoT, Networking, and more. Coding Pro has also developed the world\'s first Generative AI Visual HR Tool, helping students and professionals enhance their employability.',
    features: [
      'Advanced AI & ML courses',
      'Full-stack development programs',
      'Cybersecurity & IoT training',
      'Offline & online training models',
      'World\'s first generative AI visual HR tool',
    ],
    cta: {
      label: 'Visit Coding Pro',
      link: 'https://codingpro.online/',
    },
    color: 'from-purple-500 to-indigo-500',
    icon: GraduationCap,
  },
  {
    name: 'CodeKids Technologies',
    logo: '/assest/codekids_finallogo.jpg',
    tagline: 'Unified Technology Learning Ecosystem',
    description: 'Through its collaboration with CodingJr and Coding Pro, CodeKids Technologies offers a complete learning pathway from school to college — integrating foundational STEM education with advanced, industry-ready technology training. Together, we deliver India\'s most comprehensive future-skills education ecosystem.',
    features: [
      'School to Career Learning Pathway',
      'AI, Robotics, Coding & STEM',
      'Industry-ready advanced tech programs',
      'Digital tools, virtual labs & AI assessment',
      'Internship simulations & projects',
    ],
    color: 'from-cyan-500 to-blue-500',
    icon: Handshake,
  },
];

const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 }
};

// Counter hook for animated numbers
function useCounter(end: number, duration: number = 2000, startAnimation: boolean = false, isDecimal: boolean = false) {
  const [count, setCount] = useState(0);
  const animationRef = useRef<number | null>(null);

  useEffect(() => {
    if (!startAnimation) {
      setCount(0);
      return;
    }

    // Reset count when animation starts
    setCount(0);
    
    let startTime: number | null = null;
    const startValue = 0;
    const endValue = end;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Enhanced easing function for smooth, natural animation
      const easeOutCubic = 1 - Math.pow(1 - progress, 3);
      
      const currentValue = startValue + (endValue - startValue) * easeOutCubic;
      
      if (isDecimal) {
        setCount(parseFloat(currentValue.toFixed(1)));
      } else {
        setCount(Math.floor(currentValue));
      }

      if (progress < 1) {
        animationRef.current = requestAnimationFrame(animate);
      } else {
        // Ensure we end exactly at the target value
        setCount(end);
      }
    };

    animationRef.current = requestAnimationFrame(animate);
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [end, duration, startAnimation, isDecimal]);

  return count;
}

// Stat Card Component - Memoized for performance
const StatCard = memo(function StatCard({ feature, index }: { feature: typeof features[0], index: number }) {
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  useEffect(() => {
    // Start animation when element comes into view
    if (isInView && !hasAnimated) {
      const timer = setTimeout(() => {
        setHasAnimated(true);
      }, index * 200);
      return () => clearTimeout(timer);
    }
  }, [isInView, hasAnimated, index]);
  
  // Fallback: Auto-start after page load if section is visible
  useEffect(() => {
    const checkAndStart = () => {
      if (!hasAnimated && ref.current) {
        const rect = ref.current.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight + 400 && rect.bottom > -400;
        if (isVisible) {
          setTimeout(() => {
            setHasAnimated(true);
          }, index * 200 + 800);
        }
      }
    };
    
    // Check after component mounts
    const timer = setTimeout(checkAndStart, 500);
    return () => clearTimeout(timer);
  }, [hasAnimated, index]);
  
  const counter = useCounter(feature.value, 2500, hasAnimated, feature.isDecimal);
  
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      className="text-center group h-full"
    >
      <GlassCard className="p-4 sm:p-5 md:p-6 lg:p-8 h-full hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-2xl border border-border/50 hover:border-primary/20 bg-white/50 dark:bg-secondary/50 backdrop-blur-sm relative overflow-hidden">
        {/* Gradient Background on Hover */}
        <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
        
        {/* Icon Badge */}
        <motion.div
          whileHover={{ scale: 1.15, rotate: 360 }}
          transition={{ duration: 0.6 }}
          className={`h-16 w-16 sm:h-20 sm:w-20 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center mx-auto mb-4 sm:mb-6 shadow-xl relative overflow-hidden group-hover:shadow-2xl`}
        >
          <feature.icon className="h-8 w-8 sm:h-10 sm:w-10 text-white relative z-10" />
          <motion.div
            className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-100 blur-xl`}
            animate={{
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
            }}
          />
        </motion.div>
        
        {/* Counter Value with Enhanced Animation */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5, y: 20 }}
          animate={hasAnimated ? { opacity: 1, scale: 1, y: 0 } : {}}
          transition={{ delay: index * 0.15 + 0.2, duration: 0.6, ease: [0.6, -0.05, 0.01, 0.99] }}
          className="mb-2 relative"
        >
          <motion.div
            className={`text-3xl sm:text-4xl md:text-5xl font-extrabold bg-gradient-to-r ${feature.color} bg-clip-text text-transparent relative inline-block`}
            animate={hasAnimated ? { 
              scale: [1, 1.1, 1],
              filter: ['brightness(1)', 'brightness(1.2)', 'brightness(1)']
            } : {}}
            transition={{ 
              duration: 0.5, 
              delay: index * 0.15 + 0.2,
              times: [0, 0.5, 1]
            }}
          >
            <span className="tabular-nums">
              {feature.isDecimal ? counter.toFixed(1) : counter.toLocaleString()}
            </span>
            <motion.span
              initial={{ opacity: 0, x: -10 }}
              animate={hasAnimated ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: index * 0.15 + 0.8, duration: 0.3 }}
              className="inline-block"
            >
              {feature.suffix}
            </motion.span>
          </motion.div>
          {/* Pulse effect during animation */}
          {hasAnimated && counter < feature.value && (
            <motion.div
              className={`absolute -inset-2 bg-gradient-to-r ${feature.color} opacity-20 blur-xl rounded-full`}
              animate={{ 
                scale: [1, 1.3, 1],
                opacity: [0.1, 0.3, 0.1]
              }}
              transition={{ 
                duration: 1.5, 
                repeat: Infinity,
                ease: 'easeInOut'
              }}
            />
          )}
          {/* Completion glow effect */}
          {hasAnimated && counter >= feature.value && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: [0, 1.5, 1], opacity: [0, 0.3, 0] }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className={`absolute -inset-2 bg-gradient-to-r ${feature.color} blur-2xl rounded-full`}
            />
          )}
        </motion.div>
        
        {/* Label */}
        <h3 className="text-lg sm:text-xl font-bold text-foreground mb-2 font-heading">
          {feature.label}
        </h3>
        
        {/* Description */}
        <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
          {feature.description}
        </p>
        
        {/* Decorative Elements */}
        <motion.div
          className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity"
          animate={{
            rotate: [0, 180, 360],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            delay: index * 0.2,
          }}
        >
          <Sparkles className="h-4 w-4 text-primary/50" />
        </motion.div>
        
        {/* Shine Effect */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 opacity-0 group-hover:opacity-100"
          animate={{
            x: ['-200%', '200%'],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            repeatDelay: 2,
            ease: 'linear',
          }}
        />
      </GlassCard>
    </motion.div>
  );
});

export default function HomePage() {
  const navigate = useNavigate();
  const location = useLocation();
  const pathname = location.pathname;
  const [currentSlide, setCurrentSlide] = useState(0);
  const [particlePositions, setParticlePositions] = useState<Array<{ left: number; top: number }>>([]);

  // Memoize hero slides to prevent recalculation
  const heroSlidesMemo = useMemo(() => heroSlides, []);

  // Optimize slide transition with useCallback
  const handleSlideChange = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % heroSlidesMemo.length);
  }, [heroSlidesMemo.length]);

  useEffect(() => {
    const timer = setInterval(handleSlideChange, 5000);
    return () => clearInterval(timer);
  }, [handleSlideChange]);

  // Generate particle positions on client side only to avoid hydration mismatch
  // Reduced particle count for better performance (20 -> 15)
  useEffect(() => {
    setParticlePositions(
      Array.from({ length: 15 }, () => ({
        left: Math.random() * 100,
        top: Math.random() * 100,
      }))
    );
  }, []);

  return (
    <>
      <SEO
        title="Best Coding Courses for Kids & Students | STEM Education India"
        description="CodeKids Technologies offers the best coding courses for kids, robotics training for students, AI & ML programs, and job-ready tech skills. Leading STEM education platform in India for schools and colleges."
        keywords="coding for kids, robotics for children, AI education, STEM programs, coding courses, tech education India, programming for kids, online coding classes, robotics training, AI ML courses"
        canonical="https://codekidstech.com"
        ogImage="/assest/codekids_finallogo.jpg"
        structuredData={generateOrganizationStructuredData()}
      />
      <div className="min-h-screen">
        {/* Hero Section with Carousel */}
        <section className="relative min-h-[85vh] sm:min-h-[90vh] min-h-[600px] sm:min-h-[700px] overflow-visible pt-20 md:pt-0 z-10 isolate pb-8 sm:pb-12 md:pb-16">
          {/* Floating Orbs Background - Hidden on mobile, smaller on tablet */}
          <motion.div
            animate={{
              x: [0, 100, 0],
              y: [0, 100, 0],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="hidden md:block absolute top-20 left-20 w-64 h-64 md:w-96 md:h-96 bg-gradient-to-br from-purple-500/20 via-blue-500/20 to-cyan-500/20 rounded-full blur-3xl z-0"
          />
          <motion.div
            animate={{
              x: [0, -100, 0],
              y: [0, -100, 0],
              scale: [1, 1.3, 1],
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: 2,
            }}
            className="hidden md:block absolute bottom-20 right-20 w-[300px] h-[300px] md:w-[500px] md:h-[500px] bg-gradient-to-br from-pink-500/20 via-purple-500/20 to-cyan-500/20 rounded-full blur-3xl z-0"
          />

          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.8 }}
              className="absolute inset-0 z-0 pointer-events-none"
            >
              {/* Background Image using React Image for proper loading */}
              <Image
                src={heroSlides[currentSlide].image}
                alt={heroSlides[currentSlide].title}
                fill
                priority={currentSlide === 0}
                className="object-cover"
                sizes="100vw"
                style={{ zIndex: 0 }}
              />
              {/* Preload next image for smooth transition */}
              {heroSlides[(currentSlide + 1) % heroSlides.length] && (
                <Image
                  src={heroSlides[(currentSlide + 1) % heroSlides.length].image}
                  alt=""
                  fill
                  className="hidden"
                  sizes="100vw"
                />
              )}
              {/* Gradient Overlay - Much lighter to show images clearly */}
              <div className={`absolute inset-0 bg-gradient-to-br z-10 pointer-events-none ${
                heroSlides[currentSlide].type === 'pro' 
                  ? 'from-purple-900/40 via-blue-900/40 to-cyan-900/40 dark:from-purple-950/50 dark:via-blue-950/50 dark:to-cyan-950/50'
                  : 'from-pink-900/40 via-purple-900/40 to-blue-900/40 dark:from-pink-950/50 dark:via-purple-950/50 dark:to-blue-950/50'
              }`} />
              {/* Additional dark overlay at bottom for text readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-10 pointer-events-none" />
              {/* Pattern Overlay - Very subtle texture */}
              <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzBoLTJWMGgyeiIvPjwvZz48L2c+PC9zdmc+')] opacity-10 z-10 pointer-events-none" />
              
              {/* Parallax Effect Particles */}
              {particlePositions.map((pos, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 bg-white/30 rounded-full z-[5]"
                  style={{
                    left: `${pos.left}%`,
                    top: `${pos.top}%`,
                  }}
                  animate={{
                    y: [0, -50, 0],
                    opacity: [0.2, 1, 0.2],
                    scale: [1, 2, 1],
                  }}
                  transition={{
                    duration: 3 + (i % 3),
                    repeat: Infinity,
                    delay: i * 0.1,
                    ease: 'easeInOut',
                  }}
                />
              ))}
            </motion.div>
          </AnimatePresence>

          <div className="relative z-30 min-h-[85vh] sm:min-h-[90vh] flex items-center py-8 sm:py-12 md:py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="max-w-4xl text-white relative z-30"
              >
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4 }}
                  className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-white/20 backdrop-blur-sm mb-4 sm:mb-6 border border-white/30"
                >
                  <Sparkles className="h-3 w-3 sm:h-4 sm:w-4" />
                  <span className="text-xs sm:text-sm font-medium">Future-Ready Education</span>
                </motion.div>

                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentSlide}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5 }}
                    className="space-y-3 sm:space-y-4 md:space-y-6"
                  >
                    <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-bold mb-4 sm:mb-5 md:mb-6 font-heading leading-[1.1] tracking-tight">
                      <ShimmerText className="block">
                        {heroSlides[currentSlide].title}
                      </ShimmerText>
                    </h1>
                    
                    <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-white/95 leading-relaxed max-w-4xl font-semibold">
                      {heroSlides[currentSlide].description}
                    </p>
                    
                    {heroSlides[currentSlide].subDescription && (
                      <p className="text-sm sm:text-base md:text-lg lg:text-xl text-white/90 leading-relaxed max-w-4xl mb-3 sm:mb-4 mt-2 sm:mt-3">
                        {heroSlides[currentSlide].subDescription}
                      </p>
                    )}

                    {/* Tagline before features (for slide 3) */}
                    {heroSlides[currentSlide].tagline && !heroSlides[currentSlide].features && (
                      <p className="text-sm sm:text-base md:text-lg text-white/90 font-semibold max-w-4xl mb-3 sm:mb-4">
                        {heroSlides[currentSlide].tagline}
                      </p>
                    )}

                    {heroSlides[currentSlide].description2 && (
                      <p className="text-xs sm:text-sm md:text-base text-white/85 leading-relaxed max-w-4xl mt-2 mb-3 sm:mb-4">
                        {heroSlides[currentSlide].description2}
                      </p>
                    )}

                    {heroSlides[currentSlide].features && (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 my-4 sm:my-6 max-w-3xl">
                        {heroSlides[currentSlide].features?.map((feature, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="flex items-start sm:items-center gap-2 text-white/90 text-xs sm:text-sm md:text-base"
                          >
                            <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-cyan-300 flex-shrink-0 mt-0.5 sm:mt-0" />
                            <span className="leading-relaxed">{feature}</span>
                          </motion.div>
                        ))}
                      </div>
                    )}

                    {/* Tagline after features (for slide 4) */}
                    {heroSlides[currentSlide].tagline && heroSlides[currentSlide].features && (
                      <p className="text-sm sm:text-base md:text-lg text-white font-semibold max-w-4xl mt-3 sm:mt-4">
                        {heroSlides[currentSlide].tagline}
                      </p>
                    )}
                  </motion.div>
                </AnimatePresence>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-6 sm:mt-8 md:mt-10 relative z-30"
                >
                  {heroSlides[currentSlide].ctaButtons ? (
                    heroSlides[currentSlide].ctaButtons.map((button, index) => {
                      const isPdfDownload = button.href.endsWith('.pdf') || (button as any).download;
                      
                      if (isPdfDownload) {
                        return (
                          <MagneticButton key={index} strength={0.25}>
                            <motion.a
                              href={button.href}
                              download
                              className={`inline-flex items-center justify-center gap-2 px-4 py-3.5 sm:px-6 sm:py-3 md:px-8 md:py-4 rounded-full font-semibold shadow-lg text-xs sm:text-sm md:text-base w-full sm:w-auto min-h-[48px] touch-manipulation relative z-40 overflow-hidden group ${
                                button.variant === 'primary'
                                  ? 'bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white'
                                  : 'border-2 border-white text-white hover:bg-white hover:text-purple-900'
                              }`}
                              whileTap={{ scale: 0.95 }}
                            >
                              {button.label}
                              {button.variant === 'primary' ? (
                                <PlayCircle className="h-5 w-5" />
                              ) : (
                                <ArrowRight className="h-5 w-5" />
                              )}
                            </motion.a>
                          </MagneticButton>
                        );
                      }
                      
                      return (
                        <MagneticButton key={index} strength={0.25}>
                          <Link
                          to={button.href}
                          onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
                            if (isPdfDownload) {
                              // PDF downloads - let browser handle it
                              return;
                            }
                            if (button.href.startsWith('#')) {
                              // Same page anchor
                              e.preventDefault();
                              handleAnchorClick(e, button.href);
                            } else if (button.href.includes('#')) {
                              // Cross-page anchor link
                              e.preventDefault();
                              const [path, hash] = button.href.split('#');
                              if (pathname !== path) {
                                // Navigate to different page, then scroll
                                navigate(button.href);
                                setTimeout(() => {
                                  const element = document.getElementById(hash);
                                  if (element) {
                                    smoothScrollToElement(hash);
                                  }
                                }, 500);
                              } else {
                                // Same page, just scroll
                                handleAnchorClick(e, `#${hash}`);
                              }
                            } else if (button.href === '#') {
                              // Placeholder link - prevent default
                              e.preventDefault();
                            }
                          }}
                          className={`inline-flex items-center justify-center gap-2 px-4 py-3.5 sm:px-6 sm:py-3 md:px-8 md:py-4 rounded-full font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all text-xs sm:text-sm md:text-base w-full sm:w-auto min-h-[48px] touch-manipulation relative z-40 ${
                            button.variant === 'primary'
                              ? 'bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white'
                              : 'border-2 border-white text-white hover:bg-white hover:text-purple-900'
                          } ${button.href === '#' ? 'cursor-not-allowed opacity-70' : 'cursor-pointer'}`}
                        >
                            {button.label}
                            {button.variant === 'primary' ? (
                              <PlayCircle className="h-5 w-5" />
                            ) : (
                              <ArrowRight className="h-5 w-5" />
                            )}
                          </Link>
                        </MagneticButton>
                      );
                    })
                  ) : (
                    <>
                      <Link
                        to="/codekids-jr"
                        className="inline-flex items-center justify-center gap-2 px-6 sm:px-7 md:px-8 py-3.5 sm:py-4 md:py-4.5 rounded-full bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white font-semibold shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all text-sm sm:text-base md:text-lg w-full sm:w-auto min-h-[48px] touch-manipulation relative z-40"
                      >
                        Explore Programs
                        <PlayCircle className="h-4 w-4 sm:h-5 sm:w-5" />
                      </Link>
                      <Link
                        to="/codekids-jr"
                        className="inline-flex items-center justify-center gap-2 px-6 sm:px-7 md:px-8 py-3.5 sm:py-4 md:py-4.5 rounded-full border-2 border-white text-white font-semibold hover:bg-white hover:text-purple-900 active:scale-95 transition-all text-sm sm:text-base md:text-lg w-full sm:w-auto min-h-[48px] touch-manipulation relative z-40"
                      >
                        Learn More
                        <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5" />
                      </Link>
                    </>
                  )}
                </motion.div>
              </motion.div>
            </div>
          </div>

          {/* Carousel Controls - Responsive */}
          <motion.button
            onClick={() => setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length)}
            whileHover={{ scale: 1.1, x: -5 }}
            whileTap={{ scale: 0.9 }}
            className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-30 h-10 w-10 sm:h-12 sm:w-12 md:h-14 md:w-14 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 active:bg-white/40 flex items-center justify-center transition-all touch-manipulation min-h-[44px] min-w-[44px] shadow-lg"
            aria-label="Previous slide"
          >
            <motion.div
              animate={{ x: [0, -3, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            >
              <ChevronLeft className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 text-white" />
            </motion.div>
          </motion.button>
          <motion.button
            onClick={() => setCurrentSlide((prev) => (prev + 1) % heroSlides.length)}
            whileHover={{ scale: 1.1, x: 5 }}
            whileTap={{ scale: 0.9 }}
            className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-30 h-10 w-10 sm:h-12 sm:w-12 md:h-14 md:w-14 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 active:bg-white/40 flex items-center justify-center transition-all touch-manipulation min-h-[44px] min-w-[44px] shadow-lg"
            aria-label="Next slide"
          >
            <motion.div
              animate={{ x: [0, 3, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            >
              <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 text-white" />
            </motion.div>
          </motion.button>

          <div className="absolute bottom-4 sm:bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 z-30 flex gap-2">
            {heroSlides.map((_, index) => (
              <motion.button
                key={index}
                onClick={() => setCurrentSlide(index)}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                animate={{
                  width: index === currentSlide ? 32 : 8,
                  opacity: index === currentSlide ? 1 : 0.5,
                }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                className={`h-2 sm:h-2.5 rounded-full touch-manipulation min-h-[8px] min-w-[8px] ${
                  index === currentSlide ? 'bg-white shadow-lg' : 'bg-white/50'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </section>

        {/* Trust Indicators / Statistics */}
        <section className="py-12 sm:py-16 md:py-20 bg-gradient-to-b from-transparent via-purple-50/20 dark:via-purple-950/10 to-secondary/20 relative overflow-hidden z-0">
          {/* Particle Background */}
          <ParticleBackground count={20} color="rgba(123, 61, 255, 0.15)" />
          
          {/* Floating Background Elements */}
          <div className="absolute inset-0">
            {[...Array(10)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-24 h-24 rounded-full bg-gradient-to-br from-primary/10 to-accent/10 blur-2xl animate-morph"
                style={{
                  left: `${(i * 10) % 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  scale: [1, 1.3, 1],
                  opacity: [0.2, 0.4, 0.2],
                }}
                transition={{
                  duration: 4 + Math.random() * 2,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                }}
              />
            ))}
          </div>
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 md:gap-5 lg:gap-6">
              {features.map((feature, index) => (
                <StatCard key={feature.label} feature={feature} index={index} />
              ))}
            </div>
          </div>
        </section>

        {/* Why CodeKids (10X Value Proposition) Section */}
        <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-gradient-to-b from-secondary/10 via-transparent to-secondary/10 relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <BlurFade direction="up" className="text-center mb-12 sm:mb-16">
                  <GlowEffect color="primary" intensity="low" className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 mb-6 border border-primary/10">
                <Sparkles className="h-4 w-4 text-primary" />
                <span className="text-sm font-semibold text-primary">10X Value Proposition</span>
              </GlowEffect>
              <TextReveal direction="up" delay={0.1}>
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-3 sm:mb-4 md:mb-6 font-heading leading-tight">
                  <ShimmerText gradient="from-blue-600 via-purple-600 to-pink-600">
                    WHY CODEKIDS
                  </ShimmerText>
                </h2>
              </TextReveal>
              <TextReveal direction="up" delay={0.2}>
                <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-foreground mb-2 leading-snug">
                  We don&apos;t just teach you skills —
                </p>
              </TextReveal>
              <TextReveal direction="up" delay={0.3}>
                <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold leading-snug">
                  <ShimmerText gradient="from-blue-600 via-purple-600 to-pink-600">
                    💙 We build your entire career.
                  </ShimmerText>
                </p>
              </TextReveal>
              <TextReveal direction="up" delay={0.4}>
                <p className="text-sm sm:text-base md:text-lg text-muted-foreground mt-3 sm:mt-4 max-w-3xl mx-auto px-2">
                  At CodeKids, every student receives:
                </p>
              </TextReveal>
            </BlurFade>

            {/* Value Proposition Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 md:gap-5 lg:gap-6 mb-8 sm:mb-10 md:mb-12">
              {[
                { icon: FileText, text: 'Resume written by our team', color: 'from-blue-500 to-cyan-500' },
                { icon: Globe, text: 'Hosted portfolio website', color: 'from-purple-500 to-pink-500' },
                { icon: Network, text: 'LinkedIn optimization (Done-for-you)', color: 'from-indigo-500 to-blue-500' },
                { icon: Code, text: 'GitHub branding & project documentation', color: 'from-green-500 to-emerald-500' },
                { icon: Briefcase, text: 'Naukri, Indeed, Foundit job portal optimization', color: 'from-orange-500 to-red-500' },
                { icon: PlayCircle, text: 'Self-intro video recording + editing', color: 'from-pink-500 to-rose-500' },
                { icon: Rocket, text: 'Industry-ready projects', color: 'from-cyan-500 to-blue-500' },
                { icon: Users, text: 'Weekly live classes', color: 'from-purple-500 to-indigo-500' },
                { icon: UserCheck, text: 'Career manager support', color: 'from-teal-500 to-cyan-500' },
                { icon: Award, text: 'Internship for premium students', color: 'from-yellow-500 to-orange-500' },
                { icon: Target, text: 'Interview preparation (HR + Technical)', color: 'from-red-500 to-pink-500' },
                { icon: TrendingUp, text: 'Career roadmap for each student', color: 'from-blue-500 to-purple-500' },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20, scale: 0.9 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05, duration: 0.5 }}
                  whileHover={{ y: -8, scale: 1.03 }}
                  className="h-full"
                >
                  <GlassCard className="p-4 sm:p-5 md:p-6 lg:p-7 min-h-[120px] sm:min-h-[140px] md:min-h-[160px] flex flex-col transition-all duration-300 border border-border/50 hover:border-primary/15 h-full relative overflow-hidden group">
                    <motion.div
                      className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-0 group-hover:opacity-2 transition-opacity duration-500`}
                    />
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 3 }}
                      transition={springTransition}
                      className={`h-10 w-10 sm:h-12 sm:w-12 md:h-14 md:w-14 rounded-xl bg-gradient-to-br ${item.color} opacity-80 flex items-center justify-center mb-3 sm:mb-4 flex-shrink-0 shadow-md relative z-10`}
                    >
                      <item.icon className="h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7 text-white" />
                    </motion.div>
                    <p className="text-xs sm:text-sm md:text-base font-medium text-foreground leading-relaxed flex-grow relative z-10">
                      ⭐ {item.text}
                    </p>
                  </GlassCard>
                </motion.div>
              ))}
            </div>

            {/* Callout Box */}
            <BlurFade direction="up" delay={0.2} className="relative">
              <GlowEffect color="primary" intensity="medium" className="relative">
                <GlassCard className="p-5 sm:p-6 md:p-8 lg:p-10 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10 border-2 border-primary/15 animate-pulse-glow">
                  <div className="text-center">
                    <TextReveal direction="up" delay={0.1}>
                      <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-foreground mb-2 leading-snug">
                        No other institute gives ALL OF THIS.
                      </p>
                    </TextReveal>
                    <TextReveal direction="up" delay={0.2}>
                      <p className="text-xl sm:text-2xl md:text-3xl font-bold">
                        <ShimmerText gradient="from-blue-600 via-purple-600 to-pink-600">
                          This is what makes CodeKids a 10X EdTech brand.
                        </ShimmerText>
                      </p>
                    </TextReveal>
                  </div>
                </GlassCard>
              </GlowEffect>
            </BlurFade>

            {/* Signature Combo Courses Section */}
            <ParallaxSection speed={0.3} direction="up" className="mt-16 sm:mt-20">
              <BlurFade direction="up" delay={0.2}>
                <div className="text-center mb-8 sm:mb-12">
                  <GlowEffect color="primary" intensity="low" className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 mb-4 border border-primary/10">
                    <GraduationCap className="h-4 w-4 text-primary" />
                    <span className="text-sm font-semibold text-primary">10X Edition</span>
                  </GlowEffect>
                  <TextReveal direction="up" delay={0.3}>
                    <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4 font-heading">
                      🎓 <ShimmerText gradient="from-blue-600 via-purple-600 to-pink-600">OUR SIGNATURE COMBO COURSES</ShimmerText>
                    </h3>
                  </TextReveal>
                <p className="text-base sm:text-lg text-muted-foreground max-w-3xl mx-auto">
                  We offer 4 career-defining, industry-ready combination programs crafted for maximum skill, project depth & job readiness.
                </p>
              </div>

              <div className="flex justify-center">
                <MagneticButton strength={0.3}>
                  <Link
                    to="/codekids-pro#combined-courses"
                    onClick={(e) => {
                      const href = e.currentTarget.getAttribute('href');
                      if (href && href.includes('#')) {
                        e.preventDefault();
                        const [path, hash] = href.split('#');
                        if (pathname !== path && path) {
                          navigate(href);
                          setTimeout(() => {
                            const element = document.getElementById(hash);
                            if (element) {
                              handleAnchorClick(e, `#${hash}`);
                            }
                          }, 300);
                        } else {
                          handleAnchorClick(e, `#${hash}`);
                        }
                      }
                    }}
                    className="inline-flex items-center gap-2 px-6 py-3 sm:px-8 sm:py-4 rounded-full bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white font-semibold text-sm sm:text-base shadow-lg overflow-hidden group relative"
                  >
                    <GlowEffect color="primary" intensity="low">
                      <span className="flex items-center gap-2">
                        Explore Combo Courses
                        <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5" />
                      </span>
                    </GlowEffect>
                  </Link>
                </MagneticButton>
              </div>
            </BlurFade>
            </ParallaxSection>
          </div>
        </section>

        {/* Programs Overview */}
        <section className="py-10 sm:py-12 md:py-16 lg:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <BlurFade direction="up" className="text-center mb-8 sm:mb-12 md:mb-16">
              <TextReveal direction="up" delay={0.1}>
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4 font-heading text-foreground leading-tight">
                  Our <ShimmerText gradient="from-pink-500 via-purple-500 to-cyan-500">Programs</ShimmerText>
                </h2>
              </TextReveal>
              <TextReveal direction="up" delay={0.2}>
                <p className="text-sm sm:text-base md:text-lg lg:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed px-2 sm:px-4">
                  From school to college, we offer comprehensive coding and STEM education designed to nurture the next generation of innovators and tech leaders across all age groups.
                </p>
              </TextReveal>
            </BlurFade>

            <motion.div 
              variants={staggerContainer}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8"
            >
              {programs.map((program) => (
                <motion.div
                  key={program.title}
                  variants={staggerItem}
                  whileHover={{ y: -10, scale: 1.02 }}
                  className="group"
                >
                  <GlowEffect color="primary" intensity="low" className="h-full">
                    <GlassCard className="overflow-hidden h-full transition-all duration-300 shadow-xl border-2 border-transparent hover:border-primary/15">
                      <motion.div 
                        className="relative h-40 sm:h-48 md:h-56 lg:h-64 overflow-hidden"
                        whileHover={{ scale: 1.1 }}
                        transition={{ type: 'spring' as const, stiffness: 300, damping: 30 }}
                      >
                        {/* Background Image */}
                        {program.image && (
                          <ImageReveal
                            src={program.image}
                            alt={program.imageDescription || program.title}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, 50vw"
                            revealDirection="up"
                            parallax={false}
                          />
                        )}
                      {/* Gradient Overlay */}
                      <div className={`absolute inset-0 bg-gradient-to-br ${program.color} opacity-80 group-hover:opacity-70 transition-opacity duration-300`} />
                      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzBoLTJWMGgyeiIvPjwvZz48L2c+PC9zdmc+')] opacity-20" />
                      
                      {/* Floating Icon */}
                      <motion.div
                        whileHover={{ scale: 1.15, rotate: 360 }}
                        transition={{ duration: 0.5 }}
                        className="absolute top-4 left-4 sm:top-6 sm:left-6 md:top-8 md:left-8 h-14 w-14 sm:h-16 sm:w-16 md:h-20 md:w-20 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center shadow-lg border border-white/30 z-10"
                      >
                        <program.icon className="h-7 w-7 sm:h-8 sm:w-8 md:h-10 md:w-10 text-white" />
                      </motion.div>

                      {/* Floating Particles */}
                      {[...Array(8)].map((_, i) => (
                        <motion.div
                          key={i}
                          className="absolute w-2 h-2 bg-white/40 rounded-full"
                          style={{
                            left: `${20 + (i * 10)}%`,
                            top: `${30 + (i * 5)}%`,
                          }}
                          animate={{
                            y: [0, -30, 0],
                            opacity: [0.3, 1, 0.3],
                            scale: [1, 1.5, 1],
                          }}
                          transition={{
                            duration: 3 + Math.random() * 2,
                            repeat: Infinity,
                            delay: Math.random() * 2,
                          }}
                        />
                      ))}

                      {/* Content Overlay */}
                      <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 md:p-6 lg:p-8 text-white z-10">
                        <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold mb-1 sm:mb-2 font-heading drop-shadow-lg leading-tight">{program.title}</h3>
                        <p className="text-white/90 text-xs sm:text-sm leading-relaxed drop-shadow-md">{program.description}</p>
                      </div>

                      {/* Shine Effect */}
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12"
                        animate={{
                          x: ['-200%', '200%'],
                        }}
                        transition={{
                          duration: 4,
                          repeat: Infinity,
                          repeatDelay: 3,
                          ease: 'linear',
                        }}
                      />
                    </motion.div>
                    <div className="p-4 sm:p-5 md:p-6 lg:p-8 bg-gradient-to-b from-secondary/50 to-secondary/30">
                      <div className="space-y-2 sm:space-y-3 mb-3 sm:mb-4 md:mb-6">
                        {program.features.map((feature, i) => (
                          <motion.div
                            key={i}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="flex items-center gap-2 sm:gap-3"
                          >
                            <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-primary flex-shrink-0" />
                            <span className="text-xs sm:text-sm text-muted-foreground font-medium">{feature}</span>
                          </motion.div>
                        ))}
                      </div>
                      <MagneticButton strength={0.2}>
                        <Link
                          to={program.href}
                          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 sm:px-6 sm:py-3 rounded-full bg-gradient-to-r from-primary/10 to-accent/10 text-primary font-semibold hover:from-primary/20 hover:to-accent/20 transition-all w-full group/link shadow-lg hover:shadow-xl text-sm sm:text-base"
                        >
                          Learn More
                          <ArrowRight className="h-3 w-3 sm:h-4 sm:w-4 group-hover/link:translate-x-1 transition-transform" />
                        </Link>
                      </MagneticButton>
                    </div>
                  </GlassCard>
                  </GlowEffect>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Download Brochures Section */}
        <ParallaxSection speed={0.2} direction="up" className="py-16 sm:py-20 bg-gradient-to-b from-secondary/20 via-primary/5 to-secondary/20 relative overflow-hidden">
          <ParticleBackground count={15} color="rgba(46, 208, 255, 0.12)" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <BlurFade direction="up" className="text-center mb-10 sm:mb-12">
              <GlowEffect color="primary" intensity="low" className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 mb-4 border border-primary/10">
                <FileText className="h-4 w-4 text-primary" />
                <span className="text-sm font-semibold text-primary">Get Started</span>
              </GlowEffect>
              <TextReveal direction="up" delay={0.1}>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4 font-heading text-foreground">
                  Download Our <ShimmerText gradient="from-blue-600 via-purple-600 to-pink-600">Brochures</ShimmerText>
                </h2>
              </TextReveal>
              <TextReveal direction="up" delay={0.2}>
                <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed px-4">
                  Explore our comprehensive programs and discover how CodeKids can
                  transform your learning journey or enhance your school's technology education.
                </p>
              </TextReveal>
            </BlurFade>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 max-w-4xl mx-auto">
              {/* CodeKids_Jr Brochure */}
              <BlurFade direction="left" delay={0.1}>
                <GlowEffect color="primary" intensity="low" className="h-full">
                  <GlassCard className="p-6 sm:p-8 h-full hover:scale-105 transition-transform duration-300 border-2 border-pink-500/10 hover:border-pink-500/20 bg-gradient-to-br from-pink-500/5 to-rose-500/5">
                  <div className="flex flex-col items-center text-center">
                    <div className="h-16 w-16 sm:h-20 sm:w-20 rounded-2xl bg-gradient-to-br from-pink-500 to-rose-500 flex items-center justify-center mb-4 sm:mb-6 shadow-lg">
                      <Rocket className="h-8 w-8 sm:h-10 sm:w-10 text-white" />
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-3 font-heading text-foreground">
                      CodeKids_Jr Brochure
                    </h3>
                    <p className="text-sm sm:text-base text-muted-foreground mb-6 leading-relaxed">
                      For Schools & Parents<br />
                      Ages 6-16 • Robotics • Coding • AI
                    </p>
                    <MagneticButton strength={0.25}>
                      <a
                        href="/assest/codekids_jr brochure.pdf"
                        download
                        className="inline-flex items-center justify-center gap-2 px-6 py-3.5 sm:px-8 sm:py-4 rounded-full bg-gradient-to-r from-pink-500 to-rose-500 text-white font-semibold shadow-lg hover:shadow-xl transition-all w-full min-h-[48px] touch-manipulation"
                      >
                        <Download className="h-5 w-5" />
                        Download CodeKids_Jr Brochure
                      </a>
                    </MagneticButton>
                  </div>
                </GlassCard>
                </GlowEffect>
              </BlurFade>

              {/* CodeKids_Pro Brochure */}
              <BlurFade direction="right" delay={0.2}>
                <GlowEffect color="secondary" intensity="low" className="h-full">
                  <GlassCard className="p-6 sm:p-8 h-full hover:scale-105 transition-transform duration-300 border-2 border-purple-500/10 hover:border-purple-500/20 bg-gradient-to-br from-purple-500/5 to-indigo-500/5">
                  <div className="flex flex-col items-center text-center">
                    <div className="h-16 w-16 sm:h-20 sm:w-20 rounded-2xl bg-gradient-to-br from-purple-500 to-indigo-500 flex items-center justify-center mb-4 sm:mb-6 shadow-lg">
                      <GraduationCap className="h-8 w-8 sm:h-10 sm:w-10 text-white" />
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-3 font-heading text-foreground">
                      CodeKids_Pro Brochure
                    </h3>
                    <p className="text-sm sm:text-base text-muted-foreground mb-6 leading-relaxed">
                      For Graduates & Job Seekers<br />
                      Ages 18+ • AI • Full-Stack • Data Science
                    </p>
                    <MagneticButton strength={0.25}>
                      <a
                        href="/assest/codekids_pro Brochure.pdf"
                        download
                        className="inline-flex items-center justify-center gap-2 px-6 py-3.5 sm:px-8 sm:py-4 rounded-full bg-gradient-to-r from-purple-500 to-indigo-500 text-white font-semibold shadow-lg hover:shadow-xl transition-all w-full min-h-[48px] touch-manipulation"
                      >
                        <Download className="h-5 w-5" />
                        Download CodeKids_Pro Brochure
                      </a>
                    </MagneticButton>
                  </div>
                </GlassCard>
                </GlowEffect>
              </BlurFade>
            </div>
          </div>
        </ParallaxSection>

      {/* Learning in Action */}
      <ParallaxSection speed={0.25} direction="down" className="py-12 sm:py-16 md:py-20 bg-gradient-to-b from-transparent via-purple-50/30 dark:via-purple-950/20 to-transparent relative overflow-hidden">
        <ParticleBackground count={18} color="rgba(255, 75, 143, 0.12)" />
        {/* Background Decorative Elements */}
        <div className="absolute inset-0 opacity-30">
          <motion.div 
            className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-br from-pink-500/20 to-purple-500/20 rounded-full blur-3xl animate-morph"
            animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0] }}
            transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div 
            className="absolute bottom-0 right-1/4 w-96 h-96 bg-gradient-to-br from-purple-500/20 to-cyan-500/20 rounded-full blur-3xl animate-morph"
            animate={{ scale: [1, 1.3, 1], rotate: [0, -90, 0] }}
            transition={{ duration: 25, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <BlurFade direction="up" className="text-center mb-8 sm:mb-10 md:mb-12">
            <TextReveal direction="up" delay={0.1}>
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4 font-heading text-foreground leading-tight">
                Learning in <ShimmerText gradient="from-pink-500 via-purple-500 to-cyan-500">Action</ShimmerText>
              </h2>
            </TextReveal>
            <TextReveal direction="up" delay={0.2}>
              <p className="text-sm sm:text-base md:text-lg lg:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed px-2 sm:px-4">
                See our students exploring, creating, and innovating through hands-on learning experiences.
              </p>
            </TextReveal>
          </BlurFade>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-5 lg:gap-6">
            {[
              {
                image: '/assest/kids robotics.jpg',
                title: 'Robotics Exploration',
                description: 'Building intelligent robots with Arduino and AI to solve real-world challenges. Students develop engineering skills and critical thinking through hands-on robotics projects.',
                gradient: 'from-pink-500 to-rose-500',
                icon: Rocket,
              },
              {
                image: '/assest/coding.jpg',
                title: 'Coding Mastery',
                description: 'Master programming languages from Python to JavaScript. Build web apps, games, and mobile applications while learning industry best practices and collaborative coding.',
                gradient: 'from-blue-500 to-cyan-500',
                icon: Code,
              },
              {
                image: '/assest/ai.jpg',
                title: 'AI Innovation',
                description: 'Explore artificial intelligence and machine learning through neural networks and AI models. Create intelligent systems that recognize patterns and make predictions.',
                gradient: 'from-purple-500 to-indigo-500',
                icon: Brain,
              },
              {
                image: '/assest/students learning.jpg',
                title: 'Collaborative Learning',
                description: 'Work together on team projects, share ideas, and learn from peers. Develop communication skills and the ability to collaborate effectively in diverse groups.',
                gradient: 'from-orange-500 to-red-500',
                icon: Users,
              },
              {
                image: '/assest/drone.jpg',
                title: 'Tech Innovation',
                description: 'Experiment with cutting-edge technologies like drones, IoT devices, and 3D printing. Integrate multiple technologies to prototype innovative solutions.',
                gradient: 'from-green-500 to-emerald-500',
                icon: Zap,
              },
              {
                image: '/assest/learning.jpg',
                title: 'Creative Projects',
                description: 'Combine coding, design, and engineering to build innovative projects. Create a portfolio showcasing problem-solving skills and creative thinking.',
                gradient: 'from-cyan-500 to-blue-500',
                icon: Sparkles,
              },
            ].map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                className="group relative"
              >
                <GlassCard className="relative h-[250px] sm:h-[280px] md:h-[300px] lg:h-[320px] xl:h-[350px] overflow-hidden rounded-2xl border-2 border-transparent hover:border-primary/15 transition-all duration-500 cursor-pointer">
                  {/* Image */}
                  <div className="absolute inset-0">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    {/* Gradient Overlay - Changes on Hover */}
                    <div className={`absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20 group-hover:from-black/70 group-hover:via-black/50 transition-all duration-500`} />
                    {/* Color Overlay on Hover - Card Color Changes */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-0 group-hover:opacity-50 transition-opacity duration-500`} />
                  </div>

                  {/* Icon Badge */}
                  <motion.div
                    className={`absolute top-3 right-3 sm:top-4 sm:right-4 h-10 w-10 sm:h-12 sm:w-12 rounded-xl bg-gradient-to-br ${item.gradient} flex items-center justify-center shadow-lg z-20`}
                    whileHover={{ scale: 1.15, rotate: 360 }}
                    transition={{ duration: 0.5 }}
                  >
                    <item.icon className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                  </motion.div>

                  {/* Content - Always Visible (Subtle) */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 z-20 opacity-100 group-hover:opacity-0 transition-opacity duration-300">
                    <h3 className="text-base sm:text-lg md:text-xl font-bold text-white mb-2 font-heading drop-shadow-lg">
                      {item.title}
                    </h3>
                  </div>

                  {/* Hover Text Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center p-3 sm:p-4 md:p-6 z-30 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="text-center w-full max-w-md px-2 sm:px-4 transform translate-y-8 group-hover:translate-y-0 transition-transform duration-500 ease-out">
                      <motion.div
                        whileHover={{ scale: 1.1, rotate: 360 }}
                        transition={{ duration: 0.5 }}
                        className={`inline-flex items-center justify-center h-10 w-10 sm:h-12 sm:w-12 md:h-14 md:w-14 rounded-full bg-gradient-to-br ${item.gradient} mb-2 sm:mb-3 md:mb-4 shadow-2xl`}
                      >
                        <item.icon className="h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7 text-white" />
                      </motion.div>
                      <h3 className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-white mb-2 sm:mb-3 md:mb-4 font-heading drop-shadow-lg">
                        {item.title}
                      </h3>
                      <div className="transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-100">
                        <p className="text-white text-xs sm:text-sm md:text-base leading-relaxed drop-shadow-lg max-w-xs mx-auto px-2">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Animated Border Glow */}
                  <motion.div
                    className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${item.gradient} opacity-0 group-hover:opacity-20 blur-xl -z-10`}
                    animate={{
                      scale: [1, 1.1, 1],
                      opacity: [0, 0.2, 0],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      delay: index * 0.2,
                    }}
                  />

                  {/* Shine Effect on Hover */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12 opacity-0 group-hover:opacity-100"
                    animate={{
                      x: ['-200%', '200%'],
                    }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                      repeatDelay: 1,
                      ease: 'linear',
                    }}
                  />
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </div>
        </ParallaxSection>

      {/* Key Features */}
      <section className="py-20 bg-gradient-to-b from-transparent to-secondary/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeInUp} className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4 font-heading text-foreground">
              Why Choose <span className="bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 bg-clip-text text-transparent">CodeKids</span>
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed px-4">
              Excellence in technology education with proven results. We combine cutting-edge curriculum, expert instructors, and hands-on learning to deliver transformative educational experiences.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
            {keyFeatures.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group"
              >
                <GlassCard className="p-5 sm:p-6 md:p-8 h-full hover:scale-105 transition-transform duration-300 text-center">
                  <motion.div
                    whileHover={{ scale: 1.15, rotate: 360 }}
                    transition={{ duration: 0.5 }}
                    className="h-12 w-12 sm:h-14 sm:w-14 md:h-16 md:w-16 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center mx-auto mb-4 sm:mb-5 md:mb-6 shadow-lg"
                  >
                    <feature.icon className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 text-white" />
                  </motion.div>
                  <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3 font-heading text-foreground group-hover:text-primary transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-sm sm:text-base text-muted-foreground">{feature.description}</p>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 relative overflow-hidden">
        {/* Decorative Background Elements */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-secondary/10 to-transparent" />
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-32 h-32 rounded-full bg-gradient-to-br from-primary/10 to-accent/10 blur-3xl"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{
              duration: 5 + Math.random() * 5,
              repeat: Infinity,
              delay: Math.random() * 3,
            }}
          />
        ))}
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div {...fadeInUp} className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-yellow-500/20 via-orange-500/20 to-pink-500/20 border border-yellow-500/15 mb-6"
            >
              <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
              <span className="text-sm font-semibold text-foreground">Trusted by Thousands</span>
            </motion.div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4 font-heading text-foreground">
              What Students & Parents <span className="bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 bg-clip-text text-transparent">Say</span>
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto px-4">
              Real feedback from our amazing community of students, parents, and educators
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50, rotateY: -15 }}
                whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                className="group"
              >
                <GlassCard className="p-4 sm:p-5 md:p-6 h-full hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-2xl border border-border/50 hover:border-primary/15">
                  {/* Avatar with Glow Effect */}
                  <div className="relative mb-4">
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 360 }}
                      transition={{ duration: 0.5 }}
                      className="relative h-16 w-16 rounded-full overflow-hidden mx-auto mb-3 ring-4 ring-primary/20 group-hover:ring-primary/40 transition-all"
                    >
                      <div className="absolute inset-0">
                        <Image
                          src={testimonial.image}
                          alt={testimonial.name}
                          fill
                          className="object-cover rounded-full"
                          sizes="64px"
                        />
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 opacity-0 group-hover:opacity-100 transition-opacity rounded-full" />
                    </motion.div>
                    <div className="text-center">
                      <div className="font-semibold text-foreground text-lg mb-1">{testimonial.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {testimonial.role || testimonial.relation}
                        {testimonial.school && (
                          <>
                            <br />
                            <span className="text-xs">{testimonial.school}</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  {/* Rating Stars */}
                  {testimonial.rating && (
                    <div className="flex gap-1 justify-center mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, scale: 0 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ delay: index * 0.1 + i * 0.05 }}
                        >
                          <Star className="h-5 w-5 fill-yellow-400 text-yellow-400 drop-shadow-lg" />
                        </motion.div>
                      ))}
                    </div>
                  )}
                  
                  {/* Quote */}
                  <div className="relative">
                    <Quote className="absolute -top-2 -left-2 h-8 w-8 text-primary/20" />
                    <p className="text-muted-foreground italic text-sm leading-relaxed relative z-10">
                      &ldquo;{testimonial.text}&rdquo;
                    </p>
                  </div>
                  
                  {/* Decorative Elements */}
                  <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Sparkles className="h-4 w-4 text-primary/30" />
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section id="about" className="py-20 sm:py-24 bg-gradient-to-b from-secondary/20 via-transparent to-secondary/20 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12 sm:mb-16"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 mb-6 border border-primary/10">
              <Users className="h-4 w-4 text-primary" />
              <span className="text-sm font-semibold text-primary">Our Story</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 font-heading">
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                About CodeKids
              </span>
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground max-w-3xl mx-auto">
              Empowering the next generation with cutting-edge technology education
            </p>
          </motion.div>

          {/* About Us Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <GlassCard className="p-6 sm:p-8 md:p-10 lg:p-12">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 md:gap-12 items-center mb-6 sm:mb-8">
                <div className="space-y-4 sm:space-y-6">
                  <p className="text-base sm:text-lg leading-relaxed text-muted-foreground">
                    CodeKids Technologies is a pioneering EdTech organization dedicated to transforming how students learn technology. Through our divisions—CodeKids Jr for school students and CodeKids Pro for college learners & job seekers—we deliver structured, industry-ready programs that build real-world skills.
                  </p>
                  <p className="text-sm sm:text-base leading-relaxed text-muted-foreground">
                    Our ecosystem blends international academic expertise, hands-on STEAM learning, project-based methodologies and AI-powered digital tools. Students learn through virtual labs, interactive videos, robotics kits, internships and real-world capstone projects.
                  </p>
                  <p className="text-sm sm:text-base leading-relaxed text-muted-foreground">
                    We partner with schools, colleges and institutions across India to make technology learning accessible, relevant and future-ready.
                  </p>
                </div>
                <div className="relative h-64 sm:h-80 md:h-96 rounded-2xl overflow-hidden">
                  <Image
                    src="/assest/codekids jr learning.jpg"
                    alt="Students learning technology"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
                {[
                  'Virtual Labs for AI, Coding, Robotics and Data Science',
                  'Animated concept videos and interactive learning modules',
                  'AI-based assessments and adaptive learning',
                  'STEM kits, robotics systems and IoT hardware',
                  'Mobile learning app for students and teachers',
                  'Internship simulations and project-based curriculum',
                  'Certified courses aligned with global tech standards',
                ].map((highlight, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start gap-2 sm:gap-3 p-3 sm:p-4 rounded-xl bg-secondary/50"
                  >
                    <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-xs sm:text-sm text-muted-foreground leading-relaxed">{highlight}</span>
                  </motion.div>
                ))}
              </div>
            </GlassCard>
          </motion.div>

          {/* Mission & Vision */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mb-12 sm:mb-16">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <GlassCard className="p-5 sm:p-6 md:p-8 lg:p-9 min-h-[280px] sm:min-h-[320px] md:min-h-[360px] h-full relative overflow-hidden group">
                <div className="absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity">
                  <Image
                    src="/assest/success.jpg"
                    alt="Mission"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="relative z-10">
                  <div className="h-12 w-12 sm:h-14 sm:w-14 md:h-16 md:w-16 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center mb-4 sm:mb-5 md:mb-6">
                    <Target className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 text-white" />
                  </div>
                  <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-3 sm:mb-4 font-heading">Our Mission</h3>
                  <p className="text-sm sm:text-base leading-relaxed text-muted-foreground mb-3 sm:mb-4">
                    To build a generation of innovators by providing world-class technology education that is accessible, experiential and aligned with global industry standards.
                  </p>
                  <p className="text-sm sm:text-base leading-relaxed text-muted-foreground">
                    We aim to empower students with future-ready skills that enhance problem-solving, creativity, and confidence.
                  </p>
                </div>
              </GlassCard>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <GlassCard className="p-5 sm:p-6 md:p-8 lg:p-9 min-h-[280px] sm:min-h-[320px] md:min-h-[360px] h-full relative overflow-hidden group">
                <div className="absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity">
                  <Image
                    src="/assest/job ready.jpg"
                    alt="Vision"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="relative z-10">
                  <div className="h-12 w-12 sm:h-14 sm:w-14 md:h-16 md:w-16 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center mb-4 sm:mb-5 md:mb-6">
                    <Eye className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 text-white" />
                  </div>
                  <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-3 sm:mb-4 font-heading">Our Vision</h3>
                  <p className="text-sm sm:text-base leading-relaxed text-muted-foreground mb-3 sm:mb-4">
                    To become India&apos;s leading K–12 and higher-education technology ecosystem by integrating AI-powered learning, hands-on STEM innovation and research-driven pedagogy into every institution.
                  </p>
                  <p className="text-sm sm:text-base leading-relaxed text-muted-foreground">
                    We aim to create future-ready citizens capable of shaping tomorrow&apos;s world.
                  </p>
                </div>
              </GlassCard>
            </motion.div>
          </div>

          {/* Founder Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-20"
          >
            <div className="text-center mb-12 sm:mb-16">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 mb-6 border border-primary/10">
                <Award className="h-4 w-4 text-primary" />
                <span className="text-sm font-semibold text-primary">Visionary Leader</span>
              </div>
              <h3 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 font-heading">
                <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Our Founder
                </span>
              </h3>
              <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
                Led by a distinguished academic leader with decades of excellence in higher education and technology innovation
              </p>
            </div>

            <div className="relative">
              {/* Background Decorative Elements */}
              <div className="absolute inset-0 -z-10">
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full blur-3xl" />
                <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gradient-to-br from-pink-500/20 to-cyan-500/20 rounded-full blur-3xl" />
              </div>

              <GlassCard className="p-8 sm:p-10 md:p-12 relative overflow-hidden">
                <div className="grid md:grid-cols-2 gap-8 sm:gap-12 items-center">
                  {/* Founder Image */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="relative group"
                  >
                    <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-3xl blur-xl opacity-30 group-hover:opacity-50 transition-opacity duration-500" />
                    <div className="relative h-[500px] md:h-[600px] w-full rounded-3xl overflow-hidden shadow-2xl border-4 border-white/10 dark:border-white/5">
                      <Image
                        src="/assest/prof-dn-reddy.jpg"
                        alt="Dr. D. N. Reddy - Founder"
                        fill
                        className="object-cover object-center group-hover:scale-110 transition-transform duration-700"
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        priority
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = '/assest/prof-dn-reddy.jpg';
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="absolute top-8 right-8 px-4 py-2 rounded-full bg-gradient-to-r from-blue-500/90 via-purple-500/90 to-pink-500/90 backdrop-blur-md border border-white/20 shadow-xl"
                      >
                        <span className="text-sm font-bold text-white">Prof. (Dr) D.N. Reddy</span>
                      </motion.div>
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="absolute bottom-8 left-8 px-4 py-2 rounded-full bg-gradient-to-r from-amber-500/90 to-orange-500/90 backdrop-blur-md border border-white/20 shadow-xl"
                      >
                        <span className="text-sm font-bold text-white flex items-center gap-2">
                          <Award className="h-4 w-4" />
                          Award Winner
                        </span>
                      </motion.div>
                    </div>
                  </motion.div>

                  {/* Founder Info */}
                  <motion.div
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="space-y-6"
                  >
                    <div>
                      <h3 className="text-3xl md:text-4xl font-bold mb-2 font-heading bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                        Prof. (Dr) D.N. Reddy
                      </h3>
                      <p className="text-xl font-semibold text-foreground mb-2">Founder & Chief Executive Officer</p>
                      <p className="text-lg text-primary font-semibold mb-4">Chairman, RAC | Regional Chairman, AICTE (SCRO), Hyderabad</p>
                      <div className="flex flex-wrap gap-2 mb-6">
                        <span className="px-3 py-1.5 rounded-full bg-gradient-to-r from-blue-500/20 to-blue-600/20 text-blue-700 dark:text-blue-300 text-sm font-bold border border-blue-500/30 shadow-sm">
                          <Award className="h-3 w-3 inline mr-1" />
                          Award Winner
                        </span>
                        <span className="px-3 py-1.5 rounded-full bg-gradient-to-r from-purple-500/20 to-purple-600/20 text-purple-700 dark:text-purple-300 text-sm font-bold border border-purple-500/30 shadow-sm">
                          Vice Chancellor
                        </span>
                        <span className="px-3 py-1.5 rounded-full bg-gradient-to-r from-pink-500/20 to-pink-600/20 text-pink-700 dark:text-pink-300 text-sm font-bold border border-pink-500/30 shadow-sm">
                          UGC Member
                        </span>
                        <span className="px-3 py-1.5 rounded-full bg-gradient-to-r from-amber-500/20 to-orange-500/20 text-amber-700 dark:text-amber-300 text-sm font-bold border border-amber-500/30 shadow-sm">
                          Academic Excellence
                        </span>
                      </div>
                    </div>

                    <div className="space-y-5 text-muted-foreground leading-relaxed">
                      <div className="bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 rounded-xl p-4 border border-primary/20">
                        <h4 className="font-bold text-foreground mb-3 flex items-center gap-2">
                          <Award className="h-5 w-5 text-primary" />
                          Current Leadership Positions
                        </h4>
                        <ul className="space-y-2 text-sm">
                          <li className="flex items-start gap-2">
                            <span className="text-primary font-bold">•</span>
                            <span><strong className="text-foreground">Chairman, RAC</strong> (since June 2012)</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-primary font-bold">•</span>
                            <span><strong className="text-foreground">Regional Chairman, AICTE (SCRO), Hyderabad</strong></span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-primary font-bold">•</span>
                            <span><strong className="text-foreground">Member, University Grants Commission (UGC)</strong></span>
                          </li>
                        </ul>
                      </div>

                      <div className="bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-blue-500/10 rounded-xl p-4 border border-primary/20">
                        <h4 className="font-bold text-foreground mb-3 flex items-center gap-2">
                          <GraduationCap className="h-5 w-5 text-primary" />
                          Distinguished Academic Career
                        </h4>
                        <ul className="space-y-2 text-sm">
                          <li className="flex items-start gap-2">
                            <span className="text-primary font-bold">•</span>
                            <span><strong className="text-foreground">Vice-Chancellor, Jawaharlal Nehru Technological University, Hyderabad</strong> (Aug 2008 - Aug 2011)</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-primary font-bold">•</span>
                            <span><strong className="text-foreground">Vice Chancellor i/c, Osmania University, Hyderabad</strong> (Feb 2011 - July 2011)</span>
                          </li>
                        </ul>
                      </div>

                      <div className="bg-gradient-to-r from-pink-500/10 via-amber-500/10 to-orange-500/10 rounded-xl p-4 border border-primary/20">
                        <h4 className="font-bold text-foreground mb-3 flex items-center gap-2">
                          <Trophy className="h-5 w-5 text-primary" />
                          Awards & Recognitions
                        </h4>
                        <ul className="space-y-2 text-sm">
                          <li className="flex items-start gap-2">
                            <span className="text-primary font-bold">•</span>
                            <span><strong className="text-foreground">Sarvepalli Radhakrishnan Award for Academic Excellence in Higher Education</strong> (August 2011)</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-primary font-bold">•</span>
                            <span>Numerous other prestigious awards and recognitions for contributions to higher education</span>
                          </li>
                        </ul>
                      </div>

                      <p className="text-base font-medium text-foreground pt-2">
                        With over a decade of leadership in higher education and technology, Prof. (Dr) D.N. Reddy brings unparalleled expertise and vision to CodeKids Technologies. His distinguished career spanning prestigious universities and regulatory bodies positions him uniquely to transform technology education in India.
                      </p>
                    </div>
                  </motion.div>
                </div>
              </GlassCard>
            </div>
          </motion.div>

          {/* Expert Team Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <div className="text-center mb-12 sm:mb-16">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 mb-6 border border-primary/10">
                <Users className="h-4 w-4 text-primary" />
                <span className="text-sm font-semibold text-primary">Expert Team</span>
              </div>
              <h3 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 font-heading">
                <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Our Expert Team
                </span>
              </h3>
              <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
                Meet the passionate educators and technologists driving innovation at CodeKids
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 max-w-6xl mx-auto">
              {[
                {
                  name: 'Ms. Swapna',
                  role: 'Research & Academic Innovation',
                  qualification: 'Expert in Curriculum Development & Educational Technology',
                  description: 'Ms. Swapna leads our research and academic innovation initiatives, ensuring our curriculum stays at the forefront of educational technology.',
                  image: '/assest/swapna.jpg',
                  color: 'from-purple-500 to-pink-500',
                },
                {
                  name: 'Ravi Kalyan Reddy',
                  role: 'Technical Lead & Innovation',
                  qualification: 'Expert in AI, ML & Full-Stack Development',
                  description: 'Ravi Kalyan Reddy brings deep technical expertise in AI, machine learning, and full-stack development.',
                  image: '/assest/ravi_kalyan_reddy.jpg',
                  color: 'from-blue-500 to-cyan-500',
                },
                {
                  name: 'D. Sharavan Reddy',
                  role: 'Operations & Student Success',
                  qualification: 'Expert in Program Management & Student Engagement',
                  description: 'D. Sharavan Reddy oversees operations and student success initiatives, ensuring smooth program delivery.',
                  image: '/assest/Sharavan_reddy.jpg',
                  color: 'from-pink-500 to-rose-500',
                },
              ].map((member, index) => (
                <motion.div
                  key={member.name}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  className="group"
                >
                  <GlassCard className="p-4 sm:p-5 h-full relative overflow-hidden hover:scale-105 transition-transform duration-300 border border-border/50 hover:border-primary/30">
                    {/* Background Glow */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${member.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500 rounded-xl`} />
                    
                    {/* Badge */}
                    <div className={`absolute top-3 right-3 h-8 w-8 rounded-full bg-gradient-to-br ${member.color} flex items-center justify-center shadow-lg z-10`}>
                      <Award className="h-4 w-4 text-white" />
                    </div>

                    {/* Image */}
                    <div className="relative h-32 w-32 mx-auto mb-4 rounded-xl overflow-hidden ring-2 ring-primary/20 group-hover:ring-primary/40 transition-all">
                      <Image
                        src={member.image}
                        alt={member.name}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                        sizes="128px"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                    </div>

                    {/* Content */}
                    <div className="text-center space-y-2 relative z-10">
                      <div>
                        <h4 className="text-lg font-bold font-heading mb-1">{member.name}</h4>
                        <p className="text-xs font-semibold text-primary mb-1">{member.role}</p>
                        <p className="text-xs text-muted-foreground">{member.qualification}</p>
                      </div>
                      <p className="text-xs text-muted-foreground leading-relaxed line-clamp-3">{member.description}</p>
                    </div>
                  </GlassCard>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Core Values */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mt-16"
          >
            <div className="text-center mb-12">
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 font-heading">
                Our <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">Core Values</span>
              </h3>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { icon: Lightbulb, title: 'Innovation', description: 'Constantly evolving with cutting-edge technology and teaching methods', color: 'from-yellow-500 to-orange-500' },
                { icon: Heart, title: 'Passion', description: 'Dedicated to inspiring and empowering the next generation', color: 'from-pink-500 to-rose-500' },
                { icon: Award, title: 'Excellence', description: 'Committed to delivering the highest quality education and outcomes', color: 'from-blue-500 to-cyan-500' },
                { icon: Users, title: 'Community', description: 'Building a supportive network of learners, educators, and innovators', color: 'from-purple-500 to-indigo-500' },
              ].map((value, index) => (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <GlassCard className="p-6 text-center h-full hover:scale-105 transition-transform duration-300">
                    <div className={`h-16 w-16 rounded-2xl bg-gradient-to-br ${value.color} flex items-center justify-center mx-auto mb-4`}>
                      <value.icon className="h-8 w-8 text-white" />
                    </div>
                    <h4 className="text-xl font-bold mb-2 font-heading">{value.title}</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">{value.description}</p>
                  </GlassCard>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Strategic Collaborations */}
      <section className="py-20 bg-gradient-to-b from-transparent to-secondary/20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDMwaC0yVjBoMnoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-20" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div {...fadeInUp} className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-pink-500/20 via-purple-500/20 to-cyan-500/20 border border-primary/10 mb-6"
            >
              <Handshake className="h-5 w-5 text-primary" />
              <span className="text-sm font-semibold text-primary">Strategic Partnerships</span>
            </motion.div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4 font-heading text-foreground">
              Our Strategic <span className="bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 bg-clip-text text-transparent">Collaborations</span>
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              CodeKids Technologies proudly collaborates with two leading EdTech innovators — CodingJr and Coding Pro — to deliver a complete technology learning ecosystem from school to college.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {collaborations.map((partner, index) => (
              <motion.div
                key={partner.name}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2, duration: 0.6 }}
                className="group h-full"
              >
                <GlassCard className="overflow-hidden h-full hover:scale-105 transition-transform duration-300 border-2 border-transparent hover:border-primary/30">
                  {/* Header with Gradient Background */}
                  <div className={`relative h-48 bg-gradient-to-br ${partner.color} overflow-hidden`}>
                    <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzBoLTJWMGgyeiIvPjwvZz48L2c+PC9zdmc+')] opacity-20" />
                    
                    {/* Logo or Icon */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <motion.div
                        whileHover={{ scale: 1.15, rotate: 360 }}
                        transition={{ duration: 0.5 }}
                        className="h-28 w-28 md:h-32 md:w-32 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center relative overflow-hidden border border-white/30 shadow-lg group/logo"
                      >
                        {partner.logo ? (
                          <div className="relative w-full h-full p-3 md:p-4 flex items-center justify-center">
                            <img
                              src={partner.logo}
                              alt={`${partner.name} logo`}
                              className="max-w-full max-h-full w-auto h-auto object-contain group-hover/logo:scale-110 transition-transform duration-300"
                              loading="eager"
                              onError={(e) => {
                                console.error(`Failed to load logo: ${partner.logo}`);
                                e.currentTarget.style.display = 'none';
                              }}
                            />
                          </div>
                        ) : (
                          <partner.icon className="h-12 w-12 md:h-14 md:w-14 text-white" />
                        )}
                        {/* Glow effect on hover */}
                        <div className="absolute inset-0 bg-white/10 rounded-2xl opacity-0 group-hover/logo:opacity-100 transition-opacity duration-300 blur-xl" />
                      </motion.div>
                    </div>

                    {/* Floating Particles */}
                    {[...Array(5)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="absolute w-2 h-2 bg-white/30 rounded-full"
                        style={{
                          left: `${Math.random() * 100}%`,
                          top: `${Math.random() * 100}%`,
                        }}
                        animate={{
                          y: [0, -20, 0],
                          opacity: [0.3, 1, 0.3],
                        }}
                        transition={{
                          duration: 2 + Math.random() * 2,
                          repeat: Infinity,
                          delay: Math.random() * 2,
                        }}
                      />
                    ))}
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3 className="text-2xl font-bold mb-2 font-heading text-foreground group-hover:text-primary transition-colors">
                      {partner.name}
                    </h3>
                    <p className="text-sm font-semibold text-primary mb-4">{partner.tagline}</p>
                    <p className="text-sm text-muted-foreground mb-6 leading-relaxed line-clamp-4">
                      {partner.description}
                    </p>
                    
                    {/* Features */}
                    <div className="space-y-2 mb-6">
                      {partner.features.slice(0, 3).map((feature, i) => (
                        <div key={i} className="flex items-start gap-2">
                          <CheckCircle className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                          <span className="text-xs text-muted-foreground">{feature}</span>
                        </div>
                      ))}
                      {partner.features.length > 3 && (
                        <div className="text-xs text-muted-foreground pl-6">
                          + {partner.features.length - 3} more features
                        </div>
                      )}
                    </div>

                    {/* CTA Button */}
                    {partner.cta ? (
                      <a
                        href={partner.cta.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-2 w-full px-4 py-3 rounded-full bg-gradient-to-r from-primary/10 to-accent/10 text-primary font-semibold hover:from-primary/20 hover:to-accent/20 transition-all group/btn"
                      >
                        {partner.cta.label}
                        <ExternalLink className="h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                      </a>
                    ) : (
                      <div className="inline-flex items-center justify-center gap-2 w-full px-4 py-3 rounded-full bg-gradient-to-br from-cyan-500/10 to-blue-500/10 text-primary font-semibold">
                        <Handshake className="h-4 w-4" />
                        Unified Ecosystem
                      </div>
                    )}
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </div>

          {/* Bottom CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
            className="text-center mt-12"
          >
            <p className="text-muted-foreground mb-4">
              Together, we deliver India&apos;s most comprehensive future-skills education ecosystem.
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-primary/10 to-accent/10 text-primary font-semibold hover:from-primary/20 hover:to-accent/20 transition-all border border-primary/10"
            >
              <Handshake className="h-4 w-4" />
              Get In Touch With Us
              <ArrowRight className="h-4 w-4" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Call to Action */}
      <section id="contact" className="py-20 bg-gradient-to-br from-purple-900 via-blue-900 to-cyan-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzBoLTJWMGgyeiIvPjwvZz48L2c+PC9zdmc+')] opacity-20" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center text-white"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm mb-6 border border-white/30"
            >
              <Sparkles className="h-4 w-4" />
              <span className="text-sm font-medium">Start Your Journey Today</span>
            </motion.div>
            
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 font-heading">
              Ready to Transform{' '}
              <span className="bg-gradient-to-r from-cyan-300 via-purple-300 to-pink-300 bg-clip-text text-transparent">
                Your Future?
              </span>
            </h2>
            <p className="text-xl md:text-2xl mb-10 text-white/90 max-w-3xl mx-auto">
              Join thousands of students learning cutting-edge technology skills. Get started with a free demo class today!
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-white text-purple-900 font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all"
              >
                <MessageSquare className="h-5 w-5" />
                Contact Us
              </Link>
              <Link
                to="/codekids-jr/pricing"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full border-2 border-white text-white font-semibold hover:bg-white hover:text-purple-900 transition-all"
              >
                View Pricing
                <ArrowRight className="h-5 w-5" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
    </>
  );
}
