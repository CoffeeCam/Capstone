const db = require('./client')
const bcrypt = require('bcrypt');
const SALT_COUNT = 10;

const createUser = async({ name, email, password , house,isAdmin}) => {
    const hashedPassword = await bcrypt.hash(password, SALT_COUNT);
    try {
        const { rows: [user]  } = await db.query(`
        INSERT INTO users(name,email, password,house,isAdmin)
        VALUES($1, $2, $3, $4, $5)
        ON CONFLICT (email) DO NOTHING
        RETURNING *`, [ name,email, hashedPassword,house,isAdmin]);

        return user;
    } catch (err) {
        throw err;
    }
}

const getUser = async({email, password}) => {
    if(!email || !password) {
        return;
    }
    try {
        const user = await getUserByEmail(email);
        if(!user) return;
        const hashedPassword = user.password;
        const passwordsMatch = await bcrypt.compare(password, hashedPassword);
        if(!passwordsMatch) return;
        delete user.password;
        return user;
    } catch (err) {
        throw err;
    }
}

const getUserByEmail = async(email) => {
    try {
        const { rows: [ user ] } = await db.query(`
        SELECT * 
        FROM users
        WHERE email=$1;`, [ email ]);

        if(!user) {
            return;
        }
        return user;
    } catch (err) {
        throw err;
    }
}
async function getUserById(userId) {
    // first get the user
    try {
      const {rows: [user]} = await client.query(`
        SELECT *
        FROM users
        WHERE id = $1;
      `, [userId]);
      // if it doesn't exist, return null
      if (!user) return null;
      // if it does:
      // delete the 'password' key from the returned object
      delete user.password; 
      return user;  
    } catch (error) {
      throw error;
    }
  }
async function getAllUser(){
    try{
      const {rows}= await db.query(`
      SELECT id,name,email,house FROM users;
      `);
      return rows;
    }catch(error){
      throw error;
    }
  }
  async function deleteUserById(id){
    try{
      const {rows}= await db.query(`
      DELETE  FROM users where id=$1;
      `,[id]);
      return rows;
    }catch(error){
      throw error;
    }
  }

module.exports = {
    createUser,
    getUser,
    getUserByEmail,
    getAllUser,
    getUserById,
    deleteUserById
};