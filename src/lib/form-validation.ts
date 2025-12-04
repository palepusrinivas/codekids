// Form validation utilities - Enhanced with comprehensive validation

export interface ValidationResult {
  isValid: boolean;
  error?: string;
}

/**
 * Validates a name field
 * - Must be 2-50 characters
 * - Only letters, spaces, hyphens, and apostrophes
 * - No leading/trailing spaces
 */
export const validateName = (name: string): ValidationResult => {
  if (!name || name.trim().length === 0) {
    return { isValid: false, error: 'Name is required' };
  }
  
  const trimmed = name.trim();
  
  if (trimmed.length < 2) {
    return { isValid: false, error: 'Name must be at least 2 characters long' };
  }
  
  if (trimmed.length > 50) {
    return { isValid: false, error: 'Name must be less than 50 characters' };
  }
  
  // Allow letters, spaces, hyphens, apostrophes, and common name characters
  if (!/^[a-zA-Z\s'\-\.]+$/.test(trimmed)) {
    return { isValid: false, error: 'Name can only contain letters, spaces, hyphens, apostrophes, and periods' };
  }
  
  // Check for multiple consecutive spaces
  if (/\s{2,}/.test(trimmed)) {
    return { isValid: false, error: 'Name cannot contain multiple consecutive spaces' };
  }
  
  return { isValid: true };
};

/**
 * Validates an email address
 * - Standard email format validation
 * - Checks for common typos
 */
export const validateEmail = (email: string): ValidationResult => {
  if (!email || email.trim().length === 0) {
    return { isValid: false, error: 'Email is required' };
  }
  
  const trimmed = email.trim().toLowerCase();
  
  // Basic email format check
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!emailRegex.test(trimmed)) {
    return { isValid: false, error: 'Please enter a valid email address (e.g., name@example.com)' };
  }
  
  // Check for common typos
  if (trimmed.includes('..')) {
    return { isValid: false, error: 'Email cannot contain consecutive dots' };
  }
  
  if (trimmed.startsWith('.') || trimmed.startsWith('@')) {
    return { isValid: false, error: 'Email cannot start with a dot or @ symbol' };
  }
  
  if (trimmed.endsWith('.') || trimmed.endsWith('@')) {
    return { isValid: false, error: 'Email cannot end with a dot or @ symbol' };
  }
  
  // Check domain
  const parts = trimmed.split('@');
  if (parts.length !== 2) {
    return { isValid: false, error: 'Please enter a valid email address' };
  }
  
  const domain = parts[1];
  if (domain.length < 4) {
    return { isValid: false, error: 'Email domain appears to be invalid' };
  }
  
  return { isValid: true };
};

/**
 * Validates a phone number (Indian format)
 * - Must be 10 digits
 * - Must start with 6, 7, 8, or 9
 * - Handles formatting with spaces/dashes
 */
export const validatePhone = (phone: string, required: boolean = true): ValidationResult => {
  if (!phone || phone.trim().length === 0) {
    if (required) {
      return { isValid: false, error: 'Phone number is required' };
    }
    return { isValid: true };
  }
  
  // Remove all non-digit characters
  const cleanPhone = phone.replace(/\D/g, '');
  
  // Check if empty after cleaning
  if (cleanPhone.length === 0) {
    return { isValid: false, error: 'Phone number must contain digits' };
  }
  
  // Check length
  if (cleanPhone.length < 10) {
    return { isValid: false, error: `Phone number must be 10 digits (you entered ${cleanPhone.length})` };
  }
  
  if (cleanPhone.length > 10) {
    return { isValid: false, error: 'Phone number cannot exceed 10 digits' };
  }
  
  // Indian phone number validation (must start with 6, 7, 8, or 9)
  const phoneRegex = /^[6-9]\d{9}$/;
  if (!phoneRegex.test(cleanPhone)) {
    return { isValid: false, error: 'Phone number must start with 6, 7, 8, or 9' };
  }
  
  return { isValid: true };
};

/**
 * Validates a message/textarea field
 * - Optional or required based on parameter
 * - Length validation
 */
export const validateMessage = (message: string, required: boolean = true): ValidationResult => {
  if (!message || message.trim().length === 0) {
    if (required) {
      return { isValid: false, error: 'Message is required' };
    }
    return { isValid: true };
  }
  
  const trimmed = message.trim();
  
  if (trimmed.length < 10) {
    return { isValid: false, error: 'Message must be at least 10 characters long' };
  }
  
  if (trimmed.length > 1000) {
    return { isValid: false, error: `Message must be less than 1000 characters (currently ${trimmed.length})` };
  }
  
  // Check for only whitespace
  if (/^\s+$/.test(message)) {
    return { isValid: false, error: 'Message cannot contain only spaces' };
  }
  
  return { isValid: true };
};

/**
 * Validates a select/dropdown field
 * - Checks if a value is selected
 */
export const validateSelect = (value: string, required: boolean = true): ValidationResult => {
  if (!value || value.trim().length === 0) {
    if (required) {
      return { isValid: false, error: 'Please select an option' };
    }
    return { isValid: true };
  }
  return { isValid: true };
};

/**
 * Validates a city field (optional)
 */
export const validateCity = (city: string): ValidationResult => {
  if (!city || city.trim().length === 0) {
    return { isValid: true }; // City is optional
  }
  
  const trimmed = city.trim();
  
  if (trimmed.length < 2) {
    return { isValid: false, error: 'City name must be at least 2 characters' };
  }
  
  if (trimmed.length > 50) {
    return { isValid: false, error: 'City name must be less than 50 characters' };
  }
  
  // Allow letters, spaces, hyphens, and common city name characters
  if (!/^[a-zA-Z\s'\-\.]+$/.test(trimmed)) {
    return { isValid: false, error: 'City name contains invalid characters' };
  }
  
  return { isValid: true };
};

/**
 * Validates a class/grade field (optional)
 */
export const validateClass = (classValue: string): ValidationResult => {
  if (!classValue || classValue.trim().length === 0) {
    return { isValid: true }; // Class is optional
  }
  
  const trimmed = classValue.trim();
  
  if (trimmed.length > 30) {
    return { isValid: false, error: 'Class/Grade must be less than 30 characters' };
  }
  
  return { isValid: true };
};

/**
 * Formats phone number for display/storage
 * - Removes all non-digit characters
 * - Limits to 10 digits
 */
export const formatPhoneNumber = (phone: string): string => {
  // Remove all non-digit characters
  const cleaned = phone.replace(/\D/g, '');
  // Limit to 10 digits
  return cleaned.slice(0, 10);
};

/**
 * Real-time validation helper
 * Returns validation state for UI feedback
 */
export const getValidationState = (error: string | undefined, touched: boolean) => {
  if (!touched) {
    return { isValid: null, showError: false };
  }
  return {
    isValid: !error,
    showError: !!error,
  };
};

