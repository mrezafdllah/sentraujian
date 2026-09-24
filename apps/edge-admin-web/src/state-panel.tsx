import type { StatePanelModel } from '@sentraujian/ui';

export function StatePanel({ model, onAction }: { model: StatePanelModel; onAction?: () => void }) {
  return <div className={`state-panel state-${model.state}`} role="status"><strong>{model.title}</strong><span>{model.message}</span>{model.actionLabel && <button onClick={onAction}>{model.actionLabel}</button>}</div>;
}
