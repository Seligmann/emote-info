import express from 'express';
import { getDggers, createDgger } from '../controllers/dggers.js'

const router = express.Router();

router.get('/', getDggers);
router.post('/', createDgger);

export default router;