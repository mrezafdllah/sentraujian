import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { StatePanel } from './state-panel';

describe('Edge Admin Web StatePanel', () => {
  it('shows permission state without exposing an action', () => {
    render(<StatePanel model={{ state: 'permission', title: 'Permission required', message: 'Contact a school administrator.' }} />);

    expect(screen.getByRole('status')).toHaveClass('state-permission');
    expect(screen.getByText('Contact a school administrator.')).toBeVisible();
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });
});
