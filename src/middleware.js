const jwt = require('jsonwebtoken');

const secret = process.env.JWT_SECRET;
if(!secret)
{
    throw new Error("FATAL ERROR : JWT_SECRET environment key is missing");
}
const JWT_SECRET = secret;

function authToken(req,res,next)
{
    //extracts authentication header
    const authHeader = req.headers['authorization'];
//header format is Bearer <token>
//safely extracts JWT string from Authorization HTTP header,splits it into an array and extracts the [1] index element == string
    const token = authHeader && authHeader.split(' ')[1]

    if(!token)
    {
        return res.status(401).json({error : "Access denied,token is missing"});
    }

    jwt.verify(token,JWT_SECRET,(err,user)=>
    {
        if(err)
        {
            return res.status(403).json({error : "Invalid/expired token"});
        }

        req.user = user;
        //attaches decoded JWT payload ,that was passed into jwt.sign, to request object user so any route handler can access it after this middleare
        next();
        //passes contol to next middleare or final route handler in chain
    });

}

module.exports = authToken;