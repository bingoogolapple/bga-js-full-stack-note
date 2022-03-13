import {
  Model,
  DataTypes,
  Optional,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional
} from 'sequelize'
import dataSource from './dataSource'

// 方式一
// type UserAttributes = {
//   id: string
//   username: string
//   email: string
//   password: string
//   balance: number
// }

// type UserCreationAttributes = Optional<UserAttributes, 'balance'>

// class UserModelClass extends Model<UserAttributes, UserCreationAttributes> {
//   declare id: string
//   declare username: string
//   declare email: string
//   declare password: string
//   declare balance: number
// }

// 方式二
// class UserModelClass extends Model<
//   InferAttributes<UserModelClass>,
//   InferCreationAttributes<UserModelClass>
// > {
//   declare id: string
//   declare username: string
//   declare email: string
//   declare password: string
//   declare balance: CreationOptional<number>
//   // declare balance: number | null // 这样也行
// }

// 方式三
class UserModelClass extends Model<
  InferAttributes<UserModelClass>,
  InferCreationAttributes<UserModelClass, { omit: 'balance' }>
> {
  declare id: string
  declare username: string
  declare email: string
  declare password: string
  declare balance: number
}

UserModelClass.init(
  {
    id: { type: DataTypes.STRING, primaryKey: true },
    username: { type: DataTypes.STRING, allowNull: false, unique: true },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    password: { type: DataTypes.STRING, allowNull: false },
    balance: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 100 }
  },
  {
    sequelize: dataSource,
    tableName: 'user3'
  }
)
export default UserModelClass
