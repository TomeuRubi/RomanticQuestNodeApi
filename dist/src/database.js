"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("../config");
const sequelize_1 = require("sequelize");
exports.default = new sequelize_1.Sequelize({
    dialect: "postgres",
    host: config_1.db_host,
    port: config_1.db_port,
    database: config_1.db_name,
    username: config_1.db_user,
    password: config_1.db_password
});
