import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { Button } from './Button';

describe('Button', () => {
  it('renders the button with children', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('applies the size class when size is provided', () => {
    render(<Button size="lg">Large Button</Button>);
    const buttonElement = screen.getByRole('button', { name: 'Large Button' });
    expect(buttonElement).toContainHTML('class="_lg_');
  });

  it('applies the outline class when outline is true', () => {
    render(<Button outline>Outlined Button</Button>);
    const buttonElement = screen.getByRole('button', { name: 'Outlined Button' });
    expect(buttonElement).toContainHTML('class="_outline_');
  });

  it('calls onClick handler when clicked', () => {
    const onClick = vi.fn();
    render(<Button onClick={onClick}>Clickable</Button>);
    screen.getByText('Clickable').click();
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
