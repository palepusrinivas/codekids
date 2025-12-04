import SEO from '@/components/SEO';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { handleAnchorClick } from '@/lib/smooth-scroll';
import { useState } from 'react';
import {
  Brain, Rocket, Sparkles, CheckCircle, Users, Calendar, Target,
  BookOpen, Code, TrendingUp, Briefcase, Globe,
  MessageSquare, ArrowRight, PlayCircle, Clock,
  Trophy, Shield, Presentation, Star, Award, DollarSign,
  Gift, CreditCard,
  PartyPopper, Medal, Users2, Sparkles as SparklesIcon, X,
  Phone, Mail, User, GraduationCap
} from 'lucide-react';
import { GlassCard } from '@/components/ui/glass-card';
import { generateCourseStructuredData } from '@/lib/seo-utils';
import Image from '@/components/Image';
import { ImageReveal } from '@/components/effects';

const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 }
};


const bootcampFeatures = [
  { icon: PlayCircle, text: 'Live Sessions', color: 'from-blue-500 to-cyan-500' },
  { icon: Users, text: '1:1 Support', color: 'from-purple-500 to-pink-500' },
  { icon: Code, text: 'Hands-On Practice', color: 'from-orange-500 to-red-500' },
  { icon: Rocket, text: 'Real Projects', color: 'from-green-500 to-emerald-500' },
  { icon: Briefcase, text: 'Job Prep', color: 'from-indigo-500 to-blue-500' },
  { icon: TrendingUp, text: 'Personality Growth', color: 'from-pink-500 to-rose-500' },
];

const bootcampStructure = [
  { icon: Calendar, label: '21 Sessions', value: '21', color: 'from-blue-500 to-cyan-500' },
  { icon: Clock, label: '28 Days', value: '28', color: 'from-purple-500 to-pink-500' },
  { icon: PlayCircle, label: 'Live + Mentoring', value: '100%', color: 'from-orange-500 to-red-500' },
  { icon: BookOpen, label: 'Daily Assignments', value: '28', color: 'from-green-500 to-emerald-500' },
  { icon: Globe, label: 'Portfolio Creation', value: '3', color: 'from-indigo-500 to-blue-500' },
  { icon: Users, label: 'Community Learning', value: 'Active', color: 'from-pink-500 to-rose-500' },
];

const phases = [
  {
    id: 'phase1',
    title: 'PHASE 1 — FOUNDATIONS',
    subtitle: 'Day 1–5',
    description: 'Build strong fundamentals, confidence & clarity.',
    color: 'from-blue-500 to-cyan-500',
    sessions: [
      {
        number: 1,
        title: 'Introduction to AI, Career Pathways & Bootcamp Orientation',
        topics: [
          'Roadmap of your next 28 days',
          'AI landscape & opportunities',
          'How to learn fast & stay future-ready',
          'Importance of skill stacking',
          'Setting goals for career transformation',
        ],
      },
      {
        number: 2,
        title: 'Generative AI Foundations (LLMs + NLP + Embeddings)',
        topics: [
          'What GenAI really is',
          'Neural networks explained simply',
          'NLP + LLM synergy',
          'Tokenization, embeddings, sampling',
          'How LLMs think',
        ],
      },
      {
        number: 3,
        title: 'AI & ML Basics for Everyone',
        topics: [
          'Machine learning fundamentals',
          'Model training, evaluation & bias',
          'ML vs LLM vs Diffusion',
          'When to use which model',
        ],
      },
      {
        number: 4,
        title: 'Prompt Engineering & Contextual Engineering',
        topics: [
          'Frameworks for powerful prompting',
          'Multi-step reasoning',
          'Context layering',
          'Persona prompting',
          'SOP-style prompt templates',
          'Prompt libraries for professional work',
        ],
      },
      {
        number: 5,
        title: 'GenAI, Agentic AI & RAG Concepts',
        topics: [
          'What are autonomous AI agents',
          'How agent workflows operate',
          'Retrieval-Augmented Generation (RAG)',
          'Memory, goals, tools & multi-agent systems',
          'When to use RAG & its benefits',
        ],
      },
    ],
  },
  {
    id: 'phase2',
    title: 'PHASE 2 — CREATIVE AI MASTERY',
    subtitle: 'Day 6–10',
    description: 'Build world-class visuals, videos, media & brand assets.',
    color: 'from-purple-500 to-pink-500',
    sessions: [
      {
        number: 6,
        title: 'Diffusion Models & Modern Image/Video AI',
        topics: [
          'What diffusion models are',
          'Sora, MidJourney, Runway, Stable Diffusion',
          'Math & logic behind diffusion',
          'Open-source AI ecosystem',
        ],
      },
      {
        number: 7,
        title: 'MidJourney Deep Dive + Visual Design',
        topics: [
          'Text-to-image mastery',
          'Character consistency',
          'Cinematic styles',
          'Image-to-image workflows',
          'Professional output techniques',
        ],
      },
      {
        number: 8,
        title: 'Runway ML & Video Generation Mastery',
        topics: [
          'Text-to-video',
          'Video editing & VFX tools',
          'AI audio & voice generation',
          'Multi-tool media pipelines',
          'How agencies use AI for content today',
        ],
      },
      {
        number: 9,
        title: 'AI for Digital Branding & Content Creation',
        topics: [
          'Social media creation',
          'Long-form + short-form',
          'SEO content generation',
          'Branding kit creation',
          'Designing ads, thumbnails, banners',
          'Building content calendars in minutes',
        ],
      },
      {
        number: 10,
        title: 'Hands-On Creative Project Lab',
        topics: [
          'Portfolio Project #1',
          'Create a full branded visual + video + content campaign',
          'Deliverables: branding kit + 15 posts + video + storyboards',
        ],
      },
    ],
  },
  {
    id: 'phase3',
    title: 'PHASE 3 — BUILDING AI PRODUCTS',
    subtitle: 'Day 11–15',
    description: 'Learn to build, deploy, and automate AI-powered systems.',
    color: 'from-orange-500 to-red-500',
    sessions: [
      {
        number: 11,
        title: 'Building Custom GPTs',
        topics: [
          'Designing your first GPT',
          'Writing system instructions & knowledge bases',
          'Behavior customization',
          'Industry use-cases',
        ],
      },
      {
        number: 12,
        title: 'Building Agentic Workflows',
        topics: [
          'Multi-step task automation',
          'Tool usage inside GPTs',
          'Planning → Action → Execution',
          'Real-world agent examples',
        ],
      },
      {
        number: 13,
        title: 'No-Code AI Automations (Make.com + Zapier)',
        topics: [
          'Trigger-action workflows',
          'Connecting 1000+ apps',
          'Automating emails, content, calendars, and business flows',
          'Using APIs inside no-code automation',
        ],
      },
      {
        number: 14,
        title: 'AI for Coding, Debugging & App Development',
        topics: [
          'Using AI as your coding partner',
          'Building mini-apps',
          'API integration',
          'Realtime debugging',
          'Database + documentation generation',
        ],
      },
      {
        number: 15,
        title: 'Hands-On AI Product Lab',
        topics: [
          'Portfolio Project #2',
          'Build a real AI assistant, agent, automation, or workflow',
          'Deploy your first working AI product',
        ],
      },
    ],
  },
  {
    id: 'phase4',
    title: 'PHASE 4 — PROFESSIONAL DEVELOPMENT',
    subtitle: 'Day 16–21',
    description: 'Become job-ready, confident, and industry-presentable.',
    color: 'from-green-500 to-emerald-500',
    sessions: [
      {
        number: 16,
        title: 'Data Analysis & Business Intelligence with AI',
        topics: [
          'Excel → insights',
          'Dashboard creation',
          'Forecasting & planning',
          'AI for business strategy',
        ],
      },
      {
        number: 17,
        title: 'Communication, Soft Skills & Personality Development',
        topics: [
          'Clear communication',
          'Professional articulation',
          'Critical thinking',
          'Confidence building',
          'Problem-solving',
          'Client-ready communication',
        ],
      },
      {
        number: 18,
        title: 'LinkedIn, GitHub & Portfolio Optimization',
        topics: [
          'Create a standout LinkedIn profile',
          'GitHub structuring',
          'Creating README files',
          'Publishing case studies',
          'Building a strong online presence',
        ],
      },
      {
        number: 19,
        title: 'Job Portals, Resume Building & Interview Mastery',
        topics: [
          'Naukri, LinkedIn, Indeed optimization',
          'ATS-friendly resume building',
          'HR + Technical + Behavioral interview prep',
          'Salary negotiation',
          'Creating a job search strategy',
        ],
      },
      {
        number: 20,
        title: 'Final Capstone Project + Presentations',
        topics: [
          'Portfolio Project #3',
          'Build your final AI product + media + workflow',
          'Present your work in a seminar-style showcase',
          'Storytelling & professional presentation training',
        ],
      },
      {
        number: 21,
        title: 'Career Launch, Community Access & Long-Term Growth Plan',
        topics: [
          'Personalized career roadmap for each learner',
          'How to keep learning & stay future-ready',
          'Community collaborations, hackathons, events',
          'Maintaining momentum after the bootcamp',
          'Achieving job security & high-paying roles',
          'How to stand out as a unique, high-value AI professional',
        ],
      },
    ],
  },
];

const outcomes = [
  { icon: Brain, text: 'AI-skilled', color: 'from-blue-500 to-cyan-500' },
  { icon: Briefcase, text: 'Job-ready', color: 'from-purple-500 to-pink-500' },
  { icon: Rocket, text: 'Project-ready', color: 'from-orange-500 to-red-500' },
  { icon: Presentation, text: 'Presentation-ready', color: 'from-green-500 to-emerald-500' },
  { icon: Target, text: 'Interview-ready', color: 'from-indigo-500 to-blue-500' },
  { icon: TrendingUp, text: 'Career-confident', color: 'from-pink-500 to-rose-500' },
  { icon: Globe, text: 'Portfolio-heavy', color: 'from-yellow-500 to-orange-500' },
  { icon: Shield, text: 'Future-proof', color: 'from-teal-500 to-cyan-500' },
  { icon: Trophy, text: 'High-paying-job eligible', color: 'from-amber-500 to-yellow-500' },
];

const techStack = [
  { name: 'ChatGPT', image: '/assest/chatgpt.webp', color: 'from-green-500 to-emerald-500' },
  { name: 'Claude', image: '/assest/claude.webp', color: 'from-orange-500 to-red-500' },
  { name: 'MidJourney', image: '/assest/midjourney.webp', color: 'from-purple-500 to-pink-500' },
  { name: 'Runway', image: '/assest/runway.webp', color: 'from-blue-500 to-cyan-500' },
  { name: 'Gemini', image: '/assest/gemini.webp', color: 'from-yellow-500 to-orange-500' },
  { name: 'LangChain', image: '/assest/langchain.avif', color: 'from-indigo-500 to-blue-500' },
  { name: 'Hugging Face', image: '/assest/hugging face.avif', color: 'from-pink-500 to-rose-500' },
  { name: 'Streamlit', image: '/assest/streamlit.avif', color: 'from-red-500 to-pink-500' },
  { name: 'Make.com', image: '/assest/make.webp', color: 'from-teal-500 to-cyan-500' },
  { name: 'Writesonic', image: '/assest/writesonic.webp', color: 'from-violet-500 to-purple-500' },
  { name: 'Simplified', image: '/assest/simplified.webp', color: 'from-amber-500 to-yellow-500' },
  { name: 'Rollout', image: '/assest/rollout.webp', color: 'from-emerald-500 to-green-500' },
];

const benefits = [
  {
    title: 'Live Interactive Sessions',
    description: 'Real-time learning with expert instructors',
    image: '/assest/online classes.jpg',
    icon: PlayCircle,
    color: 'from-blue-500 to-cyan-500',
    stats: '100% Live',
  },
  {
    title: '1:1 Personal Mentoring',
    description: 'Get personalized guidance from industry experts',
    image: '/assest/students learning.jpg',
    icon: Users,
    color: 'from-purple-500 to-pink-500',
    stats: 'Dedicated Mentor',
  },
  {
    title: 'Hands-On Projects',
    description: 'Build real-world AI products and solutions',
    image: '/assest/coding.jpg',
    icon: Code,
    color: 'from-orange-500 to-red-500',
    stats: '3 Portfolio Projects',
  },
  {
    title: 'Job Placement Support',
    description: 'Resume building, interview prep, and job assistance',
    image: '/assest/job ready.jpg',
    icon: Briefcase,
    color: 'from-green-500 to-emerald-500',
    stats: '100% Support',
  },
  {
    title: 'Community Access',
    description: 'Join a network of AI professionals and learners',
    image: '/assest/students.jpg',
    icon: Globe,
    color: 'from-indigo-500 to-blue-500',
    stats: 'Lifetime Access',
  },
  {
    title: 'Career Transformation',
    description: 'From beginner to AI professional in 28 days',
    image: '/assest/success.jpg',
    icon: TrendingUp,
    color: 'from-pink-500 to-rose-500',
    stats: '28 Days',
  },
];

const successStories = [
  {
    name: 'AI Career Success',
    role: 'AI Professional',
    image: '/assest/success.jpg',
    quote: 'This bootcamp transformed my career completely. I went from zero AI knowledge to landing a high-paying job in just 28 days!',
    rating: 5,
    outcome: '₹15L+ Package',
  },
  {
    name: 'Rapid Skill Development',
    role: 'Tech Enthusiast',
    image: '/assest/learning.jpg',
    quote: 'The hands-on approach and real projects helped me build a strong portfolio that impressed employers immediately.',
    rating: 5,
    outcome: '3 Projects Built',
  },
  {
    name: 'Career Pivot Success',
    role: 'Career Changer',
    image: '/assest/job.jpg',
    quote: 'Best investment in my career. The 1:1 mentoring and job prep support made all the difference in my transition.',
    rating: 5,
    outcome: 'Job Ready',
  },
];

export default function AIBootcampsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    const whatsappMessage = `Hello! I'm interested in enrolling in the AI Mastery Bootcamp.\n\nName: ${formData.name}\nEmail: ${formData.email}\nPhone: ${formData.phone}\nMessage: ${formData.message || 'I want to reserve my seat at ₹4,999'}`;
    const whatsappUrl = `https://wa.me/918008937902?text=${encodeURIComponent(whatsappMessage)}`;
    window.open(whatsappUrl, '_blank');
    setIsModalOpen(false);
  };

  return (
    <>
      <SEO
        title="AI Mastery Bootcamp — Career Acceleration Program | 28-Day AI Training"
        description="From Beginner to AI Professional in 28 Days. Master AI. Build Projects. Land High-Paying Jobs. 21 powerful sessions with live classes, 1:1 support, hands-on practice, and complete job preparation."
        keywords="AI bootcamp, AI training, generative AI course, AI mastery program, AI career acceleration, prompt engineering, AI automation, AI bootcamp India, 28 day AI course, AI professional training"
        canonical="https://codekidstech.com/ai-bootcamps"
        ogImage="/assest/ai tools learning.jpg"
        structuredData={[generateCourseStructuredData(
          'AI Mastery Bootcamp — Career Acceleration Program',
          'A life-changing, career-accelerating, job-ready AI mastery program — built with 21 powerful sessions. From Beginner to AI Professional in 28 Days.',
          undefined,
          'INR',
          ['Artificial Intelligence', 'Generative AI', 'Machine Learning', 'Prompt Engineering', 'AI Automation', 'AI Product Development'],
          'Professional'
        )]}
      />

      <div className="min-h-screen bg-gradient-to-br from-[#050814] via-[#0F1A30] to-[#050814]">
        {/* Hero Section */}
        <section className="relative pt-20 sm:pt-24 pb-16 sm:pb-20 overflow-hidden">
          {/* Background Image */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute inset-0">
              <Image
                src="/assest/AI master class.jpg"
                alt="AI Mastery Bootcamp"
                fill
                className="object-cover opacity-20"
                sizes="100vw"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-b from-[#050814] via-[#050814]/80 to-[#050814]" />
            </div>
          </div>
          {/* Animated Background */}
          <div className="absolute inset-0 overflow-hidden">
            <motion.div
              className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-r from-[#FF4B8F]/20 to-[#7B3DFF]/20 rounded-full blur-3xl"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.5, 0.3],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
            <motion.div
              className="absolute bottom-0 right-1/4 w-96 h-96 bg-gradient-to-r from-[#2ED0FF]/20 to-[#7B3DFF]/20 rounded-full blur-3xl"
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.3, 0.5, 0.3],
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: 1,
              }}
            />
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-12"
            >
              {/* Badge */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: 'spring' }}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-[#FF4B8F]/30 via-[#7B3DFF]/30 to-[#2ED0FF]/30 border-2 border-[#FF4B8F]/50 backdrop-blur-xl mb-6 shadow-2xl"
              >
                <Sparkles className="h-5 w-5 text-[#FF4B8F] animate-pulse" />
                <span className="text-white font-bold text-sm md:text-base">🚀 Most Important Bootcamp</span>
                <Sparkles className="h-5 w-5 text-[#2ED0FF] animate-pulse" />
              </motion.div>

              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black mb-6 font-heading">
                <span className="block text-white mb-2">AI Mastery Bootcamp</span>
                <span className="block bg-gradient-to-r from-[#FF4B8F] via-[#7B3DFF] to-[#2ED0FF] bg-clip-text text-transparent">
                  Career Acceleration Program
                </span>
              </h1>

              <p className="text-xl sm:text-2xl md:text-3xl font-bold text-white/90 mb-4">
                From Beginner to AI Professional in 28 Days.
              </p>
              <p className="text-lg sm:text-xl md:text-2xl font-semibold bg-gradient-to-r from-[#FF4B8F] via-[#7B3DFF] to-[#2ED0FF] bg-clip-text text-transparent mb-8">
                Master AI. Build Projects. Land High-Paying Jobs
              </p>

              <p className="text-base sm:text-lg text-white/80 max-w-4xl mx-auto mb-8 leading-relaxed">
                A life-changing, career-accelerating, job-ready AI mastery program — built with{' '}
                <span className="font-bold text-white">21 powerful sessions</span>.
              </p>

              {/* Key Features */}
              <div className="flex flex-wrap justify-center gap-3 sm:gap-4 mb-10">
                {bootcampFeatures.map((feature, index) => {
                  const Icon = feature.icon;
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.3 + index * 0.1 }}
                      className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20"
                    >
                      <Icon className="h-4 w-4 text-white" />
                      <span className="text-sm sm:text-base text-white font-medium">{feature.text}</span>
                    </motion.div>
                  );
                })}
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  to="#contact-form"
                  onClick={(e) => handleAnchorClick(e, '#contact-form')}
                  className="group px-8 py-4 rounded-full bg-gradient-to-r from-[#FF4B8F] via-[#7B3DFF] to-[#2ED0FF] text-white font-bold text-lg hover:shadow-2xl hover:shadow-[#FF4B8F]/50 transition-all duration-300 hover:scale-105 active:scale-95 flex items-center gap-2"
                >
                  <span>Enroll Now</span>
                  <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  to="#curriculum"
                  onClick={(e) => handleAnchorClick(e, '#curriculum')}
                  className="px-8 py-4 rounded-full border-2 border-white/30 text-white font-semibold text-lg hover:bg-white/10 transition-all duration-300 hover:scale-105 active:scale-95"
                >
                  View Curriculum
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Hero Image Section */}
        <section className="relative py-12 sm:py-16 z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              {...fadeInUp}
              className="relative h-64 sm:h-80 md:h-96 lg:h-[500px] rounded-3xl overflow-hidden shadow-2xl"
            >
              <ImageReveal
                src="/assest/ai tools learning.jpg"
                alt="AI Mastery Bootcamp - Transform Your Career"
                fill
                className="object-cover"
                sizes="100vw"
                revealDirection="up"
                parallax={true}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
              <div className="absolute inset-0 flex items-end p-8 sm:p-12">
                <div className="text-white">
                  <motion.h3
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4"
                  >
                    Transform Your Career in Just 28 Days
                  </motion.h3>
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                    className="text-lg sm:text-xl text-white/90 max-w-2xl"
                  >
                    Join thousands of professionals who have accelerated their careers with AI mastery
                  </motion.p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Technology Stack Section */}
        <section className="relative py-16 sm:py-20 z-10 bg-gradient-to-br from-[#0F1A30] to-[#050814]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div {...fadeInUp} className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 font-heading text-white">
                🛠️ <span className="bg-gradient-to-r from-[#FF4B8F] via-[#7B3DFF] to-[#2ED0FF] bg-clip-text text-transparent">MASTER THE AI TOOLS</span>
              </h2>
              <p className="text-lg text-white max-w-3xl mx-auto font-medium">
                Learn and master the most in-demand AI tools and platforms used by top companies
              </p>
            </motion.div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 sm:gap-6">
              {techStack.map((tech, index) => (
                <motion.div
                  key={tech.name}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.1, y: -10 }}
                  className="group"
                >
                  <GlassCard className="p-4 sm:p-6 text-center h-full hover:border-primary/50 transition-all bg-white/90 dark:bg-slate-800/95 backdrop-blur-xl border-gray-300 dark:border-white/30 shadow-xl cursor-pointer">
                    <div className="relative h-16 sm:h-20 mb-4 mx-auto">
                      <Image
                        src={tech.image}
                        alt={tech.name}
                        fill
                        className="object-contain group-hover:scale-110 transition-transform duration-300"
                        sizes="(max-width: 768px) 50vw, 16vw"
                      />
                    </div>
                    <div className={`text-xs sm:text-sm font-bold text-gray-900 dark:text-slate-50 bg-gradient-to-r ${tech.color} bg-clip-text text-transparent`}>
                      {tech.name}
                    </div>
                  </GlassCard>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Benefits Showcase Section */}
        <section className="relative py-16 sm:py-20 z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div {...fadeInUp} className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 font-heading text-white">
                ✨ <span className="bg-gradient-to-r from-[#FF4B8F] via-[#7B3DFF] to-[#2ED0FF] bg-clip-text text-transparent">WHY CHOOSE THIS BOOTCAMP?</span>
              </h2>
              <p className="text-lg text-white max-w-3xl mx-auto font-medium">
                Everything you need to succeed in your AI career journey
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {benefits.map((benefit, index) => {
                const Icon = benefit.icon;
                return (
                  <motion.div
                    key={benefit.title}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ y: -10, scale: 1.02 }}
                    className="group"
                  >
                    <GlassCard className="overflow-hidden h-full hover:border-primary/50 transition-all bg-white/90 dark:bg-slate-800/95 backdrop-blur-xl border-gray-300 dark:border-white/30 shadow-xl">
                      {/* Image Section */}
                      <div className="relative h-48 overflow-hidden">
                        <Image
                          src={benefit.image}
                          alt={benefit.title}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-500"
                          sizes="(max-width: 768px) 100vw, 33vw"
                        />
                        <div className={`absolute inset-0 bg-gradient-to-t ${benefit.color} opacity-70 group-hover:opacity-60 transition-opacity`} />
                        
                        {/* Icon Badge */}
                        <motion.div
                          whileHover={{ scale: 1.2, rotate: 360 }}
                          transition={{ duration: 0.5 }}
                          className={`absolute top-4 right-4 h-12 w-12 rounded-xl bg-gradient-to-br ${benefit.color} flex items-center justify-center shadow-2xl border-2 border-white/30`}
                        >
                          <Icon className="h-6 w-6 text-white" />
                        </motion.div>

                        {/* Stats Badge */}
                        <div className="absolute bottom-4 left-4 px-3 py-1 rounded-full bg-white/90 backdrop-blur-sm border border-white/30">
                          <span className="text-xs font-bold text-gray-900">{benefit.stats}</span>
                        </div>
                      </div>

                      {/* Content Section */}
                      <div className="p-6">
                        <h3 className="text-xl font-bold text-gray-900 dark:text-slate-50 mb-2 group-hover:text-primary transition-colors">
                          {benefit.title}
                        </h3>
                        <p className="text-sm sm:text-base text-gray-700 dark:text-slate-300 font-medium">
                          {benefit.description}
                        </p>
                      </div>
                    </GlassCard>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Success Stories Section */}
        <section className="relative py-16 sm:py-20 z-10 bg-gradient-to-br from-[#0F1A30] to-[#050814]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div {...fadeInUp} className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 font-heading text-white">
                🌟 <span className="bg-gradient-to-r from-[#FF4B8F] via-[#7B3DFF] to-[#2ED0FF] bg-clip-text text-transparent">SUCCESS STORIES</span>
              </h2>
              <p className="text-lg text-white max-w-3xl mx-auto font-medium">
                Real results from real learners who transformed their careers
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
              {successStories.map((story, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 }}
                  whileHover={{ y: -10, scale: 1.02 }}
                  className="group"
                >
                  <GlassCard className="overflow-hidden h-full hover:border-primary/50 transition-all bg-white/90 dark:bg-slate-800/95 backdrop-blur-xl border-gray-300 dark:border-white/30 shadow-xl">
                    {/* Image Section */}
                    <div className="relative h-48 overflow-hidden">
                      <Image
                        src={story.image}
                        alt={story.name}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                      
                      {/* Outcome Badge */}
                      <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-green-500/90 backdrop-blur-sm border border-white/30">
                        <span className="text-xs font-bold text-white">{story.outcome}</span>
                      </div>

                      {/* Rating */}
                      <div className="absolute bottom-4 left-4 flex gap-1">
                        {[...Array(story.rating)].map((_, i) => (
                          <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                    </div>

                    {/* Content Section */}
                    <div className="p-6">
                      <h3 className="text-lg font-bold text-gray-900 dark:text-slate-50 mb-1">
                        {story.name}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-slate-400 mb-4">{story.role}</p>
                      <p className="text-sm sm:text-base text-gray-700 dark:text-slate-300 italic font-medium">
                        "{story.quote}"
                      </p>
                    </div>
                  </GlassCard>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Bootcamp Structure Section */}
        <section className="relative py-16 sm:py-20 z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div {...fadeInUp} className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 font-heading text-white">
                🎯 <span className="bg-gradient-to-r from-[#FF4B8F] via-[#7B3DFF] to-[#2ED0FF] bg-clip-text text-transparent">BOOTCAMP STRUCTURE</span>
              </h2>
            </motion.div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6">
              {bootcampStructure.map((item, index) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={index}
                    {...fadeInUp}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.05, y: -5 }}
                  >
                    <GlassCard className="p-4 sm:p-6 text-center h-full hover:border-primary/50 transition-all bg-white/90 dark:bg-slate-800/95 backdrop-blur-xl border-gray-300 dark:border-white/30 shadow-xl">
                      <div className={`inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br ${item.color} mb-4 shadow-lg`}>
                        <Icon className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
                      </div>
                      <div className="text-2xl sm:text-3xl md:text-4xl font-black text-gray-900 dark:text-slate-50 mb-2 dark:[text-shadow:2px_2px_4px_rgba(0,0,0,0.8)]">
                        {item.value}
                      </div>
                      <div className="text-xs sm:text-sm text-gray-800 dark:text-slate-100 font-bold dark:[text-shadow:1px_1px_3px_rgba(0,0,0,0.8)]">
                        {item.label}
                      </div>
                    </GlassCard>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Curriculum Section */}
        <section id="curriculum" className="relative py-16 sm:py-20 z-10 bg-gradient-to-br from-[#0F1A30] to-[#050814]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div {...fadeInUp} className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 font-heading text-white">
                🧠 <span className="bg-gradient-to-r from-[#FF4B8F] via-[#7B3DFF] to-[#2ED0FF] bg-clip-text text-transparent">THE 21-SESSION TRANSFORMATION CURRICULUM</span>
              </h2>
              <p className="text-lg text-white max-w-3xl mx-auto font-medium">
                Below is the final optimized sequence — in the ideal learning order.
              </p>
            </motion.div>

            <div className="space-y-12">
              {phases.map((phase, phaseIndex) => (
                <motion.div
                  key={phase.id}
                  {...fadeInUp}
                  transition={{ delay: phaseIndex * 0.2 }}
                  className="relative"
                >
                  <GlassCard className="p-6 sm:p-8 border-2 border-gray-300 dark:border-white/30 hover:border-primary/50 transition-all bg-white/90 dark:bg-slate-800/95 backdrop-blur-xl shadow-2xl">
                    {/* Phase Header */}
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8 pb-6 border-b border-gray-300 dark:border-white/30">
                      <div>
                        <div className="flex items-center gap-3 mb-2">
                          <div className={`px-4 py-2 rounded-full bg-gradient-to-r ${phase.color} text-white font-bold text-sm sm:text-base shadow-lg`}>
                            {phase.title}
                          </div>
                          <span className="text-gray-900 dark:text-slate-50 text-sm sm:text-base font-bold dark:[text-shadow:1px_1px_3px_rgba(0,0,0,0.8)]">{phase.subtitle}</span>
                        </div>
                        <p className="text-gray-900 dark:text-slate-50 text-base sm:text-lg mt-2 font-semibold dark:[text-shadow:1px_1px_3px_rgba(0,0,0,0.8)]">{phase.description}</p>
                      </div>
                    </div>

                    {/* Sessions */}
                    <div className="space-y-4">
                      {phase.sessions.map((session, sessionIndex) => (
                        <motion.div
                          key={session.number}
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: sessionIndex * 0.1 }}
                        >
                          <GlassCard className="p-4 sm:p-6 border border-gray-300 dark:border-white/30 hover:border-primary/50 transition-all bg-white/90 dark:bg-slate-800/95 backdrop-blur-xl shadow-xl">
                            <div className="flex items-start gap-4">
                              <div className={`flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-gradient-to-br ${phase.color} flex items-center justify-center text-white font-bold text-lg sm:text-xl shadow-lg`}>
                                {session.number}
                              </div>
                              <div className="flex-1">
                                <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-slate-50 mb-3 font-heading dark:[text-shadow:2px_2px_4px_rgba(0,0,0,0.8)]">
                                  📘 {session.title}
                                </h3>
                                <ul className="space-y-2">
                                  {session.topics.map((topic, topicIndex) => (
                                    <li key={topicIndex} className="flex items-start gap-2 text-gray-800 dark:text-slate-100 text-sm sm:text-base font-semibold dark:[text-shadow:1px_1px_3px_rgba(0,0,0,0.8)]">
                                      <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-[#2ED0FF] flex-shrink-0 mt-0.5" />
                                      <span className="text-gray-900 dark:text-slate-50 font-semibold">{topic}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            </div>
                          </GlassCard>
                        </motion.div>
                      ))}
                    </div>
                  </GlassCard>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Outcomes Section */}
        <section className="relative py-16 sm:py-20 z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div {...fadeInUp} className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 font-heading text-white">
                🏆 <span className="bg-gradient-to-r from-[#FF4B8F] via-[#7B3DFF] to-[#2ED0FF] bg-clip-text text-transparent">THE OUTCOME OF THIS 28-DAY BOOTCAMP</span>
              </h2>
              <p className="text-lg sm:text-xl text-white max-w-3xl mx-auto mb-8 font-medium">
                By the end of 28 days, learners become:
              </p>
            </motion.div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-3 gap-4 sm:gap-6">
              {outcomes.map((outcome, index) => {
                const Icon = outcome.icon;
                return (
                  <motion.div
                    key={index}
                    {...fadeInUp}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.05, y: -5 }}
                  >
                    <GlassCard className="p-4 sm:p-6 text-center h-full hover:border-primary/50 transition-all bg-white/90 dark:bg-slate-800/95 backdrop-blur-xl border-gray-300 dark:border-white/30 shadow-xl">
                      <div className={`inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br ${outcome.color} mb-4 shadow-lg`}>
                        <Icon className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
                      </div>
                      <div className="text-sm sm:text-base font-bold text-gray-900 dark:text-slate-50 dark:[text-shadow:1px_1px_3px_rgba(0,0,0,0.8)]">
                        ✅ {outcome.text}
                      </div>
                    </GlassCard>
                  </motion.div>
                );
              })}
            </div>

            <motion.div {...fadeInUp} className="mt-12 text-center">
              <GlassCard className="p-6 sm:p-8 bg-gradient-to-r from-white/90 via-gray-50/90 to-white/90 dark:from-slate-800/98 dark:via-slate-700/98 dark:to-slate-800/98 border-2 border-gray-300 dark:border-primary/50 backdrop-blur-xl shadow-2xl">
                <p className="text-base sm:text-lg text-gray-900 dark:text-slate-50 leading-relaxed font-semibold dark:[text-shadow:1px_1px_3px_rgba(0,0,0,0.8)]">
                  This is a <span className="font-bold text-gray-900 dark:text-slate-50">career-changing, mindset-transforming, skill-building program</span> designed to create the{' '}
                  <span className="font-bold bg-gradient-to-r from-[#FF4B8F] via-[#7B3DFF] to-[#2ED0FF] bg-clip-text text-transparent dark:[text-shadow:1px_1px_3px_rgba(0,0,0,0.5)]">top 1% AI professionals</span> in the market.
                </p>
              </GlassCard>
            </motion.div>
          </div>
        </section>

        {/* Pricing Section */}
        <section className="relative py-16 sm:py-20 z-10 bg-gradient-to-br from-[#0F1A30] to-[#050814]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div {...fadeInUp} className="text-center mb-12">
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ type: 'spring' }}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-[#FF4B8F]/30 via-[#7B3DFF]/30 to-[#2ED0FF]/30 border-2 border-[#FF4B8F]/50 backdrop-blur-xl mb-6 shadow-2xl"
              >
                <SparklesIcon className="h-5 w-5 text-[#FF4B8F] animate-pulse" />
                <span className="text-white font-bold text-sm md:text-base">🎁 Limited Time Offer - Save ₹10,001</span>
                <SparklesIcon className="h-5 w-5 text-[#2ED0FF] animate-pulse" />
              </motion.div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 font-heading text-white">
                💰 <span className="bg-gradient-to-r from-[#FF4B8F] via-[#7B3DFF] to-[#2ED0FF] bg-clip-text text-transparent">INVESTMENT & BENEFITS</span>
              </h2>
              <p className="text-lg text-white max-w-3xl mx-auto font-medium">
                Transform your career with the best investment you'll ever make
              </p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
              {/* Pricing Card */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="relative"
              >
                <GlassCard className="p-8 bg-white/90 dark:bg-slate-800/95 backdrop-blur-xl border-2 border-primary/50 shadow-2xl relative overflow-hidden">
                  {/* Ribbon */}
                  <div className="absolute top-0 right-0 bg-gradient-to-r from-[#FF4B8F] to-[#7B3DFF] text-white px-6 py-2 transform rotate-45 translate-x-8 translate-y-4 shadow-lg">
                    <span className="text-xs font-bold">33% OFF</span>
                  </div>

                  <div className="text-center mb-8">
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-slate-50 mb-4">Bootcamp Investment</h3>
                    
                    {/* Original Price */}
                    <div className="flex items-center justify-center gap-3 mb-2">
                      <span className="text-2xl text-gray-500 dark:text-gray-400 line-through">₹30,000</span>
                      <span className="px-3 py-1 rounded-full bg-red-500/20 text-red-600 dark:text-red-400 text-sm font-bold">
                        Save ₹10,001
                      </span>
                    </div>

                    {/* Offer Price */}
                    <div className="mb-6">
                      <div className="text-5xl sm:text-6xl font-black text-gray-900 dark:text-slate-50 mb-2">
                        ₹19,999
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">One-time payment</p>
                    </div>

                    {/* EMI Option */}
                    <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 dark:from-blue-500/20 dark:to-purple-500/20 rounded-xl p-4 mb-6 border border-blue-500/30">
                      <div className="flex items-center justify-center gap-2 mb-2">
                        <CreditCard className="h-5 w-5 text-blue-500" />
                        <span className="font-bold text-gray-900 dark:text-slate-50">EMI Options Available</span>
                      </div>
                      <p className="text-sm text-gray-700 dark:text-gray-300">Flexible payment plans starting from ₹1,999/month</p>
                    </div>

                    {/* Reservation */}
                    <div className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 dark:from-green-500/20 dark:to-emerald-500/20 rounded-xl p-4 border border-green-500/30">
                      <div className="flex items-center justify-center gap-2 mb-2">
                        <Clock className="h-5 w-5 text-green-500" />
                        <span className="font-bold text-gray-900 dark:text-slate-50">Reserve Your Seat Now</span>
                      </div>
                      <div className="text-3xl font-black text-green-600 dark:text-green-400 mb-1">₹4,999</div>
                      <p className="text-sm text-gray-700 dark:text-gray-300">Pay now, balance later</p>
                    </div>
                  </div>
                </GlassCard>
              </motion.div>

              {/* Benefits Card */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <GlassCard className="p-8 bg-white/90 dark:bg-slate-800/95 backdrop-blur-xl border-2 border-primary/50 shadow-2xl h-full">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-slate-50 mb-6 text-center">
                    🎁 Exclusive Benefits Included
                  </h3>
                  
                  <div className="space-y-4">
                    {[
                      { icon: Gift, text: 'Surprise Gifts & Goodies', color: 'from-pink-500 to-rose-500' },
                      { icon: Award, text: 'Scholarship Opportunities', color: 'from-yellow-500 to-orange-500' },
                      { icon: DollarSign, text: 'Earn up to ₹25,000 on Completion', color: 'from-green-500 to-emerald-500' },
                      { icon: CreditCard, text: 'Flexible EMI Payment Options', color: 'from-blue-500 to-cyan-500' },
                      { icon: Code, text: 'Hackathon Participation', color: 'from-purple-500 to-pink-500' },
                      { icon: Users2, text: 'AI Meetups in Organizations', color: 'from-indigo-500 to-blue-500' },
                      { icon: Trophy, text: 'Certification & Recognition', color: 'from-amber-500 to-yellow-500' },
                      { icon: Globe, text: 'Lifetime Community Access', color: 'from-teal-500 to-cyan-500' },
                    ].map((benefit, index) => {
                      const Icon = benefit.icon;
                      return (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: index * 0.1 }}
                          className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 dark:bg-slate-700/50 hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors"
                        >
                          <div className={`flex-shrink-0 w-10 h-10 rounded-lg bg-gradient-to-br ${benefit.color} flex items-center justify-center`}>
                            <Icon className="h-5 w-5 text-white" />
                          </div>
                          <span className="text-sm sm:text-base font-semibold text-gray-900 dark:text-slate-50">
                            {benefit.text}
                          </span>
                        </motion.div>
                      );
                    })}
                  </div>
                </GlassCard>
              </motion.div>
            </div>

            {/* CTA Buttons */}
            <motion.div
              {...fadeInUp}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <Link
                to="/contact"
                className="group relative px-10 py-5 rounded-full bg-gradient-to-r from-[#FF4B8F] via-[#7B3DFF] to-[#2ED0FF] text-white font-bold text-lg hover:shadow-2xl hover:shadow-[#FF4B8F]/50 transition-all duration-300 hover:scale-105 active:scale-95 flex items-center gap-2 overflow-hidden w-full sm:w-auto justify-center"
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-[#2ED0FF] via-[#7B3DFF] to-[#FF4B8F] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ backgroundSize: '200% 200%' }}
                  animate={{
                    backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: 'linear',
                  }}
                />
                <PartyPopper className="h-5 w-5 relative z-10" />
                <span className="relative z-10">Reserve Seat at ₹4,999</span>
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform relative z-10" />
              </Link>
              <a
                href="https://wa.me/918008937902?text=Hello! I want to reserve my seat for the AI Mastery Bootcamp at ₹4,999. Please provide more details."
                target="_blank"
                rel="noopener noreferrer"
                className="px-10 py-5 rounded-full border-2 border-green-500 text-green-400 font-semibold text-lg hover:bg-green-500 hover:text-white transition-all duration-300 hover:scale-105 active:scale-95 flex items-center gap-2 w-full sm:w-auto justify-center"
              >
                <MessageSquare className="h-5 w-5" />
                <span>Chat on WhatsApp</span>
              </a>
            </motion.div>

            {/* Trust Badges */}
            <motion.div
              {...fadeInUp}
              className="mt-12 flex flex-wrap justify-center gap-6 text-sm"
            >
              {[
                { icon: Shield, text: '100% Money-Back Guarantee' },
                { icon: Medal, text: 'Industry-Recognized Certification' },
                { icon: Briefcase, text: 'Job Placement Support' },
                { icon: Clock, text: 'Lifetime Access' },
              ].map((badge, index) => {
                const Icon = badge.icon;
                return (
                  <div key={index} className="flex items-center gap-2 text-white/80">
                    <Icon className="h-4 w-4 text-green-400" />
                    <span>{badge.text}</span>
                  </div>
                );
              })}
            </motion.div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="relative py-16 sm:py-20 z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
              {[
                { value: '1000+', label: 'Students Trained', icon: Users, color: 'from-blue-500 to-cyan-500' },
                { value: '95%', label: 'Job Placement Rate', icon: Briefcase, color: 'from-green-500 to-emerald-500' },
                { value: '₹15L+', label: 'Average Salary', icon: DollarSign, color: 'from-yellow-500 to-orange-500' },
                { value: '4.9/5', label: 'Student Rating', icon: Star, color: 'from-pink-500 to-rose-500' },
              ].map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.05, y: -5 }}
                  >
                    <GlassCard className="p-6 text-center h-full hover:border-primary/50 transition-all bg-white/90 dark:bg-slate-800/95 backdrop-blur-xl border-gray-300 dark:border-white/30 shadow-xl">
                      <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br ${stat.color} mb-4 shadow-lg`}>
                        <Icon className="h-8 w-8 text-white" />
                      </div>
                      <div className="text-3xl sm:text-4xl font-black text-gray-900 dark:text-slate-50 mb-2 dark:[text-shadow:2px_2px_4px_rgba(0,0,0,0.8)]">
                        {stat.value}
                      </div>
                      <div className="text-sm font-bold text-gray-800 dark:text-slate-100 dark:[text-shadow:1px_1px_3px_rgba(0,0,0,0.8)]">
                        {stat.label}
                      </div>
                    </GlassCard>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Final CTA Section */}
        <section id="contact-form" className="relative py-16 sm:py-20 z-10 bg-gradient-to-br from-[#0F1A30] to-[#050814] overflow-hidden">
          {/* Background Image */}
          <div className="absolute inset-0">
            <Image
              src="/assest/motivation.jpg"
              alt="Transform Your Career"
              fill
              className="object-cover opacity-10"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-[#0F1A30] via-[#0F1A30]/90 to-[#0F1A30]" />
          </div>
          
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <motion.div {...fadeInUp} className="text-center">
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ type: 'spring', delay: 0.2 }}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-[#FF4B8F]/30 via-[#7B3DFF]/30 to-[#2ED0FF]/30 border-2 border-[#FF4B8F]/50 backdrop-blur-xl mb-6 shadow-2xl"
              >
                <Trophy className="h-5 w-5 text-[#FF4B8F] animate-pulse" />
                <span className="text-white font-bold text-sm md:text-base">Limited Seats Available</span>
                <Trophy className="h-5 w-5 text-[#2ED0FF] animate-pulse" />
              </motion.div>
              
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 font-heading text-white">
                Ready to Transform Your Career?
              </h2>
              <p className="text-lg sm:text-xl text-white mb-4 font-medium">
                Join the AI Mastery Bootcamp and become part of the top 1% AI professionals
              </p>
              <p className="text-base text-white/80 mb-8 max-w-2xl mx-auto">
                Don't wait for the perfect moment. Start your AI career transformation today. Every day you wait is a day you could be earning more.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="group relative px-10 py-5 rounded-full bg-gradient-to-r from-[#FF4B8F] via-[#7B3DFF] to-[#2ED0FF] text-white font-bold text-lg hover:shadow-2xl hover:shadow-[#FF4B8F]/50 transition-all duration-300 hover:scale-105 active:scale-95 flex items-center gap-2 overflow-hidden"
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-[#2ED0FF] via-[#7B3DFF] to-[#FF4B8F] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ backgroundSize: '200% 200%' }}
                    animate={{
                      backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: 'linear',
                    }}
                  />
                  <span className="relative z-10">Enroll Now - Start Today</span>
                  <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform relative z-10" />
                </button>
                <a
                  href="https://wa.me/918008937902?text=Hello! I'm interested in the AI Mastery Bootcamp. Can you provide more information?"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-10 py-5 rounded-full border-2 border-green-500 text-green-400 font-semibold text-lg hover:bg-green-500 hover:text-white transition-all duration-300 hover:scale-105 active:scale-95 flex items-center gap-2"
                >
                  <MessageSquare className="h-5 w-5" />
                  <span>Chat on WhatsApp</span>
                </a>
              </div>

              <div className="flex flex-wrap justify-center gap-6 text-sm text-white/70">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-400" />
                  <span>100% Money-Back Guarantee</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-400" />
                  <span>Lifetime Community Access</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-400" />
                  <span>Job Placement Support</span>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </div>

      {/* Enrollment Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4"
            onClick={() => setIsModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 50 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white dark:bg-slate-900 rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto relative"
            >
              {/* Background Gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#FF4B8F]/10 via-[#7B3DFF]/10 to-[#2ED0FF]/10 pointer-events-none" />
              
              {/* Close Button */}
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-4 right-4 p-2 hover:bg-gray-200 dark:hover:bg-gray-800 rounded-full transition-colors z-10"
                aria-label="Close modal"
              >
                <X className="h-6 w-6 text-gray-600 dark:text-gray-300" />
              </button>

              <div className="relative z-10 p-6 sm:p-8 lg:p-10">
                {/* Header */}
                <div className="text-center mb-8">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: 'spring' }}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-[#FF4B8F]/30 via-[#7B3DFF]/30 to-[#2ED0FF]/30 border-2 border-[#FF4B8F]/50 backdrop-blur-xl mb-6"
                  >
                    <SparklesIcon className="h-5 w-5 text-[#FF4B8F] animate-pulse" />
                    <span className="text-gray-900 dark:text-white font-bold text-sm md:text-base">🎉 Reserve Your Seat Now</span>
                    <SparklesIcon className="h-5 w-5 text-[#2ED0FF] animate-pulse" />
                  </motion.div>
                  
                  <h2 className="text-3xl sm:text-4xl font-black mb-4 font-heading">
                    <span className="bg-gradient-to-r from-[#FF4B8F] via-[#7B3DFF] to-[#2ED0FF] bg-clip-text text-transparent">
                      AI Mastery Bootcamp Enrollment
                    </span>
                  </h2>
                  <p className="text-lg text-gray-600 dark:text-gray-300 font-medium">
                    Start your career transformation today!
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                  {/* Pricing Summary */}
                  <div className="space-y-6">
                    <GlassCard className="p-6 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-slate-800 dark:to-slate-700 border-2 border-primary/30">
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Investment Summary</h3>
                      
                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600 dark:text-gray-300 line-through">Original Price</span>
                          <span className="text-xl font-bold text-gray-500 dark:text-gray-400">₹30,000</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600 dark:text-gray-300">Special Offer</span>
                          <span className="text-2xl font-black text-green-600 dark:text-green-400">-₹10,001</span>
                        </div>
                        <div className="border-t-2 border-gray-300 dark:border-gray-600 pt-4">
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-lg font-bold text-gray-900 dark:text-white">Total Price</span>
                            <span className="text-3xl font-black text-gray-900 dark:text-white">₹19,999</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-600 dark:text-gray-400">Reservation Fee</span>
                            <span className="text-xl font-bold text-primary">₹4,999</span>
                          </div>
                        </div>
                      </div>

                      <div className="mt-6 p-4 bg-green-500/10 dark:bg-green-500/20 rounded-xl border border-green-500/30">
                        <div className="flex items-center gap-2 mb-2">
                          <CreditCard className="h-5 w-5 text-green-600 dark:text-green-400" />
                          <span className="font-bold text-gray-900 dark:text-white">EMI Available</span>
                        </div>
                        <p className="text-sm text-gray-700 dark:text-gray-300">Starting from ₹1,999/month</p>
                      </div>
                    </GlassCard>

                    {/* Benefits List */}
                    <GlassCard className="p-6 bg-white/90 dark:bg-slate-800/90">
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">What You Get</h3>
                      <div className="space-y-3">
                        {[
                          '21 Live Sessions',
                          '1:1 Personal Mentoring',
                          '3 Portfolio Projects',
                          'Surprise Gifts & Goodies',
                          'Scholarship Opportunities',
                          'Earn up to ₹25,000',
                          'Hackathon Participation',
                          'AI Meetups Access',
                          'Lifetime Community',
                          'Job Placement Support',
                        ].map((benefit, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.3 + index * 0.05 }}
                            className="flex items-center gap-3"
                          >
                            <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                            <span className="text-sm sm:text-base text-gray-700 dark:text-gray-300 font-medium">{benefit}</span>
                          </motion.div>
                        ))}
                      </div>
                    </GlassCard>
                  </div>

                  {/* Enrollment Form */}
                  <div>
                    <GlassCard className="p-6 bg-white/90 dark:bg-slate-800/90">
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Reserve Your Seat</h3>
                      
                      <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                            <User className="inline h-4 w-4 mr-2" />
                            Full Name *
                          </label>
                          <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            required
                            className="w-full px-4 py-3 rounded-xl border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-slate-700 text-gray-900 dark:text-white focus:border-primary focus:outline-none transition-colors"
                            placeholder="Enter your full name"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                            <Mail className="inline h-4 w-4 mr-2" />
                            Email Address *
                          </label>
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                            className="w-full px-4 py-3 rounded-xl border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-slate-700 text-gray-900 dark:text-white focus:border-primary focus:outline-none transition-colors"
                            placeholder="your.email@example.com"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                            <Phone className="inline h-4 w-4 mr-2" />
                            Phone Number *
                          </label>
                          <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            required
                            className="w-full px-4 py-3 rounded-xl border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-slate-700 text-gray-900 dark:text-white focus:border-primary focus:outline-none transition-colors"
                            placeholder="+91 9876543210"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                            <GraduationCap className="inline h-4 w-4 mr-2" />
                            Message (Optional)
                          </label>
                          <textarea
                            name="message"
                            value={formData.message}
                            onChange={handleInputChange}
                            rows={3}
                            className="w-full px-4 py-3 rounded-xl border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-slate-700 text-gray-900 dark:text-white focus:border-primary focus:outline-none transition-colors resize-none"
                            placeholder="Tell us about your goals or any questions..."
                          />
                        </div>

                        <button
                          type="submit"
                          className="w-full px-8 py-4 rounded-xl bg-gradient-to-r from-[#FF4B8F] via-[#7B3DFF] to-[#2ED0FF] text-white font-bold text-lg hover:shadow-2xl hover:shadow-[#FF4B8F]/50 transition-all duration-300 hover:scale-105 active:scale-95 flex items-center justify-center gap-2"
                        >
                          <PartyPopper className="h-5 w-5" />
                          <span>Reserve at ₹4,999 via WhatsApp</span>
                          <ArrowRight className="h-5 w-5" />
                        </button>

                        <div className="text-center">
                          <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">Or contact us directly:</p>
                          <div className="flex flex-col sm:flex-row gap-3 justify-center">
                            <a
                              href="tel:+918008937902"
                              className="flex items-center justify-center gap-2 px-4 py-2 rounded-lg border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                            >
                              <Phone className="h-4 w-4" />
                              <span>Call Now</span>
                            </a>
                            <a
                              href="mailto:codekidstech2025@gmail.com"
                              className="flex items-center justify-center gap-2 px-4 py-2 rounded-lg border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                            >
                              <Mail className="h-4 w-4" />
                              <span>Email Us</span>
                            </a>
                          </div>
                        </div>
                      </form>
                    </GlassCard>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

