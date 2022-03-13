import { Dialect, Sequelize } from 'sequelize'

const {
  DATABASE_ENGINE,
  DATABASE_HOST,
  DATABASE_PORT,
  DATABASE_PASSWORD,
  DATABASE_USERNAME,
  DATABASE_NAME,
  DATABASE_POOLSIZE
} = process.env

const dataSource = new Sequelize(
  DATABASE_NAME!,
  DATABASE_USERNAME!,
  DATABASE_PASSWORD,
  {
    dialect: DATABASE_ENGINE as Dialect,
    host: DATABASE_HOST,
    port: parseInt(DATABASE_PORT!),
    logging: true,
    pool: {
      max: parseInt(DATABASE_POOLSIZE!)
    },
    timezone: '+08:00', // 设置时区为东八区
    define: {
      // freezeTableName: true // 指定为 true 来为 sequelize 实例全局定义冻结表名，否则会自动在 modelName 后面加个 s 来作为表名
      // underscored: true // 转换驼峰为下划线
    }
  }
)

;(async () => {
  try {
    // 如果表不存在，则创建该表（如果已经存在，则不执行任何操作）
    // await dataSource.sync()

    // 将创建表，如果表已经存在，则将其首先删除
    // await dataSource.sync({ force: true })

    // 这将检查数据库中表的当前状态（它具有哪些列，它们的数据类型等），然后在表中进行必要的更改以使其与模型匹配
    await dataSource.sync({ alter: true })

    // 仅当「数据库名称」以 '_test' 结尾时，才会运行 sync
    // await dataSource.sync({ force: true, match: /_test$/ })

    // 也可以调用单个模型对应的 sync 方法来单独同步指定的表
    console.log('同步数据库成功')
  } catch (e) {
    console.log('同步数据库失败', e)
  }
})()

export default dataSource
