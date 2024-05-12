export interface Contact {
  name: string;
  email: string;
  phoneNumber: string;
}

export const randomContact = (): Contact => {
  const firstName = generateRandomName(6);
  const lastName = generateRandomName(8);

  const capitalizedFirstName = capitalizeFirstLetter(firstName);
  const capitalizedLastName = capitalizeFirstLetter(lastName);

  const name = `${capitalizedFirstName} ${capitalizedLastName}`;
  const email = `${capitalizedFirstName.toLowerCase()}.${capitalizedLastName.toLowerCase()}@example.com`;
  const phoneNumber = generateRandomPhoneNumber();

  return {
    name,
    email,
    phoneNumber,
  };
};

const generateRandomName = (length: number): string => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'; // Include uppercase and lowercase letters
  let result = '';
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
};

const generateRandomPhoneNumber = (): string => {
  const countryCode = '+61'; // Country code for Australia
  const randomDigits = Math.floor(Math.random() * 1000000000).toString().padStart(9, '0');
  return `${countryCode}${randomDigits}`;
};

const capitalizeFirstLetter = (word: string): string => {
  return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
};
