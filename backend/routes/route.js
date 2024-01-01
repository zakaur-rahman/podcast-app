import express from 'express'
import { signupUser, loginUser, newAccessToken, logoutUser, activateAccount} from '../controller/user-controller.js';
import { createPodcast, getPodcastById, getAllPodcast, deletePodcast } from '../controller/podcast-controller.js';
import { verifyToken } from '../controller/jwt-controller.js';

const router = express.Router();

router.post('/signup', signupUser);
router.post('/activation', activateAccount)

router.post('/login', loginUser);
router.post('/token',  newAccessToken);

router.post('/create', verifyToken, createPodcast);
router.post('/delete', verifyToken, deletePodcast);

router.get('/post/:id', verifyToken, getPodcastById);
router.get('/posts', getAllPodcast);

router.delete('/logout', logoutUser);


export default router