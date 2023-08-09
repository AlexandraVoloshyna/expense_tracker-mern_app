import  jwt  from "jsonwebtoken";

export const genToken = (UserId)=>{
  if(!UserId){
    console.log("no user id")
  }
    const tokenAccess = jwt.sign({
        UserId,
   }, process.env.JWT_ACCESS,{ expiresIn: '15m' })
   const tokenRefresh = jwt.sign({
    UserId,
}, process.env.JWT_REFRESH,{ expiresIn: '30d' })
 return{
    tokenAccess,
    tokenRefresh
 }




}

export const validateAccessToken =(token) => {
    try {
        const userData = jwt.verify(token, process.env.JWT_ACCESS);
        return userData;
    } catch (error) {
        return null;
    }
}

export const validateRefreshToken = (token) => {
    try {
        const userData = jwt.verify(token, process.env.JWT_REFRESH);
        return userData;
    } catch (error) {
        return null;
    }
}