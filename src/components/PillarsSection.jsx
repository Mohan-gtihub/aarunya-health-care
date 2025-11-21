import './PillarsSection.css';

const pillars = [
  {
    title: 'Advanced Biomarker Stack',
    description: '180+ labs plus continuous data streams stitched together by our longevity OS.',
    icon: '🧬'
  },
  {
    title: 'AI + Clinician Brain',
    description: 'Decision engines flag risks while physicians layer nuance + medical context.',
    icon: '🤖'
  },
  {
    title: 'Integrated Coaching',
    description: 'Nutrition, strength, recovery and mindset coaches in the same workspace.',
    icon: '🧠'
  },
  {
    title: 'Hospital-Grade Diagnostics',
    description: 'Hospital partners + at-home phlebotomy so testing is comprehensive and easy.',
    icon: '🏥'
  },
  {
    title: 'Personalized Protocols',
    description: 'From peptides to breathwork, every lever mapped to your biomarkers.',
    icon: '🎯'
  },
  {
    title: '24/7 Clinician Chat',
    description: 'Secure messaging + same-day adjustments when life happens.',
    icon: '📲'
  }
];

export default function PillarsSection() {
  return (
    <section className="thrive-section pillars" aria-labelledby="pillars-heading">
      <div className="container">
        <div className="section-head">
          <p className="section-eyebrow">How Aarunya Stands Apart</p>
          <h2 id="pillars-heading">Six pillars designed for compassionate, clinical care</h2>
          <p className="section-subcopy">
            Each pillar is system-linked—data captured in labs informs your plan, which flows to coaching, which
            loops back to clinicians.
          </p>
        </div>
        <div className="pillars-grid" role="list">
          {pillars.map((pillar) => (
            <article className="pillar-card" key={pillar.title} role="listitem">
              <div className="pillar-icon" aria-hidden="true">
                {pillar.icon}
              </div>
              <h3>{pillar.title}</h3>
              <p>{pillar.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

