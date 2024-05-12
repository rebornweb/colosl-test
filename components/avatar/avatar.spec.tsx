import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Avatar } from './avatar';

describe('Avatar Component', () => {
  it("Should display the initials of the User's name", () => {
    render(<Avatar firstName="John" lastName="Doe" />);
    expect(screen.getByText('JD')).toBeTruthy();
  });

});
