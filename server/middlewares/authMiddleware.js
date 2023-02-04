import jwt from 'jsonwebtoken'
import { createError } from '../utils/error.js'

export const verifyToken = (req, res, next) =>{
    if(req.headers.authorization.startsWith["Bearer"]){
        const token = req.headers.authorization.split(" ")[1];
        try {
            if(token){
                jwt.verify(token, process.env.JWT,(err, user)=>{
                    if(err) return next(createError(403, "Token is not valid."));
                    else{
                        req.user = user;
                        next();
                    }
                });
            }else{
                return next(createError(401, "You are not authenticated."));
            }
        } catch (error) {
            next(error);
        }
    }else{
        return next(createError(404, "Token not found."));
    }
}

// export const verifyToken = (req, res, next) =>{
//     const token = req.cookies.access_token;
//     if(!token) return next(createError(401, "You are not authenticated."));
//     else{
//         jwt.verify(token, process.env.JWT,(err, user)=>{
//             if(err) return next(createError(403, "Token is not valid."));
//             else{
//                 req.user = user;
//                 next();
//             }
//         });
//     }
// }

export const verifyUser = (req, res, next) =>{
    verifyToken(req,res,  ()=>{
        if(req.user.id === req.params.id || req.user.isAdmin) {
            next()
        }
        else{
            return next(createError(403, "You are not authorized."));
        }
    });
}

export const verifyAdmin = (req, res, next) =>{
    verifyToken(req,res, ()=>{
        if(req.user.isAdmin) {
            next()
        }
        else{
            return next(createError(403, "You are not authorized."));
        }
    });
}