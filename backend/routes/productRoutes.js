import express from 'express';
const router = express.Router();

router.get('/', (req, res) => {
    res.json({ message: 'Product routes are working!' });
});

export default router;