import { Pool } from 'pg';
import config  from '../configration';

const pool = new Pool({
    host: config.Host,
    database: config.Database,
    user: config.User_Name,
    port: parseInt(config.Db_Port as string),
    password:config.Password
})

pool.on('error', (error:Error) => {
    console.log(error.message);
})



export default pool;