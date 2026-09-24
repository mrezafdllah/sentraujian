import type { StatePanelModel } from '@sentraujian/ui';
import { StateView } from '@sentraujian/ui/components';

export function StatePanel({ model, onAction }: { model: StatePanelModel; onAction?: () => void }) {
  return <StateView model={model} onAction={onAction} />;
}
