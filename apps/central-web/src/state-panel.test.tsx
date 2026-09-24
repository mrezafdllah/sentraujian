import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { StatePanel } from './state-panel';

describe('Central Web StatePanel', () => {
  it('shows an offline state and supports retry', () => {
    const onAction = vi.fn();
    render(<StatePanel model={{ state: 'offline', title: 'Offline state', message: 'Cached data is shown.', actionLabel: 'Retry' }} onAction={onAction} />);

    expect(screen.getByRole('status')).toHaveClass('state-offline');
    expect(screen.getByText('Cached data is shown.')).toBeVisible();
    fireEvent.click(screen.getByRole('button', { name: 'Retry' }));
    expect(onAction).toHaveBeenCalledOnce();
  });
});
