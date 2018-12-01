const express = require('express');
// const router = express.Router();
const router = require('express-promise-router')();

const LessonController = require('../controllers/controller.lesson');

const { validateBody, validateParam, schemas } = require('../helpers/routeHelper');

router.route('/')
    .get(LessonController.getLessons)
    .post(validateBody(schemas.lessonSchema),
          LessonController.newLesson);

router.route('/:lessonId')
    .get(validateParam(schemas.idSchema, 'lessonId'),
        LessonController.getLesson)
    .put([validateParam(schemas.idSchema, 'lessonId'),
         validateBody(schemas.putLessonSchema)],
         LessonController.replaceLesson)
    .patch([validateParam(schemas.idSchema, 'lessonId'),
           validateBody(schemas.patchLessonSchema)],
           LessonController.updateLesson)
    .delete(validateParam(schemas.idSchema, 'lessonId'), 
            LessonController.deleteLesson);

module.exports = router;