import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Code, Cloud, Shield, Database, Palette, Cpu, Briefcase, GraduationCap,
  CheckCircle, Rocket, Users, Award, TrendingUp, Star, Zap, Target,
  Building2, Calendar, DollarSign, BookOpen, Laptop, Brain,
  ChevronLeft, ChevronRight, ArrowRight, PlayCircle, Sparkles,
  BarChart3, Eye, FileText, Globe, ChevronDown, Lightbulb, Server,
  Lock, UserCheck, Linkedin, Terminal
} from 'lucide-react';
import Image from '@/components/Image';
import { GlassCard } from '@/components/ui/glass-card';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const heroCarousel = [
  {
    title: 'Full Stack Development',
    description: 'Master MERN stack, APIs, and modern frameworks',
    image: '/assest/coding.jpg',
  },
  {
    title: 'AI & Machine Learning',
    description: 'Build intelligent systems with Python and TensorFlow',
    image: '/assest/ai tools learning.jpg',
  },
  {
    title: 'Job-Ready Skills',
    description: 'Industry-focused training with placement support',
    image: '/assest/job ready.jpg',
  },
  {
    title: 'Career Success',
    description: 'Get placed in top companies with our comprehensive training',
    image: '/assest/success.jpg',
  },
];

const faqs = [
  {
    q: 'What are the prerequisites for CodeKids_Pro programs?',
    a: 'Most programs require basic computer knowledge and enthusiasm to learn. Some advanced tracks like Cloud Computing and DevOps may require prior programming experience. We provide pre-course materials to help you prepare.',
  },
  {
    q: 'How long are the programs?',
    a: 'Program durations vary by track: Full Stack Development (6 months), Cloud Computing (4 months), DevOps Engineering (5 months), Cybersecurity (6 months), Data Science (6 months), and UI/UX Design (4 months). All programs include internship opportunities.',
  },
  {
    q: 'Are the classes live or pre-recorded?',
    a: 'We offer live instructor-led classes with real-time interaction. All sessions are recorded and available for lifetime access, so you can review them anytime.',
  },
  {
    q: 'Do you guarantee job placement?',
    a: 'While we don\'t guarantee job placement, we provide comprehensive job placement assistance including resume building, LinkedIn optimization, mock interviews, and connections with 50+ hiring partners. Our success rate is 95%.',
  },
  {
    q: 'What is included in the internship program?',
    a: 'Our internship program includes real-world project experience, mentorship from industry professionals, networking opportunities, and potential for paid positions. We have partnerships with startups and established companies.',
  },
  {
    q: 'Can I switch tracks after enrollment?',
    a: 'Yes, you can switch tracks within the first month of enrollment. Contact your program coordinator to discuss the switch and ensure it aligns with your career goals.',
  },
  {
    q: 'What kind of projects will I build?',
    a: 'You\'ll build industry-ready projects including e-commerce platforms, AI applications, cloud solutions, mobile apps, and more. These projects become part of your portfolio to showcase to employers.',
  },
  {
    q: 'Is there any financial assistance available?',
    a: 'Yes, we offer flexible EMI options with 0% interest. You can also apply for scholarships based on merit and financial need. Contact our admissions team for more details.',
  },
];

const tracks = [
  {
    name: 'Full Stack Development',
    icon: Code,
    color: 'from-blue-500 to-cyan-500',
    duration: '6 months',
    image: '/assest/coding.jpg',
    description: 'Master frontend, backend, and database technologies to build complete web applications',
    skills: ['React, Node.js', 'MongoDB, PostgreSQL', 'REST APIs', 'Deployment'],
  },
  {
    name: 'Cloud Computing',
    icon: Cloud,
    color: 'from-purple-500 to-pink-500',
    duration: '4 months',
    image: '/assest/online classes.jpg',
    description: 'Deploy scalable cloud solutions on AWS, Azure, and Google Cloud Platform',
    skills: ['AWS, Azure, GCP', 'Docker & Kubernetes', 'Serverless', 'CI/CD'],
  },
  {
    name: 'DevOps Engineering',
    icon: Cpu,
    color: 'from-orange-500 to-red-500',
    duration: '5 months',
    image: '/assest/learning.jpg',
    description: 'Automate deployment pipelines and manage infrastructure as code',
    skills: ['Jenkins, GitLab CI', 'Terraform, Ansible', 'Monitoring', 'Kubernetes'],
  },
  {
    name: 'Cybersecurity',
    icon: Shield,
    color: 'from-green-500 to-teal-500',
    duration: '6 months',
    image: '/assest/preparation.jpg',
    description: 'Protect systems and networks from cyber threats and vulnerabilities',
    skills: ['Ethical Hacking', 'Penetration Testing', 'Security Audits', 'Risk Management'],
  },
  {
    name: 'Data Science',
    icon: Database,
    color: 'from-indigo-500 to-purple-500',
    duration: '6 months',
    image: '/assest/data science.jpg',
    description: 'Extract insights from data using Python, SQL, and machine learning',
    skills: ['Python, R', 'SQL, NoSQL', 'Machine Learning', 'Data Visualization'],
  },
  {
    name: 'UI/UX Design',
    icon: Palette,
    color: 'from-pink-500 to-rose-500',
    duration: '4 months',
    image: '/assest/designing.jpg',
    description: 'Create beautiful and user-friendly digital experiences',
    skills: ['Figma, Sketch', 'User Research', 'Prototyping', 'Design Systems'],
  },
];

const internships = [
  {
    title: 'Tech Startup Internship',
    company: 'StartupHub',
    duration: '3 months',
    type: 'Paid',
    image: '/assest/job ready.jpg',
    description: 'Work on real products with startup teams',
  },
  {
    title: 'Enterprise Development',
    company: 'TechCorp Solutions',
    duration: '6 months',
    type: 'Paid + Stipend',
    image: '/assest/job.jpg',
    description: 'Build enterprise-scale applications',
  },
  {
    title: 'AI Research Assistant',
    company: 'Innovation Labs',
    duration: '4 months',
    type: 'Paid',
    image: '/assest/ai tools learning.jpg',
    description: 'Contribute to cutting-edge AI research',
  },
  {
    title: 'Full Stack Developer',
    company: 'Digital Agency',
    duration: '3 months',
    type: 'Paid',
    image: '/assest/coding.jpg',
    description: 'Build client projects from scratch',
  },
];

const projects = [
  {
    title: 'E-Commerce Platform',
    tech: 'MERN Stack',
    image: '/assest/coding.jpg',
    description: 'Full-featured online shopping platform with payment integration',
    github: '#',
  },
  {
    title: 'AI Chatbot',
    tech: 'Python, TensorFlow',
    image: '/assest/ai tools.jpg',
    description: 'Intelligent chatbot using NLP and machine learning',
    github: '#',
  },
  {
    title: 'Cloud Analytics Dashboard',
    tech: 'AWS, React, Python',
    image: '/assest/data analysis and ai.jpg',
    description: 'Real-time data visualization and analytics platform',
    github: '#',
  },
  {
    title: 'Mobile Banking App',
    tech: 'React Native, Node.js',
    image: '/assest/online classes.jpg',
    description: 'Secure mobile banking application with biometric auth',
    github: '#',
  },
];

const features = [
  { icon: Laptop, title: 'Live instructor-led online classes', description: 'Interactive sessions with industry experts' },
  { icon: Code, title: 'Real-world projects and capstones', description: 'Build portfolio-worthy applications' },
  { icon: Briefcase, title: 'Internship opportunities', description: 'Get hands-on experience with top companies' },
  { icon: BookOpen, title: 'Resume and LinkedIn optimization', description: 'Stand out to recruiters' },
  { icon: Users, title: 'Mock interviews and soft skills', description: 'Ace your technical and HR rounds' },
  { icon: Target, title: 'Job placement assistance', description: 'Connect with hiring partners' },
];

const stats = [
  { icon: TrendingUp, label: 'Success Rate', value: '95%', color: 'from-green-500 to-emerald-500' },
  { icon: Briefcase, label: 'Job Offers', value: '500+', color: 'from-blue-500 to-cyan-500' },
  { icon: Building2, label: 'Industry Partners', value: '50+', color: 'from-purple-500 to-pink-500' },
  { icon: DollarSign, label: 'Avg. Salary Hike', value: '80%', color: 'from-orange-500 to-red-500' },
  { icon: Users, label: 'Students Placed', value: '1000+', color: 'from-indigo-500 to-purple-500' },
  { icon: Star, label: 'Alumni Rating', value: '4.9/5', color: 'from-yellow-500 to-orange-500' },
];

export default function CodeKidsProPage() {
  const [currentHeroSlide, setCurrentHeroSlide] = useState(0);
  const [expandedSections, setExpandedSections] = useState<{ [key: string]: boolean }>({});

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentHeroSlide((prev) => (prev + 1) % heroCarousel.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const toggleSection = (sectionId: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [sectionId]: !prev[sectionId],
    }));
  };

  const handleAnchorClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('#')) {
      e.preventDefault();
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  return (
    <>
      <Helmet>
        <title>CodeKids Pro | Job-Ready Tech Programs | CodeKids Technologies</title>
        <meta name="description" content="CodeKids Pro offers advanced, job-ready tech programs in Full Stack, AI/ML, Data Science, Cybersecurity, and UI/UX. Live classes, internships, and placement support for students aged 18-26." />
        <meta name="keywords" content="job-ready tech programs, full stack development, AI ML courses, data science training, cybersecurity certification, UI UX design, tech internships, placement assistance" />
      </Helmet>
      <div className="min-h-screen">
        {/* Hero Section with Carousel */}
        <section className="relative h-[90vh] min-h-[700px] overflow-hidden pt-20 md:pt-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentHeroSlide}
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.8 }}
              className="absolute inset-0"
            >
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${heroCarousel[currentHeroSlide].image})` }}
              />
              <div className="absolute inset-0 bg-gradient-to-br from-purple-900/85 via-blue-900/85 to-cyan-900/85 dark:from-purple-950/90 dark:via-blue-950/90 dark:to-cyan-950/90" />
              <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzBoLTJWMGgyeiIvPjwvZz48L2c+PC9zdmc+')] opacity-20 z-10" />
            </motion.div>
          </AnimatePresence>

          <div className="relative z-10 h-full flex items-center">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="max-w-4xl mx-auto text-white text-center"
              >
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4 }}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm mb-6 border border-white/30"
                >
                  <GraduationCap className="h-4 w-4" />
                  <span className="text-sm font-medium">Online • Ages 18-26 • Job-Ready Training</span>
                </motion.div>

                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentHeroSlide}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5 }}
                  >
                    <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 font-heading leading-tight">
                      Learn Today. Intern Soon.{' '}
                      <span className="block text-cyan-300">Get Job-Ready.</span>
                    </h1>
                    <p className="text-xl md:text-2xl text-blue-100 mb-8 leading-relaxed">
                      {heroCarousel[currentHeroSlide].description}
                    </p>
                  </motion.div>
                </AnimatePresence>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link
                    to="#pro-apply-form"
                    onClick={(e) => handleAnchorClick(e, '#pro-apply-form')}
                    className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-white text-purple-900 font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all"
                  >
                    Apply Now
                    <Rocket className="h-5 w-5" />
                  </Link>
                  <a
                    href="https://www.youtube.com/channel/UCINCJJrKriFpOrzxP7reUBQ"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full border-2 border-white text-white font-semibold hover:bg-white hover:text-purple-900 transition-all"
                  >
                    <PlayCircle className="h-5 w-5" />
                    Watch Demo
                  </a>
                </div>
              </motion.div>
            </div>
          </div>

          <button
            onClick={() => setCurrentHeroSlide((prev) => (prev - 1 + heroCarousel.length) % heroCarousel.length)}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 h-12 w-12 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 flex items-center justify-center transition-all"
          >
            <ChevronLeft className="h-6 w-6 text-white" />
          </button>
          <button
            onClick={() => setCurrentHeroSlide((prev) => (prev + 1) % heroCarousel.length)}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 h-12 w-12 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 flex items-center justify-center transition-all"
          >
            <ChevronRight className="h-6 w-6 text-white" />
          </button>

          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-2">
            {heroCarousel.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentHeroSlide(index)}
                className={`h-2 rounded-full transition-all ${
                  index === currentHeroSlide ? 'w-8 bg-white' : 'w-2 bg-white/50'
                }`}
              />
            ))}
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-12 bg-gradient-to-r from-purple-500/10 via-blue-500/10 to-cyan-500/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="text-center group"
                >
                  <div className={`h-12 w-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform`}>
                    <stat.icon className="h-6 w-6 text-white" />
                  </div>
                  <div className={`text-3xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent mb-1`}>
                    {stat.value}
                  </div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Combined Courses Section */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-foreground text-4xl md:text-5xl font-bold mb-4 font-heading">
                4 Career-Defining <span className="bg-gradient-to-r from-[#FF4B8F] via-[#7B3DFF] to-[#2ED0FF] bg-clip-text text-transparent">Combined Courses</span>
              </h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                Industry-ready combination programs crafted for maximum skill, project depth & job readiness
              </p>
            </motion.div>

            {/* Course 1: AI + ML + Full-Stack */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-20"
            >
              <div className="flex flex-col items-center gap-4 mb-8 text-center">
                <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center">
                  <Brain className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h3 className="text-3xl md:text-4xl font-bold font-heading">Generative AI + ML + Full-Stack Development</h3>
                  <p className="text-sm text-muted-foreground">Flagship, premium, highest-value course</p>
                </div>
              </div>

              {/* Program Pathways */}
              <div className="mb-12">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="text-center mb-8"
                >
                  <h4 className="text-2xl md:text-3xl font-bold font-heading mb-3">
                    Choose Your <span className="bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent">Learning Path</span>
                  </h4>
                  <p className="text-muted-foreground max-w-2xl mx-auto">
                    Choose from industry-level programs designed for your career goals
                  </p>
                </motion.div>

                <div className="grid md:grid-cols-3 gap-6">
                  {/* Foundation Program */}
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                  >
                    <GlassCard className="p-6 border-2 border-green-500/30 bg-gradient-to-br from-green-500/5 to-emerald-500/5 h-full hover:scale-105 transition-transform duration-300">
                      <div className="mb-4">
                        <div className="flex items-center justify-between mb-3">
                          <span className="px-3 py-1 rounded-full bg-green-500 text-white text-xs font-semibold">⭐ FOUNDATION</span>
                          <span className="text-xs text-muted-foreground">4 Months • 100 Live Classes</span>
                        </div>
                        <div className="mb-3 p-2 bg-green-500/10 rounded-lg border border-green-500/20">
                          <p className="text-xs font-semibold text-foreground mb-1">📅 Live Class Schedule</p>
                          <p className="text-xs text-muted-foreground">6-7 live classes per week for 4 months</p>
                        </div>
                        <p className="text-sm text-muted-foreground mb-4">Best For: Beginners, self-learners, students with limited time</p>
                      </div>
                      <div className="space-y-3 mb-6">
                        <div className="flex items-start gap-2">
                          <Laptop className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                          <div>
                            <p className="font-semibold text-foreground text-sm">Live + Recorded Classes</p>
                            <p className="text-xs text-muted-foreground">Learn at your own pace with full access</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-2">
                          <Code className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                          <div>
                            <p className="font-semibold text-foreground text-sm">3 Real-World Projects</p>
                            <p className="text-xs text-muted-foreground">Build beginner AI + Full-stack integration projects</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-2">
                          <FileText className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                          <div>
                            <p className="font-semibold text-foreground text-sm">Resume Creation</p>
                            <p className="text-xs text-muted-foreground">Professional resume done for you</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-2">
                          <Globe className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                          <div>
                            <p className="font-semibold text-foreground text-sm">Hosted Mini Portfolio</p>
                            <p className="text-xs text-muted-foreground">Showcase your projects online</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-2">
                          <Linkedin className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                          <div>
                            <p className="font-semibold text-foreground text-sm">LinkedIn & GitHub Optimization</p>
                            <p className="text-xs text-muted-foreground">Starter optimization to get noticed</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-2">
                          <Award className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                          <div>
                            <p className="font-semibold text-foreground text-sm">Course Completion Certificate</p>
                            <p className="text-xs text-muted-foreground">Recognized industry certificate</p>
                          </div>
                        </div>
                      </div>
                      <div className="pt-4 border-t border-green-500/20">
                        <p className="text-xs text-muted-foreground text-center mb-3">Starting from ₹12,999</p>
                        <Link
                          to="/codekids-pro/pricing"
                          className="block w-full py-2 rounded-lg bg-green-500/10 text-green-600 dark:text-green-400 font-semibold hover:bg-green-500/20 transition-all border border-green-500/20 text-center"
                        >
                          Explore Foundation Path
                        </Link>
                      </div>
                    </GlassCard>
                  </motion.div>

                  {/* Professional Program */}
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                  >
                    <GlassCard className="p-6 border-2 border-blue-500/30 bg-gradient-to-br from-blue-500/5 to-cyan-500/5 relative h-full hover:scale-105 transition-transform duration-300">
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white text-xs font-semibold shadow-lg">
                        ⭐⭐ MOST POPULAR
                      </div>
                      <div className="mb-4 mt-2">
                        <div className="flex items-center justify-between mb-3">
                          <span className="px-3 py-1 rounded-full bg-blue-500 text-white text-xs font-semibold">⭐⭐ PROFESSIONAL</span>
                          <span className="text-xs text-muted-foreground">6 Months • 150 Live Classes</span>
                        </div>
                        <div className="mb-3 p-2 bg-blue-500/10 rounded-lg border border-blue-500/20">
                          <p className="text-xs font-semibold text-foreground mb-1">📅 Live Class Schedule</p>
                          <p className="text-xs text-muted-foreground">6-7 live classes per week • Total: 150 live classes</p>
                        </div>
                        <p className="text-sm text-muted-foreground mb-4">Best For: Job seekers, fresh graduates, skill-builders (60–70% choose this)</p>
                      </div>
                      <div className="space-y-3 mb-6">
                        <div className="flex items-start gap-2">
                          <Laptop className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" />
                          <div>
                            <p className="font-semibold text-foreground text-sm">Everything in Foundation PLUS:</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-2">
                          <Code className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" />
                          <div>
                            <p className="font-semibold text-foreground text-sm">10+ Advanced Projects</p>
                            <p className="text-xs text-muted-foreground">Major backend + AI integration projects with real-world applications</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-2">
                          <Users className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" />
                          <div>
                            <p className="font-semibold text-foreground text-sm">Weekly Live Doubt-Clearing</p>
                            <p className="text-xs text-muted-foreground">Get instant help from expert instructors</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-2">
                          <Target className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" />
                          <div>
                            <p className="font-semibold text-foreground text-sm">Interview Preparation</p>
                            <p className="text-xs text-muted-foreground">Technical & HR mock interviews with feedback</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-2">
                          <Globe className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" />
                          <div>
                            <p className="font-semibold text-foreground text-sm">Full Portfolio Website</p>
                            <p className="text-xs text-muted-foreground">Hosted professional portfolio showcasing all projects</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-2">
                          <Linkedin className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" />
                          <div>
                            <p className="font-semibold text-foreground text-sm">Complete Profile Makeover</p>
                            <p className="text-xs text-muted-foreground">LinkedIn + GitHub + Job portals (Naukri, Indeed, Foundit)</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-2">
                          <BookOpen className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" />
                          <div>
                            <p className="font-semibold text-foreground text-sm">Soft-Skills Training</p>
                            <p className="text-xs text-muted-foreground">Communication, presentation, and professional skills</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-2">
                          <Calendar className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" />
                          <div>
                            <p className="font-semibold text-foreground text-sm">1-Year LMS Access</p>
                            <p className="text-xs text-muted-foreground">Access all materials, recordings, and resources</p>
                          </div>
                        </div>
                      </div>
                      <div className="pt-4 border-t border-blue-500/20">
                        <p className="text-xs text-muted-foreground text-center mb-3">Starting from ₹24,999</p>
                        <Link
                          to="/codekids-pro/pricing"
                          className="block w-full py-2 rounded-lg bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold hover:from-blue-600 hover:to-cyan-600 transition-all shadow-lg text-center"
                        >
                          Explore Professional Path
                        </Link>
                      </div>
                    </GlassCard>
                  </motion.div>

                  {/* Mastery Program */}
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 }}
                  >
                    <GlassCard className="p-6 border-2 border-orange-500/30 bg-gradient-to-br from-orange-500/5 to-red-500/5 h-full hover:scale-105 transition-transform duration-300">
                      <div className="mb-4">
                        <div className="flex items-center justify-between mb-3">
                          <span className="px-3 py-1 rounded-full bg-orange-500 text-white text-xs font-semibold">⭐⭐⭐ MASTERY</span>
                          <span className="text-xs text-muted-foreground">9 Months • 230 Live Classes</span>
                        </div>
                        <div className="mb-3 p-2 bg-orange-500/10 rounded-lg border border-orange-500/20">
                          <p className="text-xs font-semibold text-foreground mb-1">📅 Live Class Schedule</p>
                          <p className="text-xs text-muted-foreground">6-7 live classes per week • Total: 230 live classes</p>
                        </div>
                        <p className="text-sm text-muted-foreground mb-4">Best For: Serious job seekers, parents ready to invest, students aiming for top placements</p>
                      </div>
                      <div className="space-y-3 mb-6">
                        <div className="flex items-start gap-2">
                          <Laptop className="h-5 w-5 text-orange-500 flex-shrink-0 mt-0.5" />
                          <div>
                            <p className="font-semibold text-foreground text-sm">Everything in Professional PLUS:</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-2">
                          <Briefcase className="h-5 w-5 text-orange-500 flex-shrink-0 mt-0.5" />
                          <div>
                            <p className="font-semibold text-foreground text-sm">2–3 Month Internship</p>
                            <p className="text-xs text-muted-foreground">Real work experience with internship letter</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-2">
                          <Users className="h-5 w-5 text-orange-500 flex-shrink-0 mt-0.5" />
                          <div>
                            <p className="font-semibold text-foreground text-sm">Dedicated Project Mentor</p>
                            <p className="text-xs text-muted-foreground">1-on-1 mentoring sessions every week</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-2">
                          <Code className="h-5 w-5 text-orange-500 flex-shrink-0 mt-0.5" />
                          <div>
                            <p className="font-semibold text-foreground text-sm">3 Capstone AI Projects</p>
                            <p className="text-xs text-muted-foreground">Industry-grade projects for your portfolio</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-2">
                          <Globe className="h-5 w-5 text-orange-500 flex-shrink-0 mt-0.5" />
                          <div>
                            <p className="font-semibold text-foreground text-sm">Complete Portfolio Development</p>
                            <p className="text-xs text-muted-foreground">GitHub + Website with project showreel</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-2">
                          <Rocket className="h-5 w-5 text-orange-500 flex-shrink-0 mt-0.5" />
                          <div>
                            <p className="font-semibold text-foreground text-sm">Premium Job Assistance</p>
                            <p className="text-xs text-muted-foreground">Placement tracking & recruiter connections</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-2">
                          <Zap className="h-5 w-5 text-orange-500 flex-shrink-0 mt-0.5" />
                          <div>
                            <p className="font-semibold text-foreground text-sm">Priority Doubt-Solving</p>
                            <p className="text-xs text-muted-foreground">Fast-track support for all your questions</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-2">
                          <Award className="h-5 w-5 text-orange-500 flex-shrink-0 mt-0.5" />
                          <div>
                            <p className="font-semibold text-foreground text-sm">Lifetime LMS Access</p>
                            <p className="text-xs text-muted-foreground">Access to premium workshops & updates</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-2">
                          <Lightbulb className="h-5 w-5 text-orange-500 flex-shrink-0 mt-0.5" />
                          <div>
                            <p className="font-semibold text-foreground text-sm">AI Startup Project Mentoring</p>
                            <p className="text-xs text-muted-foreground">Build your own AI-powered startup project</p>
                          </div>
                        </div>
                      </div>
                      <div className="pt-4 border-t border-orange-500/20">
                        <p className="text-xs text-muted-foreground text-center mb-3">Starting from ₹49,999</p>
                        <Link
                          to="/codekids-pro/pricing"
                          className="block w-full py-2 rounded-lg bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold hover:from-orange-600 hover:to-red-600 transition-all shadow-lg text-center"
                        >
                          Explore Mastery Path
                        </Link>
                      </div>
                    </GlassCard>
                  </motion.div>
                </div>
              </div>

              {/* Detailed Course Information - Expandable Section */}
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="mt-8"
              >
                <GlassCard className="p-8 overflow-hidden">
                  <div className="relative h-64 w-full rounded-xl overflow-hidden mb-8">
                    <Image
                      src="/assest/ai tools.jpg"
                      alt="AI + ML + Full-Stack Development"
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 100vw"
                      priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                    <div className="absolute bottom-6 left-6 right-6 text-white">
                      <h4 className="text-2xl font-bold mb-2">AI + ML + Full-Stack Development Program</h4>
                      <p className="text-blue-200">Career-transforming training to become a full-stack developer with AI superpowers</p>
                    </div>
                  </div>

                  {/* Course Overview */}
                  <motion.div
                    className="mb-6"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                  >
                    <button
                      onClick={() => toggleSection('course1-overview')}
                      className="w-full flex items-center justify-between p-4 rounded-xl bg-gradient-to-r from-blue-500/10 to-cyan-500/10 hover:from-blue-500/20 hover:to-cyan-500/20 transition-all mb-4"
                    >
                      <div className="flex items-center gap-3">
                        <Star className="h-5 w-5 text-blue-500" />
                        <h4 className="text-xl font-bold font-heading">Course Overview</h4>
                      </div>
                      <ChevronDown
                        className={`h-5 w-5 transition-transform duration-300 ${expandedSections['course1-overview'] ? 'rotate-180' : ''}`}
                      />
                    </button>
                    <AnimatePresence>
                      {expandedSections['course1-overview'] && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          <div className="p-6 bg-secondary/50 rounded-xl space-y-4">
                            <p className="text-muted-foreground leading-relaxed">
                              The <strong className="text-foreground">AI + ML + Full-Stack Development Program</strong> is a career-transforming, hands-on training designed to help you become a full-stack developer with AI superpowers. You will build real-world applications by combining:
                            </p>
                            <ul className="grid md:grid-cols-2 gap-3 list-disc list-inside text-muted-foreground">
                              <li>Frontend + Backend Development</li>
                              <li>Machine Learning & Generative AI</li>
                              <li>Cloud Deployment</li>
                              <li>Software Engineering Skills</li>
                            </ul>
                            <p className="text-muted-foreground leading-relaxed">
                              This program transforms beginners into job-ready professionals through <strong className="text-foreground">Weekly LIVE classes</strong>, <strong className="text-foreground">Industry projects</strong>, <strong className="text-foreground">Mentorship</strong>, <strong className="text-foreground">Career guidance</strong>, <strong className="text-foreground">Portfolio publishing</strong>, and <strong className="text-foreground">Interview preparation</strong>.
                            </p>
                            <p className="text-muted-foreground font-semibold text-foreground">
                              If you want to build real apps, create powerful AI projects, and launch a strong tech career, this is your perfect program.
                            </p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>

                  {/* Who Is This Program For */}
                  <motion.div
                    className="mb-6"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                  >
                    <button
                      onClick={() => toggleSection('course1-who')}
                      className="w-full flex items-center justify-between p-4 rounded-xl bg-gradient-to-r from-purple-500/10 to-pink-500/10 hover:from-purple-500/20 hover:to-pink-500/20 transition-all mb-4"
                    >
                      <div className="flex items-center gap-3">
                        <UserCheck className="h-5 w-5 text-purple-500" />
                        <h4 className="text-xl font-bold font-heading">Who Is This Program For?</h4>
                      </div>
                      <ChevronDown
                        className={`h-5 w-5 transition-transform duration-300 ${expandedSections['course1-who'] ? 'rotate-180' : ''}`}
                      />
                    </button>
                    <AnimatePresence>
                      {expandedSections['course1-who'] && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          <div className="p-6 bg-secondary/50 rounded-xl">
                            <p className="text-muted-foreground mb-4">This course is ideal for:</p>
                            <div className="grid md:grid-cols-2 gap-3">
                              {[
                                'Students (Diploma / B.Tech / Degree)',
                                'Freshers looking for their first tech job',
                                'Working professionals switching careers',
                                'AI & Full-Stack enthusiasts',
                                'Job seekers who want a high-paying tech role',
                                'Anyone who wants to build real AI-powered apps'
                              ].map((item, idx) => (
                                <div key={idx} className="flex items-start gap-2">
                                  <CheckCircle className="h-5 w-5 text-purple-500 flex-shrink-0 mt-0.5" />
                                  <span className="text-muted-foreground">{item}</span>
                                </div>
                              ))}
                            </div>
                            <p className="text-muted-foreground mt-4 font-semibold text-foreground">
                              ✅ No prior coding experience required — we start from basics and take you to expert level.
                            </p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>

                  {/* What You Will Learn */}
                  <motion.div
                    className="mb-6"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                  >
                    <button
                      onClick={() => toggleSection('course1-learn')}
                      className="w-full flex items-center justify-between p-4 rounded-xl bg-gradient-to-r from-cyan-500/10 to-blue-500/10 hover:from-cyan-500/20 hover:to-blue-500/20 transition-all mb-4"
                    >
                      <div className="flex items-center gap-3">
                        <BookOpen className="h-5 w-5 text-cyan-500" />
                        <h4 className="text-xl font-bold font-heading">What You Will Learn</h4>
                      </div>
                      <ChevronDown
                        className={`h-5 w-5 transition-transform duration-300 ${expandedSections['course1-learn'] ? 'rotate-180' : ''}`}
                      />
                    </button>
                    <AnimatePresence>
                      {expandedSections['course1-learn'] && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          <div className="p-6 bg-secondary/50 rounded-xl space-y-6">
                            <div>
                              <h5 className="font-bold text-foreground mb-3 flex items-center gap-2">
                                <Code className="h-4 w-4 text-blue-500" />
                                Core Full-Stack Development
                              </h5>
                              <div className="grid md:grid-cols-2 gap-2 text-muted-foreground">
                                {['HTML, CSS, JavaScript', 'React.js + Tailwind', 'Node.js, Express.js', 'MongoDB', 'Authentication & APIs', 'Git & GitHub'].map((skill, idx) => (
                                  <div key={idx} className="flex items-center gap-2">
                                    <CheckCircle className="h-4 w-4 text-blue-500 flex-shrink-0" />
                                    <span>{skill}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                            <div>
                              <h5 className="font-bold text-foreground mb-3 flex items-center gap-2">
                                <Brain className="h-4 w-4 text-purple-500" />
                                Artificial Intelligence
                              </h5>
                              <div className="grid md:grid-cols-2 gap-2 text-muted-foreground">
                                {['Python + ML Algorithms', 'Generative AI', 'Fine-tuning LLMs', 'Chatbots + Vision AI', 'AI-powered Apps'].map((skill, idx) => (
                                  <div key={idx} className="flex items-center gap-2">
                                    <CheckCircle className="h-4 w-4 text-purple-500 flex-shrink-0" />
                                    <span>{skill}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                            <div>
                              <h5 className="font-bold text-foreground mb-3 flex items-center gap-2">
                                <Cloud className="h-4 w-4 text-cyan-500" />
                                Cloud & Deployment
                              </h5>
                              <div className="grid md:grid-cols-2 gap-2 text-muted-foreground">
                                {['Hosting on Vercel / Netlify', 'Backend deployment', 'Cloud storage', 'API integrations'].map((skill, idx) => (
                                  <div key={idx} className="flex items-center gap-2">
                                    <CheckCircle className="h-4 w-4 text-cyan-500 flex-shrink-0" />
                                    <span>{skill}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                            <div>
                              <h5 className="font-bold text-foreground mb-3 flex items-center gap-2">
                                <Target className="h-4 w-4 text-orange-500" />
                                Professional Skills
                              </h5>
                              <div className="grid md:grid-cols-2 gap-2 text-muted-foreground">
                                {['Writing clean code', 'Debugging', 'Documentation', 'Agile development'].map((skill, idx) => (
                                  <div key={idx} className="flex items-center gap-2">
                                    <CheckCircle className="h-4 w-4 text-orange-500 flex-shrink-0" />
                                    <span>{skill}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>

                  {/* What You Will Build */}
                  <motion.div
                    className="mb-6"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 }}
                  >
                    <button
                      onClick={() => toggleSection('course1-build')}
                      className="w-full flex items-center justify-between p-4 rounded-xl bg-gradient-to-r from-green-500/10 to-emerald-500/10 hover:from-green-500/20 hover:to-emerald-500/20 transition-all mb-4"
                    >
                      <div className="flex items-center gap-3">
                        <Rocket className="h-5 w-5 text-green-500" />
                        <h4 className="text-xl font-bold font-heading">What You Will Build</h4>
                      </div>
                      <ChevronDown
                        className={`h-5 w-5 transition-transform duration-300 ${expandedSections['course1-build'] ? 'rotate-180' : ''}`}
                      />
                    </button>
                    <AnimatePresence>
                      {expandedSections['course1-build'] && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          <div className="p-6 bg-secondary/50 rounded-xl">
                            <p className="text-muted-foreground mb-4">You will build more than <strong className="text-foreground">15 real-world projects</strong>, including:</p>
                            <div className="grid md:grid-cols-2 gap-3">
                              {[
                                'AI chatbot',
                                'E-commerce MERN app',
                                'Machine learning prediction model',
                                'Full-stack login system',
                                'Portfolio website',
                                'AI image generator',
                                'API-based apps',
                                'Cloud-deployed applications',
                                '3 major capstone projects (Mastery Program)'
                              ].map((project, idx) => (
                                <div key={idx} className="flex items-start gap-2">
                                  <span className="text-green-500 font-bold">🔹</span>
                                  <span className="text-muted-foreground">{project}</span>
                                </div>
                              ))}
                            </div>
                            <p className="text-muted-foreground mt-4 font-semibold text-foreground">
                              These projects become the core of your career portfolio.
                            </p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>

                  {/* Career Services */}
                  <motion.div
                    className="mb-6"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 }}
                  >
                    <button
                      onClick={() => toggleSection('course1-career')}
                      className="w-full flex items-center justify-between p-4 rounded-xl bg-gradient-to-r from-orange-500/10 to-red-500/10 hover:from-orange-500/20 hover:to-red-500/20 transition-all mb-4"
                    >
                      <div className="flex items-center gap-3">
                        <Briefcase className="h-5 w-5 text-orange-500" />
                        <h4 className="text-xl font-bold font-heading">Career Services Included</h4>
                      </div>
                      <ChevronDown
                        className={`h-5 w-5 transition-transform duration-300 ${expandedSections['course1-career'] ? 'rotate-180' : ''}`}
                      />
                    </button>
                    <AnimatePresence>
                      {expandedSections['course1-career'] && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          <div className="p-6 bg-secondary/50 rounded-xl">
                            <p className="text-muted-foreground mb-4 font-semibold text-foreground">
                              Every CodeKids student receives (For ALL Tracks — Foundation, Professional, Mastery):
                            </p>
                            <div className="grid md:grid-cols-2 gap-3 mb-4">
                              {[
                                'Resume (done-for-you)',
                                'Hosted portfolio website',
                                'LinkedIn optimization',
                                'GitHub optimization',
                                'Job portal setup (Naukri, Indeed, Foundit…)',
                                'Professional self-intro video creation',
                                'Interview preparation',
                                'Soft skills training',
                                'Career roadmap'
                              ].map((service, idx) => (
                                <div key={idx} className="flex items-center gap-2">
                                  <CheckCircle className="h-4 w-4 text-orange-500 flex-shrink-0" />
                                  <span className="text-muted-foreground">{service}</span>
                                </div>
                              ))}
                            </div>
                            <div className="p-4 bg-orange-500/10 rounded-lg border border-orange-500/20">
                              <p className="font-semibold text-foreground mb-2">Mastery Program adds:</p>
                              <div className="space-y-2">
                                {['Internship', 'Weekly mentorship', 'Placement tracking', 'Recruiter connections'].map((item, idx) => (
                                  <div key={idx} className="flex items-center gap-2">
                                    <Star className="h-4 w-4 text-orange-500 flex-shrink-0" />
                                    <span className="text-muted-foreground">{item}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>

                  {/* Career Outcomes */}
                  <motion.div
                    className="mb-6"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 }}
                  >
                    <button
                      onClick={() => toggleSection('course1-outcomes')}
                      className="w-full flex items-center justify-between p-4 rounded-xl bg-gradient-to-r from-indigo-500/10 to-purple-500/10 hover:from-indigo-500/20 hover:to-purple-500/20 transition-all mb-4"
                    >
                      <div className="flex items-center gap-3">
                        <TrendingUp className="h-5 w-5 text-indigo-500" />
                        <h4 className="text-xl font-bold font-heading">Career Outcomes</h4>
                      </div>
                      <ChevronDown
                        className={`h-5 w-5 transition-transform duration-300 ${expandedSections['course1-outcomes'] ? 'rotate-180' : ''}`}
                      />
                    </button>
                    <AnimatePresence>
                      {expandedSections['course1-outcomes'] && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          <div className="p-6 bg-secondary/50 rounded-xl">
                            <p className="text-muted-foreground mb-4">After completing this program, you can become:</p>
                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
                              {[
                                'Full-Stack Developer',
                                'AI Developer',
                                'ML Engineer',
                                'Software Engineer',
                                'GenAI App Developer',
                                'Backend Developer',
                                'Automation Engineer',
                                'Cloud Web Developer'
                              ].map((role, idx) => (
                                <div key={idx} className="flex items-center gap-2 p-3 rounded-lg bg-indigo-500/5 border border-indigo-500/10">
                                  <ArrowRight className="h-4 w-4 text-indigo-500 flex-shrink-0" />
                                  <span className="text-muted-foreground font-medium">{role}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                </GlassCard>
              </motion.div>
            </motion.div>

            {/* Course 2: Data Science + Data Engineering + GenAI */}
<motion.div
initial={{ opacity: 0, y: 30 }}
whileInView={{ opacity: 1, y: 0 }}
viewport={{ once: true }}
className="mb-20"
>
<div className="flex flex-col items-center gap-4 mb-8 text-center">
  <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-indigo-600 to-purple-500 flex items-center justify-center">
    <Database className="h-8 w-8 text-white" />
  </div>
  <div>
    <h3 className="text-3xl md:text-4xl font-bold font-heading">Data Science + Data Engineering + GenAI</h3>
    <p className="text-sm text-muted-foreground">Fastest placement, high admissions course</p>
  </div>
</div>
{/* Program Pathways */}
<div className="mb-12">
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className="text-center mb-8"
  >
    <h4 className="text-2xl md:text-3xl font-bold font-heading mb-3">
      Choose Your <span className="bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent">Learning Path</span>
    </h4>
    <p className="text-muted-foreground max-w-2xl mx-auto">
      Choose from industry-level programs designed to transform you into a complete data professional
    </p>
  </motion.div>

  <div className="grid md:grid-cols-3 gap-6">
    {/* Foundation Program */}
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.1 }}
    >
      <GlassCard className="p-6 border-2 border-green-500/30 bg-gradient-to-br from-green-500/5 to-emerald-500/5 h-full hover:scale-105 transition-transform duration-300">
        <div className="mb-4">
          <div className="flex items-center justify-between mb-3">
            <span className="px-3 py-1 rounded-full bg-green-500 text-white text-xs font-semibold">⭐ FOUNDATION</span>
            <span className="text-xs text-muted-foreground">4 Months • 100 Live Classes</span>
          </div>
          <div className="mb-3 p-2 bg-green-500/10 rounded-lg border border-green-500/20">
            <p className="text-xs font-semibold text-foreground mb-1">📅 Live Class Schedule</p>
            <p className="text-xs text-muted-foreground">6-7 live classes per week → 100 live classes</p>
          </div>
          <p className="text-sm text-muted-foreground mb-4">Best For: Beginners & students starting their data journey</p>
        </div>
        <div className="space-y-3 mb-6">
          <div className="flex items-start gap-2">
            <Laptop className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-foreground text-sm">Live + Recorded Classes</p>
              <p className="text-xs text-muted-foreground">Learn Python + SQL basics with full access</p>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <Database className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-foreground text-sm">2 Beginner Data Projects</p>
              <p className="text-xs text-muted-foreground">Hands-on practice with real datasets</p>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <FileText className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-foreground text-sm">Resume Creation</p>
              <p className="text-xs text-muted-foreground">Professional resume done for you</p>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <Globe className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-foreground text-sm">Starter Portfolio</p>
              <p className="text-xs text-muted-foreground">Showcase your initial projects</p>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <Linkedin className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-foreground text-sm">LinkedIn & GitHub Starter Setup</p>
              <p className="text-xs text-muted-foreground">Basic optimization to get started</p>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <Award className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-foreground text-sm">Course Completion Certificate</p>
              <p className="text-xs text-muted-foreground">Recognized industry certificate</p>
            </div>
          </div>
        </div>
        <div className="pt-4 border-t border-green-500/20">
          <p className="text-xs text-muted-foreground text-center mb-3">Starting from ₹9,999</p>
          <button className="w-full py-2 rounded-lg bg-green-500/10 text-green-600 dark:text-green-400 font-semibold hover:bg-green-500/20 transition-all border border-green-500/20">
            Explore Foundation Path
          </button>
        </div>
      </GlassCard>
    </motion.div>

    {/* Professional Program */}
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.2 }}
    >
      <GlassCard className="p-6 border-2 border-blue-500/30 bg-gradient-to-br from-blue-500/5 to-cyan-500/5 relative h-full hover:scale-105 transition-transform duration-300">
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white text-xs font-semibold shadow-lg">
          ⭐⭐ MOST POPULAR
        </div>
        <div className="mb-4 mt-2">
          <div className="flex items-center justify-between mb-3">
            <span className="px-3 py-1 rounded-full bg-blue-500 text-white text-xs font-semibold">⭐⭐ PROFESSIONAL</span>
            <span className="text-xs text-muted-foreground">6 Months • 150 Live Classes</span>
          </div>
          <div className="mb-3 p-2 bg-blue-500/10 rounded-lg border border-blue-500/20">
            <p className="text-xs font-semibold text-foreground mb-1">📅 Live Class Schedule</p>
            <p className="text-xs text-muted-foreground">6-7 live classes per week → 150 live classes</p>
          </div>
          <p className="text-sm text-muted-foreground mb-4">Best For: Data career seekers & freshers preparing for placements</p>
        </div>
        <div className="space-y-3 mb-6">
          <div className="flex items-start gap-2">
            <Laptop className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-foreground text-sm">Everything in Foundation PLUS:</p>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <Database className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-foreground text-sm">6 Real Data Projects</p>
              <p className="text-xs text-muted-foreground">Python, SQL, ML, Power BI with industry datasets</p>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <Server className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-foreground text-sm">ETL Pipeline Projects</p>
              <p className="text-xs text-muted-foreground">Build end-to-end data engineering pipelines</p>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <BarChart3 className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-foreground text-sm">Power BI Dashboards</p>
              <p className="text-xs text-muted-foreground">Create business intelligence dashboards</p>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <Code className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-foreground text-sm">ML Model Building</p>
              <p className="text-xs text-muted-foreground">Build and deploy machine learning models</p>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <Target className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-foreground text-sm">Job-Oriented Training</p>
              <p className="text-xs text-muted-foreground">Resume building, mock interviews, placement prep</p>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <Globe className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-foreground text-sm">Full Portfolio Website</p>
              <p className="text-xs text-muted-foreground">Hosted professional portfolio</p>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <Linkedin className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-foreground text-sm">Complete Profile Makeover</p>
              <p className="text-xs text-muted-foreground">LinkedIn + GitHub + Job portals optimization</p>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <Calendar className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-foreground text-sm">1-Year LMS Access</p>
              <p className="text-xs text-muted-foreground">Access all materials and resources</p>
            </div>
          </div>
        </div>
        <div className="pt-4 border-t border-blue-500/20">
          <p className="text-xs text-muted-foreground text-center mb-3">Starting from ₹19,999</p>
          <button className="w-full py-2 rounded-lg bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold hover:from-blue-600 hover:to-cyan-600 transition-all shadow-lg">
            Explore Professional Path
          </button>
        </div>
      </GlassCard>
    </motion.div>

    {/* Mastery Program */}
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.3 }}
    >
      <GlassCard className="p-6 border-2 border-orange-500/30 bg-gradient-to-br from-orange-500/5 to-red-500/5 h-full hover:scale-105 transition-transform duration-300">
        <div className="mb-4">
          <div className="flex items-center justify-between mb-3">
            <span className="px-3 py-1 rounded-full bg-orange-500 text-white text-xs font-semibold">⭐⭐⭐ MASTERY</span>
            <span className="text-xs text-muted-foreground">9 Months • 230 Live Classes</span>
          </div>
          <div className="mb-3 p-2 bg-orange-500/10 rounded-lg border border-orange-500/20">
            <p className="text-xs font-semibold text-foreground mb-1">📅 Live Class Schedule</p>
            <p className="text-xs text-muted-foreground">6-7 live classes per week → 230 live classes</p>
          </div>
          <p className="text-sm text-muted-foreground mb-4">Best For: Serious aspirants targeting top data roles</p>
        </div>
        <div className="space-y-3 mb-6">
          <div className="flex items-start gap-2">
            <Laptop className="h-5 w-5 text-orange-500 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-foreground text-sm">Everything in Professional PLUS:</p>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <Briefcase className="h-5 w-5 text-orange-500 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-foreground text-sm">2–3 Month Internship</p>
              <p className="text-xs text-muted-foreground">Real work experience with internship letter</p>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <Cloud className="h-5 w-5 text-orange-500 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-foreground text-sm">Cloud Labs (GCP/AWS)</p>
              <p className="text-xs text-muted-foreground">Hands-on practice with BigQuery / Snowflake</p>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <Brain className="h-5 w-5 text-orange-500 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-foreground text-sm">Advanced ML + GenAI Case Studies</p>
              <p className="text-xs text-muted-foreground">Industry-grade AI projects</p>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <Users className="h-5 w-5 text-orange-500 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-foreground text-sm">Weekly 1-on-1 Mentorship</p>
              <p className="text-xs text-muted-foreground">Personalized guidance from experts</p>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <Globe className="h-5 w-5 text-orange-500 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-foreground text-sm">Portfolio Creation</p>
              <p className="text-xs text-muted-foreground">Complete portfolio with project showreel</p>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <Rocket className="h-5 w-5 text-orange-500 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-foreground text-sm">Placement Ecosystem Access</p>
              <p className="text-xs text-muted-foreground">Career tracking & recruiter connections</p>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <Zap className="h-5 w-5 text-orange-500 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-foreground text-sm">Priority Doubt-Solving</p>
              <p className="text-xs text-muted-foreground">Fast-track support for all questions</p>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <Target className="h-5 w-5 text-orange-500 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-foreground text-sm">Pre-Placement Evaluation</p>
              <p className="text-xs text-muted-foreground">Comprehensive assessment before job search</p>
            </div>
          </div>
        </div>
        <div className="pt-4 border-t border-orange-500/20">
          <p className="text-xs text-muted-foreground text-center mb-3">Starting from ₹39,999</p>
          <button className="w-full py-2 rounded-lg bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold hover:from-orange-600 hover:to-red-600 transition-all shadow-lg">
            Explore Mastery Path
          </button>
        </div>
      </GlassCard>
    </motion.div>
  </div>
</div>

{/* Detailed Course Information - Expandable Section */}
<motion.div
  initial={{ opacity: 0 }}
  whileInView={{ opacity: 1 }}
  viewport={{ once: true }}
  className="mt-8"
>
  <GlassCard className="p-8 overflow-hidden">
    <div className="relative h-64 w-full rounded-xl overflow-hidden mb-8">
      <Image
        src="/assest/data science.jpg"
        alt="Data Science + Data Engineering + GenAI"
        fill
        className="object-cover"
        sizes="(max-width: 768px) 100vw, 100vw"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
      <div className="absolute bottom-6 left-6 right-6 text-white">
        <h4 className="text-2xl font-bold mb-2">Data Science + Data Engineering + GenAI Program</h4>
        <p className="text-blue-200">Full-spectrum career accelerator to become a complete data professional</p>
      </div>
    </div>

    {/* Course Overview */}
    <motion.div
      className="mb-6"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      <button
        onClick={() => toggleSection('course2-overview')}
        className="w-full flex items-center justify-between p-4 rounded-xl bg-gradient-to-r from-indigo-500/10 to-purple-500/10 hover:from-indigo-500/20 hover:to-purple-500/20 transition-all mb-4"
      >
        <div className="flex items-center gap-3">
          <Star className="h-5 w-5 text-indigo-500" />
          <h4 className="text-xl font-bold font-heading">Course Overview</h4>
        </div>
        <ChevronDown
          className={`h-5 w-5 transition-transform duration-300 ${expandedSections['course2-overview'] ? 'rotate-180' : ''}`}
        />
      </button>
      <AnimatePresence>
        {expandedSections['course2-overview'] && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="p-6 bg-secondary/50 rounded-xl space-y-4">
              <p className="text-muted-foreground leading-relaxed">
                The <strong>Data Science + Data Engineering + GenAI Program</strong> is a full-spectrum career accelerator designed to turn you into a complete data professional—someone who can analyze data, build ML models, design pipelines, and integrate GenAI.
              </p>
              <p className="text-muted-foreground font-semibold text-foreground mb-3">You will master:</p>
              <ul className="grid md:grid-cols-2 gap-3 list-disc list-inside text-muted-foreground">
                <li>Python + Data Analysis</li>
                <li>Machine Learning + GenAI</li>
                <li>Power BI + Dashboards</li>
                <li>Cloud-based Data Engineering</li>
                <li>ETL Pipelines & Big Data Tools</li>
              </ul>
              <p className="text-muted-foreground leading-relaxed mt-4">
                The program transforms beginners into job-ready <strong>Data Analysts</strong>, <strong>Data Scientists</strong>, and <strong>Data Engineers</strong> through <strong>Weekly LIVE classes</strong>, <strong>Real datasets & industry projects</strong>, <strong>Mentorship</strong>, <strong>Portfolio publishing</strong>, <strong>Resume, LinkedIn & job portal optimization</strong>, and <strong>Interview preparation</strong>.
              </p>
              <p className="text-muted-foreground font-semibold text-foreground">
                If you want a high-paying data career, this program is your fast track.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>

    {/* Who Is This Program For */}
    <motion.div
      className="mb-6"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.1 }}
    >
      <button
        onClick={() => toggleSection('course2-who')}
        className="w-full flex items-center justify-between p-4 rounded-xl bg-gradient-to-r from-purple-500/10 to-pink-500/10 hover:from-purple-500/20 hover:to-pink-500/20 transition-all mb-4"
      >
        <div className="flex items-center gap-3">
          <UserCheck className="h-5 w-5 text-purple-500" />
          <h4 className="text-xl font-bold font-heading">Who Is This Program For?</h4>
        </div>
        <ChevronDown
          className={`h-5 w-5 transition-transform duration-300 ${expandedSections['course2-who'] ? 'rotate-180' : ''}`}
        />
      </button>
      <AnimatePresence>
        {expandedSections['course2-who'] && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="p-6 bg-secondary/50 rounded-xl">
              <p className="text-muted-foreground mb-4">Perfect for:</p>
              <div className="grid md:grid-cols-2 gap-3">
                {[
                  'Diploma, Degree & B.Tech students',
                  'Freshers preparing for data careers',
                  'Professionals switching to data',
                  'Aspiring Data Analysts',
                  'Beginners interested in AI & ML',
                  'Job seekers building a strong portfolio'
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-purple-500 flex-shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">{item}</span>
                  </div>
                ))}
              </div>
              <p className="text-muted-foreground mt-4 font-semibold text-foreground">
                ✅ No prior coding knowledge needed — we start from zero.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>

    {/* What You Will Learn */}
    <motion.div
      className="mb-6"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.2 }}
    >
      <button
        onClick={() => toggleSection('course2-learn')}
        className="w-full flex items-center justify-between p-4 rounded-xl bg-gradient-to-r from-indigo-500/10 to-cyan-500/10 hover:from-indigo-500/20 hover:to-cyan-500/20 transition-all mb-4"
      >
        <div className="flex items-center gap-3">
          <BookOpen className="h-5 w-5 text-indigo-500" />
          <h4 className="text-xl font-bold font-heading">What You Will Learn</h4>
        </div>
        <ChevronDown
          className={`h-5 w-5 transition-transform duration-300 ${expandedSections['course2-learn'] ? 'rotate-180' : ''}`}
        />
      </button>
      <AnimatePresence>
        {expandedSections['course2-learn'] && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="p-6 bg-secondary/50 rounded-xl space-y-6">
              <div>
                <h5 className="font-bold text-foreground mb-3 flex items-center gap-2">
                  <Database className="h-4 w-4 text-indigo-500" />
                  Core Data Science
                </h5>
                <div className="grid md:grid-cols-2 gap-2 text-muted-foreground">
                  {['Python for Data', 'Numpy, Pandas', 'Data Cleaning & Preprocessing', 'Exploratory Data Analysis', 'Data Visualization (Matplotlib, Seaborn)'].map((skill, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-indigo-500 flex-shrink-0" />
                      <span>{skill}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h5 className="font-bold text-foreground mb-3 flex items-center gap-2">
                  <Brain className="h-4 w-4 text-purple-500" />
                  Machine Learning & GenAI
                </h5>
                <div className="grid md:grid-cols-2 gap-2 text-muted-foreground">
                  {['Classification & Regression Models', 'Clustering & Recommendation Models', 'Feature Engineering', 'Generative AI for Data', 'AI-powered insights', 'AutoML tools'].map((skill, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-purple-500 flex-shrink-0" />
                      <span>{skill}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h5 className="font-bold text-foreground mb-3 flex items-center gap-2">
                  <Server className="h-4 w-4 text-cyan-500" />
                  Data Engineering
                </h5>
                <div className="grid md:grid-cols-2 gap-2 text-muted-foreground">
                  {['SQL Mastery', 'ETL Pipelines', 'Airflow Basics', 'Cloud Data Tools (AWS/GCP)', 'Data Warehousing (BigQuery/Snowflake)'].map((skill, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-cyan-500 flex-shrink-0" />
                      <span>{skill}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h5 className="font-bold text-foreground mb-3 flex items-center gap-2">
                  <BarChart3 className="h-4 w-4 text-blue-500" />
                  Analytics & BI
                </h5>
                <div className="grid md:grid-cols-2 gap-2 text-muted-foreground">
                  {['Power BI', 'Dashboard design', 'KPI & business reporting'].map((skill, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-blue-500 flex-shrink-0" />
                      <span>{skill}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h5 className="font-bold text-foreground mb-3 flex items-center gap-2">
                  <Target className="h-4 w-4 text-orange-500" />
                  Professional Skills
                </h5>
                <div className="grid md:grid-cols-2 gap-2 text-muted-foreground">
                  {['Data storytelling', 'Documentation', 'Portfolio case study writing'].map((skill, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-orange-500 flex-shrink-0" />
                      <span>{skill}</span>
                    </div>
                  ))}
                </div>
              </div>
              <p className="text-muted-foreground mt-4 font-semibold text-foreground text-center p-4 bg-indigo-500/10 rounded-lg border border-indigo-500/20">
                You become a complete modern data professional.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>

    {/* What You Will Build */}
    <motion.div
      className="mb-6"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.3 }}
    >
      <button
        onClick={() => toggleSection('course2-build')}
        className="w-full flex items-center justify-between p-4 rounded-xl bg-gradient-to-r from-green-500/10 to-emerald-500/10 hover:from-green-500/20 hover:to-emerald-500/20 transition-all mb-4"
      >
        <div className="flex items-center gap-3">
          <Rocket className="h-5 w-5 text-green-500" />
          <h4 className="text-xl font-bold font-heading">What You Will Build</h4>
        </div>
        <ChevronDown
          className={`h-5 w-5 transition-transform duration-300 ${expandedSections['course2-build'] ? 'rotate-180' : ''}`}
        />
      </button>
      <AnimatePresence>
        {expandedSections['course2-build'] && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="p-6 bg-secondary/50 rounded-xl">
              <p className="text-muted-foreground mb-4">You will build comprehensive data projects, including:</p>
              <div className="grid md:grid-cols-2 gap-3">
                {[
                  'Sales dashboard',
                  'HR analytics dashboard',
                  'ML prediction models',
                  'Recommendation system',
                  'ETL pipeline',
                  'BigQuery cloud data warehouse',
                  'Data storytelling project',
                  'Power BI business dashboard',
                  'GenAI-powered analytics tool',
                  '3 major capstone projects (Mastery Program)'
                ].map((project, idx) => (
                  <div key={idx} className="flex items-start gap-2">
                    <span className="text-green-500 font-bold">🔹</span>
                    <span className="text-muted-foreground">{project}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>

    {/* Career Services */}
    <motion.div
      className="mb-6"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.4 }}
    >
      <button
        onClick={() => toggleSection('course2-career')}
        className="w-full flex items-center justify-between p-4 rounded-xl bg-gradient-to-r from-orange-500/10 to-red-500/10 hover:from-orange-500/20 hover:to-red-500/20 transition-all mb-4"
      >
        <div className="flex items-center gap-3">
          <Briefcase className="h-5 w-5 text-orange-500" />
          <h4 className="text-xl font-bold font-heading">Career Services Included</h4>
        </div>
        <ChevronDown
          className={`h-5 w-5 transition-transform duration-300 ${expandedSections['course2-career'] ? 'rotate-180' : ''}`}
        />
      </button>
      <AnimatePresence>
        {expandedSections['course2-career'] && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="p-6 bg-secondary/50 rounded-xl">
              <p className="text-muted-foreground mb-4 font-semibold text-foreground">
                Every CodeKids student receives:
              </p>
              <div className="grid md:grid-cols-2 gap-3 mb-4">
                {[
                  'Resume created for you',
                  'Hosted portfolio website',
                  'LinkedIn optimization',
                  'GitHub optimization',
                  'Job portal setup (Naukri, Foundit, Indeed…)',
                  'Professional intro video',
                  'HR + Technical interview prep',
                  'Soft skills training',
                  'Career roadmap'
                ].map((service, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-orange-500 flex-shrink-0" />
                    <span className="text-muted-foreground">{service}</span>
                  </div>
                ))}
              </div>
              <div className="p-4 bg-orange-500/10 rounded-lg border border-orange-500/20">
                <p className="font-semibold text-foreground mb-2">Mastery Program adds:</p>
                <div className="space-y-2">
                  {['Internship', 'Weekly mentorship', 'Placement support', 'Recruiter connections'].map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <Star className="h-4 w-4 text-orange-500 flex-shrink-0" />
                      <span className="text-muted-foreground">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>

    {/* Career Outcomes */}
    <motion.div
      className="mb-6"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.5 }}
    >
      <button
        onClick={() => toggleSection('course2-outcomes')}
        className="w-full flex items-center justify-between p-4 rounded-xl bg-gradient-to-r from-pink-500/10 to-rose-500/10 hover:from-pink-500/20 hover:to-rose-500/20 transition-all mb-4"
      >
        <div className="flex items-center gap-3">
          <TrendingUp className="h-5 w-5 text-pink-500" />
          <h4 className="text-xl font-bold font-heading">Career Outcomes</h4>
        </div>
        <ChevronDown
          className={`h-5 w-5 transition-transform duration-300 ${expandedSections['course2-outcomes'] ? 'rotate-180' : ''}`}
        />
      </button>
      <AnimatePresence>
        {expandedSections['course2-outcomes'] && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="p-6 bg-secondary/50 rounded-xl">
              <p className="text-muted-foreground mb-4">After completing this program, you can become:</p>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
                {[
                  'Data Analyst',
                  'Data Scientist',
                  'Data Engineer',
                  'ML Engineer',
                  'BI Analyst',
                  'Analytics Engineer',
                  'AI Specialist'
                ].map((role, idx) => (
                  <div key={idx} className="flex items-center gap-2 p-3 rounded-lg bg-pink-500/5 border border-pink-500/10">
                    <ArrowRight className="h-4 w-4 text-pink-500 flex-shrink-0" />
                    <span className="text-muted-foreground font-medium">{role}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  </GlassCard>
</motion.div>
</motion.div>

{/* Course 3: Cybersecurity + Cloud + AI Security */}
<motion.div
initial={{ opacity: 0, y: 30 }}
whileInView={{ opacity: 1, y: 0 }}
viewport={{ once: true }}
className="mb-20"
>
<div className="flex flex-col items-center gap-4 mb-8 text-center">
  <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-green-600 to-teal-500 flex items-center justify-center">
    <Shield className="h-8 w-8 text-white" />
  </div>
  <div>
    <h3 className="text-3xl md:text-4xl font-bold font-heading">Cybersecurity + Cloud + AI Security</h3>
    <p className="text-sm text-muted-foreground">High-salary roles + niche skills</p>
  </div>
</div>
{/* Program Pathways */}
<div className="mb-12">
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className="text-center mb-8"
  >
    <h4 className="text-2xl md:text-3xl font-bold font-heading mb-3">
      Choose Your <span className="bg-gradient-to-r from-green-500 to-teal-500 bg-clip-text text-transparent">Learning Path</span>
    </h4>
    <p className="text-muted-foreground max-w-2xl mx-auto">
      Choose from industry-level programs designed for high-paying cybersecurity roles
    </p>
  </motion.div>

  <div className="grid md:grid-cols-3 gap-6">
    {/* Foundation Program */}
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.1 }}
    >
      <GlassCard className="p-6 border-2 border-green-500/30 bg-gradient-to-br from-green-500/5 to-emerald-500/5 h-full hover:scale-105 transition-transform duration-300">
        <div className="mb-4">
          <div className="flex items-center justify-between mb-3">
            <span className="px-3 py-1 rounded-full bg-green-500 text-white text-xs font-semibold">⭐ FOUNDATION</span>
            <span className="text-xs text-muted-foreground">4 Months • 100 Live Classes</span>
          </div>
          <div className="mb-3 p-2 bg-green-500/10 rounded-lg border border-green-500/20">
            <p className="text-xs font-semibold text-foreground mb-1">📅 Live Class Schedule</p>
            <p className="text-xs text-muted-foreground">6-7 live classes per week → 100 live classes</p>
          </div>
          <p className="text-sm text-muted-foreground mb-4">Best For: Starters in cybersecurity</p>
        </div>
        <div className="space-y-3 mb-6">
          <div className="flex items-start gap-2">
            <Laptop className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-foreground text-sm">Live Classes</p>
              <p className="text-xs text-muted-foreground">Learn cybersecurity fundamentals</p>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <Terminal className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-foreground text-sm">Linux + Networking Basics</p>
              <p className="text-xs text-muted-foreground">Essential skills for security professionals</p>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <Shield className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-foreground text-sm">Kali Linux Setup</p>
              <p className="text-xs text-muted-foreground">Tool setup for ethical hacking</p>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <Lock className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-foreground text-sm">2 Beginner Security Labs</p>
              <p className="text-xs text-muted-foreground">Basic ethical hacking tasks</p>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <FileText className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-foreground text-sm">Resume Creation</p>
              <p className="text-xs text-muted-foreground">Professional resume done for you</p>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <Linkedin className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-foreground text-sm">LinkedIn Starter Setup</p>
              <p className="text-xs text-muted-foreground">Basic optimization to get started</p>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <Award className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-foreground text-sm">Course Completion Certificate</p>
              <p className="text-xs text-muted-foreground">Recognized industry certificate</p>
            </div>
          </div>
        </div>
        <div className="pt-4 border-t border-green-500/20">
          <p className="text-xs text-muted-foreground text-center mb-3">Starting from ₹14,999</p>
          <button className="w-full py-2 rounded-lg bg-green-500/10 text-green-600 dark:text-green-400 font-semibold hover:bg-green-500/20 transition-all border border-green-500/20">
            Explore Foundation Path
          </button>
        </div>
      </GlassCard>
    </motion.div>

    {/* Professional Program */}
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.2 }}
    >
      <GlassCard className="p-6 border-2 border-blue-500/30 bg-gradient-to-br from-blue-500/5 to-cyan-500/5 relative h-full hover:scale-105 transition-transform duration-300">
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white text-xs font-semibold shadow-lg">
          ⭐⭐ MOST POPULAR
        </div>
        <div className="mb-4 mt-2">
          <div className="flex items-center justify-between mb-3">
            <span className="px-3 py-1 rounded-full bg-blue-500 text-white text-xs font-semibold">⭐⭐ PROFESSIONAL</span>
            <span className="text-xs text-muted-foreground">6 Months • 150 Live Classes</span>
          </div>
          <div className="mb-3 p-2 bg-blue-500/10 rounded-lg border border-blue-500/20">
            <p className="text-xs font-semibold text-foreground mb-1">📅 Live Class Schedule</p>
            <p className="text-xs text-muted-foreground">6-7 live classes per week → 150 live classes</p>
          </div>
          <p className="text-sm text-muted-foreground mb-4">Best For: Job seekers entering cybersecurity roles</p>
        </div>
        <div className="space-y-3 mb-6">
          <div className="flex items-start gap-2">
            <Laptop className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-foreground text-sm">Everything in Foundation PLUS:</p>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <Shield className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-foreground text-sm">SOC Training</p>
              <p className="text-xs text-muted-foreground">Ethical hacking + Security Operations Center</p>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <Server className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-foreground text-sm">SIEM Tools (Splunk/Azure Sentinel)</p>
              <p className="text-xs text-muted-foreground">Security Information and Event Management</p>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <Lock className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-foreground text-sm">6 Hands-On Labs</p>
              <p className="text-xs text-muted-foreground">Real attack & defense simulations</p>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <Cloud className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-foreground text-sm">Cloud Security Foundations</p>
              <p className="text-xs text-muted-foreground">AWS/Azure security basics</p>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <Users className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-foreground text-sm">Weekly Live Doubt Sessions</p>
              <p className="text-xs text-muted-foreground">Get instant help from expert instructors</p>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <Globe className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-foreground text-sm">Full Hosted Cyber Portfolio</p>
              <p className="text-xs text-muted-foreground">Showcase your security projects</p>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <Target className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-foreground text-sm">Job Portal Optimization</p>
              <p className="text-xs text-muted-foreground">Resume building, mock interviews, placement prep</p>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <Calendar className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-foreground text-sm">1-Year LMS Access</p>
              <p className="text-xs text-muted-foreground">Access all materials and resources</p>
            </div>
          </div>
        </div>
        <div className="pt-4 border-t border-blue-500/20">
          <p className="text-xs text-muted-foreground text-center mb-3">Starting from ₹29,999</p>
          <button className="w-full py-2 rounded-lg bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold hover:from-blue-600 hover:to-cyan-600 transition-all shadow-lg">
            Explore Professional Path
          </button>
        </div>
      </GlassCard>
    </motion.div>

    {/* Mastery Program */}
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.3 }}
    >
      <GlassCard className="p-6 border-2 border-orange-500/30 bg-gradient-to-br from-orange-500/5 to-red-500/5 h-full hover:scale-105 transition-transform duration-300">
        <div className="mb-4">
          <div className="flex items-center justify-between mb-3">
            <span className="px-3 py-1 rounded-full bg-orange-500 text-white text-xs font-semibold">⭐⭐⭐ MASTERY</span>
            <span className="text-xs text-muted-foreground">9 Months • 230 Live Classes</span>
          </div>
          <div className="mb-3 p-2 bg-orange-500/10 rounded-lg border border-orange-500/20">
            <p className="text-xs font-semibold text-foreground mb-1">📅 Live Class Schedule</p>
            <p className="text-xs text-muted-foreground">6-7 live classes per week → 230 live classes</p>
          </div>
          <p className="text-sm text-muted-foreground mb-4">Best For: High-paying cybersecurity job roles</p>
        </div>
        <div className="space-y-3 mb-6">
          <div className="flex items-start gap-2">
            <Laptop className="h-5 w-5 text-orange-500 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-foreground text-sm">Everything in Professional PLUS:</p>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <Briefcase className="h-5 w-5 text-orange-500 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-foreground text-sm">SOC Internship Simulation</p>
              <p className="text-xs text-muted-foreground">Real work experience with internship letter</p>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <Cloud className="h-5 w-5 text-orange-500 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-foreground text-sm">AWS Cloud Security Labs</p>
              <p className="text-xs text-muted-foreground">Advanced cloud security practices</p>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <Brain className="h-5 w-5 text-orange-500 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-foreground text-sm">AI Threat Detection Tools</p>
              <p className="text-xs text-muted-foreground">AI-powered security automation</p>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <Shield className="h-5 w-5 text-orange-500 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-foreground text-sm">Red-Team/Blue-Team Practicals</p>
              <p className="text-xs text-muted-foreground">Advanced attack & defense scenarios</p>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <Users className="h-5 w-5 text-orange-500 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-foreground text-sm">Weekly 1-on-1 Mentorship</p>
              <p className="text-xs text-muted-foreground">Personalized guidance from experts</p>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <Rocket className="h-5 w-5 text-orange-500 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-foreground text-sm">Placement Guarantee Track</p>
              <p className="text-xs text-muted-foreground">Career tracking & recruiter connections</p>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <Award className="h-5 w-5 text-orange-500 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-foreground text-sm">Lifetime Access</p>
              <p className="text-xs text-muted-foreground">Access to premium workshops & updates</p>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <Target className="h-5 w-5 text-orange-500 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-foreground text-sm">Pre-Placement Evaluation</p>
              <p className="text-xs text-muted-foreground">Comprehensive assessment before job search</p>
            </div>
          </div>
        </div>
        <div className="pt-4 border-t border-orange-500/20">
          <p className="text-xs text-muted-foreground text-center mb-3">Starting from ₹49,999</p>
          <button className="w-full py-2 rounded-lg bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold hover:from-orange-600 hover:to-red-600 transition-all shadow-lg">
            Explore Mastery Path
          </button>
        </div>
      </GlassCard>
    </motion.div>
  </div>
</div>

{/* Detailed Course Information - Expandable Section */}
<motion.div
  initial={{ opacity: 0 }}
  whileInView={{ opacity: 1 }}
  viewport={{ once: true }}
  className="mt-8"
>
  <GlassCard className="p-8 overflow-hidden">
    <div className="relative h-64 w-full rounded-xl overflow-hidden mb-8">
      <Image
        src="/assest/preparation.jpg"
        alt="Cybersecurity + Cloud + AI Security"
        fill
        className="object-cover"
        sizes="(max-width: 768px) 100vw, 100vw"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
      <div className="absolute bottom-6 left-6 right-6 text-white">
        <h4 className="text-2xl font-bold mb-2">Cybersecurity + Cloud + AI Security Program</h4>
        <p className="text-blue-200">Transform into cybersecurity professionals ready to protect systems and secure cloud environments</p>
      </div>
    </div>

    {/* Course Overview */}
    <motion.div
      className="mb-6"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      <button
        onClick={() => toggleSection('course3-overview')}
        className="w-full flex items-center justify-between p-4 rounded-xl bg-gradient-to-r from-green-500/10 to-teal-500/10 hover:from-green-500/20 hover:to-teal-500/20 transition-all mb-4"
      >
        <div className="flex items-center gap-3">
          <Star className="h-5 w-5 text-green-500" />
          <h4 className="text-xl font-bold font-heading">Course Overview</h4>
        </div>
        <ChevronDown
          className={`h-5 w-5 transition-transform duration-300 ${expandedSections['course3-overview'] ? 'rotate-180' : ''}`}
        />
      </button>
      <AnimatePresence>
        {expandedSections['course3-overview'] && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="p-6 bg-secondary/50 rounded-xl space-y-4">
              <p className="text-muted-foreground leading-relaxed">
                This program transforms beginners into <strong>cybersecurity professionals</strong> ready to protect systems, detect threats, and secure cloud environments using both traditional and AI-driven tools.
              </p>
              <p className="text-muted-foreground font-semibold text-foreground mb-3">You will learn:</p>
              <ul className="grid md:grid-cols-2 gap-3 list-disc list-inside text-muted-foreground">
                <li>Ethical Hacking</li>
                <li>SOC Operations & SIEM Tools</li>
                <li>Cloud Security (AWS/Azure)</li>
                <li>Threat Detection using AI</li>
                <li>Linux + Networking + Scripting</li>
              </ul>
              <p className="text-muted-foreground leading-relaxed mt-4">
                It is designed for students aiming for high-paying cybersecurity roles, with <strong>LIVE labs</strong>, <strong>Real attack & defense simulations</strong>, <strong>Internship (Mastery)</strong>, <strong>Resume + LinkedIn + GitHub setup</strong>, and <strong>Cyber portfolio publishing</strong>.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>

                {/* Who Is This Program For */}
                <motion.div
                  className="mb-6"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 }}
                >
                  <button
                    onClick={() => toggleSection('course3-who')}
                    className="w-full flex items-center justify-between p-4 rounded-xl bg-gradient-to-r from-teal-500/10 to-cyan-500/10 hover:from-teal-500/20 hover:to-cyan-500/20 transition-all mb-4"
                  >
                    <div className="flex items-center gap-3">
                      <UserCheck className="h-5 w-5 text-teal-500" />
                      <h4 className="text-xl font-bold font-heading">Who Is This Program For?</h4>
                    </div>
                    <ChevronDown
                      className={`h-5 w-5 transition-transform duration-300 ${expandedSections['course3-who'] ? 'rotate-180' : ''}`}
                    />
                  </button>
                  <AnimatePresence>
                    {expandedSections['course3-who'] && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="p-6 bg-secondary/50 rounded-xl">
                          <p className="text-muted-foreground mb-4">Perfect for:</p>
                          <div className="grid md:grid-cols-2 gap-3">
                            {[
                              'Students interested in cybersecurity',
                              'Beginners with zero experience',
                              'Freshers wanting to enter cyber roles',
                              'IT support engineers',
                              'Network students',
                              'Anyone who wants a future-proof career in security'
                            ].map((item, idx) => (
                              <div key={idx} className="flex items-start gap-2">
                                <CheckCircle className="h-5 w-5 text-teal-500 flex-shrink-0 mt-0.5" />
                                <span className="text-muted-foreground">{item}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>

                {/* What You Will Learn */}
                <motion.div
                  className="mb-6"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                >
                  <button
                    onClick={() => toggleSection('course3-learn')}
                    className="w-full flex items-center justify-between p-4 rounded-xl bg-gradient-to-r from-emerald-500/10 to-green-500/10 hover:from-emerald-500/20 hover:to-green-500/20 transition-all mb-4"
                  >
                    <div className="flex items-center gap-3">
                      <BookOpen className="h-5 w-5 text-emerald-500" />
                      <h4 className="text-xl font-bold font-heading">What You Will Learn</h4>
                    </div>
                    <ChevronDown
                      className={`h-5 w-5 transition-transform duration-300 ${expandedSections['course3-learn'] ? 'rotate-180' : ''}`}
                    />
                  </button>
                  <AnimatePresence>
                    {expandedSections['course3-learn'] && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="p-6 bg-secondary/50 rounded-xl space-y-6">
                          <div>
                            <h5 className="font-bold text-foreground mb-3 flex items-center gap-2">
                              <Shield className="h-4 w-4 text-green-500" />
                              Core Cybersecurity
                            </h5>
                            <div className="grid md:grid-cols-2 gap-2 text-muted-foreground">
                              {['Ethical hacking', 'Vulnerability analysis', 'Kali Linux', 'Network scanning', 'Web security'].map((skill, idx) => (
                                <div key={idx} className="flex items-center gap-2">
                                  <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                                  <span>{skill}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                          <div>
                            <h5 className="font-bold text-foreground mb-3 flex items-center gap-2">
                              <Eye className="h-4 w-4 text-cyan-500" />
                              SOC Operations
                            </h5>
                            <div className="grid md:grid-cols-2 gap-2 text-muted-foreground">
                              {['SIEM tools (Splunk, Sentinel)', 'Log analysis', 'Threat hunting', 'Incident response'].map((skill, idx) => (
                                <div key={idx} className="flex items-center gap-2">
                                  <CheckCircle className="h-4 w-4 text-cyan-500 flex-shrink-0" />
                                  <span>{skill}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                          <div>
                            <h5 className="font-bold text-foreground mb-3 flex items-center gap-2">
                              <Cloud className="h-4 w-4 text-blue-500" />
                              Cloud Security
                            </h5>
                            <div className="grid md:grid-cols-2 gap-2 text-muted-foreground">
                              {['IAM', 'S3 security', 'Cloud monitoring', 'Cloud-based attack simulation'].map((skill, idx) => (
                                <div key={idx} className="flex items-center gap-2">
                                  <CheckCircle className="h-4 w-4 text-blue-500 flex-shrink-0" />
                                  <span>{skill}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                          <div>
                            <h5 className="font-bold text-foreground mb-3 flex items-center gap-2">
                              <Brain className="h-4 w-4 text-purple-500" />
                              AI Security
                            </h5>
                            <div className="grid md:grid-cols-2 gap-2 text-muted-foreground">
                              {['AI-powered threat detection', 'Automated security testing', 'Threat intelligence'].map((skill, idx) => (
                                <div key={idx} className="flex items-center gap-2">
                                  <CheckCircle className="h-4 w-4 text-purple-500 flex-shrink-0" />
                                  <span>{skill}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                          <div>
                            <h5 className="font-bold text-foreground mb-3 flex items-center gap-2">
                              <FileText className="h-4 w-4 text-orange-500" />
                              Professional Skills
                            </h5>
                            <div className="grid md:grid-cols-2 gap-2 text-muted-foreground">
                              {['Report writing', 'Cyber documentation', 'SOC reporting templates'].map((skill, idx) => (
                                <div key={idx} className="flex items-center gap-2">
                                  <CheckCircle className="h-4 w-4 text-orange-500 flex-shrink-0" />
                                  <span>{skill}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>

                {/* What You Will Build */}
                <motion.div
                  className="mb-6"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                >
                  <button
                    onClick={() => toggleSection('course3-build')}
                    className="w-full flex items-center justify-between p-4 rounded-xl bg-gradient-to-r from-green-500/10 to-emerald-500/10 hover:from-green-500/20 hover:to-emerald-500/20 transition-all mb-4"
                  >
                    <div className="flex items-center gap-3">
                      <Rocket className="h-5 w-5 text-green-500" />
                      <h4 className="text-xl font-bold font-heading">What You Will Build</h4>
                    </div>
                    <ChevronDown
                      className={`h-5 w-5 transition-transform duration-300 ${expandedSections['course3-build'] ? 'rotate-180' : ''}`}
                    />
                  </button>
                  <AnimatePresence>
                    {expandedSections['course3-build'] && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="p-6 bg-secondary/50 rounded-xl">
                          <p className="text-muted-foreground mb-4">You will build comprehensive cybersecurity projects, including:</p>
                          <div className="grid md:grid-cols-2 gap-3">
                            {[
                              'SOC analysis reports',
                              'SIEM dashboards',
                              'Penetration testing labs',
                              'Cloud security project',
                              'Threat detection using AI',
                              'Red/blue team simulations',
                              'Automation scripts',
                              'Cybersecurity portfolio',
                              '3 advanced capstone projects'
                            ].map((project, idx) => (
                              <div key={idx} className="flex items-start gap-2">
                                <span className="text-green-500 font-bold">🔹</span>
                                <span className="text-muted-foreground">{project}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>

                {/* Career Services */}
                <motion.div
                  className="mb-6"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 }}
                >
                  <button
                    onClick={() => toggleSection('course3-career')}
                    className="w-full flex items-center justify-between p-4 rounded-xl bg-gradient-to-r from-orange-500/10 to-red-500/10 hover:from-orange-500/20 hover:to-red-500/20 transition-all mb-4"
                  >
                    <div className="flex items-center gap-3">
                      <Briefcase className="h-5 w-5 text-orange-500" />
                      <h4 className="text-xl font-bold font-heading">Career Services Included</h4>
                    </div>
                    <ChevronDown
                      className={`h-5 w-5 transition-transform duration-300 ${expandedSections['course3-career'] ? 'rotate-180' : ''}`}
                    />
                  </button>
                  <AnimatePresence>
                    {expandedSections['course3-career'] && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="p-6 bg-secondary/50 rounded-xl">
                          <p className="text-muted-foreground mb-4 font-semibold text-foreground">
                            Every CodeKids student receives:
                          </p>
                          <div className="grid md:grid-cols-2 gap-3 mb-4">
                            {[
                              'Resume created for you',
                              'Hosted cyber portfolio website',
                              'LinkedIn optimization',
                              'GitHub optimization',
                              'Job portal setup (Naukri, Foundit, Indeed…)',
                              'Professional intro video',
                              'HR + Technical interview prep',
                              'Soft skills training',
                              'Career roadmap'
                            ].map((service, idx) => (
                              <div key={idx} className="flex items-center gap-2">
                                <CheckCircle className="h-4 w-4 text-orange-500 flex-shrink-0" />
                                <span className="text-muted-foreground">{service}</span>
                              </div>
                            ))}
                          </div>
                          <div className="p-4 bg-orange-500/10 rounded-lg border border-orange-500/20">
                            <p className="font-semibold text-foreground mb-2">Mastery Program adds:</p>
                            <div className="space-y-2">
                              {['SOC internship simulation', 'Weekly mentorship', 'Placement ecosystem access', 'Recruiter connections'].map((item, idx) => (
                                <div key={idx} className="flex items-center gap-2">
                                  <Star className="h-4 w-4 text-orange-500 flex-shrink-0" />
                                  <span className="text-muted-foreground">{item}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>

                {/* Career Outcomes */}
                <motion.div
                  className="mb-6"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 }}
                >
                  <button
                    onClick={() => toggleSection('course3-outcomes')}
                    className="w-full flex items-center justify-between p-4 rounded-xl bg-gradient-to-r from-teal-500/10 to-cyan-500/10 hover:from-teal-500/20 hover:to-cyan-500/20 transition-all mb-4"
                  >
                    <div className="flex items-center gap-3">
                      <TrendingUp className="h-5 w-5 text-teal-500" />
                      <h4 className="text-xl font-bold font-heading">Career Outcomes</h4>
                    </div>
                    <ChevronDown
                      className={`h-5 w-5 transition-transform duration-300 ${expandedSections['course3-outcomes'] ? 'rotate-180' : ''}`}
                    />
                  </button>
                  <AnimatePresence>
                    {expandedSections['course3-outcomes'] && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="p-6 bg-secondary/50 rounded-xl">
                          <p className="text-muted-foreground mb-4">After completing this program, you can become:</p>
                          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
                            {[
                              'SOC Analyst',
                              'Cybersecurity Analyst',
                              'Ethical Hacker',
                              'Cloud Security Analyst',
                              'Security Operations Engineer',
                              'Incident Response Specialist'
                            ].map((role, idx) => (
                              <div key={idx} className="flex items-center gap-2 p-3 rounded-lg bg-teal-500/5 border border-teal-500/10">
                                <ArrowRight className="h-4 w-4 text-teal-500 flex-shrink-0" />
                                <span className="text-muted-foreground font-medium">{role}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              </GlassCard>
            </motion.div>
          </motion.div>

          {/* Course 4: UI/UX + Digital Marketing + AI Tools */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-20"
          >
            <div className="flex flex-col items-center gap-4 mb-8 text-center">
              <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-pink-600 to-rose-500 flex items-center justify-center">
                <Palette className="h-8 w-8 text-white" />
              </div>
              <div>
                <h3 className="text-3xl md:text-4xl font-bold font-heading">UI/UX + Digital Marketing + AI Tools</h3>
                <p className="text-sm text-muted-foreground">Creative, beginner-friendly, high admission</p>
              </div>
            </div>
            {/* Program Pathways */}
            <div className="mb-12">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center mb-8"
              >
                <h4 className="text-2xl md:text-3xl font-bold font-heading mb-3">
                  Choose Your <span className="bg-gradient-to-r from-pink-500 to-rose-500 bg-clip-text text-transparent">Learning Path</span>
                </h4>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Choose from industry-level programs designed for creative & marketing careers
                </p>
              </motion.div>

              <div className="grid md:grid-cols-3 gap-6">
                {/* Foundation Program */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 }}
                >
                  <GlassCard className="p-6 border-2 border-green-500/30 bg-gradient-to-br from-green-500/5 to-emerald-500/5 h-full hover:scale-105 transition-transform duration-300">
                    <div className="mb-4">
                      <div className="flex items-center justify-between mb-3">
                        <span className="px-3 py-1 rounded-full bg-green-500 text-white text-xs font-semibold">⭐ FOUNDATION</span>
            <span className="text-xs text-muted-foreground">4 Months • 100 Live Classes</span>
          </div>
          <div className="mb-3 p-2 bg-green-500/10 rounded-lg border border-green-500/20">
            <p className="text-xs font-semibold text-foreground mb-1">📅 Live Class Schedule</p>
            <p className="text-xs text-muted-foreground">6-7 live classes per week → 100 live classes</p>
                      </div>
                      <p className="text-sm text-muted-foreground mb-4">Best For: Beginners starting their design journey</p>
                    </div>
                    <div className="space-y-3 mb-6">
                      <div className="flex items-start gap-2">
                        <Laptop className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="font-semibold text-foreground text-sm">Recorded Classes</p>
                          <p className="text-xs text-muted-foreground">Learn UI fundamentals at your own pace</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <Palette className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="font-semibold text-foreground text-sm">Figma Basics</p>
                          <p className="text-xs text-muted-foreground">Master the industry-standard design tool</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <Code className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="font-semibold text-foreground text-sm">2 Mini UI Projects</p>
                          <p className="text-xs text-muted-foreground">Hands-on practice with real designs</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <Sparkles className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="font-semibold text-foreground text-sm">Canva AI Training</p>
                          <p className="text-xs text-muted-foreground">Learn AI-powered design tools</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <FileText className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="font-semibold text-foreground text-sm">Resume Creation</p>
                          <p className="text-xs text-muted-foreground">Professional resume done for you</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <Globe className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="font-semibold text-foreground text-sm">Starter Portfolio</p>
                          <p className="text-xs text-muted-foreground">Showcase your initial projects</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <Award className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="font-semibold text-foreground text-sm">Course Completion Certificate</p>
                          <p className="text-xs text-muted-foreground">Recognized industry certificate</p>
                        </div>
                      </div>
                    </div>
                    <div className="pt-4 border-t border-green-500/20">
                      <p className="text-xs text-muted-foreground text-center mb-3">Starting from ₹5,999</p>
                      <button className="w-full py-2 rounded-lg bg-green-500/10 text-green-600 dark:text-green-400 font-semibold hover:bg-green-500/20 transition-all border border-green-500/20">
                        Explore Foundation Path
                      </button>
                    </div>
                  </GlassCard>
                </motion.div>

                {/* Professional Program */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                >
                  <GlassCard className="p-6 border-2 border-blue-500/30 bg-gradient-to-br from-blue-500/5 to-cyan-500/5 relative h-full hover:scale-105 transition-transform duration-300">
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white text-xs font-semibold shadow-lg">
                      ⭐⭐ MOST POPULAR
                    </div>
                    <div className="mb-4 mt-2">
                      <div className="flex items-center justify-between mb-3">
                        <span className="px-3 py-1 rounded-full bg-blue-500 text-white text-xs font-semibold">⭐⭐ PROFESSIONAL</span>
                        <span className="text-xs text-muted-foreground">6 Months • 150 Live Classes</span>
                      </div>
                      <div className="mb-3 p-2 bg-blue-500/10 rounded-lg border border-blue-500/20">
                        <p className="text-xs font-semibold text-foreground mb-1">📅 Live Class Schedule</p>
                        <p className="text-xs text-muted-foreground">6-7 live classes per week → 150 live classes</p>
                      </div>
                      <p className="text-sm text-muted-foreground mb-4">Best For: Design & marketing career seekers</p>
                    </div>
                    <div className="space-y-3 mb-6">
                      <div className="flex items-start gap-2">
                        <Laptop className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="font-semibold text-foreground text-sm">Everything in Foundation PLUS:</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <Palette className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="font-semibold text-foreground text-sm">Complete UI/UX + DM Curriculum</p>
                          <p className="text-xs text-muted-foreground">Full design, branding & marketing training</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <Code className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="font-semibold text-foreground text-sm">4 Real-World Projects</p>
                          <p className="text-xs text-muted-foreground">Major design & marketing projects</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <TrendingUp className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="font-semibold text-foreground text-sm">Social Media Branding Pack</p>
                          <p className="text-xs text-muted-foreground">Complete brand identity creation</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <Globe className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="font-semibold text-foreground text-sm">Portfolio Website</p>
                          <p className="text-xs text-muted-foreground">Hosted professional portfolio</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <Target className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="font-semibold text-foreground text-sm">Job Portal Optimization</p>
                          <p className="text-xs text-muted-foreground">Resume + portfolio guidance, mock interviews</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <Users className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="font-semibold text-foreground text-sm">Weekly Live Doubt Clearing</p>
                          <p className="text-xs text-muted-foreground">Get instant help from expert instructors</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <BarChart3 className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="font-semibold text-foreground text-sm">Social Media Case Studies</p>
                          <p className="text-xs text-muted-foreground">Real marketing campaign analysis</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <Award className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="font-semibold text-foreground text-sm">Course Completion Certificate</p>
                          <p className="text-xs text-muted-foreground">Recognized industry certificate</p>
                        </div>
                      </div>
                    </div>
                    <div className="pt-4 border-t border-blue-500/20">
                      <p className="text-xs text-muted-foreground text-center mb-3">Starting from ₹12,999</p>
                      <button className="w-full py-2 rounded-lg bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold hover:from-blue-600 hover:to-cyan-600 transition-all shadow-lg">
                        Explore Professional Path
                      </button>
                    </div>
                  </GlassCard>
                </motion.div>

                {/* Mastery Program */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                >
                  <GlassCard className="p-6 border-2 border-orange-500/30 bg-gradient-to-br from-orange-500/5 to-red-500/5 h-full hover:scale-105 transition-transform duration-300">
                    <div className="mb-4">
                      <div className="flex items-center justify-between mb-3">
                        <span className="px-3 py-1 rounded-full bg-orange-500 text-white text-xs font-semibold">⭐⭐⭐ MASTERY</span>
                        <span className="text-xs text-muted-foreground">9 Months • 230 Live Classes</span>
                      </div>
                      <div className="mb-3 p-2 bg-orange-500/10 rounded-lg border border-orange-500/20">
                        <p className="text-xs font-semibold text-foreground mb-1">📅 Live Class Schedule</p>
                        <p className="text-xs text-muted-foreground">6-7 live classes per week → 230 live classes</p>
                      </div>
                      <p className="text-sm text-muted-foreground mb-4">Best For: Serious designers & freelancers</p>
                    </div>
                    <div className="space-y-3 mb-6">
                      <div className="flex items-start gap-2">
                        <Laptop className="h-5 w-5 text-orange-500 flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="font-semibold text-foreground text-sm">Everything in Professional PLUS:</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <Palette className="h-5 w-5 text-orange-500 flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="font-semibold text-foreground text-sm">Full Design Portfolio (10–12 screens)</p>
                          <p className="text-xs text-muted-foreground">Complete portfolio showcasing your best work</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <Users className="h-5 w-5 text-orange-500 flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="font-semibold text-foreground text-sm">1-on-1 Portfolio Mentoring</p>
                          <p className="text-xs text-muted-foreground">Personalized guidance from design experts</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <Sparkles className="h-5 w-5 text-orange-500 flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="font-semibold text-foreground text-sm">Brand Identity Creation</p>
                          <p className="text-xs text-muted-foreground">Complete brand kit with logo, colors, typography</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <Briefcase className="h-5 w-5 text-orange-500 flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="font-semibold text-foreground text-sm">Freelancing Mastery</p>
                          <p className="text-xs text-muted-foreground">Client management, proposals, pricing strategies</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <Code className="h-5 w-5 text-orange-500 flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="font-semibold text-foreground text-sm">Client Project Simulation</p>
                          <p className="text-xs text-muted-foreground">Real-world client project experience</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <Zap className="h-5 w-5 text-orange-500 flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="font-semibold text-foreground text-sm">Priority Support</p>
                          <p className="text-xs text-muted-foreground">Fast-track support for all questions</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <Award className="h-5 w-5 text-orange-500 flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="font-semibold text-foreground text-sm">Internship Letter</p>
                          <p className="text-xs text-muted-foreground">Professional experience certificate</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <Rocket className="h-5 w-5 text-orange-500 flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="font-semibold text-foreground text-sm">Career Ecosystem Access</p>
                          <p className="text-xs text-muted-foreground">Pre-placement evaluation & job connections</p>
                        </div>
                      </div>
                    </div>
                    <div className="pt-4 border-t border-orange-500/20">
                      <p className="text-xs text-muted-foreground text-center mb-3">Starting from ₹24,999</p>
                      <button className="w-full py-2 rounded-lg bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold hover:from-orange-600 hover:to-red-600 transition-all shadow-lg">
                        Explore Mastery Path
                      </button>
                    </div>
                  </GlassCard>
                </motion.div>
              </div>
            </div>

            {/* Detailed Course Information - Expandable Section */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="mt-8"
            >
              <GlassCard className="p-8 overflow-hidden">
                <div className="relative h-64 w-full rounded-xl overflow-hidden mb-8">
                  <Image
                    src="/assest/designing.jpg"
                    alt="UI/UX + Digital Marketing + AI Tools"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 100vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                  <div className="absolute bottom-6 left-6 right-6 text-white">
                    <h4 className="text-2xl font-bold mb-2">UI/UX + Digital Marketing + AI Tools Program</h4>
                    <p className="text-blue-200">Blend design, branding, marketing, and AI automation for creative & marketing careers</p>
                  </div>
                </div>

                {/* Course Overview */}
                <motion.div
                  className="mb-6"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                >
                  <button
                    onClick={() => toggleSection('course4-overview')}
                    className="w-full flex items-center justify-between p-4 rounded-xl bg-gradient-to-r from-pink-500/10 to-rose-500/10 hover:from-pink-500/20 hover:to-rose-500/20 transition-all mb-4"
                  >
                    <div className="flex items-center gap-3">
                      <Star className="h-5 w-5 text-pink-500" />
                      <h4 className="text-xl font-bold font-heading">Course Overview</h4>
                    </div>
                    <ChevronDown
                      className={`h-5 w-5 transition-transform duration-300 ${expandedSections['course4-overview'] ? 'rotate-180' : ''}`}
                    />
                  </button>
                  <AnimatePresence>
                    {expandedSections['course4-overview'] && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="p-6 bg-secondary/50 rounded-xl space-y-4">
                          <p className="text-muted-foreground leading-relaxed">
                            This program blends <strong>design, branding, marketing, and AI automation</strong>, preparing you for high-impact roles in creative & marketing industries.
                          </p>
                          <p className="text-muted-foreground font-semibold text-foreground mb-3">You will master:</p>
                          <ul className="grid md:grid-cols-2 gap-3 list-disc list-inside text-muted-foreground">
                            <li>UI/UX Design (Figma)</li>
                            <li>Branding & Visual Identity</li>
                            <li>Digital Marketing Strategy</li>
                            <li>Ads (Google + Meta)</li>
                            <li>AI Tools for Automation</li>
                            <li>Portfolio Case Studies</li>
                          </ul>
                          <p className="text-muted-foreground font-semibold text-foreground mt-4">
                            Perfect for students looking for creative + tech careers.
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>

                {/* Who Is This Program For */}
                <motion.div
                  className="mb-6"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 }}
                >
                  <button
                    onClick={() => toggleSection('course4-who')}
                    className="w-full flex items-center justify-between p-4 rounded-xl bg-gradient-to-r from-rose-500/10 to-pink-500/10 hover:from-rose-500/20 hover:to-pink-500/20 transition-all mb-4"
                  >
                    <div className="flex items-center gap-3">
                      <UserCheck className="h-5 w-5 text-rose-500" />
                      <h4 className="text-xl font-bold font-heading">Who Is This Program For?</h4>
                    </div>
                    <ChevronDown
                      className={`h-5 w-5 transition-transform duration-300 ${expandedSections['course4-who'] ? 'rotate-180' : ''}`}
                    />
                  </button>
                  <AnimatePresence>
                    {expandedSections['course4-who'] && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="p-6 bg-secondary/50 rounded-xl">
                          <p className="text-muted-foreground mb-4">Perfect for:</p>
                          <div className="grid md:grid-cols-2 gap-3">
                            {[
                              'School graduates, degree students',
                              'Creatives and beginners',
                              'Fresher designers',
                              'Marketing aspirants',
                              'Freelancers',
                              'Anyone who wants to build a design or marketing career'
                            ].map((item, idx) => (
                              <div key={idx} className="flex items-start gap-2">
                                <CheckCircle className="h-5 w-5 text-rose-500 flex-shrink-0 mt-0.5" />
                                <span className="text-muted-foreground">{item}</span>
                              </div>
                            ))}
                          </div>
                          <p className="text-muted-foreground mt-4 font-semibold text-foreground">
                            ✅ No experience needed.
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>

                {/* What You Will Learn */}
                <motion.div
                  className="mb-6"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                >
                  <button
                    onClick={() => toggleSection('course4-learn')}
                    className="w-full flex items-center justify-between p-4 rounded-xl bg-gradient-to-r from-pink-500/10 to-purple-500/10 hover:from-pink-500/20 hover:to-purple-500/20 transition-all mb-4"
                  >
                    <div className="flex items-center gap-3">
                      <BookOpen className="h-5 w-5 text-pink-500" />
                      <h4 className="text-xl font-bold font-heading">What You Will Learn</h4>
                    </div>
                    <ChevronDown
                      className={`h-5 w-5 transition-transform duration-300 ${expandedSections['course4-learn'] ? 'rotate-180' : ''}`}
                    />
                  </button>
                  <AnimatePresence>
                    {expandedSections['course4-learn'] && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="p-6 bg-secondary/50 rounded-xl space-y-6">
                          <div>
                            <h5 className="font-bold text-foreground mb-3 flex items-center gap-2">
                              <Palette className="h-4 w-4 text-pink-500" />
                              UI/UX Design
                            </h5>
                            <div className="grid md:grid-cols-2 gap-2 text-muted-foreground">
                              {['Figma', 'Wireframes', 'Components', 'User research', 'UI design', 'Prototyping'].map((skill, idx) => (
                                <div key={idx} className="flex items-center gap-2">
                                  <CheckCircle className="h-4 w-4 text-pink-500 flex-shrink-0" />
                                  <span>{skill}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                          <div>
                            <h5 className="font-bold text-foreground mb-3 flex items-center gap-2">
                              <Sparkles className="h-4 w-4 text-purple-500" />
                              Branding
                            </h5>
                            <div className="grid md:grid-cols-2 gap-2 text-muted-foreground">
                              {['Typography', 'Color psychology', 'Logo & identity creation', 'Style guides'].map((skill, idx) => (
                                <div key={idx} className="flex items-center gap-2">
                                  <CheckCircle className="h-4 w-4 text-purple-500 flex-shrink-0" />
                                  <span>{skill}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                          <div>
                            <h5 className="font-bold text-foreground mb-3 flex items-center gap-2">
                              <TrendingUp className="h-4 w-4 text-blue-500" />
                              Digital Marketing
                            </h5>
                            <div className="grid md:grid-cols-2 gap-2 text-muted-foreground">
                              {['Social media strategy', 'Google Ads + Meta Ads', 'Content creation', 'Marketing funnels'].map((skill, idx) => (
                                <div key={idx} className="flex items-center gap-2">
                                  <CheckCircle className="h-4 w-4 text-blue-500 flex-shrink-0" />
                                  <span>{skill}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                          <div>
                            <h5 className="font-bold text-foreground mb-3 flex items-center gap-2">
                              <Brain className="h-4 w-4 text-cyan-500" />
                              AI Tools
                            </h5>
                            <div className="grid md:grid-cols-2 gap-2 text-muted-foreground">
                              {['AI design', 'AI content automation', 'AI analytics'].map((skill, idx) => (
                                <div key={idx} className="flex items-center gap-2">
                                  <CheckCircle className="h-4 w-4 text-cyan-500 flex-shrink-0" />
                                  <span>{skill}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                          <div>
                            <h5 className="font-bold text-foreground mb-3 flex items-center gap-2">
                              <Target className="h-4 w-4 text-orange-500" />
                              Professional Skills
                            </h5>
                            <div className="grid md:grid-cols-2 gap-2 text-muted-foreground">
                              {['Case study writing', 'Client communication', 'Freelancing fundamentals'].map((skill, idx) => (
                                <div key={idx} className="flex items-center gap-2">
                                  <CheckCircle className="h-4 w-4 text-orange-500 flex-shrink-0" />
                                  <span>{skill}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>

                {/* What You Will Build */}
                <motion.div
                  className="mb-6"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                >
                  <button
                    onClick={() => toggleSection('course4-build')}
                    className="w-full flex items-center justify-between p-4 rounded-xl bg-gradient-to-r from-green-500/10 to-emerald-500/10 hover:from-green-500/20 hover:to-emerald-500/20 transition-all mb-4"
                  >
                    <div className="flex items-center gap-3">
                      <Rocket className="h-5 w-5 text-green-500" />
                      <h4 className="text-xl font-bold font-heading">What You Will Build</h4>
                    </div>
                    <ChevronDown
                      className={`h-5 w-5 transition-transform duration-300 ${expandedSections['course4-build'] ? 'rotate-180' : ''}`}
                    />
                  </button>
                  <AnimatePresence>
                    {expandedSections['course4-build'] && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="p-6 bg-secondary/50 rounded-xl">
                          <p className="text-muted-foreground mb-4">You will build comprehensive design and marketing projects, including:</p>
                          <div className="grid md:grid-cols-2 gap-3">
                            {[
                              'Mobile app UI',
                              'Website UI',
                              'Landing pages',
                              'Logo + brand kit',
                              'Social media campaigns',
                              'Marketing strategy document',
                              'Client project simulation',
                              'Design portfolio website'
                            ].map((project, idx) => (
                              <div key={idx} className="flex items-start gap-2">
                                <span className="text-green-500 font-bold">🔹</span>
                                <span className="text-muted-foreground">{project}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>

                {/* Career Services */}
                <motion.div
                  className="mb-6"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 }}
                >
                  <button
                    onClick={() => toggleSection('course4-career')}
                    className="w-full flex items-center justify-between p-4 rounded-xl bg-gradient-to-r from-orange-500/10 to-red-500/10 hover:from-orange-500/20 hover:to-red-500/20 transition-all mb-4"
                  >
                    <div className="flex items-center gap-3">
                      <Briefcase className="h-5 w-5 text-orange-500" />
                      <h4 className="text-xl font-bold font-heading">Career Services Included</h4>
                    </div>
                    <ChevronDown
                      className={`h-5 w-5 transition-transform duration-300 ${expandedSections['course4-career'] ? 'rotate-180' : ''}`}
                    />
                  </button>
                  <AnimatePresence>
                    {expandedSections['course4-career'] && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="p-6 bg-secondary/50 rounded-xl">
                          <p className="text-muted-foreground mb-4 font-semibold text-foreground">
                            Every CodeKids student receives:
                          </p>
                          <div className="grid md:grid-cols-2 gap-3 mb-4">
                            {[
                              'Resume created for you',
                              'Hosted portfolio website',
                              'LinkedIn optimization',
                              'GitHub optimization',
                              'Job portal setup (Naukri, Foundit, Indeed…)',
                              'Professional intro video',
                              'HR + Technical interview prep',
                              'Soft skills training',
                              'Career roadmap'
                            ].map((service, idx) => (
                              <div key={idx} className="flex items-center gap-2">
                                <CheckCircle className="h-4 w-4 text-orange-500 flex-shrink-0" />
                                <span className="text-muted-foreground">{service}</span>
                              </div>
                            ))}
                          </div>
                          <div className="p-4 bg-orange-500/10 rounded-lg border border-orange-500/20">
                            <p className="font-semibold text-foreground mb-2">Mastery Program adds:</p>
                            <div className="space-y-2">
                              {['Full design portfolio (10–12 screens)', '1-on-1 portfolio mentoring', 'Freelancing mastery', 'Career ecosystem access'].map((item, idx) => (
                                <div key={idx} className="flex items-center gap-2">
                                  <Star className="h-4 w-4 text-orange-500 flex-shrink-0" />
                                  <span className="text-muted-foreground">{item}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>

                {/* Career Outcomes */}
                <motion.div
                  className="mb-6"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 }}
                >
                  <button
                    onClick={() => toggleSection('course4-outcomes')}
                    className="w-full flex items-center justify-between p-4 rounded-xl bg-gradient-to-r from-rose-500/10 to-pink-500/10 hover:from-rose-500/20 hover:to-pink-500/20 transition-all mb-4"
                  >
                    <div className="flex items-center gap-3">
                      <TrendingUp className="h-5 w-5 text-rose-500" />
                      <h4 className="text-xl font-bold font-heading">Career Outcomes</h4>
                    </div>
                    <ChevronDown
                      className={`h-5 w-5 transition-transform duration-300 ${expandedSections['course4-outcomes'] ? 'rotate-180' : ''}`}
                    />
                  </button>
                  <AnimatePresence>
                    {expandedSections['course4-outcomes'] && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="p-6 bg-secondary/50 rounded-xl">
                          <p className="text-muted-foreground mb-4">After completing this program, you can become:</p>
                          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
                            {[
                              'UI/UX Designer',
                              'Graphic Designer',
                              'Digital Marketer',
                              'Brand Strategist',
                              'Social Media Manager',
                              'Freelancer / Agency owner'
                            ].map((role, idx) => (
                              <div key={idx} className="flex items-center gap-2 p-3 rounded-lg bg-rose-500/5 border border-rose-500/10">
                                <ArrowRight className="h-4 w-4 text-rose-500 flex-shrink-0" />
                                <span className="text-muted-foreground font-medium">{role}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              </GlassCard>
            </motion.div>
          </motion.div>
        </div>
      </section>

        {/* Existing Tracks Section */}
        <section className="py-20 bg-gradient-to-b from-transparent to-secondary/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-foreground text-4xl md:text-5xl font-bold mb-4 font-heading">
                Choose Your <span className="bg-gradient-to-r from-[#FF4B8F] via-[#7B3DFF] to-[#2ED0FF] bg-clip-text text-transparent">Single Tech Track</span>
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Individual courses for focused learning (Best for slow learners or deep specialization)
              </p>
            </motion.div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {tracks.map((track, index) => (
                <motion.div
                  key={track.name}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="group"
                >
                  <GlassCard className="h-full overflow-hidden hover:scale-105 transition-transform duration-300">
                    <div className="relative h-48 overflow-hidden">
                      <Image
                        src={track.image}
                        alt={track.name}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className={`absolute inset-0 bg-gradient-to-t ${track.color} opacity-60 group-hover:opacity-80 transition-opacity`} />
                      <div className={`h-14 w-14 rounded-xl bg-gradient-to-br ${track.color} flex items-center justify-center absolute top-4 right-4 shadow-lg`}>
                        <track.icon className="h-7 w-7 text-white" />
                      </div>
                    </div>
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="text-xl font-bold font-heading">{track.name}</h3>
                        <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold">
                          {track.duration}
                        </span>
                      </div>
                      <p className="text-muted-foreground mb-4 text-sm leading-relaxed">{track.description}</p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {track.skills.map((skill, i) => (
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
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 bg-gradient-to-b from-transparent to-secondary/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="text-foreground text-4xl md:text-5xl font-bold mb-6 font-heading">
                  Everything You Need to{' '}
                  <span className="bg-gradient-to-r from-[#FF4B8F] via-[#7B3DFF] to-[#2ED0FF] bg-clip-text text-transparent">Succeed</span>
                </h2>
                <p className="text-lg text-muted-foreground mb-8">
                  We don&apos;t just teach technology. We prepare you for your career with comprehensive support at every step.
                </p>
                <div className="grid sm:grid-cols-2 gap-6">
                  {features.map((feature, index) => (
                    <motion.div
                      key={feature.title}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      className="p-4 rounded-xl bg-secondary/50 hover:bg-secondary transition-colors group"
                    >
                      <feature.icon className="h-8 w-8 text-primary mb-3 group-hover:scale-110 transition-transform" />
                      <h4 className="font-semibold mb-1">{feature.title}</h4>
                      <p className="text-sm text-muted-foreground">{feature.description}</p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className="relative h-96 rounded-2xl overflow-hidden group">
                  <Image
                    src="/assest/students learning.jpg"
                    alt="Learning experience"
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-purple-900/60 to-transparent" />
                </div>
                <GlassCard className="p-8 mt-8">
                  <div className="grid grid-cols-2 gap-6">
                    {[
                      { label: 'Live Classes', value: '500+ hrs' },
                      { label: 'Projects', value: '10+' },
                      { label: 'Certifications', value: '6+' },
                      { label: 'Placement Support', value: '100%' },
                    ].map((stat) => (
                      <div key={stat.label} className="text-center">
                        <div className="text-3xl font-bold bg-gradient-to-r from-[#FF4B8F] via-[#7B3DFF] to-[#2ED0FF] bg-clip-text text-transparent mb-2">
                          {stat.value}
                        </div>
                        <div className="text-sm text-muted-foreground">{stat.label}</div>
                      </div>
                    ))}
                  </div>
                </GlassCard>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Internships Carousel */}
        <section id="internships" className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-foreground text-4xl md:text-5xl font-bold mb-4 font-heading">
                Internship <span className="bg-gradient-to-r from-[#FF4B8F] via-[#7B3DFF] to-[#2ED0FF] bg-clip-text text-transparent">Opportunities</span>
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Real-world experience with top companies during your program
              </p>
            </motion.div>

            <Carousel opts={{ align: 'start', loop: true }} className="w-full">
              <CarouselContent className="-ml-2 md:-ml-4">
                {internships.map((internship, index) => (
                  <CarouselItem key={index} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      className="group"
                    >
                      <GlassCard className="h-full overflow-hidden hover:scale-105 transition-transform duration-300">
                        <div className="relative h-48 overflow-hidden">
                          <Image
                            src={internship.image}
                            alt={internship.title}
                            fill
                            className="object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                          <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-green-500 text-white text-xs font-semibold">
                            {internship.type}
                          </div>
                          <div className="absolute bottom-4 left-4 right-4 text-white">
                            <h4 className="font-bold text-lg mb-1">{internship.title}</h4>
                            <p className="text-sm text-white/80">{internship.company}</p>
                          </div>
                        </div>
                        <div className="p-6">
                          <div className="flex items-center justify-between mb-3">
                            <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold">
                              {internship.duration}
                            </span>
                            <Calendar className="h-5 w-5 text-muted-foreground" />
                          </div>
                          <p className="text-muted-foreground text-sm leading-relaxed">{internship.description}</p>
                          <Link
                            to="/contact?type=internship"
                            className="mt-4 w-full py-2 rounded-lg bg-gradient-to-r from-primary/10 to-accent/10 text-primary font-semibold hover:from-primary/20 hover:to-accent/20 transition-all inline-flex items-center justify-center"
                          >
                            Apply Now
                          </Link>
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

        {/* Projects Showcase */}
        <section id="projects" className="py-20 bg-gradient-to-b from-transparent to-secondary/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-foreground text-4xl md:text-5xl font-bold mb-4 font-heading">
                Student <span className="bg-gradient-to-r from-[#FF4B8F] via-[#7B3DFF] to-[#2ED0FF] bg-clip-text text-transparent">Projects</span>
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Real projects built by our students that showcase their skills
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-8">
              {projects.map((project, index) => (
                <motion.div
                  key={project.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="group"
                >
                  <GlassCard className="overflow-hidden hover:scale-105 transition-transform duration-300">
                    <div className="relative h-64 overflow-hidden">
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                      <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-purple-500 text-white text-xs font-semibold">
                        {project.tech}
                      </div>
                      <div className="absolute bottom-4 left-4 right-4 text-white">
                        <h4 className="font-bold text-xl mb-2">{project.title}</h4>
                        <p className="text-sm text-white/90">{project.description}</p>
                      </div>
                    </div>
                    <div className="p-6">
                      <Link
                        to={project.github}
                        className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-semibold transition-colors"
                      >
                        View on GitHub
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    </div>
                  </GlassCard>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section id="faq" className="py-20 bg-gradient-to-b from-transparent via-secondary/10 to-transparent">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-4 font-heading">
                <span className="bg-gradient-to-r from-[#FF4B8F] via-[#7B3DFF] to-[#2ED0FF] bg-clip-text text-transparent">
                  Frequently Asked Questions
                </span>
              </h2>
              <p className="text-muted-foreground text-lg">
                Everything you need to know about CodeKids_Pro programs
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Accordion type="single" collapsible className="space-y-4">
                {faqs.map((faq, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <AccordionItem
                      value={`item-${index}`}
                      className="glass-card border-2 border-border/50 hover:border-primary/30 rounded-xl overflow-hidden transition-all duration-300"
                    >
                      <AccordionTrigger className="px-6 py-4 text-left font-semibold text-foreground hover:text-primary transition-colors">
                        {faq.q}
                      </AccordionTrigger>
                      <AccordionContent className="px-6 pb-4 text-muted-foreground leading-relaxed">
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          {faq.a}
                        </motion.div>
                      </AccordionContent>
                    </AccordionItem>
                  </motion.div>
                ))}
              </Accordion>
            </motion.div>

            {/* Contact CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-12 text-center"
            >
              <p className="text-muted-foreground mb-4">
                Still have questions? We're here to help!
              </p>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-[#FF4B8F] via-[#7B3DFF] to-[#2ED0FF] text-white font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all"
              >
                Contact Us
                <ArrowRight className="h-4 w-4" />
              </Link>
            </motion.div>
          </div>
        </section>

        {/* Application Form */}
        <section id="pro-apply-form" className="py-20">
          <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <GlassCard className="p-8">
                <h2 className="text-foreground text-3xl font-bold mb-2 font-heading text-center">
                  Apply for <span className="bg-gradient-to-r from-[#FF4B8F] via-[#7B3DFF] to-[#2ED0FF] bg-clip-text text-transparent">CodeKids_Pro</span>
                </h2>
                <p className="text-muted-foreground text-center mb-8">
                  Start your journey to a successful tech career
                </p>

                <form className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium mb-2">Full Name *</label>
                      <input
                        type="text"
                        className="w-full px-4 py-3 rounded-lg bg-secondary border border-border focus:outline-none focus:ring-2 focus:ring-primary"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Age *</label>
                      <input
                        type="number"
                        min="18"
                        max="26"
                        className="w-full px-4 py-3 rounded-lg bg-secondary border border-border focus:outline-none focus:ring-2 focus:ring-primary"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium mb-2">Email *</label>
                      <input
                        type="email"
                        className="w-full px-4 py-3 rounded-lg bg-secondary border border-border focus:outline-none focus:ring-2 focus:ring-primary"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Phone *</label>
                      <input
                        type="tel"
                        className="w-full px-4 py-3 rounded-lg bg-secondary border border-border focus:outline-none focus:ring-2 focus:ring-primary"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Preferred Track *</label>
                    <select className="w-full px-4 py-3 rounded-lg bg-secondary border border-border focus:outline-none focus:ring-2 focus:ring-primary">
                      <option>Select a track</option>
                      {tracks.map((track) => (
                        <option key={track.name}>{track.name}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Tell us about your goals</label>
                    <textarea
                      rows={4}
                      className="w-full px-4 py-3 rounded-lg bg-secondary border border-border focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="What do you hope to achieve with this program?"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 rounded-full bg-gradient-to-r from-[#FF4B8F] via-[#7B3DFF] to-[#2ED0FF] text-white font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all"
                  >
                    Submit Application
                  </button>
                </form>
              </GlassCard>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
}