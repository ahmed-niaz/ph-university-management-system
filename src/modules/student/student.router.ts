import { Router } from 'express';
import { studentController } from './student.controller';

const studentRouter = Router();
studentRouter.get('/:studentId', studentController.singleStudent);

export default studentRouter;
