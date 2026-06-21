import { BackgroundCanvas } from './features/BackgroundCanvas';
import { useContent } from './hooks/useContent';
import { useScrollReveal } from './hooks/useScrollReveal';
import { Nav, Footer } from './components/layout';
import { HeroSection } from './sections/Hero';
import { AboutSection } from './sections/About';
import { StackSection } from './sections/Stack';
import { ProjectsSection } from './sections/Projects';
import { ContactsSection } from './sections/Contacts';

export default function App() {
  const content = useContent();
  useScrollReveal();

  return (
    <>
      <Nav />
      <BackgroundCanvas />
      <main>
        <HeroSection data={content.hero} />
        <AboutSection data={content.about} />
        <StackSection data={content.stack} />
        <ProjectsSection data={content.projects} />
        <ContactsSection data={content.contacts} />
      </main>
      <Footer />
    </>
  );
}
