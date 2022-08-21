import dotenv from 'dotenv';

dotenv.config();

const { Port, Host, User_Name, Database, Password, Db_Port } = process.env;

export default {
    Port,
    Host,
    User_Name,
    Database,
    Password,
    Db_Port
}


