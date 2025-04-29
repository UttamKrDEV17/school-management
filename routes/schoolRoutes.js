import express from 'express';
import { addSchool,getSchool } from '../controllers/schoolController.js';

const schoolRouter = express.Router();

schoolRouter.post('/addSchool',addSchool)
schoolRouter.get('/listSchools',getSchool)

export default schoolRouter;