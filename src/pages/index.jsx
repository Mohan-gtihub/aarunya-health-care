import Hero from '../components/Hero';
import SpecialtiesSection from '../components/SpecialtiesSection';
import HealthCheckOffers from '../components/HealthCheckOffers';
import RehabilitationSection from '../components/RehabilitationSection';
import WhyChooseSection from '../components/WhyChooseSection';
import ClinicInfoSection from '../components/ClinicInfoSection';
import ActionPlanJourney from '../components/ActionPlanJourney';

import FAQSection from '../components/FAQSection';


export default function Home() {
  return (
    <main className="home-page">
      <Hero />
      <SpecialtiesSection />
      <HealthCheckOffers />
      <RehabilitationSection />
      <WhyChooseSection />
      {/* <ClinicInfoSection /> */}
      {/* <ActionPlanJourney /> */}
      <FAQSection />
    </main>
  );
}
