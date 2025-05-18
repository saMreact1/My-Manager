const {User} = require('../db/models/user.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const JWT_SECRET = process.env.JWT_SECRET || 'superSecretKey'; // Use a strong secret key in production

const createToken = (user) => {
  return jwt.sign({
    id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
    tenantId: user.tenantId || user._id
  }, JWT_SECRET, {expiresIn: '7d'});
}

exports.register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    const existingUser = await User.findOne({ email, tenantId: req.user.tenantId });

    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
      tenantId: req.user.tenantId // 👈 This is key
    });

    res.status(201).json({
      message: 'User registered successfully',
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
        tenantId: newUser.tenantId
      }
    });

  } catch (err) {
    res.status(500).json({ message: 'Registration failed', error: err.message });
  }
};



exports.registerAdmin = async (req, res) => {
  try {
    console.log('⚡️ registerAdmin called');
    const { name, email, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    let admin = new User({
      name,
      email,
      password: hashedPassword,
      role: 'admin',
      tenantId: null
    });

    await admin.save();
    admin.tenantId = admin._id;
    await admin.save();

    const token = createToken(admin);

    console.log('✅ Admin after tenantId set:', admin);
    console.log('📦 Response payload:', {
      id: admin._id,
      name: admin.name,
      email: admin.email,
      role: admin.role,
      tenantId: admin.tenantId
    });

    res.status(201).json({
      message: 'Admin registered successfully',
      token,
      user: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
        role: admin.role,
        tenantId: admin.tenantId
      }
    });
  } catch (err) {
    console.error('❌ Error in registerAdmin:', err);
    res.status(500).json({ message: 'Error registering admin' });
  }
};


// exports.login = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     const user = await User.findOne({ email, tenantId: req.user.tenantId });
//     if (!user) {
//       return res.status(401).json({ message: 'User not found' });
//     }

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//       return res.status(401).json({ message: 'Invalid credentials' });
//     }

//     if (user.role === 'admin' && !user.tenantId) {
//       user.tenantId = user._id;
//       await user.save();
//     }

//     const token = createToken(user);

//     res.status(200).json({
//       message: 'Login successful',
//       token,
//       user: {
//         id: user._id,
//         name: user.name,
//         email: user.email,
//         role: user.role,
//         tenantId: user.tenantId || user._id
//       }
//     });
//   } catch (err) {
//     console.error('❌ Login error: ', err);
//     res.status(500).json({ message: 'Login failed', error: err.message });
//   }
// };

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    console.log('📥 Incoming login request body:', req.body);

    // 🧠 Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }

    // 🔐 Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log('🔐 Input password:', password);
      console.log('🔐 Stored hash:', user.password);
      console.log('✅ Password match:', isMatch);
      console.log('Login request:', req.body);
      console.log('User found:', user);


      return res.status(401).json({ message: 'Invalid password' });
    }

    // 🛠️ Fallback: Assign tenantId if missing (especially for admins)
    if (!user.tenantId) {
      user.tenantId = user._id;
      await user.save();
    }

    // 🎟️ Create JWT
    const token = jwt.sign({
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      tenantId: user.tenantId,
    }, JWT_SECRET, { expiresIn: '7d' });

    // ✅ Send response
    res.status(200).json({
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        tenantId: user.tenantId
      }
    });

  } catch (err) {
    console.error('Login error: ', err);
    res.status(500).json({ message: 'Login failed', error: err.message });
  }
};
