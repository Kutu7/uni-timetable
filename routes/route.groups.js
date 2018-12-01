const express = require('express');
// const router = express.Router();
const router = require('express-promise-router')();

const GroupController = require('../controllers/controller.groups');

const { validateBody, validateParam, schemas } = require('../helpers/routeHelper');

router.route('/')
    .get(GroupController.getGroups)
    .post(validateBody(schemas.groupSchema),
          GroupController.newGroup);

router.route('/:groupId')
    .get(validateParam(schemas.idSchema, 'groupId'),
        GroupController.getGroup)
    .put([validateParam(schemas.idSchema, 'groupId'),
         validateBody(schemas.putGroupSchema)],
         GroupController.replaceGroup)
    .patch([validateParam(schemas.idSchema, 'groupId'),
           validateBody(schemas.patchGroupSchema)],
           GroupController.updateGroup)
    .delete(validateParam(schemas.idSchema, 'groupId'), 
            GroupController.deleteGroup);

module.exports = router;