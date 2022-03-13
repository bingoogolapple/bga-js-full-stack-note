import moment from 'moment'
import {
  Model,
  DataTypes,
  Optional,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional
} from 'sequelize'
import dataSource from './dataSource'

/**
 * DataTypes.DATE => datetime 年月日时分秒
 * DataTypes.DATEONLY => date 年月日
 * DataTypes.TIME => time 时分秒
 *
 * DataTypes.STRING => varchar(255)
 * DataTypes.STRING(100) => varchar(100)
 *
 * DataTypes.UUID => char(36)
 * DataTypes.CHAR => char(255)
 * DataTypes.CHAR(100) => char(100)
 *
 * DataTypes.BOOLEAN => tinyint(1)
 *
 * DataTypes.TINYINT => tinyint(4)
 * DataTypes.SMALLINT => smallint(6)
 * DataTypes.MEDIUMINT => mediumint(9)
 * DataTypes.INTEGER => int(11)
 * DataTypes.INTEGER.UNSIGNED => int(10) unsigned
 * DataTypes.BIGINT => bigint(20)
 * DataTypes.FLOAT => float
 * DataTypes.DOUBLE => double
 * DataTypes.DECIMAL => decimal(10,0)
 *
 * DataTypes.TEXT('tiny') => tinytext
 * DataTypes.TEXT => text
 * DataTypes.TEXT('medium') => mediumtext
 * DataTypes.TEXT('long') => longtext
 *
 * DataTypes.BLOB('tiny') => tinyblob
 * DataTypes.BLOB => blob
 * DataTypes.BLOB('medium') => mediumblob
 * DataTypes.BLOB('long') => longblob
 */
interface BasicAttributes {
  id: number
  name: string
  uuid?: string
  num1?: number
  num2?: number
  customTime?: string
  desc?: string
  someUnique: string
  uniqueOne: string
  uniqueTwo: number
}

interface BasicCreationAttributes extends Optional<BasicAttributes, 'id'> {}
interface BasicInstance
  extends Model<BasicAttributes, BasicCreationAttributes>,
    BasicAttributes {}

export const BasicModelDefine = dataSource.define<BasicInstance>(
  'BasicModelDefine',
  {
    // 即使不指定 id，也会自动创建自增主键 id
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true, // 主键
      autoIncrement: true // 自增
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'default name', // 指定默认值
      comment: '这是带有注释的列' // 为数据库中的字段添加注释
    },
    uuid: {
      type: DataTypes.CHAR,
      defaultValue: DataTypes.UUIDV4 // 特殊的默认值，DataTypes.UUIDV4 或 DataTypes.UUIDV1
    },
    num1: {
      type: DataTypes.INTEGER,
      defaultValue: 1
    },
    num2: {
      type: DataTypes.INTEGER,
      defaultValue: 1
    },
    desc: DataTypes.STRING(100), // 如果关于列的唯一指定内容是其数据类型，可以缩短语法，直接指定类型
    customTime: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW, // 特殊的默认值，当前日期/时间将用于填充此列（在插入时）
      get() {
        const time = this.getDataValue('customTime') // 虽然上面自定义了数据库字段名，但从 getDataValue 中获取值时还是要传递 updatedAt
        return moment(time).format('YYYY-MM-DD HH:mm:ss')
      }
    },
    someUnique: {
      type: DataTypes.STRING,
      // unique 属性是创建唯一约束的简写，属性可以是布尔值或字符串；推荐在 options 中指定索引
      // unique: true // 不推荐在 attributes 中定义单一索引时设置 unique 为「true」，因为当开启同步表功能后，这种写法每次都会创建新的索引，索引创建多了会报错
      unique: 'someUnique' // 推荐在 attributes 中定义单一索引时设置 unique 为「字符串」，避免当开启同步表功能后出现多次创建索引的问题
    },
    uniqueOne: {
      type: DataTypes.STRING
      // unique: 'compositeIndex' // 如果为多个列提供相同的字符串，则它们将形成一个复合唯一键
    },
    uniqueTwo: {
      type: DataTypes.INTEGER
      // unique: 'compositeIndex' // 如果为多个列提供相同的字符串，则它们将形成一个复合唯一键
    }
    // 这种方式自定义后，新增或修改时还是会自动赋值
    // updatedAt: {
    //   type: DataTypes.DATE,
    //   // allowNull: false, // 这种方式自定义后，虽然真正写入数据库时会自动赋值，但是在真正写入数据库之前框架本身会做校验，并且会校验失败（除非提前赋值），所以不要指定 allowNull 为 true
    //   field: 'updated_at', // 自定义数据库中的字段名
    //   get() {
    //     const time = this.getDataValue('updatedAt') // 虽然上面自定义了数据库字段名，但从 getDataValue 中获取值时还是要传递 updatedAt
    //     return moment(time).format('YYYY-MM-DD HH:mm:ss')
    //   }
    // }
  },
  {
    tableName: 'basicDefine', // 手动指定表名，否则会自动在 modelName 后面加个 s 来作为表名
    // freezeTableName: true, // 指定为 true 来冻结表名，否则会自动在 modelName 后面加个 s 来作为表名；也可以为 sequelize 实例全局定义此行为
    // underscored: true, // 转换驼峰为下划线
    /**
     * 默认情况下，Sequelize 使用数据类型 DataTypes.DATE（对应的 SQL 为 DATETIME NOT NULL）自动向每个模型添加 createdAt 和 updatedAt 字段
     * 这些字段会自动进行管理，每当你使用 Sequelize 创建或更新内容时，这些字段都会被自动设置
     * createdAt 字段将包含代表创建时刻的时间戳，而 updatedAt 字段将包含最新更新的时间戳
     * 注意：这是在 Sequelize 级别完成的（即未使用 SQL 触发器完成），如果单独写 sql 来创建或修改数据将不会导致这些字段自动更新
     */
    // createdAt: false, // 只禁止自动创建 createdAt 字段
    // updatedAt: false, // 只禁止自动创建 updatedAt 字段
    // timestamps: false, // 同时禁止自动创建 createdAt 和 updatedAt 字段
    // updatedAt: 'updateTimestamp', // 想要 updatedAt 但是希望名称叫做 updateTimestamp
    // 在 options 中设置索引的话会自动将表明和相关的列明从驼峰转换为 _ 后再用 _ 拼接起来
    indexes: [
      // { unique: true, fields: ['someUnique'] },
      { unique: true, fields: ['uniqueOne', 'uniqueTwo'] }
    ],
    // paranoid 设置为 true 时调用 destroy 方法就是软删除，删除时会自动为 deletedAt 字段赋值当前时间
    paranoid: true
  }
)

export class BasicModelClass extends Model<
  InferAttributes<BasicModelClass>,
  InferCreationAttributes<
    BasicModelClass,
    { omit: 'id' | 'uuid' | 'customTime' } // 可以通过 omit 来指定创建时可选
  >
> {
  declare id: number
  declare name: string
  declare uuid: string
  declare num1?: number
  declare num2?: number
  declare customTime: string
  // 也可以通过 CreationOptional 来指定创建时的可选
  declare desc: CreationOptional<string>
  // 也可以直接通过 ? 来指定创建时可选
  // declare desc?: string
  declare someUnique: string
  declare uniqueOne: string
  declare uniqueTwo: number
}

BasicModelClass.init(
  {
    // 即使不指定 id，也会自动创建自增主键 id
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true, // 主键
      autoIncrement: true // 自增
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'default name', // 指定默认值
      comment: '这是带有注释的列' // 为数据库中的字段添加注释
    },
    uuid: {
      type: DataTypes.CHAR,
      defaultValue: DataTypes.UUIDV4 // 特殊的默认值，DataTypes.UUIDV4 或 DataTypes.UUIDV1
    },
    num1: {
      type: DataTypes.INTEGER,
      defaultValue: 1
    },
    num2: {
      type: DataTypes.INTEGER,
      defaultValue: 1
    },
    desc: DataTypes.STRING(100), // 如果关于列的唯一指定内容是其数据类型，可以缩短语法，直接指定类型
    customTime: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW, // 特殊的默认值，当前日期/时间将用于填充此列（在插入时）
      get() {
        const time = this.getDataValue('customTime') // 虽然上面自定义了数据库字段名，但从 getDataValue 中获取值时还是要传递 updatedAt
        return moment(time).format('YYYY-MM-DD HH:mm:ss')
      }
      // 如果是密码，还可以统一在 set 中加盐、加密
      // set(value) {
      //   this.setDataValue('password', md5(this.username + value));
      // }
    },
    someUnique: {
      type: DataTypes.STRING,
      // unique 属性是创建唯一约束的简写，属性可以是布尔值或字符串；推荐在 options 中指定索引
      // unique: true // 不推荐在 attributes 中定义单一索引时设置 unique 为「true」，因为当开启同步表功能后，这种写法每次都会创建新的索引，索引创建多了会报错
      unique: 'someUnique' // 推荐在 attributes 中定义单一索引时设置 unique 为「字符串」，避免当开启同步表功能后出现多次创建索引的问题
    },
    uniqueOne: {
      type: DataTypes.STRING
      // unique: 'compositeIndex' // 如果为多个列提供相同的字符串，则它们将形成一个复合唯一键
    },
    uniqueTwo: {
      type: DataTypes.INTEGER
      // unique: 'compositeIndex' // 如果为多个列提供相同的字符串，则它们将形成一个复合唯一键
    }
    // 这种方式自定义后，新增或修改时还是会自动赋值
    // updatedAt: {
    //   type: DataTypes.DATE,
    //   // allowNull: false, // 这种方式自定义后，虽然真正写入数据库时会自动赋值，但是在真正写入数据库之前框架本身会做校验，并且会校验失败（除非提前赋值），所以不要指定 allowNull 为 true
    //   field: 'updated_at', // 自定义数据库中的字段名
    //   get() {
    //     const time = this.getDataValue('updatedAt') // 虽然上面自定义了数据库字段名，但从 getDataValue 中获取值时还是要传递 updatedAt
    //     return moment(time).format('YYYY-MM-DD HH:mm:ss')
    //   }
    // }
  },
  {
    sequelize: dataSource,
    // modelName: 'BasicModelClass1', // 自定义模型名称，不指定的话默认为类名
    tableName: 'basicClass', // 手动指定表名，否则会自动在 modelName 后面加个 s 来作为表名
    // freezeTableName: true, // 指定为 true 来冻结表名，否则会自动在 modelName 后面加个 s 来作为表名；也可以为 sequelize 实例全局定义此行为
    // underscored: true, // 转换驼峰为下划线
    /**
     * 默认情况下，Sequelize 使用数据类型 DataTypes.DATE（对应的 SQL 为 DATETIME NOT NULL）自动向每个模型添加 createdAt 和 updatedAt 字段
     * 这些字段会自动进行管理，每当你使用 Sequelize 创建或更新内容时，这些字段都会被自动设置
     * createdAt 字段将包含代表创建时刻的时间戳，而 updatedAt 字段将包含最新更新的时间戳
     * 注意：这是在 Sequelize 级别完成的（即未使用 SQL 触发器完成），如果单独写 sql 来创建或修改数据将不会导致这些字段自动更新
     */
    // createdAt: false, // 只禁止自动创建 createdAt 字段
    // updatedAt: false, // 只禁止自动创建 updatedAt 字段
    // timestamps: false, // 同时禁止自动创建 createdAt 和 updatedAt 字段
    // updatedAt: 'updateTimestamp', // 想要 updatedAt 但是希望名称叫做 updateTimestamp
    // 在 options 中设置索引的话会自动将表明和相关的列明从驼峰转换为 _ 后再用 _ 拼接起来
    indexes: [
      // { unique: true, fields: ['someUnique'] },
      { unique: true, fields: ['uniqueOne', 'uniqueTwo'] }
    ],
    // paranoid 设置为 true 时调用 destroy 方法就是软删除，删除时会自动为 deletedAt 字段赋值当前时间
    paranoid: true
  }
)

console.log('模型有', dataSource.models)
