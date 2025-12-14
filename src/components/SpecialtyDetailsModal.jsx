import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaCheckCircle, FaCalendarCheck } from 'react-icons/fa';
import Link from 'next/link';

const SpecialtyDetailsModal = ({ isOpen, onClose, specialty }) => {
    if (!isOpen || !specialty) return null;

    return (
        <AnimatePresence>
            <div className="fixed-modal-overlay">
                <motion.div
                    className="modal-backdrop"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                />
                <motion.div
                    className="modal-container specialty-modal"
                    initial={{ opacity: 0, y: 50, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 50, scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                >
                    <button className="modal-close-btn" onClick={onClose}>
                        <FaTimes />
                    </button>

                    <div className="modal-header" style={{ borderBottomColor: `${specialty.color}20` }}>
                        <div className="modal-icon-wrapper" style={{ background: `${specialty.color}15`, color: specialty.color }}>
                            {specialty.icon}
                        </div>
                        <div className="modal-title-group">
                            <span className="category-badge" style={{ color: specialty.color, background: `${specialty.color}10` }}>
                                {specialty.category}
                            </span>
                            <h2 style={{ color: 'var(--text-dark)' }}>{specialty.title}</h2>
                        </div>
                    </div>

                    <div className="modal-body">
                        <p className="lead-text">{specialty.description}</p>

                        <div className="detailed-content">
                            <h3 style={{ color: specialty.color }}>About this Department</h3>
                            <p>{specialty.longDescription || "Experience world-class care with our specialized team dedicated to your health and recovery."}</p>
                        </div>

                        <div className="features-grid">
                            <h3 style={{ width: '100%', marginBottom: '1rem' }}>Key Services</h3>
                            {specialty.features && specialty.features.map((feature, idx) => (
                                <div key={idx} className="feature-item">
                                    <FaCheckCircle className="feature-icon" style={{ color: specialty.color }} />
                                    <span>{feature}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="modal-footer">
                        <Link href="/appointment" className="btn btn-primary btn-block modal-cta-btn" onClick={onClose}>
                            <FaCalendarCheck /> Book Consultation
                        </Link>
                    </div>
                </motion.div>
            </div>

            <style jsx global>{`
        .fixed-modal-overlay {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            z-index: 1000;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 1rem;
        }
        .modal-backdrop {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.6);
            backdrop-filter: blur(4px);
        }
        .modal-container.specialty-modal {
            position: relative;
            background: white;
            width: 100%;
            max-width: 600px;
            border-radius: 20px;
            box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
            overflow: hidden;
            max-height: 90vh;
            display: flex;
            flex-direction: column;
        }
        .modal-close-btn {
            position: absolute;
            top: 1rem;
            right: 1rem;
            background: #f3f4f6;
            border: none;
            width: 36px;
            height: 36px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #6b7280;
            cursor: pointer;
            transition: all 0.2s;
            z-index: 10;
        }
        .modal-close-btn:hover {
            background: #e5e7eb;
            color: #111827;
        }
        .modal-header {
            padding: 2rem 2rem 1.5rem;
            display: flex;
            align-items: center;
            gap: 1.5rem;
            border-bottom: 1px solid #f0f0f0;
        }
        .modal-icon-wrapper {
            width: 64px;
            height: 64px;
            border-radius: 16px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 2rem;
        }
        .modal-title-group h2 {
            margin: 0.25rem 0 0;
            font-size: 1.75rem;
        }
        .category-badge {
            font-size: 0.85rem;
            padding: 0.25rem 0.75rem;
            border-radius: 100px;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }
        .modal-body {
            padding: 2rem;
            overflow-y: auto;
        }
        .lead-text {
            font-size: 1.1rem;
            color: #4b5563;
            line-height: 1.6;
            margin-bottom: 2rem;
        }
        .detailed-content {
            margin-bottom: 2rem;
        }
        .detailed-content h3 {
            font-size: 1.25rem;
            margin-bottom: 0.75rem;
        }
        .detailed-content p {
            color: #6b7280;
            line-height: 1.6;
        }
        .features-grid {
            display: flex;
            flex-wrap: wrap;
            gap: 1rem;
        }
        .feature-item {
            display: flex;
            align-items: center;
            gap: 0.75rem;
            background: #f9fafb;
            padding: 0.75rem 1rem;
            border-radius: 8px;
            font-weight: 500;
            color: #374151;
            width: calc(50% - 0.5rem);
        }
        .modal-footer {
            padding: 1.5rem 2rem;
            border-top: 1px solid #f0f0f0;
            background: #fafafa;
        }
        @media (max-width: 640px) {
            .feature-item {
                width: 100%;
            }
            .modal-header {
                flex-direction: column;
                text-align: center;
            }
        }
      `}</style>
        </AnimatePresence>
    );
};

export default SpecialtyDetailsModal;
