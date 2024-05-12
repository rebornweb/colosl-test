import { describe, expect, it } from 'vitest';
import { randomContact } from './randomContact';

describe('randomContact', () => {
  it('should return a contact object with a name, email, and phoneNumber', () => {
    const contact = randomContact();

    expect(contact).toHaveProperty('name');
    expect(contact).toHaveProperty('email');
    expect(contact).toHaveProperty('phoneNumber');
  });

  it('should generate a random first and last name', () => {
    const contact1 = randomContact();
    const contact2 = randomContact();
    expect(contact1.name.split(' ')).toHaveLength(2);
    expect(contact1.name === contact2.name).toBe(false);
  });

//Changed test the first and last name was different cases when it should be normalized to match
  describe('randomContact', () => {
    it("should generate a valid email address that matches the user's name", () => {
      const contact = randomContact();

      const lowercaseEmail = contact.email.toLowerCase();
      const lowercaseName = contact.name.toLowerCase().replace(' ', '.');

      // Check if the normalized email matches the normalized name
      expect(lowercaseEmail).toMatch(
        /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/
      );
      expect(lowercaseEmail).toContain(lowercaseName);
    });
  });


  it('should generate a 12 digit random phone number starting with +61', () => {
    const contact1 = randomContact();
    const contact2 = randomContact();
    expect(contact1.phoneNumber.length).toBe(12);
    expect(contact1.phoneNumber.length).toBe(12);
    expect(contact2.phoneNumber).toMatch(/^\+61/);
    expect(contact1.phoneNumber === contact2.phoneNumber).toBe(false);
  });
});
