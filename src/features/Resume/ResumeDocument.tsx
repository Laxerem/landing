import { ResumeProject } from './ResumeProject';
import logoSrc from '../../assets/newLogoTransparent.webp';
import styles from './ResumeDocument.module.css';
import type { ResumeContent } from '../../types/content';

interface ResumeDocumentProps {
  resume: ResumeContent;
}

export function ResumeDocument({ resume }: ResumeDocumentProps) {
  return (
    <div className={styles.doc}>
      <header>
        <span className={styles.updated}>Резюме · обновлено {resume.updatedAt}</span>
        <h2 className={styles.name}>{resume.fullName}</h2>
        <p className={styles.position}>{resume.position}</p>
        <ul className={styles.terms}>
          {resume.terms.map((t) => (
            <li className={styles.chip} key={t}>{t}</li>
          ))}
        </ul>
      </header>

      <div className={styles.divider} aria-hidden="true">
        <img src={logoSrc} alt="" draggable={false} />
      </div>

      <section className={styles.section}>
        <h3 className={styles.sectionTitle}>Обо мне</h3>
        <p className={styles.text}>{resume.about}</p>
      </section>

      <section className={styles.section}>
        <h3 className={styles.sectionTitle}>
          Опыт работы <span className={styles.sectionNote}>{resume.experienceTotal}</span>
        </h3>
        {resume.jobs.map((job) => (
          <div className={styles.job} key={`${job.company}-${job.period}`}>
            <div className={styles.jobHead}>
              <div>
                <p className={styles.jobRole}>{job.role}</p>
                <p className={styles.jobCompany}>{job.company} · {job.location}</p>
              </div>
              <div className={styles.jobPeriod}>
                <span>{job.period}</span>
                <span className={styles.jobDuration}>{job.duration}</span>
              </div>
            </div>
            <div className={styles.projects}>
              {job.projects.map((p) => (
                <ResumeProject project={p} key={p.title} />
              ))}
            </div>
          </div>
        ))}
      </section>

      <section className={styles.section}>
        <h3 className={styles.sectionTitle}>Навыки</h3>
        <ul className={styles.terms}>
          {resume.skills.map((s) => (
            <li className={styles.chip} key={s}>{s}</li>
          ))}
        </ul>
      </section>

      <section className={styles.section}>
        <h3 className={styles.sectionTitle}>Образование</h3>
        {resume.education.map((e) => (
          <div className={styles.jobHead} key={e.institution}>
            <div>
              <p className={styles.jobRole}>{e.institution}</p>
              <p className={styles.jobCompany}>{e.specialty} · {e.level}</p>
            </div>
            <div className={styles.jobPeriod}>
              <span>{e.year}</span>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}
