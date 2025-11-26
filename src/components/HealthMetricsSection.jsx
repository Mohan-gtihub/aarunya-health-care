import React, { useState } from 'react';


const healthMetrics = [
  {
    id: 1,
    name: 'Blood Pressure',
    value: '120/80',
    unit: 'mmHg',
    status: 'normal',
    icon: (
      <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
    description: 'Optimal range for cardiovascular health',
    trend: 'stable'
  },
  {
    id: 2,
    name: 'Heart Rate',
    value: '72',
    unit: 'bpm',
    status: 'normal',
    icon: (
      <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    ),
    description: 'Resting heart rate within healthy range',
    trend: 'stable'
  },
  {
    id: 3,
    name: 'Blood Sugar',
    value: '95',
    unit: 'mg/dL',
    status: 'normal',
    icon: (
      <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path d="M9 2a2 2 0 00-2 2v8a2 2 0 002 2h6a2 2 0 002-2V4a2 2 0 00-2-2H9z" />
        <path d="M9 2a2 2 0 00-2 2v8a2 2 0 002 2h6a2 2 0 002-2V4a2 2 0 00-2-2H9z" />
      </svg>
    ),
    description: 'Fasting glucose level is normal',
    trend: 'improving'
  },
  {
    id: 4,
    name: 'BMI',
    value: '23.5',
    unit: 'kg/m²',
    status: 'normal',
    icon: (
      <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
    ),
    description: 'Healthy body mass index',
    trend: 'stable'
  },
  {
    id: 5,
    name: 'Cholesterol',
    value: '180',
    unit: 'mg/dL',
    status: 'warning',
    icon: (
      <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 6v6l4 2" />
      </svg>
    ),
    description: 'Borderline high - monitor closely',
    trend: 'increasing'
  },
  {
    id: 6,
    name: 'Oxygen Saturation',
    value: '98',
    unit: '%',
    status: 'normal',
    icon: (
      <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </svg>
    ),
    description: 'Excellent oxygen saturation level',
    trend: 'stable'
  }
];

const biomarkerCategories = [
  {
    title: 'Cardiovascular',
    metrics: ['Blood Pressure', 'Heart Rate', 'Cholesterol'],
    color: 'cardio',
    icon: (
      <svg width="32" height="32" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    )
  },
  {
    title: 'Metabolic',
    metrics: ['Blood Sugar', 'BMI'],
    color: 'metabolic',
    icon: (
      <svg width="32" height="32" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 6v6l4 2" />
      </svg>
    )
  },
  {
    title: 'Respiratory',
    metrics: ['Oxygen Saturation'],
    color: 'respiratory',
    icon: (
      <svg width="32" height="32" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </svg>
    )
  }
];

export default function HealthMetricsSection() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [timeRange, setTimeRange] = useState('week');

  const filteredMetrics = selectedCategory === 'all'
    ? healthMetrics
    : healthMetrics.filter(metric => {
      const category = biomarkerCategories.find(cat =>
        cat.metrics.includes(metric.name)
      );
      return category && category.title.toLowerCase() === selectedCategory;
    });

  const getStatusColor = (status) => {
    switch (status) {
      case 'normal': return 'var(--success)';
      case 'warning': return 'var(--warning)';
      case 'critical': return 'var(--danger)';
      default: return 'var(--text-secondary)';
    }
  };

  const getTrendIcon = (trend) => {
    switch (trend) {
      case 'improving':
        return (
          <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
            <path d="M7 14l5-5 5 5z" />
          </svg>
        );
      case 'increasing':
        return (
          <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
            <path d="M7 10l5 5 5-5z" />
          </svg>
        );
      case 'decreasing':
        return (
          <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
            <path d="M7 14l5-5 5 5z" />
          </svg>
        );
      default:
        return (
          <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2v20M2 12h20" />
          </svg>
        );
    }
  };

  return (
    <section className="pmx-health-metrics-section">
      <div className="pmx-container">
        {/* Section Header */}
        <div className="pmx-section-header text-center">
          <div className="pmx-badge">
            <span>Health Analytics</span>
          </div>
          <h2 className="pmx-section-title">
            Track Your Health Metrics
          </h2>
          <p className="pmx-section-subtitle">
            Monitor your vital signs and biomarkers with our advanced health tracking system
          </p>
        </div>

        {/* Filter Controls */}
        <div className="pmx-metrics-controls">
          <div className="pmx-category-filters">
            <button
              className={`pmx-filter-btn ${selectedCategory === 'all' ? 'active' : ''}`}
              onClick={() => setSelectedCategory('all')}
            >
              All Metrics
            </button>
            {biomarkerCategories.map((category) => (
              <button
                key={category.title}
                className={`pmx-filter-btn ${selectedCategory === category.title.toLowerCase() ? 'active' : ''}`}
                onClick={() => setSelectedCategory(category.title.toLowerCase())}
              >
                {category.icon}
                <span>{category.title}</span>
              </button>
            ))}
          </div>

          <div className="pmx-time-range-selector">
            <button
              className={`pmx-time-btn ${timeRange === 'day' ? 'active' : ''}`}
              onClick={() => setTimeRange('day')}
            >
              Day
            </button>
            <button
              className={`pmx-time-btn ${timeRange === 'week' ? 'active' : ''}`}
              onClick={() => setTimeRange('week')}
            >
              Week
            </button>
            <button
              className={`pmx-time-btn ${timeRange === 'month' ? 'active' : ''}`}
              onClick={() => setTimeRange('month')}
            >
              Month
            </button>
            <button
              className={`pmx-time-btn ${timeRange === 'year' ? 'active' : ''}`}
              onClick={() => setTimeRange('year')}
            >
              Year
            </button>
          </div>
        </div>

        {/* Metrics Grid */}
        <div className="pmx-metrics-grid">
          {filteredMetrics.map((metric) => (
            <div key={metric.id} className="pmx-metric-card">
              <div className="pmx-metric-header">
                <div className="pmx-metric-icon">
                  {metric.icon}
                </div>
                <div className="pmx-metric-status" style={{ color: getStatusColor(metric.status) }}>
                  {metric.status}
                </div>
              </div>

              <div className="pmx-metric-content">
                <h3 className="pmx-metric-name">{metric.name}</h3>
                <div className="pmx-metric-value">
                  <span className="pmx-value-number">{metric.value}</span>
                  <span className="pmx-value-unit">{metric.unit}</span>
                </div>
                <p className="pmx-metric-description">{metric.description}</p>
              </div>

              <div className="pmx-metric-footer">
                <div className="pmx-metric-trend">
                  {getTrendIcon(metric.trend)}
                  <span className="pmx-trend-text">{metric.trend}</span>
                </div>
                <button className="pmx-btn pmx-btn-outline pmx-btn-sm">
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Analytics Dashboard */}
        <div className="pmx-analytics-dashboard">
          <div className="pmx-dashboard-header">
            <h3>Health Analytics Dashboard</h3>
            <p>Comprehensive view of your health trends and patterns</p>
          </div>

          <div className="pmx-dashboard-grid">
            <div className="pmx-dashboard-card">
              <h4>Overall Health Score</h4>
              <div className="pmx-score-display">
                <div className="pmx-score-circle">
                  <span className="pmx-score-value">85</span>
                  <span className="pmx-score-label">Good</span>
                </div>
              </div>
              <p className="pmx-score-description">Your overall health is in good condition with room for improvement in cholesterol management.</p>
            </div>

            <div className="pmx-dashboard-card">
              <h4>Recent Trends</h4>
              <div className="pmx-trends-list">
                <div className="pmx-trend-item positive">
                  <div className="pmx-trend-icon">↑</div>
                  <div className="pmx-trend-content">
                    <span className="pmx-trend-metric">Blood Sugar</span>
                    <span className="pmx-trend-change">-5% improvement</span>
                  </div>
                </div>
                <div className="pmx-trend-item negative">
                  <div className="pmx-trend-icon">↑</div>
                  <div className="pmx-trend-content">
                    <span className="pmx-trend-metric">Cholesterol</span>
                    <span className="pmx-trend-change">+3% increase</span>
                  </div>
                </div>
                <div className="pmx-trend-item stable">
                  <div className="pmx-trend-icon">→</div>
                  <div className="pmx-trend-content">
                    <span className="pmx-trend-metric">Blood Pressure</span>
                    <span className="pmx-trend-change">Stable</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="pmx-dashboard-card">
              <h4>Recommendations</h4>
              <div className="pmx-recommendations">
                <div className="pmx-recommendation-item">
                  <div className="pmx-rec-icon">
                    <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <div className="pmx-rec-content">
                    <h5>Increase Physical Activity</h5>
                    <p>Add 30 minutes of moderate exercise daily</p>
                  </div>
                </div>
                <div className="pmx-recommendation-item">
                  <div className="pmx-rec-icon">
                    <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                    </svg>
                  </div>
                  <div className="pmx-rec-content">
                    <h5>Dietary Changes</h5>
                    <p>Reduce saturated fats and increase fiber intake</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="pmx-metrics-cta">
          <div className="pmx-cta-content">
            <h3>Get Personalized Health Insights</h3>
            <p>Our AI-powered health analytics provide personalized recommendations based on your unique health profile and goals.</p>
            <div className="pmx-cta-actions">
              <button className="pmx-btn pmx-btn-primary">
                Start Health Assessment
              </button>
              <button className="pmx-btn pmx-btn-outline">
                Download Health Report
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
