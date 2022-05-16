import express from 'express';
import { getDggers } from '../controllers/dggers.js'

const router = express.Router();

router.get('/', getDggers);

export default router;