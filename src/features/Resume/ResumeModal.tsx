import { useState, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { ResumeDocument } from './ResumeDocument';
import styles from './ResumeModal.module.css';
import type { ResumeContent } from '../../types/content';

function IconClose() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
      <path d="M6 6l12 12M18 6 6 18" />
    </svg>
  );
}

function IconDownload() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 4v11M7 10l5 5 5-5M5 20h14" />
    </svg>
  );
}

const CLOSE_MS = 480;

interface ResumeModalProps {
  resume: ResumeContent;
  onClose: () => void;
}

export function ResumeModal({ resume, onClose }: ResumeModalProps) {
  const [open, setOpen] = useState(false);

  // Плавный выход: гасим панель, затем размонтируем.
  const requestClose = useCallback(() => {
    setOpen(false);
    setTimeout(onClose, CLOSE_MS);
  }, [onClose]);

  useEffect(() => {
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
  }, [requestClose]);

  return createPortal(
    <div
      className={[styles.root, open ? styles.open : ''].filter(Boolean).join(' ')}
      role="dialog"
      aria-modal="true"
      aria-label="Резюме"
    >
      <div className={styles.scrim} onClick={requestClose} />
      <div className={styles.modal}>
        <div className={styles.bar}>
          <span className={styles.updated}>
            Резюме · <span className={styles.nowrap}>обновлено {resume.updatedAt}</span>
          </span>
          <button className={styles.close} type="button" onClick={requestClose} aria-label="Закрыть">
            <IconClose />
          </button>
        </div>

        <div className={styles.scroll}>
          <ResumeDocument resume={resume} />
        </div>

        <div className={styles.foot}>
          <a className={styles.btnPrimary} href={resume.fileUrl} download={resume.downloadName}>
            <IconDownload /> Скачать PDF
          </a>
          <button className={styles.btnGhost} type="button" onClick={requestClose}>
            Закрыть
          </button>
        </div>
      </div>
    </div>,
    document.body,
  );
}
