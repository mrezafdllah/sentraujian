export const designTokens = {
  colors: { primary: 'hsl(215 82% 42%)', primaryForeground: 'hsl(0 0% 100%)', secondary: 'hsl(210 30% 94%)', accent: 'hsl(160 68% 40%)', warning: 'hsl(38 92% 50%)', danger: 'hsl(0 78% 52%)', background: 'hsl(210 20% 98%)', foreground: 'hsl(215 30% 14%)', border: 'hsl(214 20% 88%)' },
  dark: { background: 'hsl(215 28% 10%)', surface: 'hsl(215 24% 14%)', primary: 'hsl(215 82% 60%)' },
  fonts: { sans: 'Inter, sans-serif', heading: 'Geist, Inter, sans-serif', mono: 'JetBrains Mono, monospace' },
  fontSize: { xs: '12px', sm: '14px', base: '16px', lg: '18px', xl: '20px', '2xl': '24px', '3xl': '30px' },
  radius: { input: '6px', button: '10px', card: '14px', modal: '14px', badge: '9999px' },
  shadow: { card: '0 1px 2px rgb(16 42 67 / 0.06)', interactive: '0 4px 12px rgb(16 42 67 / 0.12)' },
  focusRing: '0 0 0 2px hsl(215 82% 42% / 0.6)', motion: { fast: '150ms', easing: 'ease-out' },
} as const;

export const statusTokens = { online: 'success', synced: 'success', syncing: 'warning', pending: 'warning', offline: 'danger', failed: 'danger' } as const;

export interface StatusCardModel { label: string; value: string; tone: 'neutral' | 'success' | 'warning' | 'danger'; }

export type ProductState = 'loading' | 'empty' | 'error' | 'offline' | 'permission';

export interface StatePanelModel {
  state: ProductState;
  title: string;
  message: string;
  actionLabel?: string;
}

export type StatusTone = 'neutral' | 'success' | 'warning' | 'danger' | 'info';
