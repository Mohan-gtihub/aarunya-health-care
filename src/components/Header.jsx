import { useState, useEffect, useCallback } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import AarunyaLogo from '../assets/aarunya-logo.svg';
import './Header.css';

const navLinks = [
  { label: 'Team', hash: '#team' },
  { label: 'FAQ', hash: '#faq' },
  { label: 'About', route: '/about' },
  { label: 'Doctors', route: '/doctors' },
  { label: 'Contact Us', hash: '#contact-cta' }
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const scrollToTarget = useCallback((hash) => {
    const target = document.querySelector(hash);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, []);

  const handleNavClick = (event, hash) => {
    event.preventDefault();
    setMenuOpen(false);

    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => scrollToTarget(hash), 120);
    } else {
      scrollToTarget(hash);
    }
  };

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 16);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (menuOpen) {
      document.body.classList.add('menu-open');
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
      document.body.style.height = '100%';
    } else {
      document.body.classList.remove('menu-open');
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
      document.body.style.height = '';
    }

    return () => {
      document.body.classList.remove('menu-open');
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
      document.body.style.height = '';
    };
  }, [menuOpen]);

  return (
    <header className={`thrive-header ${scrolled ? 'is-scrolled' : ''}`} aria-label="Primary navigation">
      <div className="thrive-header__inner">
        <Link to="/" className="thrive-logo" aria-label="Aarunya Healthcare Clinics - Best Multispeciality Clinic">
          <img src={AarunyaLogo} alt="Aarunya Healthcare Clinics - Best Healthcare Clinic with Diabetologist, Internal Medicine Specialist, Oncology Consultation" className="thrive-logo__img" />
          <div className="thrive-logo__text">
            <span className="thrive-logo__title">Aarunya Healthcare Clinics</span>
            <span className="thrive-logo__tagline">Empathy · Expertise · Excellence</span>
          </div>
        </Link>

        <nav className={`thrive-nav ${menuOpen ? 'is-open' : ''}`} aria-label="Section navigation">
          <div className="mobile-nav-header">
            <button
              className="mobile-close-btn"
              onClick={() => setMenuOpen(false)}
              aria-label="Close navigation menu"
            >
              ✕
            </button>
          </div>
          <ul className="thrive-nav__list">
            {navLinks.map((link) => (
              <li key={link.label}>
                {link.hash ? (
                  <a
                    href={link.hash}
                    className="thrive-nav__link"
                    onClick={(event) => handleNavClick(event, link.hash)}
                  >
                    {link.label}
                  </a>
                ) : (
                  <Link className="thrive-nav__link" to={link.route} onClick={() => setMenuOpen(false)}>
                    {link.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>

          <div className="thrive-header__cta thrive-header__cta--mobile">
            <Link to="/appointment" className="thrive-btn thrive-btn--primary" onClick={() => setMenuOpen(false)}>
              Request Callback
            </Link>
          </div>
        </nav>

        <div className="thrive-header__cta thrive-header__cta--desktop">
          <Link to="/appointment" className="thrive-btn thrive-btn--primary">
            Book Appointment
          </Link>
        </div>

        <button
          className={`thrive-menu ${menuOpen ? 'is-active' : ''}`}
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-label="Toggle navigation"
          aria-expanded={menuOpen}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </header>
  );
}
