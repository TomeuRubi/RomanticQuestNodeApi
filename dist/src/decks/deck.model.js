"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeckMap = void 0;
const sequelize_1 = require("sequelize");
class Deck extends sequelize_1.Model {
}
exports.default = Deck;
const DeckMap = (sequelize) => {
    Deck.init({
        id: {
            type: sequelize_1.DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: sequelize_1.DataTypes.STRING(255)
        },
        description: {
            type: sequelize_1.DataTypes.STRING(255),
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
        userId: {
            type: sequelize_1.DataTypes.NUMBER,
            allowNull: true
        },
    }, {
        sequelize,
        tableName: 'decks',
        timestamps: false
    });
    Deck.sync();
};
exports.DeckMap = DeckMap;
