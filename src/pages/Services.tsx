import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { services } from '../utils/servicesData';
import './Services.css';

const Services: React.FC = () => {
  const location = useLocation();

  useEffect(() => {
    // Scroll to specific service if hash is present
    if (location.hash) {
      const element = document.querySelector(location.hash);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  }, [location]);

  return (
    <div className="services-page">
      <div className="container">
        <h1>Our Services</h1>
        <p className="page-description">
          From concept to completion, we offer comprehensive digital fabrication services to bring your ideas to life.
        </p>

        <div className="services-list">
          {services.map((service) => (
            <section key={service.id} id={service.id} className="service-section">
              <div className="service-header">
                <span className="service-icon">{service.icon}</span>
                <h2>{service.title}</h2>
              </div>

              <p className="service-description">{service.description}</p>

              <div className="service-content">
                <div className="service-features">
                  <h3>Features & Capabilities</h3>
                  <ul>
                    {service.features.map((feature, index) => (
                      <li key={index}>{feature}</li>
                    ))}
                  </ul>
                </div>

                <div className="service-pricing">
                  <h3>Pricing Information</h3>
                  {service.pricing.minimum && (
                    <p className="pricing-highlight">
                      Starting at <strong>${service.pricing.minimum}</strong> minimum
                    </p>
                  )}
                  {service.pricing.hourly && (
                    <p className="pricing-highlight">
                      Hourly rate: <strong>${service.pricing.hourly}/hour</strong>
                    </p>
                  )}
                  {service.pricing.factors && (
                    <>
                      <h4>Pricing Factors:</h4>
                      <ul className="pricing-factors">
                        {service.pricing.factors.map((factor, index) => (
                          <li key={index}>{factor}</li>
                        ))}
                      </ul>
                    </>
                  )}
                </div>
              </div>

              <div className="service-cta">
                <Link to="/quote" className="btn btn-primary">
                  Get Quote for {service.title}
                </Link>
              </div>
            </section>
          ))}
        </div>

        <section className="additional-info">
          <h2>Why Choose EB Design Werks?</h2>
          <div className="info-grid">
            <div className="info-item">
              <h3>🏆 Quality Assurance</h3>
              <p>Every project undergoes rigorous quality checks to ensure it meets your specifications and our high standards.</p>
            </div>
            <div className="info-item">
              <h3>🤝 Personalized Service</h3>
              <p>Work directly with experienced professionals who understand your needs and provide expert guidance.</p>
            </div>
            <div className="info-item">
              <h3>💰 Competitive Pricing</h3>
              <p>Transparent pricing with no hidden fees. We provide detailed quotes so you know exactly what to expect.</p>
            </div>
            <div className="info-item">
              <h3>⏱️ Fast Turnaround</h3>
              <p>Most projects completed within days, not weeks. Rush service available for urgent needs.</p>
            </div>
          </div>
        </section>

        <section className="cta-section">
          <h2>Ready to Start Your Project?</h2>
          <p>Contact us today for a free consultation and quote.</p>
          <Link to="/quote" className="btn btn-primary btn-large">Request a Quote</Link>
        </section>
      </div>
    </div>
  );
};

export default Services;
