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
        UPDATE * FROM reviews
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
async function getReviewBycharId(id){
    try{
        const {rows}= await db.query(`
        SELECT * FROM reviews WHERE charId = $1
        `, [id]);
        return rows;
      }catch(error){
        throw error;
      }
}
async function getRatingBycharId(id){
    try{
        const {rows}= await db.query(`
        SELECT rating FROM reviews WHERE charId = $1
        `, [id]);
        return rows;
      }catch(error){
        throw error;
      }
}

module.exports = {
    createReview,
    updateReview,
    deleteReview,
    getAllReview,
    getReviewBycharId,
    getRatingBycharId
 };
