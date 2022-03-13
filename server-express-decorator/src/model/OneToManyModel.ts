import {
  Model,
  DataTypes,
  Optional,
  HasManyGetAssociationsMixin
} from 'sequelize'
import dataSource from './dataSource'

interface TeamAttributes {
  id: number
  name: string
  players?: PlayerInstance[]
  getPlayers?: HasManyGetAssociationsMixin<PlayerInstance>
}

interface TeamInstance
  extends Model<TeamAttributes, Optional<TeamAttributes, 'id'>>,
    TeamAttributes {}

export const TeamModelDefine = dataSource.define<TeamInstance>(
  'team',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: { type: DataTypes.STRING, allowNull: false }
  },
  {
    freezeTableName: true
  }
)

interface PlayerAttributes {
  id: number
  name: string
  teamId: number
  team?: TeamInstance
}

interface PlayerInstance
  extends Model<PlayerAttributes, Optional<PlayerAttributes, 'id'>>,
    PlayerAttributes {}

export const PlayerModelDefine = dataSource.define<PlayerInstance>(
  'player',
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false },
    teamId: DataTypes.INTEGER
  },
  {
    freezeTableName: true
  }
)

/*
CREATE TABLE `team` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1

CREATE TABLE `player` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `teamId` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `teamId` (`teamId`),
  CONSTRAINT `player_ibfk_1` FOREIGN KEY (`teamId`) REFERENCES `team` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=51 DEFAULT CHARSET=latin1
*/

/**
 * 创建一个「一对多、多对一」关系，hasMany 和 belongsTo 关联一起使用
 * A.hasMany(B) => A 有多个 B，关联意味着 A 和 B 之间存在一对多的关系，外键在目标模型 B 中定义
 * B.belongsTo(A) => B 属于 A，关联意味着 B 和 A 之间存在一对一的关系，外键在源模型 B 中定义
 */
TeamModelDefine.hasMany(PlayerModelDefine, {
  // as: 'playerList' // 如果设置关联的地方或 include 其中之一设置了 as，那么另一个地方也必须设置 as 为相同的值
}) // 添加改行后查询 Team 时才能级联查询出 Player
PlayerModelDefine.belongsTo(TeamModelDefine) // 添加改行后查询 Player 时才能级联查询出 Team
