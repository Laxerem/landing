import { useState } from 'react';
import { DitherBG } from '../../features/BackgroundCanvas';
import { Eyebrow } from '../../components/ui';
import { ContactBird } from './ContactBird';
import styles from './ContactsSection.module.css';
import type { ContactsContent } from '../../types/content';

function IconTelegram() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M21.94 4.3 18.6 19.9c-.25 1.1-.92 1.37-1.86.85l-5.14-3.79-2.48 2.39c-.27.27-.5.5-1.03.5l.37-5.2L17.9 6.1c.4-.35-.09-.55-.62-.2L6.3 12.43l-5.04-1.57c-1.1-.34-1.12-1.1.23-1.62l19.7-7.6c.91-.34 1.71.2 1.42 1.66Z" />
    </svg>
  );
}

function IconMail() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 7 9 6 9-6" />
    </svg>
  );
}

function IconCheck() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

interface ContactsSectionProps {
  data: ContactsContent;
}

export function ContactsSection({ data }: ContactsSectionProps) {
  const [copied, setCopied] = useState(false);

  const telegram = data.items.find((c) => c.kind === 'telegram');
  const emailItem = data.items.find((c) => c.kind === 'email');
  const email = emailItem?.handle ?? '';

  const copyEmail = () => {
    const done = () => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    };
    if (navigator.clipboard?.writeText) {
      navigator.clipboard.writeText(email).then(done).catch(done);
    } else {
      const ta = document.createElement('textarea');
      ta.value = email;
      ta.style.position = 'fixed';
      ta.style.opacity = '0';
      document.body.appendChild(ta);
      ta.select();
      try { document.execCommand('copy'); } catch { /* ignore */ }
      document.body.removeChild(ta);
      done();
    }
  };

  return (
    <section className={styles.contact} id="contact">
      <DitherBG />
      <div className={styles.veil} aria-hidden="true" />

      <div className={styles.shell}>
        <Eyebrow center className="reveal">04 — Контакты</Eyebrow>
        <ContactBird />
        <h2
          className={['reveal', styles.heading].join(' ')}
          style={{ ['--d' as string]: '0.06s' }}
        >
          Давайте <span className={styles.silver}>работать</span> вместе
        </h2>
        <p
          className={['reveal', styles.sub].join(' ')}
          style={{ ['--d' as string]: '0.12s' }}
        >
          Открыт к предложениям и интересным задачам на бэкенде.
          Самый быстрый способ связаться — Telegram.
        </p>
        <div
          className={['reveal', styles.links].join(' ')}
          style={{ ['--d' as string]: '0.18s' }}
        >
          {telegram && (
            <a
              className={styles.btnPrimary}
              href={telegram.href}
              target="_blank"
              rel="noreferrer"
            >
              <IconTelegram /> {telegram.handle ?? telegram.label}
            </a>
          )}
          {email && (
            <button
              type="button"
              className={[styles.btnGhost, styles.btnCopy, copied ? styles.copied : ''].filter(Boolean).join(' ')}
              onClick={copyEmail}
              aria-label={copied ? 'Почта скопирована' : 'Скопировать почту'}
            >
              {copied ? <IconCheck /> : <IconMail />}
              <span>{copied ? 'Скопировано!' : email}</span>
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
