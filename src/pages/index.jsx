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
        <title>Aarunya Health Care | Best Clinic in Hyderabad</title>
        <meta name="description" content="Top-rated multispeciality clinic in Hyderabad specializing in Diabetology, Internal Medicine, Oncology, and Longevity Services. Book an appointment today!" />
        <meta name="keywords" content="Aarunya Health Care, Multispeciality Clinic Hyderabad, Diabetologist Hyderabad, Best General Physician, Longevity Services, Health Packages" />
        <meta property="og:title" content="Aarunya Health Care - Advanced Multispeciality Clinic" />
        <meta property="og:description" content="Compassionate care meeting medical excellence. Services include Internal Medicine, Diabetology, Oncology, and more." />
        <meta property="og:image" content="https://aarunyahealthcare.com/images/hero-bg.png" />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://aarunyahealthcare.com/" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "MedicalBusiness",
              "name": "Aarunya Health Care",
              "image": "https://aarunyahealthcare.com/aarunya-logo.svg",
              "@id": "https://aarunyahealthcare.com",
              "url": "https://aarunyahealthcare.com",
              "telephone": "+917893231999",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "C93/+261 Shaikpet Main Rd, Shivaji Nagar, Sri Ram Nagar Colony",
                "addressLocality": "Hyderabad",
                "postalCode": "500008",
                "addressCountry": "IN"
              },
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": 17.4124,
                "longitude": 78.4034
              },
              "openingHoursSpecification": {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": [
                  "Monday",
                  "Tuesday",
                  "Wednesday",
                  "Thursday",
                  "Friday",
                  "Saturday",
                  "Sunday"
                ],
                "opens": "00:00",
                "closes": "23:59"
              },
              "sameAs": [
                "https://www.instagram.com/aarunyahealthclinics?igsh=MXF5eDhlaGxiZnRjZA=="
              ]
            })
          }}
        />
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
