import { useState, useEffect } from 'react';
import SEO from '@/components/SEO';
import { generateCourseStructuredData, generateBreadcrumbStructuredData, generateFAQStructuredData } from '@/lib/seo-utils';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Rocket, Sparkles, Trophy, Users, Lightbulb, Star, 
  Code, Brain, Zap, Cpu, ChevronLeft, ChevronRight, CheckCircle, Award,
  Calendar, Target, PlayCircle, ArrowRight, TrendingUp, Heart, Clock,
  Building2, GraduationCap, MessageSquare, Globe, Network,
  Smartphone, Database, Gamepad2, Lock, Settings, Video, 
  BarChart3, Presentation, BarChart,
  School, BookOpen, Shield
} from 'lucide-react';
import Image from '@/components/Image';
import { GlassCard } from '@/components/ui/glass-card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';

const heroCarousel = [
  {
    title: 'Robotics & Automation',
    description: 'Build and program robots using Arduino and sensors',
    image: '/assest/kids robotics.jpg',
  },
  {
    title: 'Coding & Programming',
    description: 'Learn Python, Scratch, and game development',
    image: '/assest/coding.jpg',
  },
  {
    title: 'AI & Machine Learning',
    description: 'Explore artificial intelligence and machine learning',
    image: '/assest/ai.jpg',
  },
];

const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 }
};

const camps = [
  {
    title: 'Robotics Camp',
    description: 'Build and program robots using Arduino and sensors. Learn electronics, programming, and mechanical design.',
    duration: '2 weeks',
    image: '/assest/kids robotics.jpg',
    ageGroup: 'Ages 8-17',
    skills: ['Arduino', 'Electronics', 'Programming', 'Mechanical Design'],
  },
  {
    title: 'Coding Camp',
    description: 'Learn Python, Scratch, and game development. Create your first games and applications.',
    duration: '2 weeks',
    image: '/assest/coding.jpg',
    ageGroup: 'Ages 6-16',
    skills: ['Python', 'Scratch', 'Game Development', 'Logic'],
  },
  {
    title: 'Drone Tech Camp',
    description: 'Program and fly drones with obstacle courses. Learn aerial photography and navigation.',
    duration: '1 week',
    image: '/assest/drone tech.jpg',
    ageGroup: 'Ages 10-17',
    skills: ['Drone Programming', 'Aerial Photography', 'Navigation', 'Safety'],
  },
  {
    title: 'AI & ML Camp',
    description: 'Explore artificial intelligence and machine learning through hands-on projects.',
    duration: '2 weeks',
    image: '/assest/ai tools learning.jpg',
    ageGroup: 'Ages 12-17',
    skills: ['Python', 'Machine Learning', 'Data Science', 'AI Concepts'],
  },
];

const clubs = [
  { name: 'Robotics Club', icon: Rocket, color: 'from-pink-400 to-pink-600', 
    description: 'Weekly sessions on robotics, automation, and mechatronics',
    image: '/assest/kids robotics.jpg' },
  { name: 'Coding Club', icon: Code, color: 'from-purple-400 to-purple-600',
    description: 'Learn programming languages and build projects together',
    image: '/assest/coding.jpg' },
  { name: 'AI & ML Club', icon: Brain, color: 'from-blue-400 to-blue-600',
    description: 'Explore artificial intelligence and machine learning concepts',
    image: '/assest/ai.jpg' },
  { name: 'Drone Club', icon: Zap, color: 'from-cyan-400 to-cyan-600',
    description: 'Master drone programming and aerial robotics',
    image: '/assest/drone.jpg' },
  { name: 'Maker Club', icon: Lightbulb, color: 'from-orange-400 to-orange-600',
    description: '3D printing, IoT projects, and innovation workshops',
    image: '/assest/codekids jr projects.jpg' },
  { name: '3D Printing Club', icon: Cpu, color: 'from-green-400 to-green-600',
    description: 'Design and print 3D models and prototypes',
    image: '/assest/learning.jpg' },
];

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
    name: 'Arjun Reddy',
    role: 'Grade 9 Student',
    school: 'Kendriya Vidyalaya',
    text: 'I participated in the drone racing competition and won second place! It was the best experience ever.',
    rating: 5,
    image: '/assest/codekids_jr testimonial3.jpg',
  },
  {
    name: 'Kavya Nair',
    role: 'Grade 7 Student',
    school: 'Vidya Valley School',
    text: 'The coding club helped me create my first game. I love coding now and want to become a game developer!',
    rating: 5,
    image: '/assest/codekids_jr testimonial.jpg',
  },
];

const parentTestimonials = [
  {
    name: 'Mrs. Meera Kapoor',
    relation: 'Mother of Grade 7 student',
    text: 'My daughter has become more confident and curious about technology. CodeKids has truly transformed her interest in STEM.',
    image: '/assest/parents.jpg',
  },
  {
    name: 'Mr. Rajesh Kumar',
    relation: 'Father of Grade 9 student',
    text: 'Excellent program with hands-on learning. My son now spends his free time building projects instead of just playing games.',
    image: '/assest/parents2.jpg',
  },
  {
    name: 'Dr. Sunita Rao',
    relation: 'Mother of Grade 10 student',
    text: 'The robotics program has helped my daughter discover her passion. She now wants to pursue engineering.',
    image: '/assest/parents.jpg',
  },
];

const faqs = [
  {
    question: 'What age groups do you cater to?',
    answer: 'CodeKids_Jr is designed for students aged 6-17, with age-appropriate curriculum for different grade levels. Programs are tailored to ensure optimal learning for each age group.',
  },
  {
    question: 'Do you provide the equipment and materials?',
    answer: 'Yes, we provide all robotics kits, laptops, software, and materials needed for the programs. Schools don\'t need to invest in expensive equipment.',
  },
  {
    question: 'How do you ensure student safety?',
    answer: 'All our programs are conducted under trained supervision with proper safety protocols. We maintain a healthy student-teacher ratio and follow strict safety guidelines.',
  },
  {
    question: 'Can individual students enroll or is it only for schools?',
    answer: 'While our primary focus is on school partnerships, we also offer individual enrollment for camps and competitions during school breaks.',
  },
  {
    question: 'What is the duration of the programs?',
    answer: 'Camps run for 1-2 weeks, clubs are year-round with weekly sessions, and STEM labs are permanent setups with ongoing curriculum integrated into school schedules.',
  },
];

export default function CodeKidsJrPage() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      if (typeof window !== 'undefined' && heroCarousel && heroCarousel.length > 0) {
        const timer = setInterval(() => {
          setCurrentSlide((prev) => (prev + 1) % heroCarousel.length);
        }, 5000);
        return () => clearInterval(timer);
      }
    } catch (err) {
      console.error('Error in CodeKidsJrPage:', err);
      setError(err instanceof Error ? err.message : 'An error occurred');
    }
  }, []);

  // Handle anchor link clicks
  const handleAnchorClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('#')) {
      e.preventDefault();
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  // Error boundary fallback
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center p-8">
          <h1 className="text-2xl font-bold mb-4 text-foreground">Error Loading Page</h1>
          <p className="text-muted-foreground mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90"
          >
            Reload Page
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <SEO
        title="CodeKids Jr | Future-Ready Tech Program for Kids (Ages 6-17)"
        description="CodeKids Jr offers comprehensive coding, robotics, AI, and STEM education for students aged 6-17. Offline school programs, online classes, tech camps, and year-round clubs. Trusted by 100+ schools across India."
        keywords="coding for kids, robotics for children, AI education, STEM programs, school tech curriculum, online coding classes, tech camps for kids, programming for kids, robotics training, AI ML for students"
        canonical="https://codekidstech.com/codekids-jr"
        ogImage="/assest/codekids jr learning.jpg"
        structuredData={{
          '@context': 'https://schema.org',
          '@graph': [
            generateCourseStructuredData(
              'CodeKids Jr - Coding, Robotics & AI Program',
              'Comprehensive tech education program for students aged 6-17 covering coding, robotics, AI, and STEM subjects.',
              '₹100',
              'INR',
              ['Coding', 'Robotics', 'Artificial Intelligence', 'STEM Education', 'Programming'],
              'Beginner to Advanced'
            ),
            generateBreadcrumbStructuredData([
              { name: 'Home', url: 'https://codekidstech.com' },
              { name: 'CodeKids Jr', url: 'https://codekidstech.com/codekids-jr' },
            ]),
            generateFAQStructuredData(faqs),
          ],
        }}
      />
      <div className="min-h-screen">
        {/* Hero Section with Carousel */}
        <section className="relative h-[85vh] sm:h-[90vh] min-h-[600px] sm:min-h-[700px] overflow-hidden pt-20 md:pt-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.8 }}
              className="absolute inset-0 z-0"
            >
              <Image
                src={heroCarousel[currentSlide].image}
                alt={heroCarousel[currentSlide].title}
                fill
                priority={currentSlide === 0}
                className="object-cover"
                sizes="100vw"
                style={{ zIndex: 0 }}
              />
              <div className="absolute inset-0 bg-gradient-to-br from-pink-600/60 via-purple-600/60 to-blue-600/60 dark:from-pink-950/70 dark:via-purple-950/70 dark:to-blue-950/70 z-10" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-10" />
              <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzBoLTJWMGgyeiIvPjwvZz48L2c+PC9zdmc+')] opacity-15 z-10" />
            </motion.div>
          </AnimatePresence>

          <div className="relative z-20 h-full flex items-center py-8 sm:py-12 md:py-0">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-center max-w-4xl mx-auto"
              >
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2 }}
                  className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-white/20 backdrop-blur-sm mb-4 sm:mb-6 border border-white/30"
                >
                  <Sparkles className="h-3 w-3 sm:h-4 sm:w-4 text-pink-300" />
                  <span className="text-xs sm:text-sm font-medium text-white">Future-Ready Tech Program • Ages 6–16</span>
                </motion.div>

                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentSlide}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5 }}
                    className="space-y-4 sm:space-y-6"
                  >
                    <h1 className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 sm:mb-6 font-heading leading-tight">
                      <span className="bg-gradient-to-r from-cyan-300 via-purple-300 to-pink-300 bg-clip-text text-transparent">
                        CodeKids_Jr
                      </span>
                      <span className="block text-white mt-2 sm:mt-3">
                        Future-Ready Tech Program
                      </span>
                      <span className="block text-base sm:text-lg md:text-xl lg:text-2xl text-white/90 font-normal mt-3 sm:mt-4 max-w-3xl mx-auto">
                        Making Children Smart, Creative, Confident & Future-Ready
                      </span>
                    </h1>
                    <p className="text-base sm:text-lg md:text-xl text-white/90 mb-6 sm:mb-8 leading-relaxed max-w-3xl mx-auto px-4">
                      We combine coding, robotics, AI, design, and life skills in a fun, structured way – so that both parents and schools see real, visible growth in every child.
                    </p>
                  </motion.div>
                </AnimatePresence>

                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
                  <a
                    href="#contact"
                    onClick={(e) => handleAnchorClick(e, '#contact')}
                    className="inline-flex items-center justify-center gap-2 px-6 py-3.5 sm:px-8 sm:py-4 rounded-full bg-gradient-to-r from-[#FF4B8F] via-[#7B3DFF] to-[#2ED0FF] text-white font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all text-sm sm:text-base w-full sm:w-auto min-h-[48px] touch-manipulation"
                  >
                    Book a Free Demo Class
                    <Rocket className="h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0" />
                  </a>
                  <a
                    href="#overview"
                    onClick={(e) => handleAnchorClick(e, '#overview')}
                    className="inline-flex items-center justify-center gap-2 px-6 py-3.5 sm:px-8 sm:py-4 rounded-full border-2 border-white text-white font-semibold hover:bg-white hover:text-purple-900 transition-all text-sm sm:text-base w-full sm:w-auto min-h-[48px] touch-manipulation"
                  >
                    <PlayCircle className="h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0" />
                    Explore Programs
                  </a>
                </div>
              </motion.div>
            </div>
          </div>

          <button
            onClick={() => setCurrentSlide((prev) => (prev - 1 + heroCarousel.length) % heroCarousel.length)}
            className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-20 h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 flex items-center justify-center transition-all"
            aria-label="Previous slide"
          >
            <ChevronLeft className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 text-white" />
          </button>
          <button
            onClick={() => setCurrentSlide((prev) => (prev + 1) % heroCarousel.length)}
            className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-20 h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 flex items-center justify-center transition-all"
            aria-label="Next slide"
          >
            <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 text-white" />
          </button>

          <div className="absolute bottom-4 sm:bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-2">
            {heroCarousel.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`h-1.5 sm:h-2 rounded-full transition-all ${
                  index === currentSlide ? 'w-6 sm:w-8 bg-white' : 'w-1.5 sm:w-2 bg-white/50'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </section>

        {/* Program Overview Section */}
        <section id="overview" className="py-12 sm:py-16 md:py-20 bg-gradient-to-b from-transparent via-purple-50/30 dark:via-purple-950/20 to-transparent">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12 sm:mb-16"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-pink-500/20 via-purple-500/20 to-blue-500/20 mb-4 sm:mb-6 border border-primary/20">
                <Sparkles className="h-4 w-4 text-primary" />
                <span className="text-sm font-semibold text-primary">What CodeKids_Jr Offers</span>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 font-heading">
                <span className="bg-gradient-to-r from-[#FF4B8F] via-[#7B3DFF] to-[#2ED0FF] bg-clip-text text-transparent">
                  Built on 4 Powerful Pillars
                </span>
              </h2>
              <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed px-4">
                A complete growth experience that makes CodeKids_Jr extremely attractive for parents and schools
              </p>
            </motion.div>

            {/* Pillar Cards Preview */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-12">
              {[
                {
                  title: 'Skill-Based Courses',
                  subtitle: 'Future-Ready Curriculum',
                  icon: BookOpen,
                  color: 'from-blue-500 to-cyan-500',
                  bgColor: 'from-blue-500/10 to-cyan-500/10',
                },
                {
                  title: 'Premium Services',
                  subtitle: 'For Students & Parents',
                  icon: Award,
                  color: 'from-purple-500 to-pink-500',
                  bgColor: 'from-purple-500/10 to-pink-500/10',
                },
                {
                  title: 'School Partnership',
                  subtitle: 'Complete Solutions',
                  icon: Building2,
                  color: 'from-pink-500 to-rose-500',
                  bgColor: 'from-pink-500/10 to-rose-500/10',
                },
                {
                  title: 'Parent Engagement',
                  subtitle: 'Trust Building',
                  icon: Heart,
                  color: 'from-orange-500 to-red-500',
                  bgColor: 'from-orange-500/10 to-red-500/10',
                },
              ].map((pillar, index) => (
                <motion.div
                  key={pillar.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="group"
                >
                  <GlassCard className={`p-5 sm:p-6 h-full hover:scale-105 transition-all duration-300 bg-gradient-to-br ${pillar.bgColor} border-2 border-transparent hover:border-primary/30`}>
                    <div className={`h-12 w-12 sm:h-14 sm:w-14 rounded-xl bg-gradient-to-br ${pillar.color} flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform`}>
                      <pillar.icon className="h-6 w-6 sm:h-7 sm:w-7 text-white" />
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold mb-1 sm:mb-2 font-heading text-foreground">{pillar.title}</h3>
                    <p className="text-xs sm:text-sm text-muted-foreground">{pillar.subtitle}</p>
                  </GlassCard>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Pillar 1: Skill-Based Courses */}
        <section className="py-12 sm:py-16 md:py-20 relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12 sm:mb-16"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-500/20 to-cyan-500/20 mb-4 sm:mb-6 border border-blue-500/30">
                <BookOpen className="h-4 w-4 text-blue-500" />
                <span className="text-sm font-semibold text-blue-500">PILLAR 1</span>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 font-heading">
                <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                  Skill-Based Courses
                </span>
              </h2>
              <p className="text-base sm:text-lg text-muted-foreground max-w-3xl mx-auto px-4">
                A structured 3-level journey from basics to innovation
              </p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
              {/* Foundation Level */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="group"
              >
                <GlassCard className="p-5 sm:p-6 md:p-8 h-full hover:scale-105 transition-all duration-300 border-2 border-blue-500/20 hover:border-blue-500/40 bg-gradient-to-br from-blue-500/5 to-cyan-500/5">
                  <div className="flex items-center gap-3 mb-4 sm:mb-6">
                    <div className="h-12 w-12 sm:h-14 sm:w-14 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center shadow-lg">
                      <span className="text-2xl sm:text-3xl font-bold text-white">1</span>
                    </div>
                    <div>
                      <h3 className="text-xl sm:text-2xl font-bold font-heading text-foreground">Foundations</h3>
                      <p className="text-xs sm:text-sm text-muted-foreground">Ages 6–10 Years • &quot;Tech Explorers&quot;</p>
                    </div>
                  </div>
                  <div className="space-y-3 sm:space-y-4 mb-6">
                    <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                      Kids start their technology journey in a fun, safe way.
                    </p>
                    <div>
                      <p className="text-xs sm:text-sm font-semibold text-foreground mb-2">They learn:</p>
                      <ul className="space-y-2 text-xs sm:text-sm text-muted-foreground">
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-4 w-4 text-blue-500 flex-shrink-0 mt-0.5" />
                          <span>Computer basics & digital literacy</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-4 w-4 text-blue-500 flex-shrink-0 mt-0.5" />
                          <span>Logical thinking & problem-solving</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-4 w-4 text-blue-500 flex-shrink-0 mt-0.5" />
                          <span>Scratch Jr & Scratch coding</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-4 w-4 text-blue-500 flex-shrink-0 mt-0.5" />
                          <span>Basic robotics (virtual + simple kits)</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-4 w-4 text-blue-500 flex-shrink-0 mt-0.5" />
                          <span>Digital creativity (stories, animations, Canva basics)</span>
                        </li>
                      </ul>
                    </div>
                    <div className="pt-3 border-t border-border">
                      <p className="text-xs sm:text-sm font-semibold text-foreground mb-1">Outcome:</p>
                      <p className="text-xs sm:text-sm text-muted-foreground">
                        Children become confident using computers, creating simple games, animations, and stories instead of just consuming content.
                      </p>
                    </div>
                  </div>
                </GlassCard>
              </motion.div>

              {/* Intermediate Level */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="group"
              >
                <GlassCard className="p-5 sm:p-6 md:p-8 h-full hover:scale-105 transition-all duration-300 border-2 border-purple-500/20 hover:border-purple-500/40 bg-gradient-to-br from-purple-500/5 to-pink-500/5">
                  <div className="flex items-center gap-3 mb-4 sm:mb-6">
                    <div className="h-12 w-12 sm:h-14 sm:w-14 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-lg">
                      <span className="text-2xl sm:text-3xl font-bold text-white">2</span>
                    </div>
                    <div>
                      <h3 className="text-xl sm:text-2xl font-bold font-heading text-foreground">Intermediate</h3>
                      <p className="text-xs sm:text-sm text-muted-foreground">Ages 9–12 Years • &quot;Future Coders&quot;</p>
                    </div>
                  </div>
                  <div className="space-y-3 sm:space-y-4 mb-6">
                    <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                      Students move from playing with tech to building with tech.
                    </p>
                    <div>
                      <p className="text-xs sm:text-sm font-semibold text-foreground mb-2">They learn:</p>
                      <ul className="space-y-2 text-xs sm:text-sm text-muted-foreground">
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-4 w-4 text-purple-500 flex-shrink-0 mt-0.5" />
                          <span>Advanced Scratch programming</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-4 w-4 text-purple-500 flex-shrink-0 mt-0.5" />
                          <span>App development with MIT App Inventor</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-4 w-4 text-purple-500 flex-shrink-0 mt-0.5" />
                          <span>Game development logic</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-4 w-4 text-purple-500 flex-shrink-0 mt-0.5" />
                          <span>micro:bit robotics projects</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-4 w-4 text-purple-500 flex-shrink-0 mt-0.5" />
                          <span>AI basics using tools like Teachable Machine</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-4 w-4 text-purple-500 flex-shrink-0 mt-0.5" />
                          <span>Data basics – charts, graphs, and simple visualizations</span>
                        </li>
                      </ul>
                    </div>
                    <div className="pt-3 border-t border-border">
                      <p className="text-xs sm:text-sm font-semibold text-foreground mb-1">Outcome:</p>
                      <p className="text-xs sm:text-sm text-muted-foreground">
                        Students build working apps, robotics outputs, and simple AI models, and start thinking like real problem-solvers.
                      </p>
                    </div>
                  </div>
                </GlassCard>
              </motion.div>

              {/* Advanced Level */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="group"
              >
                <GlassCard className="p-5 sm:p-6 md:p-8 h-full hover:scale-105 transition-all duration-300 border-2 border-pink-500/20 hover:border-pink-500/40 bg-gradient-to-br from-pink-500/5 to-rose-500/5">
                  <div className="flex items-center gap-3 mb-4 sm:mb-6">
                    <div className="h-12 w-12 sm:h-14 sm:w-14 rounded-xl bg-gradient-to-br from-pink-500 to-rose-500 flex items-center justify-center shadow-lg">
                      <span className="text-2xl sm:text-3xl font-bold text-white">3</span>
                    </div>
                    <div>
                      <h3 className="text-xl sm:text-2xl font-bold font-heading text-foreground">Advanced</h3>
                      <p className="text-xs sm:text-sm text-muted-foreground">Ages 12–16 Years • &quot;Teen Innovators&quot;</p>
                    </div>
                  </div>
                  <div className="space-y-3 sm:space-y-4 mb-6">
                    <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                      Teens transform into young innovators and creators.
                    </p>
                    <div>
                      <p className="text-xs sm:text-sm font-semibold text-foreground mb-2">They learn:</p>
                      <ul className="space-y-2 text-xs sm:text-sm text-muted-foreground">
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-4 w-4 text-pink-500 flex-shrink-0 mt-0.5" />
                          <span>Python programming</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-4 w-4 text-pink-500 flex-shrink-0 mt-0.5" />
                          <span>Web development basics (HTML, CSS, JavaScript)</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-4 w-4 text-pink-500 flex-shrink-0 mt-0.5" />
                          <span>Robotics & IoT with Arduino / micro:bit / ESP32</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-4 w-4 text-pink-500 flex-shrink-0 mt-0.5" />
                          <span>Applied AI (image/sound classification, chatbots)</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-4 w-4 text-pink-500 flex-shrink-0 mt-0.5" />
                          <span>UI/UX basics – designing user-friendly apps & websites</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-4 w-4 text-pink-500 flex-shrink-0 mt-0.5" />
                          <span>Teen entrepreneurship – idea → prototype → pitch</span>
                        </li>
                      </ul>
                    </div>
                    <div className="pt-3 border-t border-border">
                      <p className="text-xs sm:text-sm font-semibold text-foreground mb-1">Outcome:</p>
                      <p className="text-xs sm:text-sm text-muted-foreground">
                        Teens build real tech projects, present them with confidence, and learn how to pitch ideas like young entrepreneurs.
                      </p>
                    </div>
                  </div>
                </GlassCard>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Pillar 2: Premium Services */}
        <section className="py-12 sm:py-16 md:py-20 bg-gradient-to-b from-transparent via-purple-50/30 dark:via-purple-950/20 to-transparent relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12 sm:mb-16"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 mb-4 sm:mb-6 border border-purple-500/30">
                <Award className="h-4 w-4 text-purple-500" />
                <span className="text-sm font-semibold text-purple-500">PILLAR 2</span>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 font-heading">
                <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Premium Services for Students & Parents
                </span>
              </h2>
              <p className="text-base sm:text-lg text-muted-foreground max-w-3xl mx-auto px-4">
                Most institutes just &quot;teach classes&quot;. CodeKids_Jr delivers a complete growth experience.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {[
                {
                  title: 'Personal Student Portfolio Website',
                  icon: Globe,
                  color: 'from-blue-500 to-cyan-500',
                  description: 'Every child gets a personal portfolio website showcasing games, apps, robotics & AI projects, designs, videos, and achievements. Acts as a digital resume for future schools, competitions, and early career opportunities.',
                  highlight: 'Parents absolutely love seeing their child&apos;s work online.',
                },
                {
                  title: 'High-Quality Self-Introduction Video',
                  icon: Video,
                  color: 'from-purple-500 to-pink-500',
                  description: 'We train students to speak confidently, present their tech projects, record clear self-introductions, and edit and publish the final video. Builds confidence, communication skills, and stage presence.',
                },
                {
                  title: 'LinkedIn & GitHub Setup (for Teens)',
                  icon: Network,
                  color: 'from-indigo-500 to-blue-500',
                  description: 'For students aged 13–16, we help create professional LinkedIn profiles, upload projects and achievements, and set up GitHub coding portfolios. Parents see their child building a digital presence early.',
                },
                {
                  title: 'Progress Reports + AI-Based Assessments',
                  icon: BarChart3,
                  color: 'from-green-500 to-emerald-500',
                  description: 'Every month, parents receive detailed skill reports, performance charts, project evaluations, teacher feedback, and personalized growth roadmaps. Parents see clear, data-backed progress.',
                },
                {
                  title: 'Certificates for Every Level',
                  icon: Award,
                  color: 'from-yellow-500 to-orange-500',
                  description: 'Students receive course completion certificates, excellence certificates, project & innovation certificates, and TechFest participation certificates. Adds credibility and motivation.',
                },
                {
                  title: 'Live Interactive Classes + Project Reviews',
                  icon: Users,
                  color: 'from-pink-500 to-rose-500',
                  description: 'Every program includes weekly live classes, doubt-clearing sessions, one-to-one project reviews, and presentation practice with feedback. Students present, discuss, and improve.',
                },
                {
                  title: 'Technology Events & Challenges',
                  icon: Trophy,
                  color: 'from-red-500 to-pink-500',
                  description: 'We keep students excited with hackathons, robotics challenge days, AI showcase events, and annual TechFest for students & parents. Creates a competitive, fun, and inspiring ecosystem.',
                },
              ].map((service, index) => (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="group"
                >
                  <GlassCard className={`p-5 sm:p-6 h-full hover:scale-105 transition-all duration-300 border-2 border-transparent hover:border-primary/30 bg-gradient-to-br from-secondary/50 to-secondary/30`}>
                    <div className={`h-12 w-12 sm:h-14 sm:w-14 rounded-xl bg-gradient-to-br ${service.color} flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform`}>
                      <service.icon className="h-6 w-6 sm:h-7 sm:w-7 text-white" />
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3 font-heading text-foreground">{service.title}</h3>
                    <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed mb-2">{service.description}</p>
                    {service.highlight && (
                      <p className="text-xs sm:text-sm font-semibold text-primary mt-2">👉 {service.highlight}</p>
                    )}
                  </GlassCard>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Pillar 3: School Partnership Solutions */}
        <section className="py-12 sm:py-16 md:py-20 relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12 sm:mb-16"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-pink-500/20 to-rose-500/20 mb-4 sm:mb-6 border border-pink-500/30">
                <Building2 className="h-4 w-4 text-pink-500" />
                <span className="text-sm font-semibold text-pink-500">PILLAR 3</span>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 font-heading">
                <span className="bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent">
                  School Partnership Solutions
                </span>
              </h2>
              <p className="text-base sm:text-lg text-muted-foreground max-w-3xl mx-auto px-4">
                CodeKids_Jr is not just a course – it&apos;s a plug-and-play tech education partner for schools.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
              {[
                {
                  title: 'Complete Coding, AI & Robotics Curriculum',
                  icon: BookOpen,
                  color: 'from-blue-500 to-cyan-500',
                  features: [
                    'Full-year, NEP-aligned syllabus',
                    'Ready-made lesson plans',
                    'Worksheets & activities',
                    'Projects & assessments',
                    'Report card formats',
                    'Teacher manuals',
                  ],
                  description: 'Schools get a ready-to-implement curriculum without needing to build content from scratch.',
                },
                {
                  title: 'Tinkering Lab / AI Lab Setup',
                  icon: Settings,
                  color: 'from-purple-500 to-pink-500',
                  features: [
                    'Robotics kits and AI kits',
                    'Coding devices & tools',
                    'Concept posters',
                    'Virtual labs for simulations',
                    'Teacher training and support',
                  ],
                  description: 'Gives schools a modern, &quot;future-ready&quot; lab that impresses parents and boosts admissions.',
                },
                {
                  title: 'Teacher Training Programs',
                  icon: GraduationCap,
                  color: 'from-indigo-500 to-blue-500',
                  features: [
                    'Hands-on training in coding & computational thinking',
                    'Robotics & electronics training',
                    'AI tools and classroom activities',
                    'Innovative teaching techniques using technology',
                  ],
                  description: 'Builds in-house capacity for schools and makes their teachers confident in teaching modern skills.',
                },
                {
                  title: 'School Tech Events',
                  icon: Trophy,
                  color: 'from-orange-500 to-red-500',
                  features: [
                    'Tech Carnivals',
                    'Robotics competitions',
                    'AI model expos',
                    'Coding championships',
                    'App-building challenges',
                  ],
                  description: 'Helps schools showcase innovation, attract new admissions, and delight existing parents.',
                },
              ].map((solution, index) => (
                <motion.div
                  key={solution.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="group"
                >
                  <GlassCard className={`p-5 sm:p-6 md:p-8 h-full hover:scale-105 transition-all duration-300 border-2 border-transparent hover:border-primary/30 bg-gradient-to-br from-secondary/50 to-secondary/30`}>
                    <div className={`h-12 w-12 sm:h-14 sm:w-14 rounded-xl bg-gradient-to-br ${solution.color} flex items-center justify-center mb-4 sm:mb-6 shadow-lg group-hover:scale-110 transition-transform`}>
                      <solution.icon className="h-6 w-6 sm:h-7 sm:w-7 text-white" />
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 font-heading text-foreground">{solution.title}</h3>
                    <p className="text-xs sm:text-sm text-muted-foreground mb-4 leading-relaxed">{solution.description}</p>
                    <ul className="space-y-2">
                      {solution.features.map((feature, i) => (
                        <li key={i} className="flex items-start gap-2 text-xs sm:text-sm text-muted-foreground">
                          <CheckCircle className={`h-4 w-4 flex-shrink-0 mt-0.5 bg-gradient-to-br ${solution.color} bg-clip-text text-transparent`} />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </GlassCard>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Pillar 4: Parent Engagement */}
        <section className="py-12 sm:py-16 md:py-20 bg-gradient-to-b from-transparent via-purple-50/30 dark:via-purple-950/20 to-transparent relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12 sm:mb-16"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-orange-500/20 to-red-500/20 mb-4 sm:mb-6 border border-orange-500/30">
                <Heart className="h-4 w-4 text-orange-500" />
                <span className="text-sm font-semibold text-orange-500">PILLAR 4</span>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 font-heading">
                <span className="bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                  Parent Engagement & Trust Building
                </span>
              </h2>
              <p className="text-base sm:text-lg text-muted-foreground max-w-3xl mx-auto px-4">
                We believe parents should be partners in the learning journey.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
              {[
                {
                  title: 'Free Parenting & Technology Workshops',
                  icon: Users,
                  color: 'from-blue-500 to-cyan-500',
                  topics: [
                    'How AI will shape your child\'s future',
                    'How to guide children in technology',
                    'Digital safety & screen-time management',
                    'Choosing the right tech path for your child',
                  ],
                  description: 'Regular sessions that make parents feel informed, supported, and involved.',
                },
                {
                  title: 'Demo Days & Project Exhibitions',
                  icon: Presentation,
                  color: 'from-purple-500 to-pink-500',
                  topics: [
                    'Watch project presentations',
                    'See robotics & AI demos',
                    'Attend certificate ceremonies',
                  ],
                  description: 'When parents see real projects and real confidence, trust becomes automatic.',
                },
                {
                  title: 'Personalized Progress Calls',
                  icon: MessageSquare,
                  color: 'from-pink-500 to-rose-500',
                  topics: [
                    'Child\'s strengths discussion',
                    'Areas for improvement',
                    'Next-level learning roadmap',
                  ],
                  description: 'Every term, our team connects with parents. Parents feel heard, respected, and closely connected.',
                },
              ].map((engagement, index) => (
                <motion.div
                  key={engagement.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="group"
                >
                  <GlassCard className={`p-5 sm:p-6 md:p-8 h-full hover:scale-105 transition-all duration-300 border-2 border-transparent hover:border-primary/30 bg-gradient-to-br from-secondary/50 to-secondary/30`}>
                    <div className={`h-12 w-12 sm:h-14 sm:w-14 rounded-xl bg-gradient-to-br ${engagement.color} flex items-center justify-center mb-4 sm:mb-6 shadow-lg group-hover:scale-110 transition-transform`}>
                      <engagement.icon className="h-6 w-6 sm:h-7 sm:w-7 text-white" />
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 font-heading text-foreground">{engagement.title}</h3>
                    <p className="text-xs sm:text-sm text-muted-foreground mb-4 leading-relaxed">{engagement.description}</p>
                    <ul className="space-y-2">
                      {engagement.topics.map((topic, i) => (
                        <li key={i} className="flex items-start gap-2 text-xs sm:text-sm text-muted-foreground">
                          <CheckCircle className={`h-4 w-4 flex-shrink-0 mt-0.5 bg-gradient-to-br ${engagement.color} bg-clip-text text-transparent`} />
                          <span>{topic}</span>
                        </li>
                      ))}
                    </ul>
                  </GlassCard>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Why Parents Choose Section */}
        <section className="py-12 sm:py-16 md:py-20 relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12 sm:mb-16"
            >
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 font-heading">
                Why Parents <span className="bg-gradient-to-r from-[#FF4B8F] via-[#7B3DFF] to-[#2ED0FF] bg-clip-text text-transparent">Choose</span> CodeKids_Jr
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {[
                { icon: Rocket, text: 'Future-ready skills: Coding, robotics, AI, app dev, web dev', color: 'from-blue-500 to-cyan-500' },
                { icon: TrendingUp, text: 'Confidence boost: Public speaking, presentations, teamwork', color: 'from-purple-500 to-pink-500' },
                { icon: Globe, text: 'Digital portfolio: Website, GitHub, videos – visible proof of learning', color: 'from-pink-500 to-rose-500' },
                { icon: BarChart, text: 'Transparent progress: Monthly reports, AI-based assessments, feedback', color: 'from-green-500 to-emerald-500' },
                { icon: Shield, text: 'Safe & structured: Age-wise curriculum and guided learning', color: 'from-indigo-500 to-blue-500' },
                { icon: Target, text: 'Long-term impact: Strong foundation for future careers and academics', color: 'from-orange-500 to-red-500' },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <GlassCard className="p-5 sm:p-6 min-h-[140px] sm:min-h-[160px] flex flex-col hover:scale-105 transition-transform duration-300 border border-border/50 hover:border-primary/30 h-full">
                    <div className={`h-12 w-12 sm:h-14 sm:w-14 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center mb-4 flex-shrink-0`}>
                      <item.icon className="h-6 w-6 sm:h-7 sm:w-7 text-white" />
                    </div>
                    <p className="text-sm sm:text-base font-medium text-foreground leading-relaxed flex-grow">
                      ⭐ {item.text}
                    </p>
                  </GlassCard>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Why Schools Partner Section */}
        <section className="py-12 sm:py-16 md:py-20 bg-gradient-to-b from-transparent via-purple-50/30 dark:via-purple-950/20 to-transparent relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12 sm:mb-16"
            >
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 font-heading">
                Why Schools <span className="bg-gradient-to-r from-[#FF4B8F] via-[#7B3DFF] to-[#2ED0FF] bg-clip-text text-transparent">Partner</span> with CodeKids_Jr
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              {[
                { icon: BookOpen, text: 'Complete coding, AI & robotics curriculum ready to implement', color: 'from-blue-500 to-cyan-500' },
                { icon: GraduationCap, text: 'Teacher training and continuous support', color: 'from-purple-500 to-pink-500' },
                { icon: Settings, text: 'Tinkering / Robotics / AI Lab setup', color: 'from-pink-500 to-rose-500' },
                { icon: Trophy, text: 'TechFest, competitions, and events to impress parents', color: 'from-orange-500 to-red-500' },
                { icon: Award, text: 'Strong branding as a &quot;future-ready&quot; school', color: 'from-green-500 to-emerald-500' },
                { icon: TrendingUp, text: 'Better admissions & parent satisfaction', color: 'from-indigo-500 to-blue-500' },
                { icon: Zap, text: 'Zero extra burden – we handle content, training, and execution', color: 'from-red-500 to-pink-500' },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <GlassCard className="p-5 sm:p-6 flex items-start gap-4 hover:scale-105 transition-transform duration-300 border border-border/50 hover:border-primary/30">
                    <div className={`h-12 w-12 sm:h-14 sm:w-14 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center flex-shrink-0 shadow-lg`}>
                      <item.icon className="h-6 w-6 sm:h-7 sm:w-7 text-white" />
                    </div>
                    <p className="text-sm sm:text-base font-medium text-foreground leading-relaxed flex-grow pt-2">
                      ✔ {item.text}
                    </p>
                  </GlassCard>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Highlight Section */}
        <section className="py-12 sm:py-16 md:py-20 relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12 sm:mb-16"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 mb-4 sm:mb-6 border border-primary/20">
                <Sparkles className="h-4 w-4 text-primary" />
                <span className="text-sm font-semibold text-primary">Complete Growth Package</span>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 font-heading">
                <span className="bg-gradient-to-r from-[#FF4B8F] via-[#7B3DFF] to-[#2ED0FF] bg-clip-text text-transparent">
                  CodeKids_Jr – One Program, Complete Growth
                </span>
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12">
              {/* For Students */}
              <GlassCard className="p-6 sm:p-8 md:p-10 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10 border-2 border-primary/30">
                <div className="flex items-center gap-3 mb-6">
                  <div className="h-12 w-12 sm:h-14 sm:w-14 rounded-xl bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center shadow-lg">
                    <Users className="h-6 w-6 sm:h-7 sm:w-7 text-white" />
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-bold font-heading text-foreground">For Students</h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  {[
                    'Coding: Scratch, Python, App Development',
                    'Robotics & IoT',
                    'Artificial Intelligence for kids',
                    'Data science basics',
                    'Graphic design & video creation',
                    'Confidence training & presentations',
                    'Personal student portfolio website',
                    'AI-based progress reports',
                    'Live interactive classes',
                    'Certificates at every level',
                    'Self-introduction video for every student',
                  ].map((item, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-xs sm:text-sm text-foreground">{item}</span>
                    </div>
                  ))}
                </div>
              </GlassCard>

              {/* For Schools */}
              <GlassCard className="p-6 sm:p-8 md:p-10 bg-gradient-to-br from-purple-500/10 via-pink-500/10 to-rose-500/10 border-2 border-primary/30">
                <div className="flex items-center gap-3 mb-6">
                  <div className="h-12 w-12 sm:h-14 sm:w-14 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-lg">
                    <School className="h-6 w-6 sm:h-7 sm:w-7 text-white" />
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-bold font-heading text-foreground">For Schools</h3>
                </div>
                <div className="space-y-3 sm:space-y-4">
                  {[
                    'Full-year tech curriculum',
                    'Teacher training',
                    'Tinkering / Robotics / AI lab setup',
                    'TechFest & competitions',
                    'Assessments & report cards',
                  ].map((item, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-sm sm:text-base text-foreground font-medium">{item}</span>
                    </div>
                  ))}
                </div>
              </GlassCard>
            </div>
          </div>
        </section>

        {/* Seasonal Tech Camps */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div {...fadeInUp} className="text-center mb-16">
              <h2 className="text-foreground text-4xl md:text-5xl font-bold mb-4 font-heading">
                Seasonal <span className="bg-gradient-to-r from-[#FF4B8F] via-[#7B3DFF] to-[#2ED0FF] bg-clip-text text-transparent">Tech Camps</span>
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Intensive hands-on learning experiences during school breaks
              </p>
            </motion.div>

            <Carousel opts={{ align: 'start', loop: true }} className="w-full">
              <CarouselContent className="-ml-2 md:-ml-4">
                {camps.map((camp, index) => (
                  <CarouselItem key={index} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
                    <motion.div
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      className="group h-full"
                    >
                      <GlassCard className="overflow-hidden h-full hover:scale-105 transition-transform duration-300">
                        <div className="relative h-56 overflow-hidden">
                          <Image
                            src={camp.image}
                            alt={camp.title}
                            fill
                            className="object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                          <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-primary/90 text-white text-xs font-semibold">
                            {camp.duration}
                          </div>
                          <div className="absolute bottom-4 left-4 right-4 text-white">
                            <h3 className="text-xl font-bold font-heading mb-1">{camp.title}</h3>
                            <p className="text-sm text-white/90">{camp.ageGroup}</p>
                          </div>
                        </div>
                        <div className="p-6">
                          <p className="text-muted-foreground mb-4 leading-relaxed">{camp.description}</p>
                          <div className="flex flex-wrap gap-2 mb-4">
                            {camp.skills.map((skill, i) => (
                              <span key={i} className="px-2 py-1 rounded-md bg-secondary text-xs text-muted-foreground">
                                {skill}
                              </span>
                            ))}
                          </div>
                          <button className="w-full py-2 rounded-lg bg-gradient-to-r from-primary/10 to-accent/10 text-primary font-semibold hover:from-primary/20 hover:to-accent/20 transition-all">
                            Learn More
                          </button>
                        </div>
                      </GlassCard>
                    </motion.div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="hidden md:flex" />
              <CarouselNext className="hidden md:flex" />
            </Carousel>
          </div>
        </section>

        {/* Year-Round Tech Clubs */}
        <section className="py-20 bg-gradient-to-b from-transparent to-secondary/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div {...fadeInUp} className="text-center mb-16">
              <h2 className="text-foreground text-4xl md:text-5xl font-bold mb-4 font-heading">
                Year-Round <span className="bg-gradient-to-r from-[#FF4B8F] via-[#7B3DFF] to-[#2ED0FF] bg-clip-text text-transparent">Tech Clubs</span>
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Weekly sessions for continuous learning and skill development
              </p>
            </motion.div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {clubs.map((club, index) => (
                <motion.div
                  key={club.name}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="group"
                >
                  <GlassCard className="overflow-hidden h-full hover:scale-105 transition-transform duration-300">
                    <div className="relative h-48 overflow-hidden">
                      <Image
                        src={club.image}
                        alt={club.name}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className={`absolute inset-0 bg-gradient-to-t ${club.color} opacity-70 group-hover:opacity-80 transition-opacity`} />
                      <div className={`h-16 w-16 rounded-2xl bg-gradient-to-br ${club.color} flex items-center justify-center absolute top-4 right-4 shadow-lg group-hover:scale-110 transition-transform`}>
                        <club.icon className="h-8 w-8 text-white" />
                      </div>
                      <div className="absolute bottom-4 left-4 right-4 text-white">
                        <h3 className="text-xl font-bold font-heading mb-1">{club.name}</h3>
                        <p className="text-sm text-white/90">{club.description}</p>
                      </div>
                    </div>
                    <div className="p-6">
                      <button className="w-full py-2 rounded-lg bg-gradient-to-r from-primary/10 to-accent/10 text-primary font-semibold hover:from-primary/20 hover:to-accent/20 transition-all">
                        Join Club
                      </button>
                    </div>
                  </GlassCard>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Student Success Stories */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div {...fadeInUp} className="text-center mb-16">
              <h2 className="text-foreground text-4xl md:text-5xl font-bold mb-4 font-heading">
                Student <span className="bg-gradient-to-r from-[#FF4B8F] via-[#7B3DFF] to-[#2ED0FF] bg-clip-text text-transparent">Success Stories</span>
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Hear from our students about their journey with CodeKids_Jr
              </p>
            </motion.div>

            <Carousel opts={{ align: 'start', loop: true }} className="w-full">
              <CarouselContent className="-ml-2 md:-ml-4">
                {testimonials.map((testimonial, index) => (
                  <CarouselItem key={index} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
                    <motion.div
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <GlassCard className="h-full">
                        <div className="relative h-32 w-32 mx-auto mb-4 rounded-full overflow-hidden">
                          <div className="absolute inset-0">
                            <Image
                              src={testimonial.image}
                              alt={testimonial.name}
                              fill
                              className="object-cover rounded-full"
                            />
                          </div>
                        </div>
                        <div className="flex gap-1 justify-center mb-4">
                          {[...Array(testimonial.rating)].map((_, i) => (
                            <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                          ))}
                        </div>
                        <p className="text-muted-foreground mb-4 italic text-center">&ldquo;{testimonial.text}&rdquo;</p>
                        <div className="border-t border-border pt-4 text-center">
                          <p className="font-semibold text-foreground">{testimonial.name}</p>
                          <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                          <p className="text-xs text-muted-foreground">{testimonial.school}</p>
                        </div>
                      </GlassCard>
                    </motion.div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="hidden md:flex" />
              <CarouselNext className="hidden md:flex" />
            </Carousel>
          </div>
        </section>

        {/* Parent Testimonials */}
        <section className="py-20 bg-gradient-to-b from-transparent to-secondary/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div {...fadeInUp} className="text-center mb-16">
              <h2 className="text-foreground text-4xl md:text-5xl font-bold mb-4 font-heading">
                What <span className="bg-gradient-to-r from-[#FF4B8F] via-[#7B3DFF] to-[#2ED0FF] bg-clip-text text-transparent">Parents Say</span>
              </h2>
            </motion.div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {parentTestimonials.map((testimonial, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <GlassCard className="h-full">
                    <div className="relative h-24 w-24 mx-auto mb-4 rounded-full overflow-hidden">
                      <div className="absolute inset-0">
                        <Image
                          src={testimonial.image}
                          alt={testimonial.name}
                          fill
                          className="object-cover rounded-full"
                        />
                      </div>
                    </div>
                    <p className="text-muted-foreground mb-4 italic text-center">&ldquo;{testimonial.text}&rdquo;</p>
                    <div className="border-t border-border pt-4 text-center">
                      <p className="font-semibold text-foreground">{testimonial.name}</p>
                      <p className="text-sm text-muted-foreground">{testimonial.relation}</p>
                    </div>
                  </GlassCard>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section id="faqs" className="py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div {...fadeInUp} className="text-center mb-16">
              <h2 className="text-foreground text-4xl md:text-5xl font-bold mb-4 font-heading">
                Frequently Asked <span className="bg-gradient-to-r from-[#FF4B8F] via-[#7B3DFF] to-[#2ED0FF] bg-clip-text text-transparent">Questions</span>
              </h2>
            </motion.div>

            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-left font-semibold">{faq.question}</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">{faq.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        {/* Demo Form / Contact Section */}
        <section id="contact" className="py-20 bg-gradient-to-b from-transparent via-purple-50/30 dark:via-purple-950/20 to-transparent">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div {...fadeInUp} className="text-center mb-12">
              <h2 className="text-foreground text-4xl md:text-5xl font-bold mb-4 font-heading">
                Book a Free <span className="bg-gradient-to-r from-[#FF4B8F] via-[#7B3DFF] to-[#2ED0FF] bg-clip-text text-transparent">Demo Class</span>
              </h2>
              <p className="text-lg text-muted-foreground">
                Get in touch with us to learn more about CodeKids_Jr programs
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <GlassCard className="p-8">
                <form className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium mb-2">Name *</label>
                      <input
                        type="text"
                        className="w-full px-4 py-3 rounded-lg bg-secondary border border-border focus:outline-none focus:ring-2 focus:ring-primary"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Email *</label>
                      <input
                        type="email"
                        className="w-full px-4 py-3 rounded-lg bg-secondary border border-border focus:outline-none focus:ring-2 focus:ring-primary"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium mb-2">Phone *</label>
                      <input
                        type="tel"
                        className="w-full px-4 py-3 rounded-lg bg-secondary border border-border focus:outline-none focus:ring-2 focus:ring-primary"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Student Age</label>
                      <input
                        type="number"
                        className="w-full px-4 py-3 rounded-lg bg-secondary border border-border focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Message</label>
                    <textarea
                      rows={4}
                      className="w-full px-4 py-3 rounded-lg bg-secondary border border-border focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="Tell us about your requirements..."
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 rounded-full bg-gradient-to-r from-[#FF4B8F] via-[#7B3DFF] to-[#2ED0FF] text-white font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all"
                  >
                    Submit Request
                  </button>
                </form>
              </GlassCard>
            </motion.div>
          </div>
        </section>

        {/* Offline Classes - School Programs Section */}
        <section id="offline-classes" className="py-20 relative overflow-hidden bg-gradient-to-b from-transparent via-secondary/10 to-transparent">
          {/* Animated Background */}
          <div className="absolute inset-0 z-0">
            <div
              className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-5 dark:opacity-3"
              style={{ backgroundImage: "url('/assest/kids robotics.jpg')" }}
            />
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10" />
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDMwaC0yVjBoMnoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-20" />
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            {/* Hero Section */}
            <motion.div
              {...fadeInUp}
              className="text-center mb-20"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 border border-primary/20 mb-6"
              >
                <Building2 className="h-5 w-5 text-primary" />
                <span className="text-sm font-semibold text-primary">We Come to Your School</span>
              </motion.div>
              <h2 className="text-foreground text-4xl md:text-5xl lg:text-6xl font-bold mb-6 font-heading">
                Offline <span className="bg-gradient-to-r from-[#FF4B8F] via-[#7B3DFF] to-[#2ED0FF] bg-clip-text text-transparent">School Programs</span>
              </h2>
              <p className="text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto mb-6 leading-relaxed">
                CodeKids Jr brings <span className="font-bold text-primary">best-in-class STEM courses and training</span> directly to your school campus. 
                We provide offline, hands-on learning experiences for students aged 6-16 years.
              </p>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                <span className="font-semibold text-foreground">Trusted by 100+ schools across India</span> — Transform your educational institute into a cutting-edge Techno Institute with our comprehensive offline programs.
              </p>
            </motion.div>

            {/* Main Hero Grid */}
            <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
              {/* Left: Features & Stats */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="space-y-8"
              >
                <GlassCard className="p-8 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10 border-2 border-primary/20">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center shadow-lg">
                      <Building2 className="h-8 w-8 text-white" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold font-heading text-foreground">Why Schools Choose Us</h3>
                      <p className="text-sm text-muted-foreground">Proven track record of excellence</p>
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-6 mb-6">
                    {[
                      { icon: GraduationCap, number: '100+', label: 'Partner Schools', color: 'from-blue-500 to-cyan-500' },
                      { icon: Users, number: '50K+', label: 'Students Trained', color: 'from-purple-500 to-pink-500' },
                      { icon: Star, number: '4.9/5', label: 'Satisfaction Rating', color: 'from-pink-500 to-rose-500' },
                      { icon: Trophy, number: '500+', label: 'Awards Won', color: 'from-orange-500 to-red-500' },
                    ].map((stat, index) => (
                      <motion.div
                        key={stat.label}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        className="text-center p-4 rounded-xl bg-secondary/50 hover:bg-secondary transition-colors"
                      >
                        <motion.div
                          whileHover={{ scale: 1.1, rotate: 5 }}
                          className={`h-12 w-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center mx-auto mb-3 shadow-lg`}
                        >
                          <stat.icon className="h-6 w-6 text-white" />
                        </motion.div>
                        <div className="text-2xl font-bold text-foreground mb-1">{stat.number}</div>
                        <div className="text-xs text-muted-foreground">{stat.label}</div>
                      </motion.div>
                    ))}
                  </div>

                  <div className="pt-6 border-t border-border">
                    <div className="flex items-center gap-3 text-sm text-muted-foreground">
                      <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                      <span>Very much satisfied schools and parents</span>
                    </div>
                  </div>
                </GlassCard>

                <GlassCard className="p-8 bg-gradient-to-r from-primary/5 via-accent/5 to-primary/5 border-2 border-primary/20">
                  <div className="flex items-start gap-4">
                    <MessageSquare className="h-8 w-8 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="text-xl font-bold mb-2 font-heading text-foreground">What Schools Say</h4>
                      <p className="text-muted-foreground italic mb-4">
                        &ldquo;CodeKids Jr has transformed our school into a technology hub. Our students are now confident in coding, robotics, and AI. Parents are extremely satisfied with the quality of education.&rdquo;
                      </p>
                      <div className="flex items-center gap-2">
                        <div className="flex gap-1">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          ))}
                        </div>
                        <span className="text-sm font-semibold text-foreground">— School Principal</span>
                      </div>
                    </div>
                  </div>
                </GlassCard>
              </motion.div>

              {/* Right: Image */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="relative"
              >
                <div className="relative h-[600px] rounded-3xl overflow-hidden group shadow-2xl">
                  <Image
                    src="/assest/kids robotics.jpg"
                    alt="Offline School Programs"
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-blue-900/80 via-purple-900/60 to-transparent" />
                  
                  {/* Floating Badges */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="absolute top-6 left-6 right-6 z-10 flex gap-4"
                  >
                    <div className="glass-card px-4 py-3 backdrop-blur-xl bg-white/20 border border-white/30">
                      <div className="flex items-center gap-2">
                        <Building2 className="h-5 w-5 text-white" />
                        <div>
                          <div className="text-xl font-bold text-white">100+</div>
                          <div className="text-xs text-white/80">Partner Schools</div>
                        </div>
                      </div>
                    </div>
                    <div className="glass-card px-4 py-3 backdrop-blur-xl bg-white/20 border border-white/30">
                      <div className="flex items-center gap-2">
                        <Heart className="h-5 w-5 text-pink-400 fill-pink-400" />
                        <div>
                          <div className="text-xl font-bold text-white">98%</div>
                          <div className="text-xs text-white/80">Satisfaction</div>
                        </div>
                      </div>
                    </div>
                  </motion.div>

                  {/* Bottom Text Overlay */}
                  <div className="absolute bottom-6 left-6 right-6 z-10">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3 }}
                    >
                      <h3 className="text-3xl font-bold text-white mb-2 font-heading">Hands-On Learning</h3>
                      <p className="text-white/90 text-sm">We bring the best courses directly to your campus</p>
                    </motion.div>
                  </div>

                  {/* Animated Shine Effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                    animate={{
                      x: ['-100%', '100%'],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      repeatDelay: 2,
                      ease: 'linear',
                    }}
                  />
                </div>

                {/* Floating Elements */}
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  animate={{
                    y: [0, -15, 0],
                    rotate: [0, -5, 0],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                  className="absolute -bottom-6 -left-6 w-24 h-24 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-2xl z-20"
                >
                  <Trophy className="h-12 w-12 text-white" fill="white" />
                </motion.div>
              </motion.div>
            </div>

            {/* Advantages Section */}
            <motion.div {...fadeInUp} className="mb-20">
              <div className="text-center mb-12">
                <h3 className="text-3xl md:text-4xl font-bold mb-4 font-heading text-foreground">
                  Growth <span className="bg-gradient-to-r from-[#FF4B8F] via-[#7B3DFF] to-[#2ED0FF] bg-clip-text text-transparent">Advantages</span>
                </h3>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Comprehensive development across multiple dimensions for holistic student growth
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  {
                    title: 'Creative Growth',
                    icon: Sparkles,
                    color: 'from-pink-500 to-rose-500',
                    bgColor: 'from-pink-500/10 to-rose-500/10',
                    features: [
                      'Sparks innovation and imagination',
                      'Develops the ability to think outside the box',
                    ],
                  },
                  {
                    title: 'Emotional Growth',
                    icon: Heart,
                    color: 'from-purple-500 to-indigo-500',
                    bgColor: 'from-purple-500/10 to-indigo-500/10',
                    features: [
                      'Builds resilience by solving problems',
                      'Fosters patience and self-confidence',
                    ],
                  },
                  {
                    title: 'Cognitive Growth',
                    icon: Brain,
                    color: 'from-blue-500 to-cyan-500',
                    bgColor: 'from-blue-500/10 to-cyan-500/10',
                    features: [
                      'Enhances problem-solving skills',
                      'Boosts logical reasoning and analytical skills',
                    ],
                  },
                  {
                    title: 'Social Growth',
                    icon: Users,
                    color: 'from-orange-500 to-red-500',
                    bgColor: 'from-orange-500/10 to-red-500/10',
                    features: [
                      'Encourages collaboration',
                      'Strengthens communication skills through presenting ideas',
                    ],
                  },
                ].map((advantage, index) => (
                  <motion.div
                    key={advantage.title}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1, duration: 0.6 }}
                    className="group h-full"
                  >
                    <GlassCard className={`h-full p-6 bg-gradient-to-br ${advantage.bgColor} border-2 border-transparent hover:border-primary/30 transition-all hover:scale-105`}>
                      <motion.div
                        whileHover={{ scale: 1.15, rotate: 360 }}
                        transition={{ duration: 0.5 }}
                        className={`h-16 w-16 rounded-2xl bg-gradient-to-br ${advantage.color} flex items-center justify-center mb-4 shadow-lg mx-auto`}
                      >
                        <advantage.icon className="h-8 w-8 text-white" />
                      </motion.div>
                      <h4 className="text-xl font-bold mb-4 text-center font-heading text-foreground group-hover:text-primary transition-colors">
                        {advantage.title}
                      </h4>
                      <ul className="space-y-3">
                        {advantage.features.map((feature, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                            <CheckCircle className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </GlassCard>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Complete Tech Coverage Section */}
            <motion.div {...fadeInUp} className="mb-20">
              <div className="text-center mb-12">
                <h3 className="text-3xl md:text-4xl font-bold mb-4 font-heading text-foreground">
                  We Cover <span className="bg-gradient-to-r from-[#FF4B8F] via-[#7B3DFF] to-[#2ED0FF] bg-clip-text text-transparent">Everything Tech</span>
                </h3>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-6">
                  Comprehensive technology courses covering all major domains in our curriculum
                </p>
                <motion.div
                  initial={{ scale: 0.9 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-primary/20 via-accent/20 to-primary/20 border border-primary/30"
                >
                  <Zap className="h-5 w-5 text-primary" />
                  <span className="font-semibold text-primary">Complete Tech Curriculum</span>
                </motion.div>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {[
                  { name: 'Web Development', icon: Globe, color: 'from-blue-500 to-cyan-500' },
                  { name: 'C++', icon: Code, color: 'from-indigo-500 to-purple-500' },
                  { name: 'App Development', icon: Smartphone, color: 'from-purple-500 to-pink-500' },
                  { name: 'Internet of Things', icon: Settings, color: 'from-pink-500 to-rose-500' },
                  { name: 'Networking', icon: Network, color: 'from-orange-500 to-red-500' },
                  { name: 'Data Science', icon: Database, color: 'from-blue-500 to-indigo-500' },
                  { name: 'Python Programming', icon: Brain, color: 'from-green-500 to-emerald-500' },
                  { name: 'Game Development', icon: Gamepad2, color: 'from-purple-500 to-pink-500' },
                  { name: 'Cyber Security', icon: Lock, color: 'from-red-500 to-orange-500' },
                  { name: 'Robotics', icon: Cpu, color: 'from-cyan-500 to-blue-500' },
                  { name: 'Artificial Intelligence', icon: Zap, color: 'from-yellow-500 to-orange-500' },
                ].map((tech, index) => (
                  <motion.div
                    key={tech.name}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05, duration: 0.4 }}
                    whileHover={{ scale: 1.05, y: -5 }}
                    className="group"
                  >
                    <GlassCard className="p-6 h-full border-2 border-transparent hover:border-primary/30 transition-all cursor-pointer">
                      <motion.div
                        whileHover={{ scale: 1.2, rotate: 360 }}
                        transition={{ duration: 0.5 }}
                        className={`h-14 w-14 rounded-xl bg-gradient-to-br ${tech.color} flex items-center justify-center mb-4 shadow-lg group-hover:shadow-xl`}
                      >
                        <tech.icon className="h-7 w-7 text-white" />
                      </motion.div>
                      <h4 className="text-lg font-bold font-heading text-foreground group-hover:text-primary transition-colors text-center">
                        {tech.name}
                      </h4>
                    </GlassCard>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Transform Your Institute Section */}
            <motion.div
              {...fadeInUp}
              className="relative rounded-3xl overflow-hidden"
            >
              {/* Background Image */}
              <div className="absolute inset-0 z-0">
                <Image
                  src="/assest/codekids jr learning.jpg"
                  alt="Transform Your Institute"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-blue-900/90 via-purple-900/90 to-pink-900/90" />
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzBoLTJWMGgyeiIvPjwvZz48L2c+PC9zdmc+')] opacity-20" />
              </div>

              {/* Decorative Wavy Line */}
              <div className="absolute top-0 left-0 right-0 z-10">
                <svg className="w-full h-24 text-white/10" preserveAspectRatio="none" viewBox="0 0 1200 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M0,60 Q300,20 600,60 T1200,60" stroke="currentColor" strokeWidth="2" fill="none" />
                </svg>
              </div>

              <div className="relative z-10 p-12 md:p-16 lg:p-20 text-center text-white">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 mb-6"
                >
                  <Trophy className="h-5 w-5" />
                  <span className="text-sm font-semibold">Partner With Us</span>
                </motion.div>

                <motion.h2
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 }}
                  className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 font-heading leading-tight"
                >
                  Your Institute Can Become
                  <br />
                  <span className="bg-gradient-to-r from-yellow-300 via-pink-300 to-purple-300 bg-clip-text text-transparent">
                    Number 1
                  </span>
                </motion.h2>

                <motion.p
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                  className="text-xl md:text-2xl mb-8 text-white/90 max-w-3xl mx-auto"
                >
                  Transform your institute into a <span className="font-bold">cutting-edge Techno Institute</span> with our comprehensive offline programs
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                  className="grid md:grid-cols-3 gap-8 mb-12 max-w-4xl mx-auto"
                >
                  {[
                    { icon: Building2, title: 'For Schools', desc: 'Enhance your curriculum with industry-leading tech courses' },
                    { icon: Users, title: 'For Students', desc: 'Gain hands-on experience with real-world projects' },
                    { icon: Heart, title: 'For Parents', desc: 'Give your child the best technology education' },
                  ].map((target, index) => (
                    <motion.div
                      key={target.title}
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3 + index * 0.1 }}
                      className="glass-card p-6 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl"
                    >
                      <target.icon className="h-12 w-12 mx-auto mb-4 text-white" />
                      <h4 className="text-xl font-bold mb-2 font-heading">{target.title}</h4>
                      <p className="text-sm text-white/80">{target.desc}</p>
                    </motion.div>
                  ))}
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 }}
                >
                  <Link
                    to="/contact"
                    className="inline-flex items-center gap-3 px-10 py-5 rounded-full bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-500 text-white font-bold text-lg shadow-2xl hover:shadow-3xl hover:scale-110 transition-all"
                  >
                    <Building2 className="h-6 w-6" />
                    Partner With CodeKids Jr
                    <ArrowRight className="h-6 w-6" />
                  </Link>
                </motion.div>

                {/* Animated Particles */}
                {[...Array(20)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-2 h-2 bg-white/30 rounded-full"
                    style={{
                      left: `${Math.random() * 100}%`,
                      top: `${Math.random() * 100}%`,
                    }}
                    animate={{
                      y: [0, -30, 0],
                      opacity: [0.3, 1, 0.3],
                    }}
                    transition={{
                      duration: 3 + Math.random() * 2,
                      repeat: Infinity,
                      delay: Math.random() * 2,
                    }}
                  />
                ))}
              </div>

              {/* Decorative Wavy Line Bottom */}
              <div className="absolute bottom-0 left-0 right-0 z-10 rotate-180">
                <svg className="w-full h-24 text-white/10" preserveAspectRatio="none" viewBox="0 0 1200 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M0,60 Q300,20 600,60 T1200,60" stroke="currentColor" strokeWidth="2" fill="none" />
                </svg>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Online Classes Section */}
        <section id="online-classes" className="py-20 relative overflow-hidden">
          {/* Animated Background */}
          <div className="absolute inset-0 z-0">
            <div
              className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-10 dark:opacity-5"
              style={{ backgroundImage: "url('/assest/coding.jpg')" }}
            />
            <div className="absolute inset-0 bg-gradient-to-br from-pink-500/10 via-purple-500/10 to-blue-500/10" />
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDMwaC0yVjBoMnoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-30" />
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            {/* Header Section */}
            <motion.div
              {...fadeInUp}
              className="text-center mb-16"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-pink-500/20 via-purple-500/20 to-blue-500/20 border border-primary/20 mb-6"
              >
                <Zap className="h-5 w-5 text-primary" />
                <span className="text-sm font-semibold text-primary">Now Available Online</span>
              </motion.div>
              <h2 className="text-foreground text-4xl md:text-5xl lg:text-6xl font-bold mb-6 font-heading">
                Online <span className="bg-gradient-to-r from-[#FF4B8F] via-[#7B3DFF] to-[#2ED0FF] bg-clip-text text-transparent">Live Classes</span>
              </h2>
              <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-4 leading-relaxed">
                Learn from the comfort of your home with our interactive online classes designed for students aged <span className="font-bold text-primary">6 to 16 years</span>
              </p>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Live instructor-led sessions, hands-on projects, and personalized learning experiences
              </p>
            </motion.div>

            {/* Main Content Grid */}
            <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
              {/* Left: Image & Highlights */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="relative"
              >
                <div className="relative h-[600px] rounded-3xl overflow-hidden group shadow-2xl">
                  <Image
                    src="/assest/online classes.jpg"
                    alt="Online Coding Classes for Kids"
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                  
                  {/* Floating Stats Overlay */}
                  <div className="absolute top-6 left-6 right-6 flex gap-4 z-10">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.2 }}
                      className="glass-card px-4 py-3 backdrop-blur-xl bg-white/20 border border-white/30"
                    >
                      <div className="flex items-center gap-2">
                        <Users className="h-5 w-5 text-white" />
                        <div>
                          <div className="text-xl font-bold text-white">500+</div>
                          <div className="text-xs text-white/80">Active Students</div>
                        </div>
                      </div>
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3 }}
                      className="glass-card px-4 py-3 backdrop-blur-xl bg-white/20 border border-white/30"
                    >
                      <div className="flex items-center gap-2">
                        <Star className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                        <div>
                          <div className="text-xl font-bold text-white">4.9/5</div>
                          <div className="text-xs text-white/80">Rating</div>
                        </div>
                      </div>
                    </motion.div>
                  </div>

                  {/* Bottom Text Overlay */}
                  <div className="absolute bottom-6 left-6 right-6 z-10">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.4 }}
                    >
                      <h3 className="text-3xl font-bold text-white mb-2 font-heading">Live Interactive Sessions</h3>
                      <p className="text-white/90 text-sm">Real-time learning with expert instructors</p>
                    </motion.div>
                  </div>

                  {/* Animated Shine Effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                    animate={{
                      x: ['-100%', '100%'],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      repeatDelay: 2,
                      ease: 'linear',
                    }}
                  />
                </div>

                {/* Floating Elements */}
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  animate={{
                    y: [0, -20, 0],
                    rotate: [0, 5, 0],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                  className="absolute -top-6 -right-6 w-24 h-24 rounded-2xl bg-gradient-to-br from-pink-500 to-purple-500 flex items-center justify-center shadow-2xl z-20"
                >
                  <PlayCircle className="h-12 w-12 text-white" fill="white" />
                </motion.div>
              </motion.div>

              {/* Right: Features & Benefits */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="space-y-8"
              >
                {/* Key Features */}
                <GlassCard className="p-8 bg-gradient-to-br from-primary/5 via-accent/5 to-primary/5 border-2 border-primary/20">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="h-14 w-14 rounded-xl bg-gradient-to-br from-pink-500 to-purple-500 flex items-center justify-center">
                      <Zap className="h-7 w-7 text-white" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold font-heading text-foreground">Why Choose Online Classes?</h3>
                      <p className="text-sm text-muted-foreground">Flexible learning for school students</p>
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    {[
                      { icon: Users, text: 'Small Batch Sizes', desc: 'Max 10 students per class' },
                      { icon: Clock, text: 'Flexible Timings', desc: 'Choose convenient slots' },
                      { icon: Target, text: 'Age-Appropriate', desc: 'Designed for ages 6-16' },
                      { icon: Award, text: 'Certificates', desc: 'Get certified on completion' },
                      { icon: PlayCircle, text: 'Recorded Sessions', desc: 'Access anytime later' },
                      { icon: Shield, text: 'Safe Learning', desc: 'Secure online environment' },
                    ].map((feature, index) => (
                      <motion.div
                        key={feature.text}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        className="p-4 rounded-xl bg-secondary/50 hover:bg-secondary transition-colors group"
                      >
                        <feature.icon className="h-6 w-6 text-primary mb-2 group-hover:scale-110 transition-transform" />
                        <h4 className="font-semibold mb-1 text-foreground">{feature.text}</h4>
                        <p className="text-sm text-muted-foreground">{feature.desc}</p>
                      </motion.div>
                    ))}
                  </div>
                </GlassCard>

                {/* CTA Card */}
                <GlassCard className="p-8 bg-gradient-to-r from-pink-500/10 via-purple-500/10 to-blue-500/10 border-2 border-primary/30">
                  <div className="text-center">
                    <Calendar className="h-12 w-12 text-primary mx-auto mb-4" />
                    <h3 className="text-2xl font-bold mb-2 font-heading text-foreground">Book Your Free Trial Class</h3>
                    <p className="text-muted-foreground mb-6">
                      Experience our online classes with a free demo session. No commitments!
                    </p>
                    <Link
                      to="/contact"
                      className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-[#FF4B8F] via-[#7B3DFF] to-[#2ED0FF] text-white font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all"
                    >
                      <PlayCircle className="h-5 w-5" />
                      Book Free Trial
                      <ArrowRight className="h-5 w-5" />
                    </Link>
                  </div>
                </GlassCard>
              </motion.div>
            </div>

            {/* Online Class Programs Grid */}
            <motion.div {...fadeInUp} className="mb-16">
              <div className="text-center mb-12">
                <h3 className="text-3xl md:text-4xl font-bold mb-4 font-heading text-foreground">
                  Available <span className="bg-gradient-to-r from-[#FF4B8F] via-[#7B3DFF] to-[#2ED0FF] bg-clip-text text-transparent">Online Programs</span>
                </h3>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Choose from a variety of online courses designed for different age groups
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[
                  {
                    title: 'Scratch Programming',
                    age: 'Ages 6-9',
                    duration: '12 weeks',
                    sessions: '2x per week',
                    image: '/assest/coding.jpg',
                    icon: Code,
                    color: 'from-pink-500 to-rose-500',
                    features: ['Visual programming', 'Game creation', 'Animation basics', 'Storytelling'],
                    description: 'Perfect introduction to coding with visual blocks and fun projects',
                  },
                  {
                    title: 'Python Basics',
                    age: 'Ages 10-13',
                    duration: '16 weeks',
                    sessions: '2x per week',
                    image: '/assest/students learning.jpg',
                    icon: Brain,
                    color: 'from-purple-500 to-indigo-500',
                    features: ['Python fundamentals', 'Projects & games', 'Problem solving', 'Logic building'],
                    description: 'Learn real programming with Python through interactive projects',
                  },
                  {
                    title: 'Web Development',
                    age: 'Ages 12-16',
                    duration: '20 weeks',
                    sessions: '2x per week',
                    image: '/assest/ai.jpg',
                    icon: Cpu,
                    color: 'from-blue-500 to-cyan-500',
                    features: ['HTML & CSS', 'JavaScript basics', 'Build websites', 'Portfolio creation'],
                    description: 'Create your own websites and web applications from scratch',
                  },
                  {
                    title: 'Robotics Online',
                    age: 'Ages 8-14',
                    duration: '14 weeks',
                    sessions: '2x per week',
                    image: '/assest/kids robotics.jpg',
                    icon: Zap,
                    color: 'from-orange-500 to-red-500',
                    features: ['Virtual robotics', 'Arduino basics', 'Circuit design', 'IoT projects'],
                    description: 'Learn robotics concepts with virtual labs and simulation tools',
                  },
                  {
                    title: 'AI & ML Basics',
                    age: 'Ages 11-16',
                    duration: '18 weeks',
                    sessions: '2x per week',
                    image: '/assest/ai.jpg',
                    icon: Brain,
                    color: 'from-indigo-500 to-purple-500',
                    features: ['AI concepts', 'Machine learning', 'Data science', 'Real projects'],
                    description: 'Explore artificial intelligence and machine learning fundamentals',
                  },
                  {
                    title: 'Game Development',
                    age: 'Ages 10-16',
                    duration: '16 weeks',
                    sessions: '2x per week',
                    image: '/assest/learning.jpg',
                    icon: Rocket,
                    color: 'from-green-500 to-emerald-500',
                    features: ['Game design', 'Unity basics', '2D & 3D games', 'Publish games'],
                    description: 'Create and publish your own games using modern game engines',
                  },
                ].map((program, index) => (
                  <motion.div
                    key={program.title}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1, duration: 0.6 }}
                    className="group h-full"
                  >
                    <GlassCard className="h-full overflow-hidden hover:scale-105 transition-transform duration-300 border-2 border-transparent hover:border-primary/30">
                      {/* Image Section */}
                      <div className="relative h-56 overflow-hidden">
                        <Image
                          src={program.image}
                          alt={program.title}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className={`absolute inset-0 bg-gradient-to-t ${program.color} opacity-80 group-hover:opacity-90 transition-opacity`} />
                        
                        {/* Icon Badge */}
                        <motion.div
                          whileHover={{ scale: 1.2, rotate: 360 }}
                          transition={{ duration: 0.5 }}
                          className={`absolute top-4 right-4 h-14 w-14 rounded-xl bg-gradient-to-br ${program.color} flex items-center justify-center shadow-2xl border-2 border-white/30`}
                        >
                          <program.icon className="h-7 w-7 text-white" />
                        </motion.div>

                        {/* Age & Duration Badges */}
                        <div className="absolute bottom-4 left-4 right-4 flex gap-2">
                          <span className="px-3 py-1 rounded-full bg-white/90 backdrop-blur-sm text-xs font-semibold text-foreground">
                            {program.age}
                          </span>
                          <span className="px-3 py-1 rounded-full bg-white/90 backdrop-blur-sm text-xs font-semibold text-foreground">
                            {program.duration}
                          </span>
                        </div>

                        {/* Shimmer Effect */}
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                          animate={{
                            x: ['-100%', '100%'],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            repeatDelay: 3,
                            ease: 'linear',
                          }}
                        />
                      </div>

                      {/* Content Section */}
                      <div className="p-6">
                        <h4 className="text-2xl font-bold mb-2 font-heading text-foreground group-hover:text-primary transition-colors">
                          {program.title}
                        </h4>
                        <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                          {program.description}
                        </p>
                        
                        <div className="flex items-center gap-2 mb-4 text-sm text-muted-foreground">
                          <Calendar className="h-4 w-4 text-primary" />
                          <span>{program.sessions}</span>
                        </div>

                        {/* Features List */}
                        <ul className="space-y-2 mb-6">
                          {program.features.map((feature, i) => (
                            <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                              <CheckCircle className="h-4 w-4 text-primary flex-shrink-0" />
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>

                        {/* CTA Button */}
                        <Link
                          to="/contact"
                          className="block w-full py-3 rounded-lg bg-gradient-to-r from-primary/10 to-accent/10 text-primary font-semibold hover:from-primary/20 hover:to-accent/20 transition-all text-center group/btn"
                        >
                          <span className="flex items-center justify-center gap-2">
                            Enroll Now
                            <ArrowRight className="h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                          </span>
                        </Link>
                      </div>
                    </GlassCard>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Benefits Section */}
            <motion.div
              {...fadeInUp}
              className="grid md:grid-cols-3 gap-8 mb-16"
            >
              {[
                {
                  icon: Users,
                  title: 'Expert Instructors',
                  description: 'Learn from industry professionals with years of teaching experience',
                  color: 'from-blue-500 to-cyan-500',
                },
                {
                  icon: Target,
                  title: 'Personalized Learning',
                  description: 'Individual attention and customized learning paths for each student',
                  color: 'from-purple-500 to-pink-500',
                },
                {
                  icon: Award,
                  title: 'Certificate Programs',
                  description: 'Get certified upon completion to showcase your achievements',
                  color: 'from-pink-500 to-rose-500',
                },
              ].map((benefit, index) => (
                <motion.div
                  key={benefit.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 }}
                  className="text-center"
                >
                  <GlassCard className="p-8 h-full hover:scale-105 transition-transform duration-300">
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      className={`h-16 w-16 rounded-2xl bg-gradient-to-br ${benefit.color} flex items-center justify-center mx-auto mb-4 shadow-lg`}
                    >
                      <benefit.icon className="h-8 w-8 text-white" />
                    </motion.div>
                    <h4 className="text-xl font-bold mb-3 font-heading text-foreground">{benefit.title}</h4>
                    <p className="text-muted-foreground leading-relaxed">{benefit.description}</p>
                  </GlassCard>
                </motion.div>
              ))}
            </motion.div>

            {/* How It Works Section */}
            <motion.div
              {...fadeInUp}
              className="bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 rounded-3xl p-8 md:p-12 border-2 border-primary/20"
            >
              <h3 className="text-3xl md:text-4xl font-bold mb-12 text-center font-heading text-foreground">
                How Our <span className="bg-gradient-to-r from-[#FF4B8F] via-[#7B3DFF] to-[#2ED0FF] bg-clip-text text-transparent">Online Classes Work</span>
              </h3>
              <div className="grid md:grid-cols-4 gap-8">
                {[
                  {
                    step: '01',
                    title: 'Book Free Demo',
                    description: 'Schedule a free trial class to experience our teaching style',
                    icon: Calendar,
                  },
                  {
                    step: '02',
                    title: 'Choose Program',
                    description: 'Select the program that matches your age and interests',
                    icon: Target,
                  },
                  {
                    step: '03',
                    title: 'Join Live Classes',
                    description: 'Attend interactive online sessions with expert instructors',
                    icon: PlayCircle,
                  },
                  {
                    step: '04',
                    title: 'Get Certified',
                    description: 'Complete the course and receive your certificate',
                    icon: Award,
                  },
                ].map((step, index) => (
                  <motion.div
                    key={step.step}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="relative"
                  >
                    <div className="text-center">
                      <div className="relative inline-flex items-center justify-center mb-4">
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full blur-xl" />
                        <div className="relative h-20 w-20 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center border-4 border-white dark:border-[#0F1419]">
                          <span className="text-2xl font-bold text-white">{step.step}</span>
                        </div>
                      </div>
                      <step.icon className="h-8 w-8 text-primary mx-auto mb-3" />
                      <h4 className="text-lg font-bold mb-2 font-heading text-foreground">{step.title}</h4>
                      <p className="text-sm text-muted-foreground leading-relaxed">{step.description}</p>
                    </div>
                    {index < 3 && (
                      <div className="hidden md:block absolute top-10 left-full w-full h-0.5 bg-gradient-to-r from-primary/50 to-transparent -translate-x-1/2">
                        <ArrowRight className="absolute right-0 top-1/2 -translate-y-1/2 h-5 w-5 text-primary" />
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
}
