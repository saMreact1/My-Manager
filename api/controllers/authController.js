const {User} = require('../db/models/user.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const JWT_SECRET = process.env.JWT_SECRET || 'superSecretKey'; // Use a strong secret key in production

const createToken = (user) => {
    return jwt.sign({
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
    }, JWT_SECRET, {expiresIn: '7d'});
}

exports.register = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;
        const existingUser = await User.findOne({email});

        // Validation: only allow specific roles
        const validRoles = ['user', 'admin'];
        if (!validRoles.includes(role)) {
            return res.status(400).json({ message: 'Invalid role specified' });
        }
        const userRole = role;

        if (existingUser) {
            return res.status(400).json({message: 'User already exists'});
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        
        const newUser = await User.create({
            name,
            email,
            password: hashedPassword,
            role: userRole
        });
        // await newUser.save();
        
        const token = createToken({
            id: newUser._id,
            name: newUser.name,
            email: newUser.email,
            role: newUser.role
        });
        res.status(201).json({message: 'User registered successfully', token, user: {id: newUser._id, name: newUser.name, email: newUser.email, role: newUser.role}});
        
    } catch (err) {
        res.status(500).json({message: 'Registration failed', error: err.message});
    };
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        console.log('User from DB:', user);

        if (!user) {
            return res.status(401).json({ message: 'User not found' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        // if (!isMatch) {
        //     return res.status(401).json({ message: 'Incorrect email or password' });
        // }

        const token = createToken({
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role
        });

        res.status(200).json({
            message: 'Login successful',
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });
    } catch (err) {
        console.error('Login error: ', err);
        res.status(500).json({ message: 'Login failed', error: err.message });
    }
}
