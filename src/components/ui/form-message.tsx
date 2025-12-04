import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, XCircle, AlertCircle, Info } from 'lucide-react';
import { cn } from '@/lib/utils';

export type MessageType = 'success' | 'error' | 'warning' | 'info';

interface FormMessageProps {
  type: MessageType;
  message: string;
  className?: string;
}

const iconMap = {
  success: CheckCircle,
  error: XCircle,
  warning: AlertCircle,
  info: Info,
};

const styleMap = {
  success: 'bg-green-500/20 border-green-500/50 text-green-300',
  error: 'bg-red-500/20 border-red-500/50 text-red-300',
  warning: 'bg-yellow-500/20 border-yellow-500/50 text-yellow-300',
  info: 'bg-blue-500/20 border-blue-500/50 text-blue-300',
};

export function FormMessage({ type, message, className }: FormMessageProps) {
  const Icon = iconMap[type];
  
  return (
    <AnimatePresence>
      {message && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          className={cn(
            'flex items-center gap-2 px-4 py-3 rounded-lg border text-sm font-medium',
            styleMap[type],
            className
          )}
        >
          <Icon className="h-4 w-4 flex-shrink-0" />
          <span>{message}</span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

interface FormFieldErrorProps {
  error?: string;
  className?: string;
  id?: string;
}

export function FormFieldError({ error, className, id }: FormFieldErrorProps) {
  return (
    <AnimatePresence>
      {error && (
        <motion.p
          id={id}
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -5 }}
          transition={{ duration: 0.15 }}
          className={cn('text-red-400 text-sm mt-1 font-medium', className)}
        >
          {error}
        </motion.p>
      )}
    </AnimatePresence>
  );
}

