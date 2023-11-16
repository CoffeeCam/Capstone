const db = require('./client');

const createReview=async({charId,creatorId,rating,review})=>{
    try {
        const { rows: [review ] } = await db.query(`
        INSERT INTO reviews(charId,creatorId,rating,review)
        VALUES($1, $2, $3, $4)
       
        RETURNING *`, [charId,creatorId,rating,review]);

        return review;
    } catch (err) {
        throw err;
    }
}
async function updateReview1(id,rating,review){
    try{
        const {rows: [name]} = await db.query(`
        UPDATE rating,review FROM reviews
        WHERE id = $1
      `, [id]);
    }
    catch(error){
        throw error;
    }
}

async function updateReview({id, ...fields}){
    try {
      const toUpdate = {}
      for(let column in fields) {
        if(fields[column] !== undefined) toUpdate[column] = fields[column];
      }
      let activity;
      if (util.dbFields(toUpdate).insert.length > 0) {
        const {rows} = await client.query(`
          UPDATE activities
          SET ${ util.dbFields(toUpdate).insert }
          WHERE id=${ id }
          RETURNING *;
        `, Object.values(toUpdate));
        activity = rows[0];
      }
      return activity;
    } catch (error) {
      throw error
    }
  }

async function deleteReview(id){
    try{
        const {rows: [name]} = await db.query(`
        DELETE * FROM reviews
        WHERE id = $1
      `, [id]);
    }
    catch(error){
        throw error;
    }
}
async function getAllReview(){
    try{
        const {rows}= await db.query(`
        SELECT * FROM reviews;
        `);
        return rows;
      }catch(error){
        throw error;
      }
}
module.exports = {
    createReview,
    updateReview,
    updateReview1,
    deleteReview,
    getAllReview
 };