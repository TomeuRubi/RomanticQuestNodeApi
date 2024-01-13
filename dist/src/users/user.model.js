"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserMap = void 0;
const sequelize_1 = require("sequelize");
class User extends sequelize_1.Model {
}
exports.default = User;
const UserMap = (sequelize) => {
    User.init({
        id: {
            type: sequelize_1.DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: sequelize_1.DataTypes.STRING(255)
        },
        birthdate: {
            type: sequelize_1.DataTypes.DATE,
            allowNull: true
        },
        country: {
            type: sequelize_1.DataTypes.STRING(100),
            allowNull: true
        },
        email: {
            type: sequelize_1.DataTypes.STRING(150),
            allowNull: true
        },
        password: {
            type: sequelize_1.DataTypes.STRING(100),
            allowNull: true
        }
    }, {
        sequelize,
        tableName: 'users',
        timestamps: false
    });
    User.sync();
};
exports.UserMap = UserMap;
