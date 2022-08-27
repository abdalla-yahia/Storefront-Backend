import Product from "../types/product.type";
import db from "../databases";
import bcrypt from "bcrypt";
import config from "../configration";

const hashpassword=(password : string)=>{
    const salt = parseInt(config.salt as string);
    return bcrypt.hashSync(`${password}${config.becrypt}`,salt)
}
class ProductModels {
	//Create New Product
	async creat(p: Product) {
		try {
			const connection = db.connect();
			const sql = `INSERT INTO products (name,price,count,total_price,password,email) VALUES ($1,$2,$3,$4,$5,$6) RETURNING *`;
			const result = await (
				await connection
			).query(sql, [
				p.name,
				p.price,
				p.count,
				p.total_price,
				hashpassword(p.password as string),
				p.email,
			]);
			(await connection).release();
			return result.rows[0];
		} catch (err) {
			console.log(err);
		}
	}
	//Get All Products
	async getAllProducts() {
		try {
			const connection = db.connect();
			const sql = `SELECT * FROM products`;
			const resault = (await connection).query(sql);
			(await connection).release();
			return (await resault).rows;
		} catch (err) {
			console.log(err);
		}
	}
	//Get Specific Product
	async getSpecificProduct(p: Product): Promise<Product> {
		try {
			const connection = await db.connect();
			const sql =
				"SELECT id,name,count,price,total_price FROM products WHERE id = $1";
			const resault = connection.query(sql, [p.id]);
			connection.release();
			return (await resault).rows[0];
		} catch (err) {
			throw new Error("Can not get product $1");
		}
	}
	//Update Product
	async updateProduct(p: Product): Promise<Product[]> {
		try {
			const connection = await db.connect();
			const sql =
				"UPDATE products SET name=$1 ,price = $2 , count=$3, total_price = $4 WHERE id = $5 RETURNING id,name,price,count,total_price";
			const resault = connection.query(sql, [
				p.name,
				p.price,
				p.count,
				p.total_price,
				p.id,
			]);
			connection.release();
			return (await resault).rows;
		} catch (err) {
			throw new Error(`cant update ${p.name} this product`);
		}
	}

	//Delete One product By Its Id
	async deleteProduct(p: Product): Promise<Product> {
		try {
			const connection = await db.connect();
			const sql = "DELETE FROM products WHERE id = $1 RETURNING *";
			const resault = await connection.query(sql, [p.id]);
			connection.release();
			return resault.rows[0];
		} catch (err) {
			throw new Error(`Itime  you wont deleted is not exist`);
		}
	}
	//Delete All Products
	async deleteAllProducts() {
		try {
			const connection = await db.connect();
			const sql = "DELETE FROM products ";
			const resault = await connection.query(sql);
			connection.release();
			return resault.rows;
		} catch (err) {
			throw new Error("Can Not Delete All Products ");
		}
	}

	//Authentication
	async authentication(
		password:string,
		email:string,
	) {
        try {
            const connection = await db.connect();
            const sql = "SELECT password FROM products WHERE email = $1";
            const resault = connection.query(sql, [email]);
            if ((await resault).rows.length) {
                const { password: hashpassword } = (await resault).rows[0]
                const ispasswordvalid = bcrypt.compareSync(password+config.becrypt, hashpassword)
                if (ispasswordvalid) {
                    const u = connection.query('SELECT name,price,count,total_price,email FROM products WHERE email =$1', [email]);
                    connection.release()
                    return (await u).rows[0]
                }
            };
            connection.release()
            return null;
		}catch (err) {
			throw new Error("Not Found The User");
		}
	}
}

export default ProductModels;
