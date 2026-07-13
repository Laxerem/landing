import { useContent } from './hooks/useContent';
import { useScrollReveal } from './hooks/useScrollReveal';
import { useGithubRepoCount } from './hooks/useGithubRepoCount';
import { useGithubProjectData } from './hooks/useGithubProjectData';
import { Nav, Footer } from './components/layout';
import { MidBG } from './features/BackgroundCanvas';
import { HeroSection } from './sections/Hero';
import { AboutSection } from './sections/About';
import { StackSection } from './sections/Stack';
import { ProjectsSection } from './sections/Projects';
import { ContactsSection } from './sections/Contacts';

const GITHUB_USERNAME = 'Laxerem';

export default function App() {
  const content = useContent();
  useScrollReveal();

  const repoStatFallback = content.about.stats.find((s) => s.source === 'github-repos')?.n ?? 0;
  const repoCount = useGithubRepoCount(GITHUB_USERNAME, repoStatFallback);

  const telegramLink = content.contacts.items.find((c) => c.kind === 'telegram')?.href ?? '#';

  const about = {
    ...content.about,
    stats: content.about.stats.map((s) => (s.source === 'github-repos' ? { ...s, n: repoCount } : s)),
  };

  const githubProjectData = useGithubProjectData(content.projects.items);
  const projects = {
    ...content.projects,
    items: content.projects.items.map((p) => ({ ...p, ...githubProjectData[p.id] })),
  };

  return (
    <>
      <Nav />
      <main>
        <HeroSection data={content.hero} link={telegramLink} />
        <div className="mid">
          <MidBG />
          <AboutSection data={about} />
          <ProjectsSection data={projects} />
          <StackSection data={content.stack} />
        </div>
        <ContactsSection data={content.contacts} />
      </main>
      <Footer />
    </>
  );
}
