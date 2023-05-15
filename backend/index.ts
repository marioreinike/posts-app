import app from './src/app';
import orm from './src/sequelize';

const PORT = parseInt(process.env.PORT, 10) || 3000;

(async () => {
  try {
    await orm.authenticate();
    console.log('Connection has been established successfully.');
    app.listen(PORT, () => {
      console.log(`Server started on port ${PORT}`);
    });
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
})();
