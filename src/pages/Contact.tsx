import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, Loader2, CheckCircle } from 'lucide-react';
import { GlassCard } from '@/components/ui/glass-card';
import { FormMessage, FormFieldError } from '@/components/ui/form-message';
import { 
  validateName, 
  validateEmail, 
  validatePhone, 
  validateMessage, 
  validateSelect,
  formatPhoneNumber 
} from '@/lib/form-validation';
import { formatContactEmail, sendEmail } from '@/lib/email-service';

interface FormData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  subject?: string;
  message?: string;
}

export default function Contact() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{ type: 'success' | 'error' | null; message: string }>({ type: null, message: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name as keyof FormErrors];
        return newErrors;
      });
    }
  };

  const handleBlur = (field: string) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    validateField(field, formData[field as keyof FormData]);
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
        validationResult = validatePhone(value, false);
        break;
      case 'subject':
        validationResult = validateSelect(value, true);
        break;
      case 'message':
        validationResult = validateMessage(value, true);
        break;
      default:
        return;
    }

    if (!validationResult || !validationResult.isValid) {
      const errorMessage = validationResult?.error;
      if (errorMessage) {
        setErrors((prev) => ({ ...prev, [field]: errorMessage }));
      }
    } else {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field as keyof FormErrors];
        return newErrors;
      });
    }
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    const nameValidation = validateName(formData.name);
    if (!nameValidation.isValid && nameValidation.error) {
      newErrors.name = nameValidation.error;
    }

    const emailValidation = validateEmail(formData.email);
    if (!emailValidation.isValid && emailValidation.error) {
      newErrors.email = emailValidation.error;
    }

    if (formData.phone) {
      const phoneValidation = validatePhone(formData.phone, false);
      if (!phoneValidation.isValid && phoneValidation.error) {
        newErrors.phone = phoneValidation.error;
      }
    }

    const subjectValidation = validateSelect(formData.subject, true);
    if (!subjectValidation.isValid && subjectValidation.error) {
      newErrors.subject = subjectValidation.error;
    }

    const messageValidation = validateMessage(formData.message, true);
    if (!messageValidation.isValid && messageValidation.error) {
      newErrors.message = messageValidation.error;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitStatus({ type: null, message: '' });

    // Mark all fields as touched
    const allFields = ['name', 'email', 'phone', 'subject', 'message'];
    const newTouched: Record<string, boolean> = {};
    allFields.forEach((field) => {
      newTouched[field] = true;
    });
    setTouched(newTouched);

    if (!validateForm()) {
      setSubmitStatus({ type: 'error', message: 'Please fix the errors in the form before submitting.' });
      return;
    }

    setIsSubmitting(true);

    try {
      // Format phone number if provided
      const formattedData = {
        ...formData,
        phone: formData.phone ? formatPhoneNumber(formData.phone) : '',
      };

      // Send email to codekidstech2025@gmail.com
      const emailData = formatContactEmail(formattedData);
      const emailResult = await sendEmail(emailData);

      if (!emailResult.success) {
        throw new Error(emailResult.error || 'Failed to send email');
      }

      console.log('Form submitted and email sent:', formattedData);

      setSubmitStatus({
        type: 'success',
        message: 'Thank you! Your message has been sent successfully. We\'ll get back to you within 24 hours.',
      });

      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
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
        message: 'Something went wrong. Please try again later or contact us directly.',
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
      const phoneValidation = validatePhone(formatted, false);
      if (!phoneValidation.isValid && phoneValidation.error) {
        setErrors((prev) => ({ ...prev, phone: phoneValidation.error }));
      } else {
        setErrors((prev) => {
          const newErrors = { ...prev };
          delete newErrors.phone;
          return newErrors;
        });
      }
    } else {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors.phone;
        return newErrors;
      });
    }
  };
  
  // Real-time validation on change for email
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setFormData((prev) => ({ ...prev, email: value }));
    
    // Clear error when user starts typing
    if (errors.email) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors.email;
        return newErrors;
      });
    }
    
    // Real-time validation if field is touched
    if (touched.email && value.length > 0) {
      const emailValidation = validateEmail(value);
      if (!emailValidation.isValid && emailValidation.error) {
        setErrors((prev) => ({ ...prev, email: emailValidation.error }));
      }
    }
  };
  
  // Real-time validation on change for name
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setFormData((prev) => ({ ...prev, name: value }));
    
    // Clear error when user starts typing
    if (errors.name) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors.name;
        return newErrors;
      });
    }
    
    // Real-time validation if field is touched
    if (touched.name && value.length > 0) {
      const nameValidation = validateName(value);
      if (!nameValidation.isValid && nameValidation.error) {
        setErrors((prev) => ({ ...prev, name: nameValidation.error }));
      }
    }
  };

  return (
    <>
      <Helmet>
        <title>Contact Us | CodeKids Technologies</title>
        <meta name="description" content="Get in touch with CodeKids Technologies. Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible." />
      </Helmet>
      <div className="min-h-screen py-12 sm:py-16 md:py-20 relative">
        <div className="absolute inset-0 z-0">
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-10 dark:opacity-5"
            style={{ backgroundImage: "url('https://images.pexels.com/photos/7688336/pexels-photo-7688336.jpeg?auto=compress&cs=tinysrgb&w=1920')" }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/90 via-background/95 to-background" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h1 className="text-foreground text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 font-heading leading-tight">
              Get in <span className="bg-gradient-to-r from-[#FF4B8F] via-[#7B3DFF] to-[#2ED0FF] bg-clip-text text-transparent">Touch</span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto px-2">
              Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-6 sm:gap-8">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="lg:col-span-1"
            >
              <GlassCard className="h-full p-5 sm:p-6 space-y-5 sm:space-y-6">
                <div>
                  <h3 className="text-xl font-bold mb-4 font-heading">Contact Information</h3>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <Mail className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                      <div>
                        <p className="font-medium">Email</p>
                        <a href="mailto:codekidstech2025@gmail.com" className="text-muted-foreground hover:text-primary transition-colors">
                          codekidstech2025@gmail.com
                        </a>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Phone className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                      <div>
                        <p className="font-medium">Phone</p>
                        <a href="tel:+918008937902" className="text-muted-foreground hover:text-primary transition-colors">
                          +91 800 893 7902
                        </a>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <MapPin className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                      <div>
                        <p className="font-medium">Location</p>
                        <p className="text-muted-foreground leading-relaxed">
                          Plot no 264, Flat no 102 & 202, Road no 14, Swamy Ayyappa society, Madhapur, 500081 Hyderabad, Telangana, India
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-6 border-t border-border">
                  <h4 className="font-semibold mb-3">Office Hours</h4>
                  <p className="text-sm text-muted-foreground">Monday - Friday: 9:00 AM - 6:00 PM</p>
                  <p className="text-sm text-muted-foreground">Saturday: 10:00 AM - 4:00 PM</p>
                  <p className="text-sm text-muted-foreground">Sunday: Closed</p>
                </div>
              </GlassCard>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="lg:col-span-2"
            >
              <GlassCard className="p-5 sm:p-6 md:p-8">
                <h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 font-heading">Send us a Message</h3>
                
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
                      <label htmlFor="name" className="block text-sm font-semibold mb-2">
                        Name *
                      </label>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        value={formData.name}
                        onChange={handleNameChange}
                        onBlur={() => handleBlur('name')}
                        className={`w-full px-4 py-3 rounded-lg bg-secondary border transition-all ${
                          errors.name && touched.name
                            ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
                            : formData.name && !errors.name && touched.name
                            ? 'border-green-500 focus:ring-green-500 focus:border-green-500'
                            : 'border-border focus:ring-primary'
                        } focus:outline-none focus:ring-2`}
                        placeholder="Enter your full name"
                        aria-invalid={errors.name && touched.name ? 'true' : 'false'}
                        aria-describedby={errors.name && touched.name ? 'name-error' : 'name-help'}
                        autoComplete="name"
                      />
                      {!errors.name && touched.name && formData.name && (
                        <p id="name-help" className="text-xs text-green-500 mt-1 flex items-center gap-1">
                          <CheckCircle className="h-3 w-3" />
                          Name looks good
                        </p>
                      )}
                      {errors.name && touched.name && (
                        <FormFieldError id="name-error" error={errors.name} />
                      )}
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-semibold mb-2">
                        Email *
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleEmailChange}
                        onBlur={() => handleBlur('email')}
                        className={`w-full px-4 py-3 rounded-lg bg-secondary border transition-all ${
                          errors.email && touched.email
                            ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
                            : formData.email && !errors.email && touched.email
                            ? 'border-green-500 focus:ring-green-500 focus:border-green-500'
                            : 'border-border focus:ring-primary'
                        } focus:outline-none focus:ring-2`}
                        placeholder="your.email@example.com"
                        aria-invalid={errors.email && touched.email ? 'true' : 'false'}
                        aria-describedby={errors.email && touched.email ? 'email-error' : 'email-help'}
                        autoComplete="email"
                      />
                      {!errors.email && touched.email && formData.email && (
                        <p id="email-help" className="text-xs text-green-500 mt-1 flex items-center gap-1">
                          <CheckCircle className="h-3 w-3" />
                          Email looks valid
                        </p>
                      )}
                      {errors.email && touched.email && (
                        <FormFieldError id="email-error" error={errors.email} />
                      )}
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="phone" className="block text-sm font-semibold mb-2">
                        Phone
                      </label>
                      <input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handlePhoneChange}
                        onBlur={() => handleBlur('phone')}
                        maxLength={10}
                        className={`w-full px-4 py-3 rounded-lg bg-secondary border transition-all ${
                          errors.phone && touched.phone
                            ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
                            : formData.phone && formData.phone.length === 10 && !errors.phone && touched.phone
                            ? 'border-green-500 focus:ring-green-500 focus:border-green-500'
                            : 'border-border focus:ring-primary'
                        } focus:outline-none focus:ring-2`}
                        placeholder="10-digit phone number"
                        aria-invalid={errors.phone && touched.phone ? 'true' : 'false'}
                        aria-describedby={errors.phone && touched.phone ? 'phone-error' : 'phone-help'}
                        autoComplete="tel"
                      />
                      {formData.phone && (
                        <p id="phone-help" className={`text-xs mt-1 ${
                          formData.phone.length === 10 && !errors.phone
                            ? 'text-green-500 flex items-center gap-1'
                            : 'text-muted-foreground'
                        }`}>
                          {formData.phone.length === 10 && !errors.phone ? (
                            <>
                              <CheckCircle className="h-3 w-3" />
                              Phone number is valid
                            </>
                          ) : (
                            `${formData.phone.length}/10 digits`
                          )}
                        </p>
                      )}
                      {errors.phone && touched.phone && (
                        <FormFieldError id="phone-error" error={errors.phone} />
                      )}
                    </div>
                    <div>
                      <label htmlFor="subject" className="block text-sm font-semibold mb-2">
                        Subject *
                      </label>
                      <select
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        onBlur={() => handleBlur('subject')}
                        className={`w-full px-4 py-3 rounded-lg bg-secondary border transition-all ${
                          errors.subject && touched.subject
                            ? 'border-red-500 focus:ring-red-500'
                            : 'border-border focus:ring-primary'
                        } focus:outline-none focus:ring-2`}
                        aria-invalid={errors.subject && touched.subject ? 'true' : 'false'}
                        aria-describedby={errors.subject && touched.subject ? 'subject-error' : undefined}
                      >
                        <option value="">Select a subject</option>
                        <option value="general">General Inquiry</option>
                        <option value="partnership">School Partnership</option>
                        <option value="enrollment">Student Enrollment</option>
                        <option value="other">Other</option>
                      </select>
                      {errors.subject && touched.subject && (
                        <FormFieldError id="subject-error" error={errors.subject} />
                      )}
                    </div>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-semibold mb-2">
                      Message *
                    </label>
                      <textarea
                      id="message"
                      name="message"
                      rows={6}
                      value={formData.message}
                      onChange={handleChange}
                      onBlur={() => handleBlur('message')}
                      className={`w-full px-4 py-3 rounded-lg bg-secondary border transition-all resize-none ${
                        errors.message && touched.message
                          ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
                          : formData.message && formData.message.length >= 10 && !errors.message && touched.message
                          ? 'border-green-500 focus:ring-green-500 focus:border-green-500'
                          : 'border-border focus:ring-primary'
                      } focus:outline-none focus:ring-2`}
                      placeholder="How can we help you? (Minimum 10 characters)"
                      aria-invalid={errors.message && touched.message ? 'true' : 'false'}
                      aria-describedby={errors.message && touched.message ? 'message-error' : 'message-help'}
                    />
                    <div className="flex items-center justify-between mt-1">
                      <p id="message-help" className={`text-xs ${
                        formData.message.length >= 10 && formData.message.length <= 1000 && !errors.message
                          ? 'text-green-500 flex items-center gap-1'
                          : formData.message.length > 1000
                          ? 'text-red-500'
                          : 'text-muted-foreground'
                      }`}>
                        {formData.message.length >= 10 && formData.message.length <= 1000 && !errors.message && touched.message ? (
                          <>
                            <CheckCircle className="h-3 w-3" />
                            Message looks good
                          </>
                        ) : (
                          `${formData.message.length}/1000 characters`
                        )}
                      </p>
                      {formData.message.length >= 10 && formData.message.length < 1000 && (
                        <span className="text-xs text-green-500">✓</span>
                      )}
                    </div>
                    {errors.message && touched.message && (
                      <FormFieldError id="message-error" error={errors.message} />
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full flex items-center justify-center gap-2 py-4 rounded-full bg-ck-gradient-main text-white font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="h-5 w-5 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        Send Message
                        <Send className="h-5 w-5" />
                      </>
                    )}
                  </button>
                </form>
              </GlassCard>
            </motion.div>
          </div>
        </div>
      </div>
    </>
  );
}
