import jwt from 'jsonwebtoken';

const decodedToken = (req, res, next) => {
    try {
        if (req.headers.authorization) {
            const token = req.headers.authorization.split(' ').pop();
            const decodedToken = jwt.verify(token, process.env.SECRET_KEY)
            if (decodedToken) {
                req.user_id = decodedToken.user_id;
                next()
            }
            else {
                throw res.json({ message: 'Please enter a valid token' })
            }
        }
        else {
            throw res.json({ message: 'Token is require' })
        }
    } catch (error) {
        console.log(error);
        res.status(400).json(error);
    }
}

export { decodedToken };