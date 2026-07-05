import { useEffect, useState } from 'react';
import { githubService } from '../services/github';
import type { ProjectItem } from '../types/content';

interface ProjectGithubData {
  stars: number;
  lang: string;
  langColor: string;
  description: string;
}

function fallbackFor(item: ProjectItem): ProjectGithubData {
  return { stars: item.stars, lang: item.lang, langColor: item.langColor, description: item.description };
}

export function useGithubProjectData(items: ProjectItem[]): Record<string, ProjectGithubData> {
  const [data, setData] = useState<Record<string, ProjectGithubData>>(() =>
    Object.fromEntries(items.map((i) => [i.id, fallbackFor(i)])),
  );

  useEffect(() => {
    let cancelled = false;

    items.forEach((item) => {
      const ref = githubService.parseRepoUrl(item.url);
      if (!ref) return;

      githubService
        .getRepo(ref)
        .then((repo) => {
          if (cancelled) return;
          setData((prev) => ({
            ...prev,
            [item.id]: {
              stars: repo.stargazersCount,
              lang: repo.language ?? item.lang,
              langColor: repo.language ? githubService.getLanguageColor(repo.language) : item.langColor,
              description: repo.description ?? item.description,
            },
          }));
        })
        .catch(() => {
          // keep fallback value on error (rate limit, offline, etc.)
        });
    });

    return () => {
      cancelled = true;
    };
  }, [items]);

  return data;
}
