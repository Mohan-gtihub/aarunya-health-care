import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './AwardsCarousel.css';

export default function AwardsCarousel({ awards }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % awards.length);
    }, 4000);

    return () => clearInterval(timer);
  }, [awards.length]);

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % awards.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + awards.length) % awards.length);
  };

  return (
    <div className="awards-carousel">
      <button onClick={prevSlide} className="carousel-nav prev" aria-label="Previous">
        ‹
      </button>

      <div className="carousel-container">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            className="carousel-slide"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5 }}
          >
            <div className="award-item">
              <div className="award-icon">🏆</div>
              <h3>{awards[currentIndex].title}</h3>
              <p>{awards[currentIndex].description || 'Excellence in Healthcare'}</p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <button onClick={nextSlide} className="carousel-nav next" aria-label="Next">
        ›
      </button>

      <div className="carousel-dots">
        {awards.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`carousel-dot ${index === currentIndex ? 'active' : ''}`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
