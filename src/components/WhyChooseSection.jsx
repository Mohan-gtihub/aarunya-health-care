import React from 'react';


const WhyChooseSection = () => {
  const advantages = [
    'Multidisciplinary expert team',
    'Advanced diagnostics & early risk detection',
    'Integrated approach from prevention to rehabilitation',
    'Patient-focused, holistic & compassionate care',
    'Long-term monitoring and follow-through'
  ];

  const isOddCount = advantages.length % 2 !== 0;

  return (
    <section className="why-choose-section" id="why-choose" style={{
      background: 'var(--neutral-900)',
      color: 'var(--neutral-50)',
      padding: '80px 0',
      position: 'relative',
      overflow: 'hidden'
    }}>
      <div className="container" style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 20px',
        position: 'relative',
        zIndex: 2
      }}>
        <div className="section-header" style={{
          textAlign: 'center',
          marginBottom: '50px'
        }}>
          <h2 className="section-title" style={{
            fontSize: '3.5rem',
            fontWeight: 800,
            marginBottom: '1rem',
            background: 'linear-gradient(90deg, var(--brand-purple), var(--brand-gold))',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            textShadow: '0 0 10px rgba(124, 77, 255, 0.3)'
          }}>
            <span className="title-highlight" style={{
              color: 'var(--brand-gold-light)'
            }}>Why Choose</span> Aarunya
          </h2>
        </div>

        <div className="why-choose-content">
          <div className="advantages-list" style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '20px',
            maxWidth: '1000px',
            margin: '0 auto'
          }}>
            {advantages.map((advantage, index) => {
              // Check if this is the last item and total count is odd
              const isLastOddItem = isOddCount && index === advantages.length - 1;

              return (
                <div
                  key={index}
                  className="advantage-item"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '15px',
                    padding: '20px',
                    background: 'rgba(255, 255, 255, 0.03)',
                    borderRadius: '8px',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    transition: 'all 0.3s ease',
                    gridColumn: isLastOddItem ? '1 / -1' : 'auto',
                    maxWidth: isLastOddItem ? '500px' : 'none',
                    margin: isLastOddItem ? '0 auto' : '0'
                  }}
                >
                  <div className="advantage-check" style={{
                    width: '30px',
                    height: '30px',
                    borderRadius: '50%',
                    background: 'var(--brand-purple)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontWeight: 'bold',
                    flexShrink: 0
                  }}>✓</div>
                  <span className="advantage-text" style={{
                    color: 'var(--neutral-50)',
                    fontSize: '1.1rem',
                    lineHeight: '1.5'
                  }}>{advantage}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseSection;