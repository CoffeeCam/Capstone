const express = require('express')
const reviewsRouter = express.Router();

const {createReview,getAllReview}=require('../db/review');


reviewsRouter.post('/createReview',async(req,res,next)=>{
    const{charId,creatorId,rating,review}=req.body;
    try{
        const char=await createReview({
            charId,creatorId,rating,review
        });
        res.send({
            message:'review created',
           char
        });
    }
    catch(error){
        next(error);
    }
})
reviewsRouter.get('/',async(req,res,next)=>{
    try{
        const reviews=await getAllReview();
        res.send(reviews);
    }catch(error){
        next(error);
    }
})

module.exports = reviewsRouter;