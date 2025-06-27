import express from "express";
const router = express.Router();
import { decodedToken } from "../helpers/user_jwt.js";

import {
    create_group
} from "../controllers/user_controller.js";

router.post('/create-group', decodedToken, create_group);


export default router;