const db = require('./client');


const createCharacter = async({firstname,lastname,image,house,sex,role,summary}) => {
   
    try {
        const { rows: [char ] } = await db.query(`
        INSERT INTO character(firstname,lastname,image,house,sex,role,summary)
        VALUES($1, $2, $3, $4, $5, $6, $7)
        ON CONFLICT (firstname) DO NOTHING
        RETURNING *`, [firstname,lastname,image,house,sex,role,summary]);

        return char;
    } catch (err) {
        throw err;
    }
}
async function getCharacterByName(firstname){
    try {
      const {rows: [name]} = await db.query(`
        SELECT * FROM charcter
        WHERE name = $1
      `, [firstname]);
      return name;
    } catch (error) {
      throw error;
    }
  }
async function getAllCharacter(){
  try{
    const {rows}= await db.query(`
    SELECT * FROM character;
    `);
    return rows;
  }catch(error){
    throw error;
  }
}

module.exports = {
   createCharacter,
   getCharacterByName,
   getAllCharacter
};