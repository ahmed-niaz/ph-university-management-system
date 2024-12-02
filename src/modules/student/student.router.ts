import { Router } from 'express';
import { studentController } from './student.controller';

const studentRouter = Router();
studentRouter.get('/:studentId', studentController.singleStudent);
studentRouter.put('/:studentId', studentController.updateStudent);
studentRouter.delete('/:studentId', studentController.deleteStudent);
studentRouter.get('/', studentController.getStudent);

export default studentRouter;
