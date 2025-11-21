import Hero from '../components/Hero';
import SpecialtiesSection from '../components/SpecialtiesSection';
import RehabilitationSection from '../components/RehabilitationSection';
import PreventiveCareSection from '../components/PreventiveCareSection';
import WhyChooseSection from '../components/WhyChooseSection';
import ClinicInfoSection from '../components/ClinicInfoSection';
import ActionPlanJourney from '../components/ActionPlanJourney';

import TeamSection from '../components/TeamSection';
import FAQSection from '../components/FAQSection';
import './Home.css';

export default function Home() {
  return (
    <main className="home-page">
      <Hero />
      <SpecialtiesSection />
      <RehabilitationSection />
      <PreventiveCareSection />
      <WhyChooseSection />
      <ClinicInfoSection />
      <ActionPlanJourney />
      <TeamSection />
      <FAQSection />
    </main>
  );
}
