import { useEffect, useState } from 'react';
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

function IconChevronLeft() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M15 18 9 12l6-6" />
    </svg>
  );
}

function IconChevronRight() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="m9 18 6-6-6-6" />
    </svg>
  );
}

const MOBILE_QUERY = '(max-width: 860px)';

export function ProjectsSection({ data }: ProjectsSectionProps) {
  const [active, setActive] = useState<ProjectItem | null>(null);
  const [page, setPage] = useState(0);
  const [perPage, setPerPage] = useState(() =>
    typeof window !== 'undefined' && window.matchMedia(MOBILE_QUERY).matches ? 1 : 2,
  );

  useEffect(() => {
    const mq = window.matchMedia(MOBILE_QUERY);
    const onChange = () => setPerPage(mq.matches ? 1 : 2);
    onChange();
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  const pageCount = Math.ceil(data.items.length / perPage);
  const curPage = Math.min(page, pageCount - 1);

  useEffect(() => {
    if (page > pageCount - 1) setPage(pageCount - 1);
  }, [pageCount, page]);

  const go = (i: number) => setPage(Math.max(0, Math.min(i, pageCount - 1)));

  return (
    <section className={styles.block} id="projects">
      <div className={styles.shell}>
        <div className={['reveal', styles.head].join(' ')}>
          <div>
            <Eyebrow>02 — Портфолио</Eyebrow>
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

        <div className={['reveal', styles.slider].join(' ')}>
          <div className={styles.viewport}>
            <div
              className={styles.track}
              style={{ transform: `translateX(calc(${-curPage} * (100% + 22px)))` }}
            >
              {data.items.map((project) => (
                <ProjectCard key={project.id} project={project} onOpen={setActive} />
              ))}
            </div>
          </div>

          <div className={styles.nav}>
            <button
              type="button"
              className={styles.arrowBtn}
              onClick={() => go(curPage - 1)}
              disabled={curPage === 0}
              aria-label="Назад"
            >
              <IconChevronLeft />
            </button>
            <button
              type="button"
              className={styles.arrowBtn}
              onClick={() => go(curPage + 1)}
              disabled={curPage === pageCount - 1}
              aria-label="Вперёд"
            >
              <IconChevronRight />
            </button>
            <div className={styles.dots}>
              {Array.from({ length: pageCount }, (_, i) => (
                <button
                  key={i}
                  type="button"
                  className={[styles.dot, i === curPage ? styles.dotOn : ''].filter(Boolean).join(' ')}
                  onClick={() => go(i)}
                  aria-label={`Страница ${i + 1}`}
                />
              ))}
            </div>
            <span className={styles.count}>
              <b>{curPage + 1}</b> / {pageCount}
            </span>
          </div>
        </div>
      </div>

      {active && (
        <ProjectModal project={active} onClose={() => setActive(null)} />
      )}
    </section>
  );
}
