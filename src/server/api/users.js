const express = require('express')
const usersRouter = express.Router();
const { JWT_SECRET = 'neverTell' } = process.env;
const {}=require('./utils');
const {
    createUser,
    getUser,
    getUserByEmail,
    deleteUserById,
    getAllUser
} = require('../db/users');
const jwt = require('jsonwebtoken');
const { requireUser, requiredNotSent } = require('./utils');



usersRouter.get('/alluser', async( req, res, next) => {
    try {
        const users = await getAllUser();

        res.send(
            users
        );
    } catch ({name, message}) {
        next({name, message})
    }
});

usersRouter.post('/login', async(req, res, next) => {
    const { email, password } = req.body;
    if(!email || !password) {
        next({
            name: 'MissingCredentialsError',
            message: 'Please supply both an email and password'
        });
    }
    try {
        const user = await getUser({email, password});
        if(user) {
            const token = jwt.sign({
                id: user.id,
                email:user.email
            }, JWT_SECRET, {
                expiresIn: '1w'
            });

            res.send({
                user,
                message: 'Login successful!',
                token
            });
        }
        else {
            next({
                name: 'IncorrectCredentialsError',
                message: 'Username or password is incorrect'
            });
        }
    } catch(err) {
        next(err);
    }
});

usersRouter.post('/register', async(req, res, next) => {
    
    try {
        const { name,email, password,house } = req.body;
        const queriedUser = await getUserByEmail(email);

        if(queriedUser) {
            res.status(401);
            next({
                name: 'UserExistsError',
                message: 'A user with that email already exists.'
            });
        }else if (password.length < 8) {
            res.status(401);
            next({
              name: 'PasswordLengthError',
              message: 'Password must be at least 8 characters in length.'
            });
        } else{
        const user = await createUser({
            name,
            email,
            password,
            house,
        });
        if(!user){
            next({
                name: 'UserCreationError',
                message: 'Sorry, something went wrong. Please try again.',
            });
        }else{
        const token = jwt.sign({
            id: user.id,
            email:user.email
        }, JWT_SECRET, {
            expiresIn: '1w'
        });

        res.send({
            user,
            message: 'Sign up successful!',
            token
        });
    }
    }
    } catch({error}) {
        next({error})
    }
})
usersRouter.delete('/user/:id', async( req, res, next) => {
    try {
        const {id}=req.params;
        const users = await deleteUserById(id);

        res.status(204).send();
    } catch ({name, message}) {
        next({name, message})
    }
});
module.exports = usersRouter;