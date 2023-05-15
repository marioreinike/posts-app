const defaultConfig = {
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  dialect: 'postgres',
  database: process.env.POSTGRES_DB,
  host: process.env.POSTGRES_HOST,
  port: parseInt(process.env.POSTGRES_PORT, 10) || 5432,
  seederStorage: 'sequelize',
};

const config = {
  development: {
    ...defaultConfig,
  },
  production: {
    ...defaultConfig,
    pool: {
      max: parseInt(process.env.POOL_MAX_CONNECTIONS, 10) || 5, // Max connections
      min: parseInt(process.env.POOL_MIN_CONNECTIONS, 10) || 0, // Min connections
      acquire: parseInt(process.env.POOL_CONNECTION_TIMEOUT, 10) || 60000, // Connection timeout
      idle: parseInt(process.env.POOL_IDLE_TIME, 10) || 10000, // Max idle time
    },
  },
};

module.exports = config;
