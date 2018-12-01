const Joi = require('joi');

module.exports = {
    validateParam: (schema, name) => {
        return (req, res, next) => {
            const result = Joi.validate({ param: req['params'][name]}, schema);
            if(result.error) {
                return res.status(400).json(result.error);
            } else {
                if(!req.value)
                    req.value = {};

                if(!req.value['params'])
                    req.value['params'] = {};
                
                req.value['params'][name] = result.value.param;
                next();
            }
        }
    },

    validateBody: (schema) => {
        return (req, res, next) => {
            const result = Joi.validate(req.body, schema);

            if(result.error) {
                return res.status(400).json(result.error);
            } else {
                if(!req.value) 
                    req.value = {};
                
                if(!req.value['body']) 
                    req.value['body'] = {};

                req.value['body'] = result.value;
                next();
            }
        }
    },

    schemas: {
        userSchema: Joi.object().keys({
            firstName: Joi.string().required(),
            lastName: Joi.string().required(),
            isAdmin: Joi.string().required(),
            password: Joi.string().required()
        }),

        userOptionalSchema: Joi.object().keys({
            firstName: Joi.string(),
            lastName: Joi.string(),
            isAdmin: Joi.string(),
            password: Joi.string()
        }),

        facultySchema: Joi.object().keys({
            facultyName: Joi.string().required()
        }),

        facultyOptionalSchema: Joi.object().keys({
            facultyName: Joi.string()
        }),

        facultyGroupSchema: Joi.object().keys({
            groupName: Joi.string().required(),
            dateStart: Joi.string().required(),
            dateEnd: Joi.string().required()
        }),

        groupSchema: Joi.object().keys({
            groupName: Joi.string().required(),
            dateStart: Joi.string().required(),
            dateEnd: Joi.string().required(),
            faculty: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required()
        }),

        putGroupSchema: Joi.object().keys({
            groupName: Joi.string().required(),
            dateStart: Joi.string().required(),
            dateEnd: Joi.string().required()
        }),

        patchGroupSchema: Joi.object().keys({
            groupName: Joi.string(),
            dateStart: Joi.string(),
            dateEnd: Joi.string()
        }),

        teacherSchema: Joi.object().keys({
            firstName: Joi.string().required(),
            lastName: Joi.string().required()
        }),

        patchTeacherSchema: Joi.object().keys({
            firstName: Joi.string(),
            lastName: Joi.string()
        }),

        lessonSchema: Joi.object().keys({
            lessonName: Joi.string().required(),
            time: Joi.string().required(),
            group: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required(),
            teacher: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required(),
            room: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required()
        }),

        putLessonSchema: Joi.object().keys({
            lessonName: Joi.string().required(),
            time: Joi.string().required(),
            group: Joi.string().regex(/^[0-9a-fA-F]{24}$/),
            teacher: Joi.string().regex(/^[0-9a-fA-F]{24}$/),
            room: Joi.string().regex(/^[0-9a-fA-F]{24}$/)
        }),

        patchLessonSchema: Joi.object().keys({
            lessonName: Joi.string(),
            time: Joi.string(),
            group: Joi.string().regex(/^[0-9a-fA-F]{24}$/),
            teacher: Joi.string().regex(/^[0-9a-fA-F]{24}$/),
            room: Joi.string().regex(/^[0-9a-fA-F]{24}$/)
        }),


        idSchema: Joi.object().keys({
            param: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required()
        })  
    }
}
