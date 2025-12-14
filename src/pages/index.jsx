import Hero from '../components/Hero';
import VideoGallery from '../components/VideoGallery';
import SpecialtiesSection from '../components/SpecialtiesSection';
import HealthCheckOffers from '../components/HealthCheckOffers';
import RehabilitationSection from '../components/RehabilitationSection';
import WhyChooseSection from '../components/WhyChooseSection';
import ClinicInfoSection from '../components/ClinicInfoSection';
import ActionPlanJourney from '../components/ActionPlanJourney';

import FAQSection from '../components/FAQSection';


import Head from 'next/head';

export default function Home() {
  return (
    <main className="home-page">
      <Head>
        <title>Aarunya Health Care - Advanced Multispeciality Clinic in Hyderabad</title>
        <meta name="description" content="Top-rated multispeciality clinic in Hyderabad specializing in Diabetology, Internal Medicine, Oncology, and Longevity Services. Book an appointment today!" />
        <meta name="keywords" content="Aarunya Health Care, Multispeciality Clinic Hyderabad, Diabetologist Hyderabad, Best General Physician, Longevity Services, Health Packages" />
        <meta property="og:title" content="Aarunya Health Care - Advanced Multispeciality Clinic" />
        <meta property="og:description" content="Compassionate care meeting medical excellence. Services include Internal Medicine, Diabetology, Oncology, and more." />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://aarunyahealthcare.com/" />
      </Head>
      <Hero />
      <VideoGallery />
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
