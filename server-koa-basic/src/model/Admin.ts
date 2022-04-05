import { Column, Model, Table } from 'sequelize-typescript'

@Table({ tableName: 'admin' })
export default class Admin extends Model {
  @Column
  username!: string
}
