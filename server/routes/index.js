import '../redis/redis-client.js';
import express from 'express';
import { get } from 'mongoose';

import { getGames } from '../controllers/games.js';
import { getDetailedGame, getLiveGame } from '../controllers/liveGame.js';
import { updateSchedule } from '../controllers/games.js';

const router = express.Router();
router.use(express.json());

//endpoint for schedule
router.get('/date/:reqDate?', getGames);
//endpoint for detailed past game data
router.get('/game/:gameID', getDetailedGame);
//endpoint for livegame data
router.get('/live/:gameID', getLiveGame);

//dev api for updating the schedule
router.get('/dev/updateSchedule', updateSchedule);

export default router;