// Theory:-

// In Node.js, middleware functions are functions that sit between the request and response cycle. They have access to the request object (req), response object (res), and the next function in the application's request-response cycle. This gives them the ability to modify the request or response objects, perform specific tasks like authentication, logging, or error handling, and then pass control to the next middleware function in the stack.

// How Middleware Works?
// 1. Request comes in:
// When a request is made to your Node.js application, it goes through a series of middleware functions.
// 2. Middleware execution:
// Each middleware function is executed one after the other.
// 3. Access to req, res, next:
// Each middleware function has access to the request object (req), response object (res), and the next function.
// 4. Performing tasks:
// Middleware functions can perform various tasks, such as:
// Parsing request bodies.
// Authenticating users.
// Logging request details.
// Handling errors.
// 5. Calling next():
// To pass control to the next middleware function in the stack, the current middleware function must call next(). If next() is not called, the request will hang.
// 6. Response sent:
// // Once all middleware functions have been executed, the final middleware function usually calls a route handler to generate a response.


//Middleware for authentication(auth) , isStudent, isAdmin)

const jwt=require('jsonwebtoken');
require('dotenv').config();

// 1st Middleware i.e auth 

// routes me hum multiple middlewares define karte h, jaise hi ek middleware end hoga, then next middleware ko execute karne ke liye next() callback funciton ka use kiya jata hai

    exports.auth=(req,res,next)=>{
        try {
            //extract jwt token
            const token=req.body.token || req.cookie.token
            if(!token){
                return res.status(400).json({
                    sucess:false,
                    message:"Token Not Found "
                })
            }

            //Verify Token jwt.verify(token,secret_key) verify is used to decode the token, Within decode, payload object us stored
            try{
                const decode=jwt.verify(token,process.env.JWT_SECRET);
                console.log(decode);
                // o/p=> {
                            // email: 'zsdfdgkkds@kk.com',
                            // id: '66911527821386a9d7d2698b',
                            // role: 'Student',
                            // iat: 1720865369,
                            // exp: 1720872569
                        // }
                // now send the decoded token to request body under user property.
                req.user=decode;
            }catch(err){
                return res.status(401).json({
                    success:false,
                    message:"Token is invalid"
                })
            }
            //Now goto next middleware
            next();
        } catch (error) {
            
        return res.status(401).json({
            success:false,
            message:"Something went wrong"
        })
    }
}

exports.isStudent=(req,res,next)=>{
    //req.user ke andar decoded token .is payload is stored with role hai
    // so if role!==student then error
    try {
        if(req.user.role!=="Student"){
            return res.status(401).json({
                success:false,
                message:"Role does not match, This is protcted route for student"
            })
        }
        next(); 
    } catch (error) {
        return res.status(401).json({
            success:false,
            message:"user role is not matching"
        })
    }
}

exports.isAdmin=(req, res, next)=>{
    try{
        if(req.user.role!=="Admin"){
            res.status(400).josn({
                success:false,
                message:"Role does not match,,This is protected route for Admin"
            })
        }
        next();
    }catch(error){
        return res.status(401).json({
            success:false,
            message:"user role is not matching"
        })
    }
}