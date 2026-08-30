import {contactController} from "../controllers/contact.controller.js"
import express from 'express'
const router = express.Router();
router.post("/",contactController);
export default router;