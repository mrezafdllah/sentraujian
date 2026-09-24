import type { ButtonHTMLAttributes, HTMLAttributes, ReactNode } from 'react';
import type { ProductState, StatePanelModel, StatusTone } from './index';

const stateTone: Record<ProductState, StatusTone> = { loading: 'info', empty: 'neutral', error: 'danger', offline: 'warning', permission: 'danger' };
const stateIcon: Record<ProductState, string> = { loading: '...', empty: '-', error: '!', offline: '~', permission: '!' };

export function Button({ variant = 'secondary', children, ...props }: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: 'primary' | 'secondary' | 'danger' }) {
  return <button className={`ui-button ui-button-${variant}`} {...props}>{children}</button>;
}

export function Card({ children, className = '', ...props }: HTMLAttributes<HTMLDivElement> & { children: ReactNode }) {
  return <section className={`ui-card ${className}`} {...props}>{children}</section>;
}

export function StatusBadge({ label, tone = 'neutral' }: { label: string; tone?: StatusTone }) {
  return <span className={`ui-status-badge ui-status-${tone}`}><span aria-hidden="true">●</span>{label}</span>;
}

export function Skeleton({ className = '' }: { className?: string }) { return <div className={`ui-skeleton ${className}`} aria-hidden="true" />; }

export function StateView({ model, onAction }: { model: StatePanelModel; onAction?: () => void }) {
  return <div className={`ui-state-view ui-state-${model.state} state-${model.state}`} role="status" aria-live="polite"><span className="ui-state-icon" aria-hidden="true">{stateIcon[model.state]}</span><div><strong>{model.title}</strong><span>{model.message}</span></div>{model.actionLabel && <Button variant="secondary" onClick={onAction}>{model.actionLabel}</Button>}<StatusBadge label={model.state} tone={stateTone[model.state]} /></div>;
}
