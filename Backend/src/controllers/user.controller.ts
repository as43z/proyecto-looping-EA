// usercontroller.ts
// important functions for the user service
import {Request, Response} from 'express';
import User from '../models/User';

// CALL TO CREATE A USER
export async function createUser(req: Request, res: Response): Promise<Response> {
    const {uname, pswd, email} = req.body; // grab the fields from the POST request body

    console.log("new user creation petition for user ", uname);
    console.log("searching...")
    const user_compr = await User.findOne({'uname': uname});

    if(!user_compr){
        console.log("no coincidences found. Creating...");

        // new user.
        const newUser = {
            uname: uname,
            pswd: pswd,
            email: email
        }

        // create a user model and save it
        const user = new User (newUser);
        await user.save();
        
        res.status(201);
        return res.json(user.toJSON()); // Promises need to return something
    } else {
        console.log("user already exists");
        res.status(401);
        return res.json({
            message: 'Could not create user',
        });
    }
}

// CALL TO GET A USER
export async function getUser(res: Response, req: Request) : Promise <Response>{
    // REQUEST user uname
    const uname = req.params.uname;

    console.log("new user search petition for user ", uname);
    console.log("searching...")
    const user = await User.findOne({'uname': uname}, '-pswd');

    if(!user){
        // user does NOT exist
        res.status(404);
        res.json({
            message: 'could not find user',
        });
    } else {
        // user does exist
        res.status(200);
        res.json(user.toJSON());
    }

    return res;
}