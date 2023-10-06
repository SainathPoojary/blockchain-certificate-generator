const { hash, compare } = require("bcrypt");
const { sign } = require("jsonwebtoken");
const User = require("../model/user");

const SECRET = process.env.SECRET_KEY;

const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // validate the fields
        if (!(name && email && password))
            return res.status(400).json({
                status: 400,
                code: "missing-fields",
                message: "All fields required",
            });

        // check if user already exist
        const existingUser = await User.findOne({ email });

        if (existingUser)
            return res.status(409).json({
                status: 409,
                code: "user-exist",
                message: "User already exist",
            });

        // encrypt user password
        const hashpassword = await hash(password, 5);

        // create user in database
        const user = await User.create({
            name,
            email,
            password: hashpassword,
            certificate: [],
        });

        // generate token
        if (!SECRET) throw new Error("Secret is not defined");
        const token = sign({ email, user_id: user._id }, SECRET, {
            expiresIn: "2h",
        });

        // return new user
        res
            .status(201)
            .cookie("access_token", token, {
                httpOnly: true,
                expires: new Date(Date.now() + 2 * 60 * 60 * 1000),
                sameSite: true,
            })
            .json({
                name: user.name,
                email: user.email,
                images: user.images,
                storageUsed: user.storageUsed,
            });
    } catch (e) {
        console.log(e);
        res.status(500).json({
            status: 500,
            code: "server-error",
            message: "Something went wrong!",
        });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // validate all fields
        if (!(email && password)) res.status(400).send("All fields required");

        // get user from database
        const user = await User.findOne({ email });

        // check if password is correct
        if (!(user && compare(password, user.password)))
            return res
                .status(400)
                .json({ code: "invalid-password", msg: "Invaild email or password" });

        // generate token
        if (!SECRET) throw new Error("Secret is not defined");
        const token = sign({ email, user_id: user._id }, SECRET, {
            expiresIn: "2h",
        });

        // return user
        res
            .status(200)
            .cookie("access_token", token, {
                httpOnly: true,
                expires: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
                sameSite: true,
            })
            .json({
                name: user.name,
                email: user.email,
                certificates: user.certificates || [],
            });
    } catch (e) {
        console.log(e);
        res.send(500).send("Something went wrong!");
    }
};

const dashboard = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.user.email });

        if (!user) return res.status(400).json({
            status: 400,
            message: "User not found"
        });

        res.status(200).json({
            name: user.name,
            email: user.email,
            certificates: user.certificates || [],
        });
    } catch (e) {
        console.log(e);
        res.status(500).json({
            status: 500,
            message: "Something went wrong",
        });
    }
};

const logout = (req, res) => {
    try {
        res.clearCookie("access_token");
        res.status(200).send("Logout success");
    } catch (error) {
        console.log(error);
        res.status(500).send("Something went wrong");
    }
};


module.exports = { register, login, dashboard, logout };