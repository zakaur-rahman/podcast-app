import express from 'express'
import { signupUser, loginUser, newAccessToken, logoutUser, activateAccount} from '../controller/user-controller.js';
import { uploadPodcast } from '../controller/podcast-controller.js';

const router = express.Router();

router.post('/register', signupUser);
router.post('/activation', activateAccount)
router.post('/login', loginUser);
router.post('/refresh-token',  newAccessToken);
router.delete('/logout', logoutUser);

router.post('/upload-podcast',  uploadPodcast);



export default router