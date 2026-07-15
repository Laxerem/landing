declare global {
  interface Window {
    ym?: (counterId: number, action: string, ...rest: unknown[]) => void;
  }
}

const YM_COUNTER_ID = 110763561;

export function trackGoal(goal: string, params?: Record<string, unknown>) {
  window.ym?.(YM_COUNTER_ID, 'reachGoal', goal, params);
}
