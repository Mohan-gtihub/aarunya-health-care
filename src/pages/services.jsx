import React from 'react';
import HealthPackagesSection from '../components/HealthPackagesSection';
import PreventiveCareSection from '../components/PreventiveCareSection';


export default function Services() {
    return (
        <div className="services-page">
            <div className="services-header">
                <h1>Our Services & Longevity Plans</h1>
                <p>Comprehensive care designed for your long-term wellness.</p>
            </div>
            <PreventiveCareSection />
            <HealthPackagesSection />
        </div>
    );
}
