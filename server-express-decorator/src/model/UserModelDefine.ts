import { Model, DataTypes, Optional } from 'sequelize'
import dataSource from './dataSource'

interface UserAttributes {
  id: string
  username: string
  email: string
  password: string
  balance: number
}

interface UserCreationAttributes extends Optional<UserAttributes, 'balance'> {}
interface UserInstance
  extends Model<UserAttributes, UserCreationAttributes>,
    UserAttributes {}

// const UserModelDefine = dataSource.define<UserInstance>(
//   'UserModelDefine',
//   {
//     id: { type: DataTypes.STRING, primaryKey: true },
//     username: { type: DataTypes.STRING, allowNull: false, unique: true },
//     email: { type: DataTypes.STRING, allowNull: false, unique: true },
//     password: { type: DataTypes.STRING, allowNull: false },
//     balance: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 100 }
//   },
//   {
//     tableName: 'user2'
//   }
// )

// 改成在 indexes 中指定 unique: true，避免出现 Error: Too many keys specified; max 64 keys allowed
// https://github.com/sequelize/sequelize/issues/9653
const UserModelDefine = dataSource.define<UserInstance>(
  'UserModelDefine',
  {
    id: { type: DataTypes.STRING, primaryKey: true },
    username: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false },
    password: { type: DataTypes.STRING, allowNull: false },
    balance: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 100 }
  },
  {
    tableName: 'user2',
    indexes: [
      { unique: true, fields: ['username'] },
      { unique: true, fields: ['email'] }
    ]
  }
)

export default UserModelDefine
