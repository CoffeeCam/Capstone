const db = require('./client');
const util=require('./util');

const createComments=async({reviewId, creatorId, comment})=>{

    try{
        const{row:comm}=await db.query(`
        Insert INTO Comments(reviewId,creatorId,comment)
        VALUES($1,$2,$3)
        RETURNING * `
        ,[reviewId,creatorId,comment]);
        return comm;
    }catch(error){
        throw error;
     }
    }
const getCommentByreviewId=async(reviewId)=>{
    try{
     const {rows:commentDetails}=await db.query(`
     select comments.comment,users.name from comments join 
     reviews on comments.reviewId=reviews.id 
     join users on users.id=reviews.creatorId where reviewId=$1;
     `,[reviewId]);
     return commentDetails;
    }catch(error){
        throw error;
    }
}
const getCommentByuserId=async(userId)=>{
    try{
        const {rows:commentDetails}=await db.query(`SELECT * FROM comments WHERE creatorId=$1`,[userId]);
        return commentDetails;
    }catch(error){
        throw error;
    }
}
module.exports={
    createComments,
    getCommentByreviewId,
    getCommentByuserId
};