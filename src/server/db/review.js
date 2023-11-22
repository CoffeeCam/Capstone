const { newError } = require('wd/lib/utils');
const db = require('./client');
const util=require('./util');

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

async function updateReview({id,...fields}){
  try{
      const toupdate={};
      for(let column in fields){
        if(fields[column]!=undefined) toupdate[column]=fields[column];
      }
      let review;
      if(util.dbFields(toupdate).insert.length>0){
        const {rows} = await db.query(`
        UPDATE reviews 
        SET ${util.dbFields(toupdate).insert}
        WHERE id = ${1}
        RETURNING *;
      `, Object.values(toupdate));
      review=rows[0];
      }
     return review;
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
async function getReviewCharIdCreatorId(charId,creatorId){
  try{
      const {rows}= await db.query(`
      SELECT id FROM reviews where charId = $1 and creatorId = $2;
      `,[charId,creatorId]);
      return rows;
    }catch(error){
      throw error;
    }
}
async function getReviewById(id){
  try{
      const {rows: [review]} = await db.query(`
      SELECT * FROM reviews
      WHERE id = $1
    `, [id]);
    return review;
  }
  catch(error){
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
    getRatingBycharId,
    getReviewById,
    getReviewCharIdCreatorId
 };
