import express from 'express';
import { removeUser, createDgger, getDgger, updateLogs, fillLogs } from '../controllers/users.js'
import cors from 'cors';

const router = express.Router();

//router.get('/', cors(), getDggers);
router.get('/user', cors(), getDgger);
router.post('/channel/user', cors(), createDgger);
router.post('/', cors(), updateLogs);
// router.post('/', fillLogs);
router.delete('/user', cors(), removeUser);

export default router;
