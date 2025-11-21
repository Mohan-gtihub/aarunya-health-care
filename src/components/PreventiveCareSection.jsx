import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Icons replaced with inline SVGs to ensure compatibility
/* SVG Definitions for Service Icons (Fa equivalents) */
const HeartbeatSVG = <svg className="service-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/><path d="M3.29 13.5L7 17l6-6 4 4"/></svg>;
const ClinicMedicalSVG = <svg className="service-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 11l8-8 8 8V21a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><path d="M9 22V12h6v10"/><path d="M12 5v12"/></svg>;
const UserMdSVG = <svg className="service-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="7" r="4"/><path d="M16 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><path d="M19 14v4"/><path d="M22 16h-6"/></svg>;
const ChartLineSVG = <svg className="service-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 3v18h18"/><path d="M18 17l-3-3-3 3-4-4-2 2"/></svg>;

// --- Helper component for image integration ---
const ResponsiveImage = ({ src, alt, color }) => {
    const errorFallback = "https://placehold.co/400x400/333333/FFFFFF?text=Image+Load+Error";
    const containerStyle = {
        borderColor: color,
        boxShadow: `0 0 20px ${color}40`,
        position: 'relative',
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: '8px',
    };

    return (
        <div className="responsive-image-wrapper" style={containerStyle}>
            <img 
                src={src} 
                alt={alt} 
                className="responsive-image"
                onError={(e) => { e.target.onerror = null; e.target.src = errorFallback; }}
            />
        </div>
    );
};

// --- CSS Styles Integrated Below (No separate CSS file required) ---

const styles = `
:root {
  --brand-purple: #5b1ea6; 
  --brand-gold: #ff8c00;   
  --brand-purple-light: #7c4dff; 
  --brand-gold-light: #ffa726;  
  --neutral-900: #05081a; /* Ultra Dark Background */
  --neutral-50: #ffffff; 
  --neutral-300: #cccccc;
  --glow-color: #7c4dff;
}

/* --- Section Container & Background --- */

.preventive-care-section {
  padding: 80px 0;
  background: var(--neutral-900);
  position: relative;
  overflow: hidden;
  color: var(--neutral-50);
  min-height: 800px;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  position: relative;
  z-index: 10;
}

/* Floating background circles (for atmospheric effect) */
.floating-circle {
  opacity: 0.05 !important; 
  filter: blur(100px); 
  pointer-events: none;
}

/* --- Header --- */

.section-header {
  text-align: center;
  margin-bottom: 50px;
}

.section-title {
  font-size: 3.5rem;
  font-weight: 800;
  margin-bottom: 0.5rem;
  letter-spacing: -1px;
  /* Glowing Text */
  background: linear-gradient(90deg, var(--glow-color), var(--brand-gold));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-shadow: 0 0 10px rgba(124, 77, 255, 0.3);
}

.section-subtitle {
  font-size: 1.1rem;
  color: var(--neutral-300);
  max-width: 600px;
  margin: 0 auto;
}

/* --- Services Container (Stepper Flow Layout) --- */

.services-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  min-height: 550px;
}

/* --- Navigation (Top Horizontal Stepper) --- */

.services-navigation {
  display: flex;
  justify-content: space-between;
  width: 100%;
  max-width: 900px;
  margin-bottom: 50px;
  position: relative;
  padding: 0 5%; 
}

/* Connecting Line */
.services-navigation::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 5%;
    right: 5%;
    height: 2px;
    background: rgba(255, 255, 255, 0.1);
    transform: translateY(-50%);
    z-index: 0;
}

.service-nav-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 25%;
  cursor: pointer;
  position: relative;
  transition: all 0.3s ease;
  z-index: 1;
}

/* Stepper Node/Dot */
.service-nav-item::after {
    content: '';
    width: 15px;
    height: 15px;
    border-radius: 50%;
    background-color: rgba(255, 255, 255, 0.2);
    border: 3px solid var(--neutral-900);
    margin-top: 10px;
    transition: all 0.3s ease;
}

.service-nav-item.active::after {
    background-color: var(--brand-gold); 
    box-shadow: 0 0 10px var(--brand-gold);
    transform: scale(1.1);
}
.service-nav-item:hover::after {
    transform: scale(1.2);
}


.service-nav-text h4 {
  margin: 0;
  font-size: 0.95rem;
  font-weight: 600;
  color: var(--neutral-300);
  text-align: center;
  transition: color 0.3s ease;
}
.service-nav-item.active .service-nav-text h4 {
    color: var(--neutral-50);
}
.service-nav-text p { display: none; } 

/* --- Service Detail (Content Area) --- */

.service-detail {
  display: flex;
  flex-direction: row; 
  width: 100%;
  max-width: 1000px; 
  padding: 40px;
  gap: 60px; 
  
  position: relative;
  border-top: 1px dashed rgba(255, 255, 255, 0.1);
  border-bottom: 1px dashed rgba(255, 255, 255, 0.1);
  background: rgba(25, 30, 50, 0.1); 
}

/* --- Graphic Area & Image Responsiveness (CRITICAL) --- */
.service-graphic {
  flex-shrink: 0;
  width: 50%;
  min-width: 400px;
  height: 400px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  
  /* Vertical dividing line effect */
  border-right: 1px solid rgba(255, 255, 255, 0.1);
  padding-right: 40px; 
}

/* Styles to make the image responsive and cover the container */
.responsive-image {
    width: 100%;
    height: 100%;
    object-fit: cover; /* Ensures image covers the area, cropping if necessary */
    display: block;
    transition: transform 0.3s ease;
}
.responsive-image:hover {
    transform: scale(1.02);
}


/* --- Content Styling --- */

.service-content {
  flex-grow: 1;
  max-width: 450px;
  padding-left: 20px;
}

.service-header {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-bottom: 25px;
}

.service-icon-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 55px;
  height: 55px;
  border-radius: 50%;
  margin-bottom: 15px;
  border: 2px solid;
  animation: pulse-wrapper 2s infinite alternate;
}

@keyframes pulse-wrapper {
    from { transform: scale(1); opacity: 0.8; }
    to { transform: scale(1.05); opacity: 1; }
}

.service-icon-wrapper .service-icon {
  font-size: 1.8rem;
  color: var(--neutral-50);
}

.service-title {
  font-size: 2rem;
  font-weight: 700;
  margin: 0;
  line-height: 1.2;
  color: var(--neutral-50); 
}

.service-subtitle {
  font-size: 1rem;
  color: var(--glow-color);
  margin: 5px 0 0 0;
  text-transform: uppercase;
  letter-spacing: 1.5px; 
  font-weight: 500;
}

.service-description {
  font-size: 1.05rem;
  line-height: 1.7;
  color: var(--neutral-300);
  margin-bottom: 30px;
}

.feature-tag {
  background-color: transparent; 
  padding: 5px 10px;
  border-radius: 3px;
  font-size: 0.9rem;
  color: var(--neutral-300);
  border: 1px solid rgba(255, 255, 255, 0.1); 
  transition: all 0.2s;
}
.feature-tag:hover {
    background-color: rgba(255, 255, 255, 0.1);
    color: var(--neutral-50);
}

.feature-check {
  margin-right: 5px;
  font-weight: 700;
}

/* --- Buttons --- */
.service-actions {
  display: flex;
  gap: 20px;
}

.primary-btn, .secondary-btn {
  padding: 12px 25px;
  border: none;
  border-radius: 5px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 1rem;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.primary-btn {
  color: var(--neutral-900);
  box-shadow: 0 0 10px var(--brand-purple)80;
}
.primary-btn:hover {
  transform: scale(1.05);
  filter: brightness(1.1);
  box-shadow: 0 0 25px var(--brand-purple)90;
}

.secondary-btn {
  background: transparent;
  border: 2px solid; 
  color: var(--brand-purple-light);
  box-shadow: none;
}
.secondary-btn:hover {
  background-color: var(--brand-purple-light);
  color: var(--neutral-900);
}


/* --- Mobile Adjustments --- */

@media (max-width: 1024px) {
  /* Content stacking */
  .service-detail {
    flex-direction: column-reverse;
    gap: 30px;
    padding: 30px 20px;
    max-width: 95%;
  }
  
  .service-graphic {
    width: 100%;
    min-width: 0;
    height: 300px;
    border-right: none;
    padding-right: 0;
  }
  
  .service-content {
    padding-left: 0;
    text-align: center;
  }
  
  .service-header {
    align-items: center;
  }
  
  .service-actions {
    justify-content: center;
  }
}

@media (max-width: 600px) {
    .section-title { font-size: 2.2rem; }
    
    .service-actions {
        flex-direction: column;
        gap: 15px;
    }
    .primary-btn, .secondary-btn {
        width: 100%;
    }
    .service-nav-text h4 {
        font-size: 0.8rem;
    }
}
`;

const AnimatedCircle = ({ color, size, top, left, delay }) => {
  return (
    <motion.div
      className="floating-circle"
      style={{
        position: 'absolute',
        width: size,
        height: size,
        borderRadius: '50%',
        background: color,
        top: top,
        left: left,
        opacity: 0.1,
      }}
      animate={{
        y: [0, 15, 0],
        scale: [1, 1.05, 1],
      }}
      transition={{
        duration: 4 + Math.random() * 2,
        repeat: Infinity,
        repeatType: 'reverse',
        delay: delay || 0,
        ease: 'easeInOut',
      }}
    />
  );
};

const PreventiveCareSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  // --- Image URLs replace SVG graphics ---
  const preventiveServices = [
    {
      icon: HeartbeatSVG,
      title: 'Holistic Assessment',
      subtitle: 'Comprehensive Evaluation',
      description: 'Advanced diagnostics and personalized health profiling to identify potential risks and optimize your wellbeing.',
      color: 'var(--brand-purple)',
      features: ['Full body checkup', 'Lifestyle analysis', 'Nutrition assessment', 'Stress evaluation'],
      graphic: (
        <ResponsiveImage 
          src="https://c7.alamy.com/comp/2XAD2P6/holistic-health-framework-infographic-diagram-chart-illustration-banner-template-with-icon-set-vector-has-physical-mental-social-spiritual-intelle-2XAD2P6.jpg" 
          alt="Holistic Health Data" 
          color="var(--brand-purple)"
        />
      )
    },
    {
      icon: ClinicMedicalSVG,
      title: 'Preventive Screenings',
      subtitle: 'Early Detection',
      color: 'var(--brand-gold)',
      description: 'State-of-the-art diagnostic tests to detect health issues before symptoms appear, enabling timely intervention.',
      features: ['Cancer screening', 'Cardiac evaluation', 'Metabolic testing', 'Genetic risk assessment'],
      graphic: (
        <ResponsiveImage 
          src="https://img.freepik.com/free-vector/flat-design-hand-drawn-patient-taking-medical-examination_23-2149251499.jpg?semt=ais_hybrid&w=740&q=80" 
          alt="Preventive Screening Report" 
          color="var(--brand-gold)"
        />
      )
    },
    {
      icon: UserMdSVG,
      title: 'Personalized Plans',
      subtitle: 'Tailored to You',
      color: 'var(--brand-purple-light)',
      description: 'Custom health strategies designed around your unique genetic makeup, lifestyle, and health goals.',
      features: ['Custom nutrition', 'Exercise programs', 'Stress management', 'Sleep optimization'],
      graphic: (
        <ResponsiveImage 
          src="https://personalizedhealth.duke.edu/sites/default/files/2023-06/CPHC%206.15.23%20v2.png" 
          alt="Personalized Care Plan" 
          color="var(--brand-purple-light)"
        />
      )
    },
    {
      icon: ChartLineSVG,
      title: 'Long-Term Wellness',
      subtitle: 'Sustained Health',
      color: 'var(--brand-gold-light)',
      description: 'Ongoing monitoring and adaptive strategies to maintain and enhance your healthspan and vitality.',
      features: ['Progress tracking', 'Regular check-ins', 'Lifestyle coaching', 'Preventive therapies'],
      graphic: (
        <ResponsiveImage 
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUddw5RqPe7EISqThs-vMOA3RoMF-C3_tLEQ&s" 
          alt="Long Term Wellness Progress" 
          color="var(--brand-gold-light)"
        />
      )
    }
  ];

  const currentService = preventiveServices[activeIndex];

  return (
    <>
      <style>{styles}</style>
      <section 
        ref={sectionRef}
        className={`preventive-care-section ${isVisible ? 'visible' : ''}`} 
        id="preventive-care"
      >
        <div className="container">
          {/* Background elements */}
          <AnimatedCircle color="var(--brand-purple)" size="300px" top="10%" left="5%" delay={0.2} />
          <AnimatedCircle color="var(--brand-gold)" size="250px" top="60%" left="80%" delay={0.4} />
          <AnimatedCircle color="var(--brand-purple-light)" size="150px" top="85%" left="15%" delay={0.6} />
          
          <div className="section-header">
            <motion.h2 
              className="section-title"
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
            >
              The <span className="title-highlight">Dynamic Stepper</span> Flow
            </motion.h2>
            <motion.p 
              className="section-subtitle"
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Our process ensures comprehensive health coverage at every step of your journey.
            </motion.p>
          </div>

          <div className="services-container">

            {/* 1. NAVIGATION (Top Horizontal Stepper) */}
            <div className="services-navigation">
                {preventiveServices.map((service, index) => (
                  <motion.div
                    key={index}
                    className={`service-nav-item ${index === activeIndex ? 'active' : ''}`}
                    onClick={() => setActiveIndex(index)}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isVisible ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.4, delay: 0.1 * index }}
                  >
                    <div className="service-nav-text">
                      <h4>{service.title}</h4>
                    </div>
                  </motion.div>
                ))}
            </div>


            {/* 2. CONTENT AREA */}
            <AnimatePresence mode="wait">
              <motion.div 
                key={activeIndex}
                className="service-detail"
                initial={{ opacity: 0, y: 20 }} 
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
              >
                <div className="service-graphic">
                  {currentService.graphic}
                </div>
                <div className="service-content">
                  <div className="service-header">
                    <div 
                      className="service-icon-wrapper"
                      style={{ 
                          // Dynamic border color and shadow for the icon wrapper
                          borderColor: currentService.color,
                          boxShadow: `0 0 15px ${currentService.color}50`
                      }}
                    >
                      {currentService.icon}
                    </div>
                    <div>
                      <h3 className="service-title">
                        {currentService.title}
                      </h3>
                      <p className="service-subtitle" style={{ color: currentService.color }}>
                        {currentService.subtitle}
                      </p>
                    </div>
                  </div>
                  
                  <p className="service-description">
                    {currentService.description}
                  </p>
                  
                  <div className="service-features">
                    {currentService.features.map((feature, i) => (
                      <div 
                          key={i} 
                          className="feature-tag"
                          style={{ borderColor: currentService.color }}
                      >
                        <span className="feature-check" style={{ color: currentService.color }}>✓</span>
                        {feature}
                      </div>
                    ))}
                  </div>
                  
                  <div className="service-actions">
                    <button 
                      className="primary-btn"
                      style={{ 
                        backgroundColor: currentService.color,
                        boxShadow: `0 4px 20px ${currentService.color}80`
                      }}
                    >
                      Learn More
                      <span className="btn-arrow">→</span>
                    </button>
                    <button 
                        className="secondary-btn"
                        style={{ borderColor: currentService.color, color: currentService.color }}
                    >
                      Book Consultation
                    </button>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
            
          </div>
        </div>
      </section>
    </>
  );
};

export default PreventiveCareSection;