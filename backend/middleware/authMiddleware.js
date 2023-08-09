import { validateAccessToken } from "../service/tokenService.js";


export const checkAuth = async (req, res, next) =>{
 try {
   const authorizationHeader = req.headers.authorization;
   if (!authorizationHeader) {
       res.status(401)
      throw new Error('User unauthorized')
   }

   const accessToken = authorizationHeader.split(' ')[1];
   if (!accessToken) {
      res.status(401)
      throw new Error('User unauthorized')
   }

   const userData = validateAccessToken(accessToken);
   if (!userData) {
      res.status(401)
      throw new Error('User unauthorized')
   }
   req.user = userData;
   next();
} catch (error) {
   next(error)
}
}