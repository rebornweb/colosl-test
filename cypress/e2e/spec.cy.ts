import { randomContact, Contact } from "../../utils/randomContact/randomContact"; // Adjust the import path as needed

// Global Declaration
declare global {
  interface Window {
    randomContact: () => Contact;
  }
}

describe('randomContact', () => {
  it('generates a random contact with valid data', () => {
    cy.visit('http://localhost:3000/contacts');
    
    const contact = randomContact();

    // Check if the contact object has the required properties
    expect(contact).to.have.property('name').that.is.a('string').and.not.empty;
    expect(contact).to.have.property('email').that.is.a('string').and.not.empty;
    expect(contact).to.have.property('phoneNumber').that.is.a('string').and.not.empty;

    // Check if the email format
    expect(contact.email).to.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/);

    // Phone numeber has to start with '+61'
    expect(contact.phoneNumber).to.match(/^\+61\d{9}$/);
  });
});
