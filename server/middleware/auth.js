const { verify } = require("jsonwebtoken");

const SECRET = process.env.SECRET_KEY;

const auth = async (req, res, next) => {
    let token = req.cookies.access_token;

    if (!token)
        return res.status(403).json({
            status: 403,
            error: "access-denied",
            message: "No token found",
        });

    try {
        if (!SECRET) throw new Error("Secret is not defined");
        const decode = verify(token, SECRET);
        req.user = {
            user_id: decode.user_id,
            email: decode.email,
        };
    } catch (error) {
        console.log(error);
        return res.status(401).json({
            status: 401,
            error: "unauthorized",
            message: "Invalid token",
        });
    }

    next();
};

module.exports = auth;
