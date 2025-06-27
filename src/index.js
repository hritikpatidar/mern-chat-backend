import express from "express";
const router = express.Router();
import auth_routes from './routes/auth_route.js'
import user_routes from './routes/user_route.js';
// import initAppleAuth from "./controllers/initAppleAuth.js";

router.use('/auth', auth_routes);
router.use('/user', user_routes);
// initAppleAuth(router);

export default router;