import { Sequelize } from 'sequelize-typescript';
import config from './config/database';

const sequelizeConfig = config[process.env.NODE_ENV || 'development'];

const orm = new Sequelize({
  ...sequelizeConfig,
  models: [`${__dirname}/models`],
});

export default orm;
