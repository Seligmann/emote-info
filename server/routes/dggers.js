import express from 'express';
import { removeUser, getDggers, createDgger, getDgger, updateLogs, fillLogs } from '../controllers/dggers.js'

const router = express.Router();

router.get('/', getDggers);
router.get('/user', getDgger);
router.post('/user', createDgger);
router.post('/', updateLogs);
// router.post('/', fillLogs);
router.delete('/user', removeUser);

export default router;
