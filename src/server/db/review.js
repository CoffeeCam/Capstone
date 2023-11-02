const db = require('./client');

const createReview=async({charId,creatorId,rating,review})=>{
    try {
        const { rows: [char ] } = await db.query(`
        INSERT INTO reviews(charId,creatorId,rating,review)
        VALUES($1, $2, $3, $4)
       
        RETURNING *`, [charId,creatorId,rating,review]);

        return char;
    } catch (err) {
        throw err;
    }
}
async function updateReview(id){
    try{
        const {rows: [name]} = await db.query(`
        UPDATE * FROM review
        WHERE id = $1
      `, [id]);
    }
    catch(error){
        throw error;
    }
}
async function deleteReview(id){
    try{
        const {rows: [name]} = await db.query(`
        DELETE * FROM review
        WHERE id = $1
      `, [id]);
    }
    catch(error){
        throw error;
    }
}
module.exports = {
    createReview,
    updateReview,
    deleteReview
 };