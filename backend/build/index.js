"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./src/app"));
const sequelize_1 = __importDefault(require("./src/sequelize"));
const PORT = parseInt(process.env.PORT, 10) || 3000;
(async () => {
    try {
        await sequelize_1.default.authenticate();
        console.log('Connection has been established successfully.');
        app_1.default.listen(PORT, () => {
            console.log(`Server started on port ${PORT}`);
        });
    }
    catch (error) {
        console.error('Unable to connect to the database:', error);
    }
})();
