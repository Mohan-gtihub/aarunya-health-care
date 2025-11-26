

const steps = [
  {
    phase: 'Step 01',
    title: 'Early Screening & Risk Assessment',
    description: 'Comprehensive evaluation for lifestyle and cancer-related diseases with advanced diagnostics.',
    duration: 'Day 0',
    touchpoints: 'Internal Medicine + Diagnostics'
  },
  {
    phase: 'Step 02',
    title: 'Comprehensive Diagnosis',
    description: 'Complete medical management with targeted therapies and multidisciplinary planning.',
    duration: 'Day 0-3',
    touchpoints: 'Specialty doctors + Diagnostics team'
  },
  {
    phase: 'Step 03',
    title: 'Targeted Treatment',
    description: 'Personalized care including oncology treatment with rehabilitation support and physiotherapy.',
    duration: 'Day 1-30',
    touchpoints: 'Oncology + Physiotherapy + Nursing'
  },
  {
    phase: 'Step 04',
    title: 'Recovery & Rehabilitation',
    description: 'Physiotherapy for chronic pain, mobility restoration, and post-surgical/post-treatment recovery.',
    duration: 'Week 2-12',
    touchpoints: 'Physiotherapy + Rehabilitation team'
  },
  {
    phase: 'Step 05',
    title: 'Long-term Health Optimization',
    description: 'Ongoing disease monitoring and lifestyle optimization for sustained wellness and longevity.',
    duration: 'Monthly/Quarterly',
    touchpoints: 'Primary care + Wellness coordinator'
  }
];

export default function ActionPlanJourney() {
  return (
    <section id="services" className="thrive-section action-plan" aria-labelledby="plan-heading">
      <div className="container">
        <div className="section-head">
          <p className="section-eyebrow">From Prevention to Recovery to Longevity</p>
          <h2 id="plan-heading">Aarunya's Complete Care Journey</h2>
          <p className="section-subcopy">
            Our care philosophy centers on strengthening the body from within through early screening, comprehensive treatment, targeted therapies, rehabilitation, and long-term health optimization.
          </p>
        </div>

        <div className="plan-stepper" role="list">
          {steps.map((step, index) => (
            <article className="plan-step" key={step.title} role="listitem">
              <div className="step-marker">{index + 1}</div>
              <p className="step-phase">{step.phase}</p>
              <h3>{step.title}</h3>
              <p className="step-copy">{step.description}</p>
              <div className="step-meta">
                <span>{step.duration}</span>
                <span>{step.touchpoints}</span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

