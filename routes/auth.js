const router = require('express').Router();
const User = require('../model/User');
const { registerValidation } = require('../validation');




router.post('/register', async (req, res) => {

    const {error} = Joi.validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    const emailExist = await User.findOne({ email: req.body.email });
    if(emailExist) return res.status(400).send('Email Already Exists');

    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    });

    try {
        const savedUser = await user.save();
        res.send(savedUser);
    } catch(err) {
        res.status(400).send(err);
    }
});


router.post('/login', async (req, res) => {
    const { error } = loginValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    const emailExist = await User.findOne({ email: req.body.email });
    if(!emailExist) return res.status(400).send('Email or password is wrong');

    const validPass = await bcrypt.compare( req.body.password , user.password);
    if(!validPass) return res.status(400).send('Invalid Password');

    res.send('Logged in!');
});

module.exports = router;