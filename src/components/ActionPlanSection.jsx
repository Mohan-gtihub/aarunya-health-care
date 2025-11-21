import React, { useState } from 'react';
import './ActionPlanSection.css';

const actionPlans = [
  {
    id: 1,
    title: 'Weight Management Journey',
    category: 'Fitness',
    duration: '12 weeks',
    difficulty: 'Medium',
    progress: 65,
    image: 'weight-management',
    description: 'Comprehensive weight loss program with personalized nutrition and exercise plans',
    goals: [
      'Lose 8-10 kg safely',
      'Build sustainable eating habits',
      'Increase physical activity',
      'Improve metabolic health'
    ],
    milestones: [
      { week: 2, title: 'Initial Assessment', completed: true },
      { week: 4, title: 'Nutrition Plan Established', completed: true },
      { week: 6, title: 'First Fitness Goals Met', completed: true },
      { week: 8, title: 'Midpoint Review', completed: false },
      { week: 12, title: 'Final Assessment', completed: false }
    ],
    nextAction: 'Schedule mid-program consultation'
  },
  {
    id: 2,
    title: 'Heart Health Optimization',
    category: 'Cardiovascular',
    duration: '8 weeks',
    difficulty: 'Low',
    progress: 40,
    image: 'heart-health',
    description: 'Focus on improving cardiovascular health through lifestyle modifications and monitoring',
    goals: [
      'Lower blood pressure naturally',
      'Improve cholesterol levels',
      'Enhance heart function',
      'Reduce stress levels'
    ],
    milestones: [
      { week: 2, title: 'Baseline Assessment', completed: true },
      { week: 4, title: 'Lifestyle Changes Implemented', completed: true },
      { week: 6, title: 'Progress Review', completed: false },
      { week: 8, title: 'Final Evaluation', completed: false }
    ],
    nextAction: 'Complete weekly blood pressure log'
  },
  {
    id: 3,
    title: 'Stress Management & Mental Wellness',
    category: 'Mental Health',
    duration: '6 weeks',
    difficulty: 'Low',
    progress: 80,
    image: 'mental-wellness',
    description: 'Holistic approach to stress reduction and mental well-being through mindfulness and lifestyle changes',
    goals: [
      'Reduce daily stress levels',
      'Improve sleep quality',
      'Develop mindfulness practices',
      'Enhance work-life balance'
    ],
    milestones: [
      { week: 1, title: 'Stress Assessment', completed: true },
      { week: 2, title: 'Mindfulness Techniques', completed: true },
      { week: 4, title: 'Sleep Optimization', completed: true },
      { week: 6, title: 'Wellness Integration', completed: false }
    ],
    nextAction: 'Practice evening meditation routine'
  }
];

const categories = [
  { name: 'All', value: 'all', icon: '🎯' },
  { name: 'Fitness', value: 'fitness', icon: '💪' },
  { name: 'Cardiovascular', value: 'cardiovascular', icon: '❤️' },
  { name: 'Mental Health', value: 'mental-health', icon: '🧠' },
  { name: 'Nutrition', value: 'nutrition', icon: '🥗' }
];

const difficultyLevels = {
  'Low': { color: 'var(--success)', label: 'Beginner Friendly' },
  'Medium': { color: 'var(--warning)', label: 'Moderate Effort' },
  'High': { color: 'var(--danger)', label: 'Advanced' }
};

export default function ActionPlanSection() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [expandedPlan, setExpandedPlan] = useState(null);

  const filteredPlans = selectedCategory === 'all' 
    ? actionPlans 
    : actionPlans.filter(plan => plan.category.toLowerCase() === selectedCategory);

  const togglePlanExpansion = (planId) => {
    setExpandedPlan(expandedPlan === planId ? null : planId);
  };

  return (
    <section className="pmx-action-plan-section">
      <div className="pmx-container">
        {/* Section Header */}
        <div className="pmx-section-header text-center">
          <div className="pmx-badge">
            <span>Personalized Action Plans</span>
          </div>
          <h2 className="pmx-section-title">
            Your Health Journey, Tailored for You
          </h2>
          <p className="pmx-section-subtitle">
            Customized wellness programs designed to help you achieve your health goals with expert guidance and continuous support
          </p>
        </div>

        {/* Category Filter */}
        <div className="pmx-category-tabs">
          <div className="pmx-tabs-container">
            {categories.map((category) => (
              <button
                key={category.value}
                className={`pmx-tab-btn ${selectedCategory === category.value ? 'active' : ''}`}
                onClick={() => setSelectedCategory(category.value)}
              >
                <span className="pmx-tab-icon">{category.icon}</span>
                <span className="pmx-tab-label">{category.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Action Plans Grid */}
        <div className="pmx-plans-grid">
          {filteredPlans.map((plan) => (
            <div key={plan.id} className="pmx-plan-card">
              {/* Plan Header */}
              <div className="pmx-plan-header">
                <div className="pmx-plan-image">
                  <div className={`pmx-image-placeholder pmx-${plan.image}`}>
                    <div className="pmx-image-overlay">
                      <span className="pmx-category-badge">{plan.category}</span>
                    </div>
                  </div>
                </div>
                <div className="pmx-plan-meta">
                  <span className="pmx-duration-badge">
                    <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <circle cx="12" cy="12" r="10"/>
                      <path d="M12 6v6l4 2"/>
                    </svg>
                    {plan.duration}
                  </span>
                  <span 
                    className="pmx-difficulty-badge" 
                    style={{ color: difficultyLevels[plan.difficulty].color }}
                  >
                    <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                    </svg>
                    {difficultyLevels[plan.difficulty].label}
                  </span>
                </div>
              </div>

              {/* Plan Content */}
              <div className="pmx-plan-content">
                <h3 className="pmx-plan-title">{plan.title}</h3>
                <p className="pmx-plan-description">{plan.description}</p>
                
                {/* Progress Bar */}
                <div className="pmx-progress-section">
                  <div className="pmx-progress-header">
                    <span className="pmx-progress-label">Progress</span>
                    <span className="pmx-progress-value">{plan.progress}%</span>
                  </div>
                  <div className="pmx-progress-bar">
                    <div 
                      className="pmx-progress-fill" 
                      style={{ width: `${plan.progress}%` }}
                    ></div>
                  </div>
                </div>

                {/* Goals */}
                <div className="pmx-goals-section">
                  <h4 className="pmx-goals-title">Key Goals</h4>
                  <ul className="pmx-goals-list">
                    {plan.goals.map((goal, index) => (
                      <li key={index} className="pmx-goal-item">
                        <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                          <path d="M5 13l4 4L19 7"/>
                        </svg>
                        <span>{goal}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Expandable Milestones */}
                <div className="pmx-milestones-section">
                  <button 
                    className="pmx-expand-btn"
                    onClick={() => togglePlanExpansion(plan.id)}
                  >
                    <span>View Milestones</span>
                    <svg 
                      width="20" 
                      height="20" 
                      fill="none" 
                      stroke="currentColor" 
                      strokeWidth="2" 
                      viewBox="0 0 24 24"
                      className={`pmx-chevron ${expandedPlan === plan.id ? 'expanded' : ''}`}
                    >
                      <path d="M6 9l6 6 6-6"/>
                    </svg>
                  </button>
                  
                  {expandedPlan === plan.id && (
                    <div className="pmx-milestones-list">
                      {plan.milestones.map((milestone, index) => (
                        <div key={index} className={`pmx-milestone-item ${milestone.completed ? 'completed' : ''}`}>
                          <div className="pmx-milestone-marker">
                            {milestone.completed ? (
                              <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                              </svg>
                            ) : (
                              <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                <circle cx="12" cy="12" r="10"/>
                              </svg>
                            )}
                          </div>
                          <div className="pmx-milestone-content">
                            <span className="pmx-milestone-week">Week {milestone.week}</span>
                            <span className="pmx-milestone-title">{milestone.title}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Plan Footer */}
              <div className="pmx-plan-footer">
                <div className="pmx-next-action">
                  <span className="pmx-action-label">Next Action:</span>
                  <span className="pmx-action-text">{plan.nextAction}</span>
                </div>
                <div className="pmx-plan-actions">
                  <button className="pmx-btn pmx-btn-outline pmx-btn-sm">
                    View Details
                  </button>
                  <button className="pmx-btn pmx-btn-primary pmx-btn-sm">
                    Continue Plan
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Create New Plan CTA */}
        <div className="pmx-create-plan-cta">
          <div className="pmx-cta-content">
            <div className="pmx-cta-icon">
              <svg width="48" height="48" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M12 4v16m8-8H4"/>
              </svg>
            </div>
            <h3>Ready to Start Your Health Journey?</h3>
            <p>Get a personalized action plan tailored to your specific health goals and lifestyle preferences.</p>
            <div className="pmx-cta-actions">
              <button className="pmx-btn pmx-btn-primary">
                Create New Plan
              </button>
              <button className="pmx-btn pmx-btn-outline">
                Browse All Plans
              </button>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="pmx-features-showcase">
          <div className="pmx-features-header text-center">
            <h3>Why Choose Our Action Plans?</h3>
            <p>Comprehensive wellness programs designed by healthcare experts</p>
          </div>
          
          <div className="pmx-features-grid">
            <div className="pmx-feature-card">
              <div className="pmx-feature-icon">
                <svg width="32" height="32" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
              </div>
              <h4>Expert-Designed</h4>
              <p>All plans created by certified healthcare professionals and wellness experts</p>
            </div>
            
            <div className="pmx-feature-card">
              <div className="pmx-feature-icon">
                <svg width="32" height="32" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                </svg>
              </div>
              <h4>Personalized for You</h4>
              <p>Customized based on your health profile, goals, and lifestyle preferences</p>
            </div>
            
            <div className="pmx-feature-card">
              <div className="pmx-feature-icon">
                <svg width="32" height="32" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
              </div>
              <h4>Track Progress</h4>
              <p>Monitor your journey with detailed progress tracking and milestone celebrations</p>
            </div>
            
            <div className="pmx-feature-card">
              <div className="pmx-feature-icon">
                <svg width="32" height="32" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/>
                </svg>
              </div>
              <h4>Continuous Support</h4>
              <p>Get guidance from health coaches and connect with others on similar journeys</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
