import User from "../types/user.type";
import db from '../database'



class UserModule {
    async create(u: User): Promise<User> {
        try {
            
            const connection = await db.connect();
            const sql = `INSER INTO user(first_name, last_name, email, password) VALUES ($1, $2, $3, $4, $5) returning *`;
            const result = await connection.query(sql, [
                u.first_name,
                u.last_name,
                u.email,
                u.password,
            ]);
            connection.release()
            return result.rows[0];
        } catch (err) {
            throw new Error(` Unapple to creat user`)
        }

    }


}



export default UserModule;