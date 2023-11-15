const express = require('express')
const charactersRouter = express.Router();

const {createCharacter,getCharacterByName,getAllCharacter,getCharacterByHouse}=require('../db/character');


// GET /api/characters
charactersRouter.get('/',async(req,res,next)=>{
    try{
        const chars=await getAllCharacter();
        res.send(chars);
    }catch(error){
        next(error);
    }
})

charactersRouter.get('/searchCharacter',async(req,res,next)=>{
    try{
        const {house}=req.query;
        const chars=await getCharacterByHouse(house);
        res.send({'chars': chars});
    }catch(error){
        next(error);
    }
})

charactersRouter.post('/createCharacter',async(req,res,next)=>{
    const{firstname,lastname,image,house,sex,role,summary}=req.body;
    try{
        const _char=await getCharacterByName(firstname);
        if(_char){
            next({
                name:'Character exist',
                message:'create other character'
            });
        }
        const char=await createCharacter({
            firstname,
            lastname,
            image,
            house,
            sex,
            role,
            summary
        });
        res.send({
            message:'character created',
           char
        });
    }
    catch(error){
        next(error);
    }
})

module.exports = charactersRouter;