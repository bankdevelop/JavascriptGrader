export default function getTokenDecoded(usertoken){
    process.env.SECRET_KEY = 'secret';
    return jwt.verify(req.body.usertoken, process.env.SECRET_KEY);
}