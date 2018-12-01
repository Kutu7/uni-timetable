const express = require('express');
// const router = express.Router();
const router = require('express-promise-router')();


const UserController = require('../controllers/controller.user');

const { validateBody, validateParam, schemas } = require('../helpers/routeHelper');

router.route('/')
    .get(UserController.getUsers)
    .post(validateBody(schemas.userSchema), UserController.newUser);

router.route('/:userId')
    .get(validateParam(schemas.idSchema, 'userId'), UserController.getUser)
    .put([validateParam(schemas.idSchema, 'userId'),
         validateBody(schemas.userSchema)],
         UserController.replaceUser)
    .patch([validateParam(schemas.idSchema, 'userId'),
           validateBody(schemas.userOptionalSchema)],
           UserController.updateUser);

module.exports = router;