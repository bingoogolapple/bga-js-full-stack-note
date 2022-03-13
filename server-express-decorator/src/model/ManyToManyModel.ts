import { Model, DataTypes, Optional } from 'sequelize'
import dataSource from './dataSource'

interface MovieAttributes {
  id: number
  name: string
}

interface MovieInstance
  extends Model<MovieAttributes, Optional<MovieAttributes, 'id'>>,
    MovieAttributes {}

export const MovieModelDefine = dataSource.define<MovieInstance>(
  'movie',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: DataTypes.STRING
  },
  {
    freezeTableName: true
  }
)

interface ActorAttributes {
  id: number
  name: string
}

interface ActorInstance
  extends Model<ActorAttributes, Optional<ActorAttributes, 'id'>>,
    ActorAttributes {}

export const ActorModelDefine = dataSource.define<ActorInstance>(
  'actor',
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false }
  },
  {
    freezeTableName: true
  }
)

interface MovieActorAttributes {
  // id: number // 可以单独设置一个业务无关的主键
  movieId: number
  actorId: number
}

interface MovieActorInstance
  extends Model<MovieActorAttributes>,
    MovieActorAttributes {}

export const MovieActorModelDefine = dataSource.define<MovieActorInstance>(
  'movieActor',
  {
    movieId: { type: DataTypes.INTEGER, primaryKey: true },
    actorId: { type: DataTypes.INTEGER, primaryKey: true }
  },
  {
    freezeTableName: true
  }
)

/*
CREATE TABLE `movie` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1

CREATE TABLE `actor` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1

CREATE TABLE `movieActor` (
  `movieId` int(11) NOT NULL,
  `actorId` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`movieId`,`actorId`),
  UNIQUE KEY `movieActor_actorId_movieId_unique` (`movieId`,`actorId`),
  KEY `actorId` (`actorId`),
  CONSTRAINT `movieActor_ibfk_1` FOREIGN KEY (`movieId`) REFERENCES `movie` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `movieActor_ibfk_2` FOREIGN KEY (`actorId`) REFERENCES `actor` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1
*/

/**
 * 创建一个「多对多」关系，需要使用 belongsToMany
 * A.belongsToMany(B, { through: 'AB' }) => A 属于多个 B，关联意味着 A 和 B 之间存在多对多的关系
 * B.belongsToMany(A, { through: 'AB' }) => B 属于多个 A，关联意味着 B 和 A 之间存在多对多的关系
 * 会生成中间表 AB，具有外键 aId 和 bId
 */
MovieModelDefine.belongsToMany(ActorModelDefine, {
  through: MovieActorModelDefine
}) // 添加改行后查询 Movie 时才能级联查询出 Actor
ActorModelDefine.belongsToMany(MovieModelDefine, {
  through: MovieActorModelDefine
}) // 添加改行后查询 Actor 时才能级联查询出 Movie
