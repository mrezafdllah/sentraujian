export const designTokens = {
  primary: 'hsl(215 82% 42%)',
  fonts: { sans: 'Inter', display: 'Geist', mono: 'JetBrains Mono' },
} as const;

export interface StatusCardModel { label: string; value: string; tone: 'neutral' | 'success' | 'warning' | 'danger'; }

export type ProductState = 'loading' | 'empty' | 'error' | 'offline' | 'permission';

export interface StatePanelModel {
  state: ProductState;
  title: string;
  message: string;
  actionLabel?: string;
}
