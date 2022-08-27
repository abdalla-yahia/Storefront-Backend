import dotenv from 'dotenv';

dotenv.config();

const {
	ports,
	Main_Env,
	Main_name,
	Main_password,
	Main_host,
	Main_port,
	Main_database,
	Main_database_test,
	Bcrypt_password,
	Salt,
	Secret_Token,
} = process.env;

export default {
    Ports:ports,
    user: Main_name,
    password: Main_password,
    host: Main_host,
    port: Main_port,
    database: Main_Env == "dev" ? Main_database : Main_database_test,
    becrypt: Bcrypt_password,
    salt: Salt,
    token:Secret_Token
}