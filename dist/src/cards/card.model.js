"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CardMap = void 0;
const sequelize_1 = require("sequelize");
class Card extends sequelize_1.Model {
}
exports.default = Card;
const CardMap = (sequelize) => {
    Card.init({
        id: {
            type: sequelize_1.DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: sequelize_1.DataTypes.STRING(255)
        },
        description: {
            type: sequelize_1.DataTypes.STRING(500),
            allowNull: true
        },
        type: {
            type: sequelize_1.DataTypes.STRING(100),
            allowNull: true
        },
        category: {
            type: sequelize_1.DataTypes.STRING(150),
            allowNull: true
        },
        duration: {
            type: sequelize_1.DataTypes.NUMBER,
            allowNull: true
        },
        level: {
            type: sequelize_1.DataTypes.NUMBER,
            allowNull: true
        },
        userId: {
            type: sequelize_1.DataTypes.NUMBER,
            allowNull: true
        },
    }, {
        sequelize,
        tableName: 'cards',
        timestamps: false
    });
    Card.sync();
};
exports.CardMap = CardMap;
