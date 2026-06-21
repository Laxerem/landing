import { useContent } from './hooks/useContent';
import { useScrollReveal } from './hooks/useScrollReveal';
import { Nav, Footer } from './components/layout';
import { MidBG } from './features/BackgroundCanvas';
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
      <main>
        <HeroSection data={content.hero} />
        <div className="mid">
          <MidBG />
          <AboutSection data={content.about} />
          <StackSection data={content.stack} />
          <ProjectsSection data={content.projects} />
        </div>
        <ContactsSection data={content.contacts} />
      </main>
      <Footer />
    </>
  );
}
