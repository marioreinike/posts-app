"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_typescript_1 = require("sequelize-typescript");
const database_1 = __importDefault(require("./config/database"));
const sequelizeConfig = database_1.default[process.env.NODE_ENV || 'development'];
const orm = new sequelize_typescript_1.Sequelize({
    ...sequelizeConfig,
    models: [`${__dirname}/models`],
});
exports.default = orm;
