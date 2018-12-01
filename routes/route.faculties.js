const express = require('express');
// const router = express.Router();
const router = require('express-promise-router')();


const FacultyController = require('../controllers/controller.faculty');

const { validateBody, validateParam, schemas } = require('../helpers/routeHelper');

router.route('/')
    .get(FacultyController.getFaculties)
    .post(validateBody(schemas.facultySchema), FacultyController.newFaculty);

router.route('/:facultyId')
    .get(validateParam(schemas.idSchema, 'facultyId'), FacultyController.getFaculty)
    .put([validateParam(schemas.idSchema, 'facultyId'),
         validateBody(schemas.facultySchema)],
         FacultyController.replaceFaculty)
    .patch([validateParam(schemas.idSchema, 'facultyId'),
           validateBody(schemas.facultyOptionalSchema)],    
           FacultyController.updateFaculty)
    .delete(validateParam(schemas.idSchema, 'facultyId'), 
           FacultyController.deleteFaculty);

router.route('/:facultyId/groups')
    .get(validateParam(schemas.idSchema, 'facultyId'),FacultyController.getFacultyGroups)
    .post([validateParam(schemas.idSchema, 'facultyId'),
          validateBody(schemas.facultyGroupSchema, 'facultyId')],        
          FacultyController.newFacultyGroup);

module.exports = router;