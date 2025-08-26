export const validate = {
  email: (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email.trim());
  },

  required: (value: string): boolean => {
    return value.trim().length > 0;
  },

  minLength: (value: string, min: number): boolean => {
    return value.trim().length >= min;
  },

  isValidDate: (dateString: string): boolean => {
    const date = new Date(dateString);
    return !isNaN(date.getTime());
  },

  isFutureDate: (dateString: string): boolean => {
    const date = new Date(dateString);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date >= today;
  },
};

// Simple sanitization
export const sanitize = {
  input: (value: string): string => {
    return value.trim().replace(/[<>'"&]/g, '');
  },

  email: (email: string): string => {
    return email.toLowerCase().trim();
  },
};

// Validation messages
export const messages = {
  required: 'This field is required',
  invalidEmail: 'Please enter a valid email address',
  minLength: (min: number) => `Must be at least ${min} characters`,
  invalidDate: 'Please select a valid date',
  pastDate: 'Please select a future date',
};
