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
        SELECT * FROM character
        WHERE firstname = $1
      `, [firstname]);
      return name;
    } catch (error) {
      throw error;
    }
  }

  async function getCharacterByHouse(house){
    try {
      const {rows:name} = await db.query(`
        SELECT * FROM character
        WHERE house = $1;
      `, [house]);
      return name;
    } catch (error) {
      throw error;
    }
  }
  async function getCharacterBylastName(lastname){
    try {
      const {rows: [name]} = await db.query(`
        SELECT * FROM character
        WHERE lastname = $1
      `, [lastname]);
      return name;
    } catch (error) {
      throw error;
    }
  }
  async function getCharacterByRole(role){
    try {
      const {rows: [name]} = await db.query(`
        SELECT * FROM character
        WHERE role = $1
      `, [role]);
      return name;
    } catch (error) {
      throw error;
    }
  }
async function deleteCharacter(id) {
  try {
    const {rows: [name]} = await db.query(`
      DELETE * FROM character
      WHERE id = $1
    `, [id]);
    return name;
  } catch (error) {
    throw error;
  }
}
async function updateCharacter(id){
  try {
    const {rows: [name]} = await db.query(`
      UPDATE * FROM character
      WHERE id = $1
    `, [id]);
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
   getCharacterBylastName,
   getCharacterByRole,
   getAllCharacter,
   deleteCharacter,
   getCharacterByHouse,
   updateCharacter

};