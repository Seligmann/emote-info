import express from 'express';
import { removeUser, getDggers, createDgger, getDgger } from '../controllers/dggers.js'

const router = express.Router();

router.get('/', getDggers);
router.get('/user', getDgger);
router.post('/', createDgger);
router.delete('/user', removeUser);

export default router;
