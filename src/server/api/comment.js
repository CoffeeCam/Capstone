const express = require('express')
const commentsRouter = express.Router();

const{
    createComments,
    getCommentByreviewId
    }=require('../db/comment');

commentsRouter.post('/createComment',async(req,res,next)=>{
   try{
    const {reviewId,creatorId,comment}=req.body;
    const com=await createComments(
       { reviewId, creatorId, comment}
   );
    res.send({com,
    message:'comment created'});
    }catch({error}){
        next({error});
    }
})
commentsRouter.get('/review/comments/:reviewId',async(req,res,next)=>{
    try{
        const{reviewId}=req.params;
        const id=parseInt(reviewId);
        const comm=await getCommentByreviewId(id)
        res.send(comm);
    }catch(error){
        next(error);
    }
})
module.exports = commentsRouter;