import { useEffect, useState } from 'react';
import { githubService } from '../services/github';

export function useGithubRepoCount(username: string, fallback: number): number {
  const [count, setCount] = useState(fallback);

  useEffect(() => {
    let cancelled = false;

    githubService
      .getPublicRepoCount(username)
      .then((n) => {
        if (!cancelled) setCount(n);
      })
      .catch(() => {
        // keep fallback value on error (rate limit, offline, etc.)
      });

    return () => {
      cancelled = true;
    };
  }, [username]);

  return count;
}
