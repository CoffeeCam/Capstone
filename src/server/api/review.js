const express = require('express')
const reviewsRouter = express.Router();
const jwt = require('jsonwebtoken')
const { JWT_SECRET = 'neverTell' } = process.env;
const {createReview,getAllReview,getRatingBycharId,updateReview,getReviewById,getReviewCharIdCreatorId,getReviewDetailsByCharId,getReviewDetailsByCreatorId,deleteReview}=require('../db/review');
const { requiredNotSent}=require('./utils');

reviewsRouter.post('/createReview',async(req,res,next)=>{
    const prefix='Bearer ';
    const auth = req.get('Authorization');
    if (!auth) { 
        next();
      } 
      else if (auth.startsWith(prefix)) {
        try{
        const token = auth.slice(prefix.length);
        const parsedToken = jwt.verify(token,JWT_SECRET);
        const creatorId=parsedToken && parsedToken.id;
      
    const{charId,rating,review}=req.body;
    
        const char=await createReview({
            charId,creatorId,rating,review
        });
        res.send({
            message:'review created',
           char
        });
    }
    catch({error}){
        next({error});
    }}
    else {
        next({
          name: 'AuthorizationHeaderError',
          message: ''
        });
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

reviewsRouter.get('/rating/:charId',async(req,res,next)=>{
   try{
    const {charId}=req.params;
    const rating=await getRatingBycharId(charId);
    res.send(rating);
   }catch(error){
    next(error);
   }

})

reviewsRouter.delete('/:reviewId',async(req,res,next)=>{
    try{
     const {reviewId}=req.params;
     const id=parseInt(reviewId);
     const res1=await deleteReview(id);
     res.status(204).send(res1);
    }catch(error){
     next(error);
    }
 
 })
 reviewsRouter.get('/reviewdetails/:reviewId',async(req,res,next)=>{
    try{
     const {reviewId}=req.params;
     const id=parseInt(reviewId);
     const reviews=await getReviewById(id);
     res.send(reviews);
    }catch(error){
     next(error);
    }
 
 })
reviewsRouter.get('/review/:charId',async(req,res,next)=>{
    try{
     const {charId}=req.params;
     const id=parseInt(charId);
     const reviews=await getReviewDetailsByCharId(id);
     res.send(reviews);
    }catch(error){
     next(error);
    }
 
 })
 reviewsRouter.post('/isReviewPresent',async(req,res,next)=>{
    try{
    const {charId,creatorId}=req.body;
    const char=parseInt(charId);
    const creator=parseInt(creatorId);
    if(!charId||!creatorId){
        next({
            name: 'MissingCredentialsError',
            message: 'Please supply both an charId and creatorId'
        });
    }
   
       const userReviews=await getReviewCharIdCreatorId(char,creator);
       res.send(userReviews);
       

      
    }catch(error){
     next(error);
    }
 })
 reviewsRouter.get('/user/:creatorId',async(req,res,next)=>{
    try{
    const {creatorId}=req.params;
       const creator=parseInt(creatorId);
       const userReviews=await getReviewDetailsByCreatorId(creator);
       
       res.send(userReviews);
       

      
    }catch(error){
     next(error);
    }
 })

 
 reviewsRouter.patch('/reviewUpdate/:reviewId',requiredNotSent({requiredParams: ['rating', 'review'], atLeastOne: true}),async(req,res,next)=>{
   
    try{
       const {reviewId}=req.params;
       const id=parseInt(reviewId);
       const {rating,review}=req.body;
       const existingReview=await getReviewById(id);
       if(!existingReview){
           next({
               name:'NotFound',
               message:'No review found'
           });
       }else{
           const updatedReview=await updateReview({id:id,rating,review});
           if(updatedReview){
               res.send(updatedReview);
           }else{
               next({
                   name:'FailToUpdate',
                   message:'There was an error updating the review'
               })
           }
   
       }
    }
   catch(error){
     next(error);
   }
   });
   
   
module.exports = reviewsRouter;
