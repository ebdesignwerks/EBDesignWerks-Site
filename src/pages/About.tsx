import React from 'react';
import { Link } from 'react-router-dom';
import { config } from '../utils/config';
import './About.css';

const About: React.FC = () => {
  return (
    <div className="about-page">
      <div className="container">
        <h1>About {config.business.name}</h1>
        
        <section className="intro-section">
          <div className="intro-content">
            <h2>Transforming Ideas into Reality</h2>
            <p>
              {config.business.name} is an Ohio-based digital fabrication studio specializing in 
              end-to-end manufacturing solutions. We combine cutting-edge technology with personalized 
              service to help individuals and businesses bring their ideas to life.
            </p>
            <p>
              Whether you need to reverse-engineer a discontinued part, create a prototype for your 
              invention, or produce custom components for your project, we have the expertise and 
              equipment to deliver high-quality results on time and within budget.
            </p>
          </div>
          <div className="intro-image">
            <img src="/images/ebdw_scan_cube.svg" alt="EB Design Werks" />
          </div>
        </section>

        <section className="capabilities">
          <h2>Our Capabilities</h2>
          <div className="capabilities-grid">
            <div className="capability">
              <h3>Advanced Equipment</h3>
              <ul>
                <li>High-resolution structured-light 3D scanner (0.02mm accuracy)</li>
                <li>350 × 350 × 350 mm FDM 3D printer</li>
                <li>Engineering materials including PPS-CF10 carbon fiber composite</li>
                <li>Professional CAD and modeling software</li>
              </ul>
            </div>
            <div className="capability">
              <h3>Expert Services</h3>
              <ul>
                <li>3D scanning and reverse engineering</li>
                <li>Rapid prototyping and iteration</li>
                <li>Small-batch production</li>
                <li>Design consultation and optimization</li>
                <li>Powder coating and finishing services</li>
                <li>Carbon fiber composite fabrication</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="values">
          <h2>Our Values</h2>
          <div className="values-grid">
            <div className="value">
              <h3>Quality First</h3>
              <p>We never compromise on quality. Every project receives meticulous attention to detail.</p>
            </div>
            <div className="value">
              <h3>Innovation</h3>
              <p>We stay at the forefront of digital manufacturing technology to offer the best solutions.</p>
            </div>
            <div className="value">
              <h3>Partnership</h3>
              <p>We work closely with our clients to understand their needs and exceed expectations.</p>
            </div>
            <div className="value">
              <h3>Reliability</h3>
              <p>We deliver on our promises with consistent quality and on-time delivery.</p>
            </div>
          </div>
        </section>

        <section className="process">
          <h2>Our Process</h2>
          <div className="process-steps">
            <div className="step">
              <div className="step-number">1</div>
              <h3>Consultation</h3>
              <p>We discuss your project requirements and provide expert guidance on the best approach.</p>
            </div>
            <div className="step">
              <div className="step-number">2</div>
              <h3>Design & Planning</h3>
              <p>We create or refine designs, select materials, and plan the manufacturing process.</p>
            </div>
            <div className="step">
              <div className="step-number">3</div>
              <h3>Production</h3>
              <p>Using our advanced equipment, we bring your project to life with precision and care.</p>
            </div>
            <div className="step">
              <div className="step-number">4</div>
              <h3>Quality & Delivery</h3>
              <p>We inspect every part and ensure it meets specifications before delivery.</p>
            </div>
          </div>
        </section>

        <section className="cta-section">
          <h2>Ready to Work Together?</h2>
          <p>Let's discuss how we can help bring your project to life.</p>
          <Link to="/quote" className="btn btn-primary btn-large">Start Your Project</Link>
        </section>
      </div>
    </div>
  );
};

export default About;
