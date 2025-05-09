import {faker} from '@faker-js/faker';

export const generateFakePeople = (count = 10) => {
  const people = [];

  for (let i = 0; i < count; i++) {
    people.push({
      id: faker.string.uuid(),
      fullName: faker.person.fullName(),
      email: faker.internet.email(),
      phone: faker.phone.number(),
      avatar: faker.image.avatar(),
      address: {
        street: faker.location.streetAddress(),
        city: faker.location.city(),
        country: faker.location.country(),
      },
      jobTitle: faker.person.jobTitle(),
    });
  }
  return people;
};
