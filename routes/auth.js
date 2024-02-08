const router = require("express").Router();
const User = require("../models/user");
const { registerValidation, loginValidation } = require("../validation");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

router.post("/register", async (req, res) => {
    const { error } = registerValidation(req.body);

    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }

    const emailExists = await User.findOne({ email: req.body.email});
    if (emailExists) { 
        return res.status(400).json({ error: "Email already exists"});
    }

    const usernameExists = await User.findOne({ name: req.body.name});
    if (usernameExists) { 
        return res.status(400).json({ error: "Username already exists"});
    }

    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash(req.body.password, salt);

    const userObj = new User({
        name: req.body.name,
        email: req.body.email,
        password
    });

    try {
        const savedUser = await userObj.save();
        res.json({ error: null, data: savedUser._id });
    } catch (error) {
        res.status(400).json({error});
    }
})

router.post("/login", async (req, res) => {
    const { error } = loginValidation(req.body);

    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }

    const user = await User.findOne({ name: req.body.name});
    if (!user) { 
        return res.status(400).json({ error: "Username and password does not match 4"});
    }

    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) { 
        return res.status(400).json({ error: "Username and password does not match 5"});
    }

    const token = jwt.sign(
        {
            name: user.name,
            id: user._id
        },
        process.env.TOKEN_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN }
        );

    res.header("auth-token", token).json({
        error: null,
        data: { token }
    })

    // return res.status(200).json({msg: "Regiuster route ..."});
})

module.exports = router;