"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const app_1 = __importDefault(require("../../app"));
const sequelize_1 = __importDefault(require("../../sequelize"));
const request = (0, supertest_1.default)(app_1.default.callback());
describe('Posts routes', () => {
    beforeAll(async () => {
        await sequelize_1.default.sync({ force: true });
    });
    afterAll(async () => {
        await sequelize_1.default.close();
    });
    describe('Create', () => {
        test('Missing param - throws error', async () => {
            const response = await request
                .post('/posts')
                .send({ other: 'incorrect param' });
            expect(response.status).toBe(400);
        });
        test('executes correctly', async () => {
            const response = await request
                .post('/posts')
                .send({ name: 'Post 1', description: 'hello' });
            expect(response.status).toBe(201);
            expect(response.body).toEqual(expect.objectContaining({
                id: expect.any(Number),
                name: 'Post 1',
                description: 'hello',
            }));
        });
    });
});
