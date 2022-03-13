import { createPool } from 'mysql2/promise'

const {
  DATABASE_MY_HOST,
  DATABASE_MY_PORT,
  DATABASE_MY_PASSWORD,
  DATABASE_MY_USERNAME,
  DATABASE_MY_NAME,
  DATABASE_MY_POOLSIZE
} = process.env

const pool = createPool({
  host: DATABASE_MY_HOST,
  port: parseInt(DATABASE_MY_PORT!),
  user: DATABASE_MY_USERNAME,
  password: DATABASE_MY_PASSWORD,
  database: DATABASE_MY_NAME,
  connectionLimit: parseInt(DATABASE_MY_POOLSIZE!)
})

export async function sqlPoolQuery(
  sql: string,
  values: any | any[] | { [param: string]: any }
) {
  try {
    console.log('\nsqlPoolQuery', sql, values)
    values && console.log(`values: ${values}`)
    const [result, fields] = await pool.query(sql, values)
    result && console.log(`result: ${JSON.stringify(result)}\n`)
    return result
  } catch (err) {
    console.log('sqlPoolQuery 失败', err)
    throw err
  }
}

export async function sqlPoolExecute(
  sql: string,
  values: any | any[] | { [param: string]: any }
) {
  try {
    console.log('\nsqlPoolExecute', sql, values)
    values && console.log(`values: ${values}`)
    const [result, fields] = await pool.execute(sql, values)
    result && console.log(`result: ${JSON.stringify(result)}\n`)
    return result
  } catch (err) {
    console.log('sqlPoolExecute 失败', err)
    throw err
  }
}
