import Router from 'express';
import { getAllCourses, getCourseDetails } from '../controllers/course.controller';

const router = Router()

router.route('/').get(getAllCourses)
router.route('/:_id').get(getCourseDetails)

export default router