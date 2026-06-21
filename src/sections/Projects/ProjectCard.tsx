import { useRef } from 'react';
import styles from './ProjectCard.module.css';
import type { ProjectItem } from '../../types/content';

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

interface ProjectCardProps {
  project: ProjectItem;
  index: number;
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  const ref = useRef<HTMLAnchorElement>(null);

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = e.clientX - r.left;
    const y = e.clientY - r.top;
    el.style.setProperty('--mx', x + 'px');
    el.style.setProperty('--my', y + 'px');
    const rx = (y / r.height - 0.5) * -5;
    const ry = (x / r.width - 0.5) * 5;
    el.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg)`;
  };

  const reset = () => {
    if (ref.current) ref.current.style.transform = '';
  };

  return (
    <a
      ref={ref}
      className={['reveal', styles.card].join(' ')}
      style={{ ['--d' as string]: `${(index % 2) * 0.08}s` }}
      href={project.url}
      target="_blank"
      rel="noreferrer"
      onMouseMove={onMove}
      onMouseLeave={reset}
    >
      <div className={styles.top}>
        <span className={styles.lang}>
          <span className={styles.langDot} style={{ background: project.langColor }} />
          {project.lang}
        </span>
        <span className={styles.arrow}>
          <IconArrow />
        </span>
      </div>
      <h3 className={styles.name}>{project.name}</h3>
      <p className={styles.desc}>{project.description}</p>
      <div className={styles.meta}>
        {project.tags.map((t) => (
          <span key={t}>{t}</span>
        ))}
        {project.stars > 0 && (
          <span className={styles.stars}>
            <IconStar /> {project.stars}
          </span>
        )}
      </div>
    </a>
  );
}
