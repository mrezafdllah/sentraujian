import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { StateView, StatusBadge } from './components';

describe('shared UI primitives', () => {
  it('renders a semantic status badge with visible text', () => {
    render(<StatusBadge label="Offline" tone="danger" />);
    expect(screen.getByText('Offline')).toHaveClass('ui-status-danger');
  });

  it('renders state icon, text, badge, and action', () => {
    const onAction = vi.fn();
    render(<StateView model={{ state: 'offline', title: 'Edge offline', message: 'Reconnect to LAN.', actionLabel: 'Retry' }} onAction={onAction} />);
    expect(screen.getByRole('status')).toHaveClass('ui-state-offline');
    expect(screen.getByText('offline')).toBeVisible();
    fireEvent.click(screen.getByRole('button', { name: 'Retry' }));
    expect(onAction).toHaveBeenCalledOnce();
  });
});
