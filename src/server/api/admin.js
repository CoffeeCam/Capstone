const express = require('express')
const adminRouter = express.Router();
const { JWT_SECRET = 'neverTell' } = process.env;
const {}=require('./utils');

const{getAdminUser,createAdminUser}=require('../db/admin');
const jwt=require('jsonwebtoken');


adminRouter.get('/login',async(req,res,next)=>{
    try{
        const admin=await getAdminUser({email,password});
    }
    catch({error}){
       next({error});
    }
})

module.exports = adminRouter;