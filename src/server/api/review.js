const express = require('express')
const reviewsRouter = express.Router();
const client=require("../db/client");
const {createReview,getAllReview}=require('../db/review');
const {requireUser, requiredNotSent}=require('./utils');


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

reviewsRouter.patch('/createReview/:charId',requiredNotSent({requiredParams: ['rating','review']}),async(req,res,next)=>{
    const{rating,review}=req.body;
    try{
        const createdReview=await createReview({
            charId,creatorId,rating,review
        });
        res.send({
            message:'review created',
           createdReview
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