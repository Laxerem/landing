import { Container } from '../Container/Container';
import styles from './Section.module.css';

interface SectionProps {
  id: string;
  children: React.ReactNode;
  className?: string;
  fullBleed?: boolean;
}

export function Section({ id, children, className, fullBleed }: SectionProps) {
  return (
    <section id={id} className={[styles.section, className].filter(Boolean).join(' ')}>
      {fullBleed ? children : <Container>{children}</Container>}
    </section>
  );
}
