import { Model, DataTypes, Optional } from 'sequelize'
import dataSource from './dataSource'

interface FooAttributes {
  id: number
  foo: string
  bar?: BarInstance
}

export interface FooInstance
  extends Model<FooAttributes, Optional<FooAttributes, 'id'>>,
    FooAttributes {}

export const FooModelDefine = dataSource.define<FooInstance>(
  // 'FooModelDefine',
  'foo',
  {
    id: {
      // field: 'customId',
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    foo: { type: DataTypes.STRING, allowNull: false }
  },
  {
    tableName: 'foo'
  }
)

interface BarAttributes {
  id: number
  bar: string
  fooId: number
  foo?: FooInstance
}

export interface BarInstance
  extends Model<BarAttributes, Optional<BarAttributes, 'id'>>,
    BarAttributes {}

export const BarModelDefine = dataSource.define<BarInstance>(
  // 'BarModelDefine',
  'bar',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    bar: DataTypes.STRING,
    fooId: DataTypes.INTEGER
  },
  {
    tableName: 'bar'
  }
)

/*
CREATE TABLE `foo` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `foo` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1

CREATE TABLE `bar` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `bar` varchar(255) DEFAULT NULL,
  `fooId` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fooId` (`fooId`),
  CONSTRAINT `bar_ibfk_1` FOREIGN KEY (`fooId`) REFERENCES `foo` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1
*/
/**
 * 创建一个「一对一」关系，hasOne 和 belongsTo 关联一起使用
 * A.hasOne(B) => A 有一个 B，关联意味着 A 和 B 之间存在一对一的关系，外键在目标模型 B 中定义
 * B.belongsTo(A) => B 属于 A，关联意味着 B 和 A 之间存在一对一的关系，外键在源模型 B 中定义
 */
FooModelDefine.hasOne(BarModelDefine) // 添加改行后查询 Foo 时才能级联查询出 Bar
BarModelDefine.belongsTo(FooModelDefine) // 添加改行后查询 Bar 时才能级联查询出 Foo

/*
CREATE TABLE `bar` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `bar` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `FooModelDefineId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FooModelDefineId` (`FooModelDefineId`),
  CONSTRAINT `bar_ibfk_1` FOREIGN KEY (`FooModelDefineId`) REFERENCES `foo` (`customId`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1
*/
// onDelete 和 onUpdate 的可用的参数为 `RESTRICT`, `CASCADE`, `NO ACTION`, `SET DEFAULT` 和 `SET NULL`
// 一对一关联的默认值, `ON DELETE` 为 `SET NULL` 而 `ON UPDATE` 为 `CASCADE`
// hasOne 参数中设置 onDelete 和 onUpdate 会生效
// belongsTo 参数中设置 onDelete 和 onUpdate 不会生效
// FooModelDefine.hasOne(BarModelDefine, {
//   // onDelete: 'CASCADE', // 有效
//   // onUpdate: 'CASCADE' // 有效
// })
// BarModelDefine.belongsTo(FooModelDefine, {
//   // onDelete: 'CASCADE', // 无效
//   // onUpdate: 'CASCADE' // 无效
// })

/*
CREATE TABLE `bar` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `bar` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `customFooId` int(11) DEFAULT NULL,
  `FooModelDefineId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `customFooId` (`customFooId`),
  KEY `FooModelDefineId` (`FooModelDefineId`),
  CONSTRAINT `bar_ibfk_1` FOREIGN KEY (`customFooId`) REFERENCES `foo` (`customId`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `bar_ibfk_2` FOREIGN KEY (`FooModelDefineId`) REFERENCES `foo` (`customId`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1
*/
// 外键对应字段名默认为 [模型名]Id => [FooModelDefine]Id，即便通过「方式一、二、三、四、五、六」自定义了也还是会保留自动生成的那个外键！
// FooModelDefine.hasOne(BarModelDefine, {
//   foreignKey: 'customFooId' // 方式一
// })
// FooModelDefine.hasOne(BarModelDefine, {
//   foreignKey: {
//     name: 'customFooId', // 方式二
//     allowNull: false // 默认可以为空，指定不可以为空
//   }
// })
// FooModelDefine.hasOne(BarModelDefine)

// BarModelDefine.belongsTo(FooModelDefine, {
//   foreignKey: 'customFooId' // 方式三
// })
// BarModelDefine.belongsTo(FooModelDefine, {
//   foreignKey: {
//     name: 'customFooId' // 方式四
//   }
// })
// BarModelDefine.belongsTo(FooModelDefine, {
//   // 方式五
//   foreignKey: {
//     name: 'customFooId', // 模型属性名
//     field: 'customsdfsdFooId' // 表字段名
//   }
// })
// BarModelDefine.belongsTo(FooModelDefine, {
//   // 方式六
//   foreignKey: {
//     name: 'customFooId', // 模型属性名
//     field: 'customsdfsdFooId' // 表字段名
//   },
//   constraints: false // 不生成外键约束，只生成列名
// })
