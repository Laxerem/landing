import styles from './ResumeProject.module.css';
import type { ResumeProject as ResumeProjectData } from '../../types/content';

interface ResumeProjectProps {
  project: ResumeProjectData;
}

export function ResumeProject({ project }: ResumeProjectProps) {
  return (
    <article className={styles.project}>
      <div className={styles.head}>
        <h4 className={styles.title}>{project.title}</h4>
        <span className={styles.period}>{project.period}</span>
      </div>
      <p className={styles.subtitle}>{project.subtitle}</p>
      {project.link && (
        <a className={styles.link} href={project.link.href} target="_blank" rel="noreferrer">
          {project.link.label}
        </a>
      )}
      {project.paragraphs.map((text, i) => (
        <p className={styles.text} key={i}>{text}</p>
      ))}
    </article>
  );
}
