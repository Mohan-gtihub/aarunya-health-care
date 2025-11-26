import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';


const faqList = [
  {
    question: 'What services does Aarunya Health Care Clinics offer?',
    answer: 'We offer multidisciplinary care across Internal Medicine, Diabetology, Oncology, Psychiatry, Physiotherapy, Daycare, and Diagnostic services. Our focus is on prevention, treatment, rehabilitation, and long-term health monitoring.'
  },
  {
    question: 'Do I need an appointment to visit?',
    answer: 'Walk-ins are allowed for basic services, but prior appointment is recommended to reduce waiting time and ensure specialist availability.'
  },
  {
    question: 'Do you provide physiotherapy after surgery or cancer treatment?',
    answer: 'Yes. Our physiotherapy team specializes in post-surgical, orthopedic, and oncology rehabilitation to enhance recovery and mobility.'
  },
  {
    question: 'Do you offer preventive health check-ups?',
    answer: 'Yes, we offer customized health packages focusing on diabetes, heart health, metabolic evaluation, cancer screening, and general wellness.'
  },
  {
    question: 'Are teleconsultations available?',
    answer: 'Yes, online consultations are available for select departments including internal medicine, diabetology, and psychiatry.'
  },
  {
    question: 'Do you have diagnostic and daycare facilities?',
    answer: 'Yes. Our in-house diagnostic lab and daycare center enable quick evaluation and short-stay procedures.'
  },
  {
    question: 'What should I bring for my first visit?',
    answer: 'Please carry your previous medical records, list of medications, and any diagnostic reports if available.'
  }
];

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="faq-section">
      <div className="faq-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="faq-header"
        >
          <span className="faq-label">
            FAQ
          </span>
          <h2 className="faq-title">
            Everything you need to know
          </h2>
          <p className="faq-subtitle">
            Find answers to common questions about our services, appointments, and patient care.
          </p>
        </motion.div>

        <div className="faq-list">
          {faqList.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="faq-item"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="faq-question-btn"
              >
                <span>{faq.question}</span>
                <motion.span
                  animate={{ rotate: openIndex === index ? 45 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="faq-icon-wrapper"
                >
                  +
                </motion.span>
              </button>

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
                    className="faq-answer-wrapper"
                  >
                    <div className="faq-answer">
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
          className="faq-cta"
        >
          <div className="faq-cta-bg-circle"></div>

          <h3 className="faq-cta-title">
            Need a quick answer?
          </h3>
          <p className="faq-cta-text">
            Share your concern and our Aarunya care desk will call you back within one business day.
          </p>
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => window.location.assign('mailto:care@aarunyaclinics.com')}
            className="faq-cta-btn"
          >
            <span>Request Callback</span>
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQSection;
