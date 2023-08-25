import { Model, DataTypes } from 'sequelize';
import db from '.';

export default class User extends Model {
  declare id: number;
  declare username: string;
  declare password: string;
  declare role: string;
  declare email: string;
}

User.init(
  {
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    role: DataTypes.STRING,
    email: DataTypes.STRING,
  },
  {
    sequelize: db,
    modelName: 'users',
    underscored: true,
    timestamps: false,
  },
);
