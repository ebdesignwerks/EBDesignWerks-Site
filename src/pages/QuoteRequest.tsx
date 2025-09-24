import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { sendQuoteRequest } from '../utils/emailService';
import { sendQuoteRequestAWS } from '../utils/amplifyService';
import { services } from '../utils/servicesData';
import './QuoteRequest.css';

interface FormData {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  service: string;
  projectDescription: string;
  timeline?: string;
  budget?: string;
}

const QuoteRequest: React.FC = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>();
  const [attachments, setAttachments] = useState<File[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setAttachments(prev => [...prev, ...newFiles].slice(0, 5)); // Limit to 5 files
    }
  };

  const removeAttachment = (index: number) => {
    setAttachments(prev => prev.filter((_, i) => i !== index));
  };

  // Check if we're using AWS Amplify or EmailJS
  const useAWS = typeof window !== 'undefined' && window.location.hostname !== 'localhost';

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    setSubmitStatus('idle');
    setErrorMessage('');

    try {
      if (useAWS) {
        // Use AWS services for production
        await sendQuoteRequestAWS({
          ...data,
          attachments,
        });
      } else {
        // Use EmailJS for local development
        const attachmentUrls = attachments.map(file => 
          `[File: ${file.name} (${(file.size / 1024).toFixed(2)}KB)]`
        );
        await sendQuoteRequest({
          ...data,
          attachmentUrls,
        });
      }

      setSubmitStatus('success');
      reset();
      setAttachments([]);
    } catch (error) {
      setSubmitStatus('error');
      setErrorMessage(error instanceof Error ? error.message : 'An error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="quote-request">
      <div className="container">
        <h1>Request a Quote</h1>
        <p className="page-description">
          Tell us about your project and we'll provide a detailed quote. Upload photos or drawings to help us understand your needs better.
        </p>

        {submitStatus === 'success' && (
          <div className="alert alert-success">
            Thank you! Your quote request has been sent successfully. We'll respond within 24 hours.
          </div>
        )}

        {submitStatus === 'error' && (
          <div className="alert alert-error">
            {errorMessage}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="quote-form">
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="name">Name *</label>
              <input
                type="text"
                id="name"
                {...register('name', { required: 'Name is required' })}
                className={errors.name ? 'error' : ''}
              />
              {errors.name && <span className="error-message">{errors.name.message}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="email">Email *</label>
              <input
                type="email"
                id="email"
                {...register('email', {
                  required: 'Email is required',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Invalid email address'
                  }
                })}
                className={errors.email ? 'error' : ''}
              />
              {errors.email && <span className="error-message">{errors.email.message}</span>}
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="phone">Phone</label>
              <input
                type="tel"
                id="phone"
                {...register('phone')}
              />
            </div>

            <div className="form-group">
              <label htmlFor="company">Company</label>
              <input
                type="text"
                id="company"
                {...register('company')}
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="service">Service Required *</label>
            <select
              id="service"
              {...register('service', { required: 'Please select a service' })}
              className={errors.service ? 'error' : ''}
            >
              <option value="">Select a service...</option>
              {services.map(service => (
                <option key={service.id} value={service.title}>
                  {service.title}
                </option>
              ))}
              <option value="Multiple Services">Multiple Services</option>
              <option value="Not Sure">Not Sure - Need Consultation</option>
            </select>
            {errors.service && <span className="error-message">{errors.service.message}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="projectDescription">Project Description *</label>
            <textarea
              id="projectDescription"
              rows={6}
              {...register('projectDescription', {
                required: 'Please describe your project',
                minLength: {
                  value: 20,
                  message: 'Please provide more details (at least 20 characters)'
                }
              })}
              className={errors.projectDescription ? 'error' : ''}
              placeholder="Please describe your project in detail. Include dimensions, materials, quantities, and any specific requirements..."
            />
            {errors.projectDescription && <span className="error-message">{errors.projectDescription.message}</span>}
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="timeline">Timeline</label>
              <select id="timeline" {...register('timeline')}>
                <option value="">Select timeline...</option>
                <option value="ASAP">ASAP</option>
                <option value="Within 1 week">Within 1 week</option>
                <option value="Within 2 weeks">Within 2 weeks</option>
                <option value="Within 1 month">Within 1 month</option>
                <option value="Flexible">Flexible</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="budget">Budget Range</label>
              <select id="budget" {...register('budget')}>
                <option value="">Select budget...</option>
                <option value="Under $250">Under $250</option>
                <option value="$250 - $500">$250 - $500</option>
                <option value="$500 - $1,000">$500 - $1,000</option>
                <option value="$1,000 - $2,500">$1,000 - $2,500</option>
                <option value="$2,500+">$2,500+</option>
                <option value="Need Quote">Need Quote First</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="attachments">Upload Files (Photos, Drawings, CAD Files)</label>
            <div className="file-upload-area">
              <input
                type="file"
                id="attachments"
                onChange={handleFileChange}
                multiple
                accept="image/*,.pdf,.stl,.step,.stp,.iges,.igs,.obj,.3mf"
                className="file-input"
              />
              <label htmlFor="attachments" className="file-upload-label">
                <span>📎 Click to upload or drag files here</span>
                <small>Max 5 files. Accepted: Images, PDF, STL, STEP, IGES, OBJ, 3MF</small>
              </label>
            </div>
            
            {attachments.length > 0 && (
              <div className="attachments-list">
                {attachments.map((file, index) => (
                  <div key={index} className="attachment-item">
                    <span>{file.name} ({(file.size / 1024).toFixed(2)} KB)</span>
                    <button
                      type="button"
                      onClick={() => removeAttachment(index)}
                      className="remove-btn"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="form-actions">
            <button
              type="submit"
              disabled={isSubmitting}
              className="btn btn-primary btn-large"
            >
              {isSubmitting ? 'Sending...' : 'Submit Quote Request'}
            </button>
          </div>
        </form>

        <div className="contact-info">
          <h3>Direct Contact</h3>
          <p>Prefer to reach out directly? Email us at <a href="mailto:ebdesignwerks@gmail.com">ebdesignwerks@gmail.com</a></p>
        </div>
      </div>
    </div>
  );
};

export default QuoteRequest;
