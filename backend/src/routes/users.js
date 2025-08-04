import express from "express"
import { User } from '../models/User.js';
import {auth} from '../middleware/auth.js';

const router = express.Router();

// Get user by ID
router.get('/:userId', async (req, res) => {
    try {
        const user = await User.findById(req.params.userId).select('-password');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Update user profile
router.put('/:userId', auth, async (req, res) => {
    try {
        if (req.userId !== req.params.userId) {
            return res.status(403).json({ message: 'Not authorized' });
        }

        const { bio } = req.body;
        const user = await User.findByIdAndUpdate(
            req.params.userId,
            { bio },
            { new: true }
        ).select('-password');

        res.json(user);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

export default router;