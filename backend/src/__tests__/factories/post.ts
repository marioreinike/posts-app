import { faker } from '@faker-js/faker';
import { factory } from 'factory-girl';

factory.define('Post', {
  name: () => faker.lorem.sentence(3),
  description: () => faker.lorem.paragraph(8).slice(0, 255),
});
