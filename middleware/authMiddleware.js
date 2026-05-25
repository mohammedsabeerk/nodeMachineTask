import jwt from "jsonwebtoken"

const authMiddleware = (req, res , next)=>{
    try {
        const authHeader = req.headers.authorization

        if(!authHeader){
            return res.json({message:"no token provided"})
        }

        const token = authHeader.split(" ")[1]

        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        req.user=(decoded)

        next()

        
    } catch (error) {
        res.json({message:"Invalid Token"})
    }
}
export default authMiddleware