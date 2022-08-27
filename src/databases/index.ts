import { Pool } from 'pg'
import config from '../configration'


const pool = new Pool({
    host: config.host,
    database: config.database,
    user: config.user,
    password:config.password,
    port: parseInt(config.port as string, 10),
    max:4
})
pool.on('error', (error: Error) => {
    console.error(error.stack)
})
export default pool;