import express from "express";
const router = express.Router();

import user_routes from './routes/user_route.js';
// import initAppleAuth from "./controllers/initAppleAuth.js";

router.use('/auth', user_routes);
// initAppleAuth(router);

export default router;