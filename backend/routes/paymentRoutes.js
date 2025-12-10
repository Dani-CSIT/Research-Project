import express from 'express';
const router = express.Router();

// Payment routes
router.get('/', (req, res) => {
    res.json({ message: 'Payment routes are working!' });
});

router.post('/create-payment', (req, res) => {
    res.json({ message: 'Create payment endpoint' });
});

router.get('/success', (req, res) => {
    res.json({ message: 'Payment success endpoint' });
});

router.get('/cancel', (req, res) => {
    res.json({ message: 'Payment cancelled endpoint' });
});

// Make sure this is the last line - default export
export default router;