// services/contactService.js

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8000'; // Update with your PHP server URL
const API_ENDPOINT = `${API_BASE_URL}/movie_contact_handler.php`;

/**
 * Contact form API service
 */
class ContactService {
  /**
   * Submit contact form data
   * @param {Object} formData - The form data to submit
   * @returns {Promise<Object>} - API response
   */
  async submitContactForm(formData) {
    try {
      // Validate required fields before sending
      this.validateFormData(formData);
      
      const response = await fetch(API_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'same-origin', // Include cookies if needed
        body: JSON.stringify({
          firstName: formData.firstName?.trim() || '',
          lastName: formData.lastName?.trim() || '',
          email: formData.email?.trim() || '',
          telephone: formData.telephone?.trim() || '',
          message: formData.message?.trim() || '',
          agreeToTerms: Boolean(formData.agreeToTerms)
        })
      });

      // Parse JSON response
      const data = await response.json();

      // Handle HTTP error status codes
      if (!response.ok) {
        if (response.status === 429) {
          throw new Error('Too many requests. Please wait before submitting again.');
        } else if (response.status === 400) {
          throw new ValidationError(data.errors || ['Invalid form data']);
        } else if (response.status >= 500) {
          throw new Error('Server error. Please try again later.');
        } else {
          throw new Error(data.error || `HTTP ${response.status}: ${response.statusText}`);
        }
      }

      // Return successful response
      return {
        success: true,
        data: data,
        message: data.message || 'Form submitted successfully!'
      };

    } catch (error) {
      console.error('Contact form submission error:', error);
      
      // Handle different types of errors
      if (error instanceof ValidationError) {
        return {
          success: false,
          errors: error.errors,
          message: 'Please correct the following errors:'
        };
      } else if (error.name === 'TypeError' || error.message.includes('fetch')) {
        return {
          success: false,
          error: 'Network error. Please check your connection and try again.',
          message: 'Connection failed'
        };
      } else {
        return {
          success: false,
          error: error.message || 'An unexpected error occurred',
          message: 'Submission failed'
        };
      }
    }
  }

  /**
   * Validate form data before submission
   * @param {Object} formData 
   */
  validateFormData(formData) {
    const errors = [];

    // Required field validation
    if (!formData.firstName?.trim()) {
      errors.push('First name is required');
    }

    if (!formData.lastName?.trim()) {
      errors.push('Last name is required');
    }

    if (!formData.email?.trim()) {
      errors.push('Email is required');
    } else if (!this.isValidEmail(formData.email)) {
      errors.push('Please enter a valid email address');
    }

    if (!formData.agreeToTerms) {
      errors.push('You must agree to the Terms & Conditions');
    }

    // Optional field validation
    if (formData.telephone && !this.isValidPhone(formData.telephone)) {
      errors.push('Please enter a valid phone number');
    }

    if (errors.length > 0) {
      throw new ValidationError(errors);
    }
  }

  /**
   * Validate email format
   * @param {string} email 
   * @returns {boolean}
   */
  isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email.trim());
  }

  /**
   * Validate phone number format
   * @param {string} phone 
   * @returns {boolean}
   */
  isValidPhone(phone) {
    // Allow various international phone formats
    const phoneRegex = /^[\+]?[0-9\s\-\(\)\.]{7,20}$/;
    return phoneRegex.test(phone.trim());
  }

  /**
   * Get form submission status (if you want to check submission status)
   * @param {string} submissionId 
   * @returns {Promise<Object>}
   */
  async getSubmissionStatus(submissionId) {
    try {
      const response = await fetch(`${API_BASE_URL}/get_submission_status.php?id=${submissionId}`);
      return await response.json();
    } catch (error) {
      console.error('Error fetching submission status:', error);
      return { success: false, error: error.message };
    }
  }
}

/**
 * Custom error class for validation errors
 */
class ValidationError extends Error {
  constructor(errors) {
    super('Validation failed');
    this.name = 'ValidationError';
    this.errors = Array.isArray(errors) ? errors : [errors];
  }
}

// Create and export singleton instance
const contactService = new ContactService();
export default contactService;

// Also export the class for testing purposes
export { ContactService, ValidationError };