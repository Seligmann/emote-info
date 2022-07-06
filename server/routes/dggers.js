import express from 'express';
import { getDggers, createDgger, getDgger } from '../controllers/dggers.js'

const router = express.Router();

router.get('/', getDggers);
router.get('/user', getDgger);
router.post('/', createDgger);

export default router;