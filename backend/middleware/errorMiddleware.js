export const notFound = (req, res, next) =>{
    const error = new Error (` ${req.originalUrl} is not Found`)
    res.status(404)
    next(error)
}

export const errorHandler = (error, req, res, next) => {
    let status = res.statusCode === 200 ? 500 : res.statusCode
    let message = error.message
     if(error.name === "CastError" && error.kind === 'ObjectId' ){
        status = 404 
        message = 'Not Found'

     }

     res.status(status).json({
        message,
     })
}