import { faker } from '@faker-js/faker';
import { factory, SequelizeAdapter } from 'factory-girl';
import Post from '../../models/post';

factory.setAdapter(new SequelizeAdapter());

factory.define('Post', Post, {
  name: () => faker.lorem.sentence(3),
  description: () => faker.lorem.paragraph(8).slice(0, 255),
});
