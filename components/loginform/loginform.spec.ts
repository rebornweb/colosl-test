import { describe, expect, it } from 'vitest';
import { authSchema } from './loginform';

describe('Validation Schema', () => {
  it('Schema should require a password', () => {
    expect(() =>
      authSchema.parse({
        email: '',
      })
    ).toThrow();
  });
});
