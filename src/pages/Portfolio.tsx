import React from 'react';
import { Link } from 'react-router-dom';
import './Portfolio.css';

const Portfolio: React.FC = () => {
  return (
    <div className="portfolio-page">
      <div className="container">
        <h1>Our Portfolio</h1>
        <p className="page-description">
          Explore our latest projects and see the quality of our work.
        </p>

        <div className="coming-soon">
          <h2>🚧 Coming Soon!</h2>
          <p>
            We're currently building our portfolio page to showcase our best work.
            Check back soon to see examples of our 3D scanning, printing, and manufacturing projects.
          </p>
          <p>
            In the meantime, feel free to <Link to="/quote">contact us</Link> to discuss your project
            or request examples relevant to your needs.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Portfolio;
