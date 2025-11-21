import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const faqList = [
  {
    question: 'Do you accept walk-ins or only appointments?',
    answer: 'Both. Walk-ins are welcome for general consults, while specialty clinics are best reserved ahead of time to avoid queues.'
  },
  {
    question: 'How soon will I receive my lab reports?',
    answer: 'Most investigations are reported within the same day. Comprehensive panels are shared on email/WhatsApp within 24 hours.'
  },
  {
    question: 'Do you provide cashless/insurance support?',
    answer: 'Yes, our billing desk works with leading TPAs. Share your card before the visit and we will coordinate pre-authorisations.'
  },
  {
    question: 'Is home sample collection or physiotherapy available?',
    answer: 'Absolutely. Call our care desk before 6 pm and we will schedule at-home phlebotomy or physio sessions the next morning.'
  }
];

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section style={{
      background: 'linear-gradient(180deg, #0a0a1a 0%, #1a1a2e 100%)',
      padding: '80px 0',
      position: 'relative',
      overflow: 'hidden'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 20px'
      }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{
            textAlign: 'center',
            marginBottom: '60px'
          }}
        >
          <span style={{
            display: 'inline-block',
            color: 'var(--brand-purple-light)',
            fontSize: '1rem',
            fontWeight: 600,
            textTransform: 'uppercase',
            letterSpacing: '2px',
            marginBottom: '15px',
            position: 'relative',
            paddingLeft: '15px',
            '&:before': {
              content: '""',
              position: 'absolute',
              left: 0,
              top: '50%',
              transform: 'translateY(-50%)',
              width: '4px',
              height: '20px',
              background: 'var(--brand-gold)',
              borderRadius: '2px'
            }
          }}>
            FAQ
          </span>
          <h2 style={{
            fontSize: '2.5rem',
            fontWeight: 700,
            color: 'var(--neutral-50)',
            margin: '15px 0 20px',
            background: 'linear-gradient(90deg, var(--brand-purple), var(--brand-gold))',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            lineHeight: 1.3
          }}>
            Everything you need to know
          </h2>
          <p style={{
            color: 'var(--neutral-300)',
            fontSize: '1.1rem',
            maxWidth: '700px',
            margin: '0 auto',
            lineHeight: 1.7
          }}>
            Find answers to common questions about our services, appointments, and patient care.
          </p>
        </motion.div>

        <div style={{
          maxWidth: '800px',
          margin: '0 auto'
        }}>
          {faqList.map((faq, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              style={{
                marginBottom: '15px',
                borderRadius: '12px',
                overflow: 'hidden',
                background: 'rgba(255, 255, 255, 0.02)',
                border: '1px solid rgba(255, 255, 255, 0.05)',
                backdropFilter: 'blur(10px)'
              }}
            >
              <motion.button
                onClick={() => toggleFAQ(index)}
                style={{
                  width: '100%',
                  padding: '22px 25px',
                  textAlign: 'left',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  background: 'transparent',
                  border: 'none',
                  color: 'var(--neutral-50)',
                  cursor: 'pointer',
                  fontSize: '1.1rem',
                  fontWeight: 500
                }}
                whileHover={{ 
                  background: 'rgba(255, 255, 255, 0.03)',
                }}
              >
                <span>{faq.question}</span>
                <motion.span
                  animate={{ rotate: openIndex === index ? 45 : 0 }}
                  transition={{ duration: 0.3 }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '28px',
                    height: '28px',
                    borderRadius: '50%',
                    background: 'rgba(124, 77, 255, 0.1)',
                    color: 'var(--brand-gold)',
                    flexShrink: 0,
                    marginLeft: '15px',
                    fontSize: '1.2rem',
                    lineHeight: 1
                  }}
                >
                  +
                </motion.span>
              </motion.button>

              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ 
                      height: 'auto',
                      opacity: 1,
                      transition: {
                        height: { duration: 0.3 },
                        opacity: { duration: 0.2, delay: 0.1 }
                      }
                    }}
                    exit={{ 
                      height: 0,
                      opacity: 0,
                      transition: {
                        height: { duration: 0.2 },
                        opacity: { duration: 0.1 }
                      }
                    }}
                    style={{ overflow: 'hidden' }}
                  >
                    <div style={{
                      padding: '0 25px 25px',
                      color: 'var(--neutral-300)',
                      lineHeight: 1.7
                    }}>
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          style={{
            background: 'linear-gradient(135deg, rgba(124, 77, 255, 0.1) 0%, rgba(255, 140, 0, 0.1) 100%)',
            borderRadius: '16px',
            padding: '40px',
            marginTop: '60px',
            textAlign: 'center',
            position: 'relative',
            overflow: 'hidden',
            border: '1px solid rgba(255, 255, 255, 0.05)'
          }}
        >
          <div style={{
            position: 'absolute',
            top: '-100px',
            right: '-50px',
            width: '300px',
            height: '300px',
            background: 'radial-gradient(circle, rgba(124, 77, 255, 0.15) 0%, transparent 70%)',
            borderRadius: '50%'
          }}></div>
          
          <h3 style={{
            fontSize: '1.8rem',
            fontWeight: 700,
            color: 'var(--neutral-50)',
            marginBottom: '15px',
            position: 'relative'
          }}>
            Need a quick answer?
          </h3>
          <p style={{
            color: 'var(--neutral-300)',
            fontSize: '1.1rem',
            maxWidth: '600px',
            margin: '0 auto 25px',
            lineHeight: 1.7,
            position: 'relative'
          }}>
            Share your concern and our Aarunya care desk will call you back within one business day.
          </p>
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => window.location.assign('mailto:care@aarunyaclinics.com')}
            style={{
              background: 'linear-gradient(90deg, var(--brand-purple), var(--brand-gold))',
              color: 'white',
              border: 'none',
              padding: '15px 35px',
              borderRadius: '30px',
              fontSize: '1rem',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              boxShadow: '0 10px 20px rgba(0, 0, 0, 0.2)',
              position: 'relative',
              overflow: 'hidden',
              '&:before': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                background: 'linear-gradient(90deg, var(--brand-gold), var(--brand-purple))',
                opacity: 0,
                transition: 'opacity 0.3s ease'
              },
              '&:hover:before': {
                opacity: 1
              }
            }}
          >
            <span style={{ position: 'relative', zIndex: 1 }}>Request Callback</span>
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQSection;