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
module.exports = {
    createReview
 };