import { Model, DataTypes } from 'sequelize';
import db from '.';

export default class Match extends Model {
  declare id: number;
  declare homeTeam: number;
  declare awayTeam: number;
  declare homeTeamGoals: number;
  declare awayTeamGoals: number;
  declare inProgress: boolean;
}

Match.init(
  {
    teamName: DataTypes.STRING,
  },
  {
    sequelize: db,
    modelName: 'teams',
    underscored: true,
    timestamps: false,
  },
);
