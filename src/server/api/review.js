const express = require('express')
const reviewsRouter = express.Router();
const client=require("../db/client");
const {createReview,getAllReview}=require('../db/review');
const {requireUser, requiredNotSent}=require('./utils');


reviewsRouter.post('/createReview',requiredNotSent({requiredParams: ['charId', 'creatorId','rating','review']}),async(req,res,next)=>{
    const{charId,creatorId,rating,review}=req.body;
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