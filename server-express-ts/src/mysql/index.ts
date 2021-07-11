import { createConnection, FieldInfo, MysqlError } from 'mysql'

const client = createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "111111",
    database: "bga-mysql"
})

export function sqlQuery(sql: string, values: any, callback: (result?: any) => void) {
    client.query(sql, values, (err: MysqlError | null, result?: any, fields?: FieldInfo[]) => {
        console.log(`sql: ${sql}`)
        values && console.log(`values: ${values}`)
        err && console.log(`err: ${JSON.stringify(err)}`)
        console.log(`result: ${JSON.stringify(result)}`)
        // console.log(`fields: ${JSON.stringify(fields)}`)
        if (err) {
            console.log(err)
            return
        }
        callback(result)
    })
}
