const { faker } = require('@faker-js/faker');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface) {
        const now = new Date();
        const postsData = Array(15).fill(1).map(() => ({
            name: faker.lorem.sentence(3),
            description: faker.lorem.paragraph(8).slice(0, 255),
            createdAt: now,
            updatedAt: now,
        }));
        await queryInterface.bulkInsert('Posts', postsData);
    },
    async down(queryInterface) {
        await queryInterface.bulkDelete('Posts', null, {});
    },
};
