const express = require('express')
const charactersRouter = express.Router();

const {createCharacter,
    getCharacterByName,
    getAllCharacter,
    getCharacterSearch,
    getCharacterByHouse,
    getCharacterById,
    deleteCharacter}=require('../db/character');


// GET /api/characters
charactersRouter.get('/',async(req,res,next)=>{
    try{
        const chars=await getAllCharacter();
        res.send(chars);
    }catch(error){
        next(error);
    }
})
charactersRouter.get('/character/:charId',async(req,res,next)=>{
    try{
     const {charId}=req.params;
     const Id=parseInt(charId);
     const characterDetails=await getCharacterById(Id);
     res.send(characterDetails);
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
charactersRouter.get('/searchChar',async(req,res,next)=>{
    try{
        const {q}=req.query;
        
        const chars=await getCharacterSearch(q.charAt(0).toUpperCase() + q.slice(1));
        res.send(chars);
    }catch(error){
        next({
            name:"no character exists",
            message:"no match data found"
        });
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
charactersRouter.delete('/character/:id',async(req,res,next)=>{
    try{
        const {id}=req.params;
        const chars=await deleteCharacter(id);
        res.status(204).send();
    }catch(error){
        next(error);
    }
})

module.exports = charactersRouter;