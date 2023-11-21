const express = require('express')
const reviewsRouter = express.Router();
const jwt = require('jsonwebtoken')
const { JWT_SECRET = 'neverTell' } = process.env;
const {createReview,getAllReview, getReviewBycharId,getRatingBycharId}=require('../db/review');
const { requireUser,requiredNotSent}=require('./utils');

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
    catch(error){
        next(error);
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

reviewsRouter.get('/review/:charId',async(req,res,next)=>{
    try{
     const {charId}=req.params;
     const rating=await getReviewBycharId(charId);
     res.send(rating);
    }catch(error){
     next(error);
    }
 
 })
 reviewsRouter.patch('/:reviewId',requiredNotSent({requiredParams: ['rating', 'review'], atLeastOne: true}),async(req,res,next)=>{
   
    try{
       const{reviewId}=req.params;
       const existingReview=await getReviewById(reviewId);
       if(!existingReview){
           next({
               name:'NotFound',
               message:'No review found'
           });
       }else{
           const{rating,review}=req.body;
           const updatedReview=await updateReview({id:reviewId,rating,review});
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
