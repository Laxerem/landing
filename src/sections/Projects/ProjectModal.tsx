import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useImageLoad } from '../../hooks/useImageLoad';
import styles from './ProjectModal.module.css';
import type { ProjectItem } from '../../types/content';

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

interface GallerySlideProps {
  url: string;
  active: boolean;
  dir: number;
  label: string;
}

function GallerySlide({ url, active, dir, label }: GallerySlideProps) {
  const { loaded, loading } = useImageLoad(url);
  return (
    <div
      role="img"
      aria-label={label}
      className={[styles.galImg, active ? styles.galImgActive : ''].filter(Boolean).join(' ')}
      style={{
        ['--dir' as string]: active ? dir : 0,
        backgroundImage: loaded ? `url("${url}")` : undefined,
      }}
    >
      {active && loading && <div className={styles.shimmer} />}
    </div>
  );
}

interface GalleryProps {
  project: ProjectItem;
}

function ProjectGallery({ project }: GalleryProps) {
  const imgs = project.images ?? [];
  const [idx, setIdx] = useState(0);
  const [dir, setDir] = useState(1);
  const many = imgs.length > 1;

  const go = (next: number) => {
    setDir(next > idx || (next === 0 && idx === imgs.length - 1) ? 1 : -1);
    setIdx((next + imgs.length) % imgs.length);
  };

  const movePrev = () => { setDir(-1); setIdx((i) => (i - 1 + imgs.length) % imgs.length); };
  const moveNext = () => { setDir(1); setIdx((i) => (i + 1) % imgs.length); };

  useEffect(() => {
    if (!many) return;
    const len = imgs.length;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') { setDir(-1); setIdx((i) => (i - 1 + len) % len); }
      if (e.key === 'ArrowRight') { setDir(1); setIdx((i) => (i + 1) % len); }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [many, imgs.length]);

  if (!imgs.length) {
    return (
      <div
        className={[styles.cover, styles.placeholder].join(' ')}
        style={{ ['--c' as string]: project.langColor }}
      >
        <span className={styles.coverOrb} />
        <span className={styles.coverTag}>превью · {project.lang}</span>
      </div>
    );
  }

  return (
    <div
      className={styles.cover}
      style={{ ['--c' as string]: project.langColor }}
    >
      <div className={styles.galStage}>
        {imgs.map((url, i) => (
          <GallerySlide
            key={url + i}
            url={url}
            active={i === idx}
            dir={dir}
            label={`${project.name} — фото ${i + 1}`}
          />
        ))}
      </div>

      {many && (
        <>
          <button className={[styles.galNav, styles.galPrev].join(' ')} onClick={movePrev} aria-label="Предыдущее фото">
            <IconArrow />
          </button>
          <button className={[styles.galNav, styles.galNext].join(' ')} onClick={moveNext} aria-label="Следующее фото">
            <IconArrow />
          </button>
          <div className={styles.galDots}>
            {imgs.map((_, i) => (
              <button
                key={i}
                className={[styles.galDot, i === idx ? styles.galDotActive : ''].filter(Boolean).join(' ')}
                onClick={() => go(i)}
                aria-label={`Фото ${i + 1}`}
              />
            ))}
          </div>
          <span className={styles.galCount}>{idx + 1} / {imgs.length}</span>
        </>
      )}
    </div>
  );
}

interface ProjectModalProps {
  project: ProjectItem;
  onClose: () => void;
}

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [onClose]);

  return createPortal(
    <div
      className={styles.overlay}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={project.name}
    >
      <div
        className={styles.modal}
        style={{ ['--c' as string]: project.langColor }}
        onClick={(e) => e.stopPropagation()}
      >
        <button className={styles.close} onClick={onClose} aria-label="Закрыть">
          <IconClose />
        </button>

        <ProjectGallery project={project} />

        <div className={styles.content}>
          <div className={styles.head}>
            <span className={styles.langBadge}>
              <span className={styles.langDot} style={{ background: project.langColor }} />
              {project.lang}
            </span>
            <h3>{project.name}</h3>
          </div>

          {project.about && (
            <section className={styles.section}>
              <h4>О проекте</h4>
              <p>{project.about}</p>
            </section>
          )}

          {project.bullets && project.bullets.length > 0 && (
            <section className={styles.section}>
              <h4>Что внутри</h4>
              <ul className={styles.points}>
                {project.bullets.map((pt) => (
                  <li key={pt}>{pt}</li>
                ))}
              </ul>
            </section>
          )}

          <section className={styles.section}>
            <h4>Стек</h4>
            <div className={styles.chips}>
              {project.tags.map((t) => (
                <span className={styles.chip} key={t}>{t}</span>
              ))}
            </div>
          </section>

          <div className={styles.foot}>
            <a className={styles.btnPrimary} href={project.url} target="_blank" rel="noreferrer">
              Открыть на GitHub <IconArrow />
            </a>
            {project.stars > 0 && (
              <span className={styles.stars}>
                <IconStar /> {project.stars}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>,
    document.body,
  );
}
