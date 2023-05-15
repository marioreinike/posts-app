import { factory, SequelizeAdapter } from 'factory-girl';
import './post';

factory.setAdapter(new SequelizeAdapter());

export default factory;
