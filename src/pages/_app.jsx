import '../index.css'
import Head from 'next/head'
import Header from '../components/Header'
import Footer from '../components/Footer'

// Global CSS Imports
import '../components/AboutUs.css'
import '../components/ActionPlanJourney.css'
import '../components/ActionPlanSection.css'
import '../components/AppointmentBooking.css'
import '../components/AppointmentForm.css'
import '../components/AwardsCarousel.css'
import '../components/CalendarPicker.css'
import '../components/ChatWidget.css'
import '../components/ClinicInfoSection.css'
import '../components/DepartmentCard.css'
import '../components/DoctorCard.css'
import '../components/DoctorModal.css'
import '../components/FAQSection.css'
import '../components/Footer.css'
import '../components/Header.css'
import '../components/HealthMetricsSection.css'
import '../components/HealthPackagesSection.css'
import '../components/HealthCheckOffers.css'
import '../components/Hero.css'
import '../components/MembershipSection.css'
import '../components/PillarsSection.css'
import '../components/PreventiveCareSection.css'
import '../components/RehabilitationSection.css'
import '../components/SearchBar.css'
import '../components/SpecialtiesSection.css'
import '../components/TeamSection.css'
import '../components/WhyChooseSection.css'

// Page CSS Imports
import './about.css'
import './appointment.css'
import './contact.css'
import './departments.css'
import './doctors.css'
import './equipment.css'
import './home.css'
import './patient-portal.css'
import './services.css'

export default function MyApp({ Component, pageProps }) {
    return (
        <>
            <Head>
                <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5, user-scalable=yes" />
            </Head>
            <div className="app">
                <Header />
                <main>
                    <Component {...pageProps} />
                </main>
                <Footer />
            </div>
        </>
    )
}
