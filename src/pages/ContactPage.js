import Container from '../components/ui/Container';
import ButtonLink from '../components/ui/ButtonLink';
import { BOOKING_URL } from '../constants';
import site from '../data/site.json';
import { usePageMeta } from '../hooks/usePageMeta';
import styles from './ContactPage.module.css';

const FORMSPREE_ENDPOINT =
  process.env.REACT_APP_FORMSPREE_ENDPOINT || 'https://formspree.io/f/yourFormId';

export default function ContactPage() {
  usePageMeta({
    title: 'Contact',
    description:
      'Contactez Ongles Diamant Rose à Montréal: infos, heures et formulaire. Les réservations se font en ligne.'
  });

  return (
    <div className={styles.page}>
      <Container>
        <header className={styles.header}>
          <h1 className={styles.h1}>Contact</h1>
          <p className={styles.lead}>
            For appointments, please use our external booking platform. For questions, send us a message below.
          </p>
          <div className={styles.headerCtas}>
            <ButtonLink href={BOOKING_URL} target="_blank" rel="noreferrer" variant="primary">
              Book Now
            </ButtonLink>
          </div>
        </header>

        <div className={styles.layout}>
          <section className={styles.info} aria-label="Salon contact information">
            <div className={styles.infoCard}>
              <h2 className={styles.h2}>Salon Info</h2>
              <div className={styles.infoRow}>
                <span className={styles.label}>Address</span>
                <span className={styles.value}>{site.address}</span>
              </div>
              <div className={styles.infoRow}>
                <span className={styles.label}>Phone</span>
                <a className={styles.link} href={`tel:${site.phoneE164}`}>
                  {site.phoneDisplay}
                </a>
              </div>
              <div className={styles.infoRow}>
                <span className={styles.label}>Email</span>
                <a className={styles.link} href={`mailto:${site.email}`}>
                  {site.email}
                </a>
              </div>
              <div className={styles.infoRow}>
                <span className={styles.label}>Instagram</span>
                <a className={styles.link} href={site.instagramUrl} target="_blank" rel="noreferrer">
                  Visit profile
                </a>
              </div>
            </div>

            <div className={styles.infoCard}>
              <h2 className={styles.h2}>Working Hours</h2>
              <ul className={styles.hours}>
                {site.workingHours.map((row) => (
                  <li key={row.label} className={styles.hoursRow}>
                    <span className={styles.hoursLabel}>{row.label}</span>
                    <span className={styles.hoursValue}>{row.value}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          <section className={styles.formWrap} aria-label="Contact form">
            <div className={styles.formCard}>
              <h2 className={styles.h2}>Send a Message</h2>
              <p className={styles.formLead}>
                This form is powered by Formspree. 
              </p>

              <form className={styles.form} action={FORMSPREE_ENDPOINT} method="POST">
                <div className={styles.field}>
                  <label className={styles.fieldLabel} htmlFor="name">
                    Name
                  </label>
                  <input className={styles.input} id="name" name="name" autoComplete="name" required />
                </div>

                <div className={styles.fieldRow}>
                  <div className={styles.field}>
                    <label className={styles.fieldLabel} htmlFor="email">
                      Email
                    </label>
                    <input
                      className={styles.input}
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                    />
                  </div>

                  <div className={styles.field}>
                    <label className={styles.fieldLabel} htmlFor="phone">
                      Phone
                    </label>
                    <input
                      className={styles.input}
                      id="phone"
                      name="phone"
                      type="tel"
                      autoComplete="tel"
                    />
                  </div>
                </div>

                <div className={styles.field}>
                  <label className={styles.fieldLabel} htmlFor="message">
                    Message
                  </label>
                  <textarea className={styles.textarea} id="message" name="message" rows={6} required />
                </div>

                <input type="hidden" name="_subject" value="New message from Ongles Diamant Rose website" />

                <div className={styles.formActions}>
                  <button className={styles.submit} type="submit">
                    Send Message
                  </button>
                </div>
              </form>
            </div>
          </section>
        </div>
      </Container>
    </div>
  );
}

