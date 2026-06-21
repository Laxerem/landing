import { useRef } from 'react';
import { ProjectCover } from './ProjectCover';
import styles from './ProjectCard.module.css';
import type { ProjectItem } from '../../types/content';

function IconExpand() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M9 4H4v5M15 20h5v-5M20 9V4h-5M4 15v5h5" />
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

interface ProjectCardProps {
  project: ProjectItem;
  index: number;
  onOpen: (project: ProjectItem) => void;
}

export function ProjectCard({ project, index, onOpen }: ProjectCardProps) {
  const ref = useRef<HTMLButtonElement>(null);

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = e.clientX - r.left;
    const y = e.clientY - r.top;
    el.style.setProperty('--mx', x + 'px');
    el.style.setProperty('--my', y + 'px');
    const rx = (y / r.height - 0.5) * -4;
    const ry = (x / r.width - 0.5) * 4;
    el.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg)`;
  };

  const reset = () => {
    if (ref.current) ref.current.style.transform = '';
  };

  return (
    <button
      ref={ref}
      type="button"
      className={['reveal', styles.card].join(' ')}
      style={{ ['--d' as string]: `${(index % 2) * 0.08}s` }}
      onMouseMove={onMove}
      onMouseLeave={reset}
      onClick={() => onOpen(project)}
      aria-label={`Открыть описание проекта ${project.name}`}
    >
      <ProjectCover project={project} />
      <div className={styles.body}>
        <div className={styles.top}>
          <span className={styles.lang}>
            <span className={styles.langDot} style={{ background: project.langColor }} />
            {project.lang}
          </span>
          <span className={styles.arrow}>
            <IconExpand />
          </span>
        </div>
        <h3 className={styles.name}>{project.name}</h3>
        <p className={styles.desc}>{project.description}</p>
        <div className={styles.meta}>
          {project.tags.map((t) => (
            <span key={t}>{t}</span>
          ))}
          <span className={styles.hint}>
            Подробнее <IconArrow />
          </span>
        </div>
      </div>
    </button>
  );
}
