import { Model, Sequelize, DataTypes } from 'sequelize';
export default class Card extends Model {
  public id?: number;
  public name!: string;
  public description?: Date;
  public type?: string;
  public category?: string;
  public level?: number;
  public duration?: number;
  public userId?: number;
}
export const CardMap = (sequelize: Sequelize) => {
  Card.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(255)
    },
    description: {
      type: DataTypes.STRING(500),
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
    duration: {
      type: DataTypes.NUMBER,
      allowNull: true
    },
    level: {
      type: DataTypes.NUMBER,
      allowNull: true
    },
    userId: {
      type: DataTypes.NUMBER,
      allowNull: true
    },
  }, {
    sequelize,
    tableName: 'cards',
    timestamps: false
  });
  Card.sync();
}