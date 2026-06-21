import { content } from '../data/content';
import type { SiteContent } from '../types/content';

// Phase 2: swap body for useSWR / React Query call to src/services/api.ts
export function useContent(): SiteContent {
  return content;
}
