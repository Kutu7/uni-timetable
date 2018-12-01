const express = require('express');
// const router = express.Router();
const router = require('express-promise-router')();

const TeacherController = require('../controllers/controller.teacher');

const { validateBody, validateParam, schemas } = require('../helpers/routeHelper');

router.route('/')
    .get(TeacherController.getTeachers)
    .post(validateBody(schemas.teacherSchema),
          TeacherController.newTeacher);

router.route('/:teacherId')
    .get(validateParam(schemas.idSchema, 'teacherId'),
         TeacherController.getTeacher)
    .put([validateParam(schemas.idSchema, 'teacherId'),
         validateBody(schemas.teacherSchema)],
         TeacherController.replaceTeacher)
    .patch([validateParam(schemas.idSchema, 'teacherId'),
           validateBody(schemas.patchTeacherSchema)],
           TeacherController.updateTeacher)
    .delete(validateParam(schemas.idSchema, 'teacherId'), 
            TeacherController.deleteTeacher);

module.exports = router;