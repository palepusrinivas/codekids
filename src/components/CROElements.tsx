import { motion } from 'framer-motion';
import { CheckCircle, Star, Users, Award, Clock, Zap, Phone, MessageCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

interface TrustSignalProps {
  count?: string;
  label: string;
  icon: React.ReactNode;
  highlight?: boolean;
}

export function TrustSignal({ count, label, icon, highlight }: TrustSignalProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.05, y: -5 }}
      className={`flex flex-col items-center p-4 rounded-lg ${highlight ? 'bg-[#FF4FD8]/10 border-2 border-[#FF4FD8]' : 'bg-white/10 border border-white/20'}`}
    >
      <div className={`${highlight ? 'text-[#FF4FD8]' : 'text-white/70'} mb-2`}>
        {icon}
      </div>
      {count && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`text-2xl font-bold ${highlight ? 'text-[#FF4FD8]' : 'text-white'}`}
        >
          {count}
        </motion.div>
      )}
      <p className={`text-sm mt-1 ${highlight ? 'text-white font-semibold' : 'text-white/80'}`}>
        {label}
      </p>
    </motion.div>
  );
}

interface SocialProofProps {
  name: string;
  role: string;
  rating: number;
  comment: string;
  avatar?: string;
}

export function SocialProof({ name, role, rating, comment, avatar }: SocialProofProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="glass-card p-6 rounded-xl space-y-4"
    >
      <div className="flex items-center gap-3">
        <div className="h-12 w-12 rounded-full bg-gradient-to-br from-[#FF4FD8] to-[#00E0FF] flex items-center justify-center text-white font-bold">
          {avatar ? (
            <img src={avatar} alt={name} className="h-full w-full rounded-full object-cover" />
          ) : (
            name.charAt(0).toUpperCase()
          )}
        </div>
        <div className="flex-1">
          <h4 className="font-semibold text-white">{name}</h4>
          <p className="text-sm text-white/70">{role}</p>
        </div>
        <div className="flex items-center gap-1">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`h-4 w-4 ${
                i < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
              }`}
            />
          ))}
        </div>
      </div>
      <p className="text-sm text-white/90 leading-relaxed">"{comment}"</p>
    </motion.div>
  );
}

interface UrgencyBannerProps {
  message: string;
  deadline?: string;
  highlight?: boolean;
}

export function UrgencyBanner({ message, deadline, highlight }: UrgencyBannerProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className={`relative overflow-hidden rounded-lg p-4 ${
        highlight
          ? 'bg-gradient-to-r from-red-500/20 via-orange-500/20 to-yellow-500/20 border-2 border-orange-500/50'
          : 'bg-[#FF4FD8]/10 border border-[#FF4FD8]/30'
      }`}
    >
      <div className="flex items-center gap-3">
        <Clock className="h-5 w-5 text-orange-500 animate-pulse" />
        <div className="flex-1">
          <p className={`font-semibold ${highlight ? 'text-orange-700 dark:text-orange-300' : 'text-white'}`}>
            {message}
          </p>
          {deadline && (
            <p className="text-sm text-white/70 mt-1">⏰ {deadline}</p>
          )}
        </div>
      </div>
    </motion.div>
  );
}

interface CTASectionProps {
  primaryText: string;
  secondaryText?: string;
  primaryHref: string;
  secondaryHref?: string;
  highlight?: boolean;
  showPhone?: boolean;
  showWhatsApp?: boolean;
}

export function CTASection({
  primaryText,
  secondaryText,
  primaryHref,
  secondaryHref,
  highlight,
  showPhone = true,
  showWhatsApp = true,
}: CTASectionProps) {
  const phoneNumber = '+918008937902';
  const whatsappNumber = '918008937902';
  const whatsappMessage = 'Hello! I\'m interested in CodeKids Technologies courses. Can you please provide more information?';

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={`relative py-16 px-4 rounded-2xl overflow-hidden ${
        highlight
          ? 'bg-gradient-to-br from-[#FF4FD8] via-[#00E0FF] to-[#FF4FD8]/80'
          : 'bg-gradient-to-br from-[#0F1A30] to-[#050814]'
      }`}
    >
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDMwaC0yVjBoMnoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-30" />
      <div className="relative max-w-4xl mx-auto text-center space-y-8">
        <div>
          <h2 className={`text-4xl md:text-5xl font-extrabold mb-4 ${
            highlight ? 'text-white' : 'text-white'
          }`}>
            Ready to Start Your Journey?
          </h2>
          <p className={`text-lg md:text-xl ${
            highlight ? 'text-white/90' : 'text-white/80'
          }`}>
            Join thousands of students building their future with CodeKids Technologies
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link
              to={primaryHref}
              className={`inline-flex items-center gap-2 px-8 py-4 rounded-full font-bold text-lg transition-all ${
                highlight
                  ? 'bg-white text-[#FF4FD8] hover:bg-white/90 shadow-2xl'
                  : 'bg-gradient-to-r from-[#FF4FD8] to-[#00E0FF] text-white hover:shadow-xl'
              }`}
            >
              <Zap className="h-5 w-5" />
              {primaryText}
            </Link>
          </motion.div>

          {secondaryText && secondaryHref && (
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                to={secondaryHref}
                className={`inline-flex items-center gap-2 px-8 py-4 rounded-full font-semibold text-lg border-2 transition-all ${
                  highlight
                    ? 'border-white text-white hover:bg-white/10'
                    : 'border-[#FF4FD8] text-[#FF4FD8] hover:bg-[#FF4FD8]/10'
                }`}
              >
                {secondaryText}
              </Link>
            </motion.div>
          )}
        </div>

        {(showPhone || showWhatsApp) && (
          <div className="flex flex-wrap justify-center gap-4 pt-6">
            {showPhone && (
              <motion.a
                href={`tel:${phoneNumber.replace(/\s/g, '')}`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`flex items-center gap-2 px-6 py-3 rounded-full font-semibold transition-all ${
                  highlight
                    ? 'bg-white/20 text-white hover:bg-white/30'
                    : 'bg-white/10 text-white hover:bg-white/20'
                }`}
              >
                <Phone className="h-4 w-4" />
                Call {phoneNumber}
              </motion.a>
            )}
            {showWhatsApp && (
              <motion.a
                href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 px-6 py-3 rounded-full font-semibold transition-all bg-green-500 text-white hover:bg-green-600"
              >
                <MessageCircle className="h-4 w-4" />
                WhatsApp Us
              </motion.a>
            )}
          </div>
        )}

        <div className="flex flex-wrap justify-center gap-8 pt-8">
          <TrustSignal
            count="4.9/5"
            label="Rating"
            icon={<Star className="h-6 w-6" />}
          />
          <TrustSignal
            count="1,250+"
            label="Students"
            icon={<Users className="h-6 w-6" />}
          />
          <TrustSignal
            count="20+"
            label="Schools"
            icon={<Award className="h-6 w-6" />}
          />
          <TrustSignal
            count="95%"
            label="Success Rate"
            icon={<CheckCircle className="h-6 w-6" />}
          />
        </div>
      </div>
    </motion.section>
  );
}

interface GuaranteeBadgeProps {
  title: string;
  description: string;
  icon: React.ReactNode;
}

export function GuaranteeBadge({ title, description, icon }: GuaranteeBadgeProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      className="glass-card p-6 rounded-xl border-2 border-[#FF4FD8]/20 hover:border-[#FF4FD8]/40 transition-all"
    >
      <div className="flex items-start gap-4">
        <div className="p-3 rounded-lg bg-[#FF4FD8]/10 text-[#FF4FD8]">
          {icon}
        </div>
        <div>
          <h3 className="font-bold text-white mb-2">{title}</h3>
          <p className="text-sm text-white/70">{description}</p>
        </div>
      </div>
    </motion.div>
  );
}

