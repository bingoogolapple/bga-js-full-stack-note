import { configure, getLogger } from 'log4js'
import path from 'path'

configure(path.join(__dirname, '../config/log4js.json'))

export const startupLogger = getLogger('startup')
export const accessLogger = getLogger('http')
export const dbLogger = getLogger('db')

export default getLogger()
