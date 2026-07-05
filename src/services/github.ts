export interface GithubUser {
  login: string;
  publicRepos: number;
}

export interface GithubRepoRef {
  owner: string;
  repo: string;
}

export interface GithubRepo {
  description: string | null;
  language: string | null;
  stargazersCount: number;
}

// Site accent colors for languages already used in the portfolio; anything
// else falls back to GitHub's own linguist color for that language.
const LANGUAGE_ACCENT_COLORS: Record<string, string> = {
  'C#': '#a371f7',
  TypeScript: '#3178c6',
};

const LANGUAGE_FALLBACK_COLORS: Record<string, string> = {
  JavaScript: '#f1e05a',
  Python: '#3572A5',
  HTML: '#e34c26',
  CSS: '#563d7c',
  Java: '#b07219',
  Go: '#00ADD8',
  Rust: '#dea584',
  'C++': '#f34b7d',
  PHP: '#4F5D95',
};

const DEFAULT_LANGUAGE_COLOR = '#8b949e';

export class GithubService {
  private readonly baseUrl = 'https://api.github.com';

  async getUser(username: string): Promise<GithubUser> {
    const res = await fetch(`${this.baseUrl}/users/${username}`);
    if (!res.ok) {
      throw new Error(`GitHub API error: ${res.status}`);
    }
    const data = await res.json();
    return { login: data.login, publicRepos: data.public_repos };
  }

  async getPublicRepoCount(username: string): Promise<number> {
    const user = await this.getUser(username);
    return user.publicRepos;
  }

  async getRepo({ owner, repo }: GithubRepoRef): Promise<GithubRepo> {
    const res = await fetch(`${this.baseUrl}/repos/${owner}/${repo}`);
    if (!res.ok) {
      throw new Error(`GitHub API error: ${res.status}`);
    }
    const data = await res.json();
    return {
      description: data.description,
      language: data.language,
      stargazersCount: data.stargazers_count,
    };
  }

  parseRepoUrl(url: string): GithubRepoRef | null {
    const match = url.match(/^https?:\/\/github\.com\/([^/]+)\/([^/#?]+)/);
    if (!match) return null;
    return { owner: match[1], repo: match[2].replace(/\.git$/, '') };
  }

  getLanguageColor(language: string): string {
    return LANGUAGE_ACCENT_COLORS[language] ?? LANGUAGE_FALLBACK_COLORS[language] ?? DEFAULT_LANGUAGE_COLOR;
  }
}

export const githubService = new GithubService();
