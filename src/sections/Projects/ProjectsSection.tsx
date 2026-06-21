import { useState } from 'react';
import { Eyebrow } from '../../components/ui';
import { ProjectCard } from './ProjectCard';
import { ProjectModal } from './ProjectModal';
import styles from './ProjectsSection.module.css';
import type { ProjectsContent, ProjectItem } from '../../types/content';

interface ProjectsSectionProps {
  data: ProjectsContent;
}

function IconArrow() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M7 17 17 7M9 7h8v8" />
    </svg>
  );
}

export function ProjectsSection({ data }: ProjectsSectionProps) {
  const [active, setActive] = useState<ProjectItem | null>(null);

  return (
    <section className={styles.block} id="projects">
      <div className={styles.shell}>
        <div className={['reveal', styles.head].join(' ')}>
          <div>
            <Eyebrow>03 — Портфолио</Eyebrow>
            <h2 className={styles.heading}>Избранные проекты.</h2>
          </div>
          <a
            className={styles.allRepos}
            href="https://github.com/Laxerem?tab=repositories"
            target="_blank"
            rel="noreferrer"
          >
            Все репозитории <IconArrow />
          </a>
        </div>
        <div className={styles.grid}>
          {data.items.map((project, i) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={i}
              onOpen={setActive}
            />
          ))}
        </div>
      </div>
      {active && (
        <ProjectModal project={active} onClose={() => setActive(null)} />
      )}
    </section>
  );
}
