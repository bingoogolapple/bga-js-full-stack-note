import { createConnection } from 'mysql2'

const {
  DATABASE_MY_HOST,
  DATABASE_MY_PORT,
  DATABASE_MY_PASSWORD,
  DATABASE_MY_USERNAME,
  DATABASE_MY_NAME
} = process.env

const conn = createConnection({
  host: DATABASE_MY_HOST,
  port: parseInt(DATABASE_MY_PORT!),
  user: DATABASE_MY_USERNAME,
  password: DATABASE_MY_PASSWORD,
  database: DATABASE_MY_NAME
})

export function sqlQuery(
  sql: string,
  values: any | any[] | { [param: string]: any },
  callback: (result?: any) => void
) {
  conn.query(sql, values, (err, result) => {
    console.log('\nsqlQuery', sql, values)
    values && console.log(`values: ${values}`)
    err && console.log(`err: ${JSON.stringify(err)}`)
    result && console.log(`result: ${JSON.stringify(result)}\n`)
    if (err) {
      console.log('sqlQuery 失败', err)
      throw err
    }
    callback(result)
  })
}

export function sqlExecute(
  sql: string,
  values: any | any[] | { [param: string]: any },
  callback: (result?: any) => void
) {
  conn.execute(sql, values, (err, result) => {
    console.log('\nsqlExecute', sql, values)
    values && console.log(`values: ${values}`)
    err && console.log(`err: ${JSON.stringify(err)}`)
    result && console.log(`result: ${JSON.stringify(result)}\n`)
    if (err) {
      console.log('sqlExecute 失败', err)
      throw err
    }
    callback(result)
  })
}
