import React, { useState } from 'react';
import './MembershipSection.css';

const membershipPlans = [
  {
    id: 1,
    name: 'Basic Care',
    price: '₹999',
    period: 'per month',
    description: 'Essential healthcare services for individuals and families',
    features: [
      'General consultations',
      'Basic health checkups',
      'Emergency care',
      'Digital health records',
      '24/7 phone support'
    ],
    highlighted: false,
    color: 'basic'
  },
  {
    id: 2,
    name: 'Premium Care',
    price: '₹2,499',
    period: 'per month',
    description: 'Comprehensive healthcare with advanced diagnostics',
    features: [
      'Everything in Basic Care',
      'Specialist consultations',
      'Advanced diagnostics',
      'Priority appointments',
      'Home healthcare visits',
      'Personal health coach'
    ],
    highlighted: true,
    color: 'premium'
  },
  {
    id: 3,
    name: 'Executive Care',
    price: '₹4,999',
    period: 'per month',
    description: 'Complete healthcare solution with personalized services',
    features: [
      'Everything in Premium Care',
      'Executive health screenings',
      'International second opinions',
      'Dedicated care coordinator',
      'Annual wellness programs',
      'Family health management'
    ],
    highlighted: false,
    color: 'executive'
  }
];

const benefits = [
  {
    icon: (
      <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
      </svg>
    ),
    title: 'No Hidden Fees',
    description: 'Transparent pricing with no surprise charges'
  },
  {
    icon: (
      <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
      </svg>
    ),
    title: '24/7 Access',
    description: 'Round-the-clock medical support and consultations'
  },
  {
    icon: (
      <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/>
      </svg>
    ),
    title: 'Family Coverage',
    description: 'Include your entire family under one plan'
  },
  {
    icon: (
      <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
      </svg>
    ),
    title: 'Global Coverage',
    description: 'Access to our network worldwide'
  }
];

export default function MembershipSection() {
  const [selectedPlan, setSelectedPlan] = useState(2);

  return (
    <section className="pmx-membership-section">
      <div className="pmx-container">
        {/* Section Header */}
        <div className="pmx-section-header text-center">
          <div className="pmx-badge">
            <span>Membership Plans</span>
          </div>
          <h2 className="pmx-section-title">
            Choose Your Healthcare Journey
          </h2>
          <p className="pmx-section-subtitle">
            Flexible membership plans designed to meet your unique healthcare needs with comprehensive coverage and personalized care
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="pmx-benefits-grid">
          {benefits.map((benefit, index) => (
            <div key={index} className="pmx-benefit-card">
              <div className="pmx-benefit-icon">
                {benefit.icon}
              </div>
              <h3 className="pmx-benefit-title">{benefit.title}</h3>
              <p className="pmx-benefit-description">{benefit.description}</p>
            </div>
          ))}
        </div>

        {/* Pricing Cards */}
        <div className="pmx-pricing-grid">
          {membershipPlans.map((plan) => (
            <div
              key={plan.id}
              className={`pmx-pricing-card ${plan.highlighted ? 'highlighted' : ''} ${plan.color}`}
              onClick={() => setSelectedPlan(plan.id)}
            >
              {plan.highlighted && (
                <div className="pmx-popular-badge">
                  <span>Most Popular</span>
                </div>
              )}
              
              <div className="pmx-card-header">
                <h3 className="pmx-plan-name">{plan.name}</h3>
                <div className="pmx-plan-price">
                  <span className="pmx-price-amount">{plan.price}</span>
                  <span className="pmx-price-period">{plan.period}</span>
                </div>
                <p className="pmx-plan-description">{plan.description}</p>
              </div>

              <div className="pmx-plan-features">
                <ul className="pmx-features-list">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="pmx-feature-item">
                      <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path d="M5 13l4 4L19 7"/>
                      </svg>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pmx-card-footer">
                <button className={`pmx-btn pmx-btn-${plan.highlighted ? 'primary' : 'outline'} w-full`}>
                  {selectedPlan === plan.id ? 'Selected' : 'Choose Plan'}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="pmx-membership-cta">
          <div className="pmx-cta-content">
            <h3>Not sure which plan is right for you?</h3>
            <p>Our healthcare advisors are here to help you choose the perfect membership plan based on your needs.</p>
            <div className="pmx-cta-actions">
              <button className="pmx-btn pmx-btn-primary">
                <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                </svg>
                Talk to Advisor
              </button>
              <button className="pmx-btn pmx-btn-outline">
                Compare Plans
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
