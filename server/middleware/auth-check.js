const jwt = require("jsonwebtoken");
const User = require("mongoose").model("users");
const keys = require("../config/keys");

module.exports = (req, res, next) => {
    if (!req.headers.authorization) {
        return res.status(401).end();
    }

    const { authorization } = req.headers;

    const token = authorization.split(" ")[1];

    return jwt.verify(token, keys.jwtSecret, (err, decoded) => {
        if (err) {
            return res.status(401).end();
        }

        const userId = decoded._id;

        return User.findById(userId, (userErr, user) => {
            if (userErr || !user) {
                return res.status(401).end();
            }
            return next();
        });
    });
};
