export const designTokens = {
  primary: 'hsl(215 82% 42%)',
  fonts: { sans: 'Inter', display: 'Geist', mono: 'JetBrains Mono' },
} as const;

export interface StatusCardModel { label: string; value: string; tone: 'neutral' | 'success' | 'warning' | 'danger'; }
