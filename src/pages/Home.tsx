import React from 'react';
import { Link } from 'react-router-dom';
import { config } from '../utils/config';
import { services } from '../utils/servicesData';
import './Home.css';

const Home: React.FC = () => {
  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <h1>{config.business.name}</h1>
            <h2>{config.business.tagline}</h2>
            <p className="hero-description">
              {config.business.description}
            </p>
            <div className="hero-actions">
              <Link to="/quote" className="btn btn-primary">Request Quote</Link>
              <Link to="/portfolio" className="btn btn-outline">View Portfolio</Link>
            </div>
          </div>
          <div className="hero-image">
            <img src="/images/ebdw_scan_cube.svg" alt="3D Scanning and Printing" />
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="services-overview">
        <div className="container">
          <h2>Our Services</h2>
          <div className="services-grid">
            {services.map((service) => (
              <div key={service.id} className="service-card">
                <div className="service-icon">{service.icon}</div>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
                <Link to={`/services#${service.id}`} className="service-link">
                  Learn More →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <div className="container">
          <h2>Why Choose EB Design Werks?</h2>
          <div className="features-grid">
            <div className="feature">
              <h3>🎯 Precision & Accuracy</h3>
              <p>High-resolution scanning with 0.02mm accuracy and professional-grade 3D printing capabilities.</p>
            </div>
            <div className="feature">
              <h3>⚡ Rapid Turnaround</h3>
              <p>Quick prototyping and short-run production to meet your deadlines without compromising quality.</p>
            </div>
            <div className="feature">
              <h3>🔧 Advanced Materials</h3>
              <p>From standard plastics to PPS-CF10 carbon fiber composites for high-strength applications.</p>
            </div>
            <div className="feature">
              <h3>💡 Expert Consultation</h3>
              <p>Professional design guidance and manufacturing strategy to optimize your projects.</p>
            </div>
            <div className="feature">
              <h3>🏁 Full-Service Finishing</h3>
              <p>Complete solutions including powder coating and carbon fiber reinforcement.</p>
            </div>
            <div className="feature">
              <h3>🤝 Local & Reliable</h3>
              <p>Ohio-based service with personalized attention to your project needs.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Industries Section */}
      <section className="industries">
        <div className="container">
          <h2>Industries We Serve</h2>
          <div className="industries-grid">
            <div className="industry">
              <h3>🚗 Automotive</h3>
              <p>Custom parts, discontinued components, and performance upgrades</p>
            </div>
            <div className="industry">
              <h3>🏭 Industrial</h3>
              <p>Tooling, fixtures, replacement parts, and equipment components</p>
            </div>
            <div className="industry">
              <h3>🎨 Consumer Products</h3>
              <p>Phone cases, tool holders, camera mounts, and custom accessories</p>
            </div>
            <div className="industry">
              <h3>🚜 Agriculture</h3>
              <p>Equipment repairs, custom brackets, and specialized tools</p>
            </div>
            <div className="industry">
              <h3>💡 Inventors & Startups</h3>
              <p>Prototyping, design iteration, and small-batch production</p>
            </div>
            <div className="industry">
              <h3>🎯 Hobbyists & Makers</h3>
              <p>Personal projects, modifications, and creative designs</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta">
        <div className="container">
          <h2>Ready to Start Your Project?</h2>
          <p>Transform your ideas into reality with our professional 3D scanning and manufacturing services.</p>
          <Link to="/quote" className="btn btn-primary btn-large">Get Started Today</Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
