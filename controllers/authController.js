import User from '../models/User.js';

export const login = async (req, res) => {
    const { email, name } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }

    res.json({ message: 'Login successful', user });
};
