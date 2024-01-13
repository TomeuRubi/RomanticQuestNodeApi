import { Model, Sequelize, DataTypes } from 'sequelize';
export default class Deck extends Model {
  public id?: number;
  public name!: string;
  public description?: Date;
  public type?: string;
  public category?: string;
  public userId?: number;
}
export const DeckMap = (sequelize: Sequelize) => {
  Deck.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(255)
    },
    description: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    type: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    category: {
      type: DataTypes.STRING(150),
      allowNull: true
    },
    userId: {
      type: DataTypes.NUMBER,
      allowNull: true
    },
  }, {
    sequelize,
    tableName: 'decks',
    timestamps: false
  });
  Deck.sync();
}