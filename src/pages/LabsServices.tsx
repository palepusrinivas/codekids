import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Cpu, Zap, Brain, Cog, Settings, Wrench, Users, GraduationCap,
  ChevronLeft, ChevronRight, Award, CheckCircle, ArrowRight,
  Shield, BookOpen, Code, TrendingUp, PlayCircle,
  Sparkles, Building2
} from 'lucide-react';
import Image from '@/components/Image';
import { GlassCard } from '@/components/ui/glass-card';

const heroCarousel = [
  {
    title: 'Robotics Lab',
    description: 'Complete robotics setup with kits and equipment',
    image: '/assest/kids robotics.jpg',
  },
  {
    title: 'AI & ML Lab',
    description: 'Advanced AI and machine learning facilities',
    image: '/assest/ai.jpg',
  },
  {
    title: 'Drone Lab',
    description: 'Professional drone racing and programming setup',
    image: '/assest/drone.jpg',
  },
];

const labs = [
  {
    name: 'Robotics Lab',
    icon: Cpu,
    description: 'Complete robotics setup with kits and equipment for hands-on learning',
    image: '/assest/kids robotics.jpg',
    color: 'from-blue-500 to-cyan-500',
    features: ['Arduino kits', 'Sensors & actuators', 'Mechanical parts', 'Programming software'],
    equipment: ['Arduino boards', 'Motors & servos', 'Sensors', '3D printed parts'],
  },
  {
    name: 'AI & ML Lab',
    icon: Brain,
    description: 'Advanced AI and machine learning facilities for data science projects',
    image: '/assest/ai.jpg',
    color: 'from-purple-500 to-pink-500',
    features: ['GPU workstations', 'ML frameworks', 'Datasets', 'Cloud access'],
    equipment: ['NVIDIA GPUs', 'Python tools', 'Jupyter notebooks', 'Cloud platforms'],
  },
  {
    name: 'Drone Lab',
    icon: Zap,
    description: 'Professional drone racing and programming setup with obstacle courses',
    image: '/assest/drone.jpg',
    color: 'from-cyan-500 to-blue-500',
    features: ['Racing drones', 'Programming tools', 'Obstacle courses', 'Flight simulators'],
    equipment: ['Quadcopters', 'Flight controllers', 'Cameras', 'FPV goggles'],
  },
  {
    name: 'Maker Space',
    icon: Cog,
    description: '3D printers, IoT kits, and innovation space for creative projects',
    image: '/assest/learning.jpg',
    color: 'from-green-500 to-emerald-500',
    features: ['3D printers', 'IoT kits', 'Electronics', 'Prototyping tools'],
    equipment: ['3D printers', 'Raspberry Pi', 'Arduino IoT', 'Soldering stations'],
  },
  {
    name: 'Coding Lab',
    icon: Code,
    description: 'Modern development environment with latest tools and frameworks',
    image: '/assest/coding.jpg',
    color: 'from-indigo-500 to-purple-500',
    features: ['Laptops & workstations', 'IDE software', 'Version control', 'Cloud tools'],
    equipment: ['Development PCs', 'IDEs', 'Git repositories', 'Cloud access'],
  },
  {
    name: 'Electronics Lab',
    icon: Settings,
    description: 'Complete electronics testing and prototyping facility',
    image: '/assest/preparation.jpg',
    color: 'from-orange-500 to-red-500',
    features: ['Oscilloscopes', 'Multimeters', 'Power supplies', 'Component library'],
    equipment: ['Test equipment', 'Soldering tools', 'Breadboards', 'Components'],
  },
];

const services = [
  {
    title: 'Lab Setup & Installation',
    description: 'Complete STEM lab setup with all equipment and infrastructure',
    icon: Wrench,
    image: '/assest/kids robotics.jpg',
    features: ['Equipment procurement', 'Installation & setup', 'Safety protocols', 'Training support'],
    color: 'from-blue-500 to-cyan-500',
  },
  {
    title: 'Teacher Training',
    description: 'Comprehensive training programs for educators to teach STEM effectively',
    icon: GraduationCap,
    image: '/assest/learning.jpg',
    features: ['Workshop sessions', 'Curriculum training', 'Hands-on practice', 'Ongoing support'],
    color: 'from-purple-500 to-pink-500',
  },
  {
    title: 'Curriculum Development',
    description: 'Customized curriculum aligned with school requirements and standards',
    icon: BookOpen,
    image: '/assest/coding.jpg',
    features: ['Age-appropriate content', 'Grade-wise modules', 'Assessment tools', 'Progress tracking'],
    color: 'from-green-500 to-emerald-500',
  },
  {
    title: 'Maintenance & Support',
    description: 'Regular maintenance and technical support for all lab equipment',
    icon: Shield,
    image: '/assest/ai.jpg',
    features: ['Regular servicing', 'Repair & replacement', 'Technical support', 'Software updates'],
    color: 'from-orange-500 to-red-500',
  },
];

const showcaseImages = [
  {
    title: 'Robotics Workshop',
    image: '/assest/kids robotics.jpg',
    description: 'Students building robots in our robotics lab',
  },
  {
    title: 'AI Lab Session',
    image: '/assest/ai tools learning.jpg',
    description: 'Hands-on AI and machine learning training',
  },
  {
    title: 'Drone Programming',
    image: '/assest/drone tech.jpg',
    description: 'Students programming drones for competitions',
  },
  {
    title: '3D Printing & Innovation',
    image: '/assest/learning.jpg',
    description: 'Creating prototypes with 3D printing technology',
  },
  {
    title: 'Coding Session',
    image: '/assest/coding.jpg',
    description: 'Learning programming in our coding lab',
  },
  {
    title: 'Innovation Space',
    image: '/assest/codekids jr projects.jpg',
    description: 'Students working on innovative projects',
  },
  {
    title: 'Online Learning',
    image: '/assest/online classes (2).jpg',
    description: 'Flexible online classes with interactive sessions',
  },
  {
    title: 'Collaborative Learning',
    image: '/assest/students learning.jpg',
    description: 'Team-based learning and project collaboration',
  },
];

const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 }
};

export default function LabsServicesPage() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroCarousel.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

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
        <title>Labs & Services | Complete STEM Lab Solutions | CodeKids Technologies</title>
        <meta name="description" content="CodeKids Technologies provides complete STEM lab setup, equipment, curriculum, and teacher training for schools. Robotics labs, AI labs, drone labs, and maker spaces." />
        <meta name="keywords" content="STEM lab setup, robotics lab, AI lab, drone lab, teacher training, curriculum development, school lab installation, STEM equipment" />
      </Helmet>
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
                className="object-cover"
                sizes="100vw"
                style={{ zIndex: 0 }}
              />
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/60 via-purple-900/60 to-pink-900/60 dark:from-indigo-950/70 dark:via-purple-950/70 dark:to-pink-950/70 z-10" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-10" />
              <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzBoLTJWMGgyeiIvPjwvZz48L2c+PC9zdmc+')] opacity-15 z-10" />
            </motion.div>
          </AnimatePresence>

          <div className="relative z-20 h-full flex items-center py-8 sm:py-12 md:py-0">
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
                  className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-white/20 backdrop-blur-sm mb-4 sm:mb-6 border border-white/30"
                >
                  <Settings className="h-3 w-3 sm:h-4 sm:w-4" />
                  <span className="text-xs sm:text-sm font-medium">Complete STEM Lab Solutions</span>
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
                    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 sm:mb-6 font-heading leading-tight">
                      <span className="bg-gradient-to-r from-cyan-300 via-purple-300 to-pink-300 bg-clip-text text-transparent">
                        STEM Labs & Services
                      </span>
                    </h1>
                    <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-white/90 mb-6 sm:mb-8 leading-relaxed max-w-3xl mx-auto px-4">
                      {heroCarousel[currentSlide].description}
                    </p>
                  </motion.div>
                </AnimatePresence>

                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
                  <Link
                    to="#contact"
                    onClick={(e) => handleAnchorClick(e, '#contact')}
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 sm:px-8 sm:py-4 rounded-full bg-gradient-to-r from-[#FF4B8F] via-[#7B3DFF] to-[#2ED0FF] text-white font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all text-sm sm:text-base w-full sm:w-auto"
                  >
                    <Settings className="h-4 w-4 sm:h-5 sm:w-5" />
                    Request Lab Setup
                  </Link>
                  <Link
                    to="#showcase"
                    onClick={(e) => handleAnchorClick(e, '#showcase')}
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 sm:px-8 sm:py-4 rounded-full border-2 border-white text-white font-semibold hover:bg-white hover:text-purple-900 transition-all text-sm sm:text-base w-full sm:w-auto"
                  >
                    <PlayCircle className="h-4 w-4 sm:h-5 sm:w-5" />
                    View Lab Tour
                  </Link>
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

        {/* Overview Section */}
        <section className="py-12 sm:py-16 md:py-20 bg-gradient-to-b from-transparent via-purple-50/30 dark:via-purple-950/20 to-transparent">
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
                <span className="text-sm font-semibold text-primary">Complete Solutions</span>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 font-heading">
                <span className="bg-gradient-to-r from-[#FF4B8F] via-[#7B3DFF] to-[#2ED0FF] bg-clip-text text-transparent">
                  Transform Your School into a Tech Hub
                </span>
              </h2>
              <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed px-4">
                We provide complete STEM lab setup, equipment, curriculum, and teacher training to make your school future-ready
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
              {[
                {
                  icon: Building2,
                  title: 'Lab Setup',
                  description: 'Complete infrastructure and equipment installation',
                  color: 'from-blue-500 to-cyan-500',
                },
                {
                  icon: GraduationCap,
                  title: 'Teacher Training',
                  description: 'Comprehensive training programs for educators',
                  color: 'from-purple-500 to-pink-500',
                },
                {
                  icon: BookOpen,
                  title: 'Curriculum',
                  description: 'Age-appropriate, NEP-aligned curriculum',
                  color: 'from-pink-500 to-rose-500',
                },
              ].map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="group"
                >
                  <GlassCard className={`p-5 sm:p-6 h-full hover:scale-105 transition-all duration-300 bg-gradient-to-br from-secondary/50 to-secondary/30 border-2 border-transparent hover:border-primary/30`}>
                    <div className={`h-12 w-12 sm:h-14 sm:w-14 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform`}>
                      <item.icon className="h-6 w-6 sm:h-7 sm:w-7 text-white" />
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3 font-heading text-foreground">{item.title}</h3>
                    <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">{item.description}</p>
                  </GlassCard>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Labs Section */}
        <section className="py-12 sm:py-16 md:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              {...fadeInUp}
              className="text-center mb-12 sm:mb-16"
            >
              <h2 className="text-foreground text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4 font-heading">
                Our <span className="bg-gradient-to-r from-[#FF4B8F] via-[#7B3DFF] to-[#2ED0FF] bg-clip-text text-transparent">Labs</span>
              </h2>
              <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto px-4">
                Complete STEM lab setup and teacher training solutions for schools
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {labs.map((lab, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="group h-full"
                >
                  <GlassCard className="overflow-hidden h-full hover:scale-105 transition-transform duration-300 border-2 border-transparent hover:border-primary/30">
                    <div className="relative h-48 sm:h-56 overflow-hidden">
                      <Image
                        src={lab.image}
                        alt={lab.name}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                      <div className={`absolute inset-0 bg-gradient-to-t ${lab.color} opacity-70 group-hover:opacity-80 transition-opacity`} />
                      <div className={`h-12 w-12 sm:h-14 sm:w-14 rounded-xl bg-gradient-to-br ${lab.color} flex items-center justify-center absolute top-3 right-3 sm:top-4 sm:right-4 shadow-lg group-hover:scale-110 transition-transform`}>
                        <lab.icon className="h-6 w-6 sm:h-7 sm:w-7 text-white" />
                      </div>
                      <div className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4 text-white">
                        <h3 className="text-lg sm:text-xl font-bold font-heading mb-1 drop-shadow-lg">{lab.name}</h3>
                      </div>
                    </div>
                    <div className="p-4 sm:p-5 md:p-6">
                      <p className="text-xs sm:text-sm text-muted-foreground mb-4 leading-relaxed">{lab.description}</p>
                      <div className="mb-4">
                        <h4 className="text-xs sm:text-sm font-semibold mb-2 text-foreground">Equipment:</h4>
                        <div className="flex flex-wrap gap-1.5 sm:gap-2">
                          {lab.equipment.slice(0, 3).map((item, i) => (
                            <span key={i} className="px-2 py-1 rounded-md bg-secondary text-xs text-muted-foreground">
                              {item}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="mb-4">
                        <h4 className="text-xs sm:text-sm font-semibold mb-2 text-foreground">Features:</h4>
                        <ul className="space-y-1.5">
                          {lab.features.slice(0, 3).map((feature, i) => (
                            <li key={i} className="flex items-center gap-2 text-xs sm:text-sm text-muted-foreground">
                              <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4 text-primary flex-shrink-0" />
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <Link
                        to="#contact"
                        onClick={(e) => handleAnchorClick(e, '#contact')}
                        className="w-full py-2 sm:py-2.5 rounded-lg bg-gradient-to-r from-primary/10 to-accent/10 text-primary font-semibold hover:from-primary/20 hover:to-accent/20 transition-all inline-flex items-center justify-center text-xs sm:text-sm"
                      >
                        Learn More
                        <ArrowRight className="h-3 w-3 sm:h-4 sm:w-4 ml-2" />
                      </Link>
                    </div>
                  </GlassCard>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section id="teachers" className="py-12 sm:py-16 md:py-20 bg-gradient-to-b from-transparent via-purple-50/30 dark:via-purple-950/20 to-transparent">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              {...fadeInUp}
              className="text-center mb-12 sm:mb-16"
            >
              <h2 className="text-foreground text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4 font-heading">
                Our <span className="bg-gradient-to-r from-[#FF4B8F] via-[#7B3DFF] to-[#2ED0FF] bg-clip-text text-transparent">Services</span>
              </h2>
              <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto px-4">
                Complete solutions for schools to set up and maintain STEM labs
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
              {services.map((service, index) => (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="group"
                >
                  <GlassCard className="overflow-hidden h-full hover:scale-105 transition-transform duration-300 border-2 border-transparent hover:border-primary/30">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 items-center">
                      <div className="relative h-48 sm:h-56 md:h-64 overflow-hidden order-2 md:order-1 rounded-lg">
                        <Image
                          src={service.image}
                          alt={service.title}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-500"
                          sizes="(max-width: 768px) 100vw, 50vw"
                        />
                        <div className={`absolute inset-0 bg-gradient-to-t ${service.color} opacity-60 group-hover:opacity-70 transition-opacity`} />
                      </div>
                      <div className="p-4 sm:p-5 md:p-6 order-1 md:order-2">
                        <div className={`h-12 w-12 sm:h-14 sm:w-14 rounded-xl bg-gradient-to-br ${service.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg`}>
                          <service.icon className="h-6 w-6 sm:h-7 sm:w-7 text-white" />
                        </div>
                        <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3 font-heading text-foreground">{service.title}</h3>
                        <p className="text-xs sm:text-sm text-muted-foreground mb-3 sm:mb-4 leading-relaxed">{service.description}</p>
                        <ul className="space-y-1.5 sm:space-y-2 mb-4">
                          {service.features.map((feature, i) => (
                            <li key={i} className="flex items-center gap-2 text-xs sm:text-sm text-muted-foreground">
                              <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4 text-primary flex-shrink-0" />
                              {feature}
                            </li>
                          ))}
                        </ul>
                        <Link
                          to="#contact"
                          onClick={(e) => handleAnchorClick(e, '#contact')}
                          className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-semibold transition-colors text-xs sm:text-sm"
                        >
                          Learn More
                          <ArrowRight className="h-3 w-3 sm:h-4 sm:w-4" />
                        </Link>
                      </div>
                    </div>
                  </GlassCard>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-12 sm:py-16 md:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12 sm:mb-16"
            >
              <h2 className="text-foreground text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4 font-heading">
                Why Choose <span className="bg-gradient-to-r from-[#FF4B8F] via-[#7B3DFF] to-[#2ED0FF] bg-clip-text text-transparent">Our Labs</span>
              </h2>
              <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto px-4">
                Complete end-to-end solutions for modern STEM education
              </p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {[
                { icon: Award, title: 'Quality Equipment', description: 'Premium kits and tools from trusted brands', color: 'from-blue-500 to-cyan-500' },
                { icon: Users, title: 'Expert Training', description: 'Comprehensive teacher training programs', color: 'from-purple-500 to-pink-500' },
                { icon: Shield, title: 'Ongoing Support', description: 'Regular maintenance and technical support', color: 'from-pink-500 to-rose-500' },
                { icon: TrendingUp, title: 'Proven Results', description: 'Trusted by 100+ schools across India', color: 'from-orange-500 to-red-500' },
              ].map((benefit, index) => (
                <motion.div
                  key={benefit.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="group"
                >
                  <GlassCard className="p-5 sm:p-6 h-full hover:scale-105 transition-transform duration-300 text-center border-2 border-transparent hover:border-primary/30">
                    <div className={`h-12 w-12 sm:h-14 sm:w-14 rounded-xl bg-gradient-to-br ${benefit.color} flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:scale-110 transition-transform`}>
                      <benefit.icon className="h-6 w-6 sm:h-7 sm:w-7 text-white" />
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3 font-heading text-foreground">{benefit.title}</h3>
                    <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">{benefit.description}</p>
                  </GlassCard>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Lab Showcase Gallery */}
        <section id="showcase" className="py-12 sm:py-16 md:py-20 bg-gradient-to-b from-transparent via-purple-50/30 dark:via-purple-950/20 to-transparent">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              {...fadeInUp}
              className="text-center mb-12 sm:mb-16"
            >
              <h2 className="text-foreground text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4 font-heading">
                Lab <span className="bg-gradient-to-r from-[#FF4B8F] via-[#7B3DFF] to-[#2ED0FF] bg-clip-text text-transparent">Showcase</span>
              </h2>
              <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto px-4">
                See our labs in action with real student projects
              </p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {showcaseImages.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="group h-full"
                >
                  <GlassCard className="overflow-hidden h-full hover:scale-105 transition-transform duration-300 border-2 border-transparent hover:border-primary/30">
                    <div className="relative h-48 sm:h-56 md:h-64 overflow-hidden">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                      <div className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4 text-white">
                        <h3 className="text-lg sm:text-xl font-bold font-heading mb-1 drop-shadow-lg">{item.title}</h3>
                        <p className="text-xs sm:text-sm text-white/90 drop-shadow-md">{item.description}</p>
                      </div>
                    </div>
                  </GlassCard>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
