import { useState, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import styles from './ProjectModal.module.css';
import type { ProjectItem } from '../../types/content';
import { trackGoal } from '../../services/analytics';

function IconClose() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
      <path d="M6 6l12 12M18 6 6 18" />
    </svg>
  );
}

function IconArrow() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M7 17 17 7M9 7h8v8" />
    </svg>
  );
}

function IconStar() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="m12 2 2.95 6.6 7.05.62-5.34 4.7 1.6 6.98L12 17.77 5.74 20.9l1.6-6.98L2 9.22l7.05-.62z" />
    </svg>
  );
}

const CLOSE_MS = 480;

interface ProjectModalProps {
  project: ProjectItem;
  onClose: () => void;
}

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  const [open, setOpen] = useState(false);

  // Плавный выход: гасим панель, затем размонтируем.
  const requestClose = useCallback(() => {
    setOpen(false);
    setTimeout(onClose, CLOSE_MS);
  }, [onClose]);

  useEffect(() => {
    trackGoal('project_modal_open', { project: project.id, name: project.name });
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') requestClose(); };
    document.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const raf = requestAnimationFrame(() => setOpen(true));
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
      cancelAnimationFrame(raf);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [requestClose]);

  return createPortal(
    <div
      className={[styles.root, open ? styles.open : ''].filter(Boolean).join(' ')}
      role="dialog"
      aria-modal="true"
      aria-label={project.name}
    >
      <div className={styles.scrim} onClick={requestClose} />
      <div className={styles.modal} style={{ ['--c' as string]: project.langColor }}>
        <div className={styles.bg} />
        <button className={styles.close} onClick={requestClose} aria-label="Закрыть">
          <IconClose />
        </button>

        <div className={styles.scroll}>
          <div className={styles.head}>
            <h2>{project.name}</h2>
          </div>

          {project.aboutHtml && (
            <div className={styles.article} dangerouslySetInnerHTML={{ __html: project.aboutHtml }} />
          )}

          <div className={styles.meta}>
            <span className={styles.metaLbl}>Стек</span>
            {project.tags.map((t) => (
              <span className={styles.chip} key={t}>{t}</span>
            ))}
          </div>

          <div className={styles.foot}>
            {project.url && (
              <a className={styles.link} href={project.url} target="_blank" rel="noreferrer">
                Открыть на GitHub <IconArrow />
              </a>
            )}
            <button className={[styles.link, styles.ghost].join(' ')} type="button" onClick={requestClose}>
              Закрыть
            </button>
            {project.stars > 0 && (
              <span className={styles.stars}>
                <IconStar /> {project.stars}
                <span className={styles.starsLbl}>на GitHub</span>
              </span>
            )}
          </div>
        </div>
      </div>
    </div>,
    document.body,
  );
}
