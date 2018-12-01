const Teacher = require('../models/model.teacher');

module.exports = {

    //Validation DONE
    getTeachers: async(req, res, next) => {
        const teachers = await Teacher.find({});
        res.status(200).json(teachers);
    },

    //Validation DONE
    newTeacher: async (req, res, next) => {
        const newTeacher = new Teacher(req.value.body);
        const teacher = await newTeacher.save();
        res.status(201).json(teacher);
    },

    //Validation DONE
    getTeacher: async(req, res, next) => {
        const { teacherId } = req.value.params;
        const teacher = await Teacher.findById(teacherId);
        res.status(200).json(teacher);
    },

    //Validation DONE
    replaceTeacher: async(req, res, next) => {
        // enforce that req.body must contain all the fields
        const { teacherId } = req.value.params;
        const newTeacher = req.value.body;
        const result = await Teacher.findByIdAndUpdate(teacherId, newTeacher);
        res.status(200).json({ success: true });
    },

    //Validation DONE
    updateTeacher: async(req, res, next) => {
        //  req.body may contain any number of the fields
        const { teacherId } = req.value.params;
        const newTeacher = req.value.body;
        const result = await Teacher.findByIdAndUpdate(teacherId, newTeacher);
        res.status(200).json({ success: true });
    },

    //Validation DONE
    deleteTeacher: async(req, res, next) => {
        const { teacherId } = req.value.params;
        const teacher = await Teacher.findById(teacherId);
        if(!teacher) {
            return res.status(404).json({ error: 'Teacher doesn\'t exist' });
        }
        const lessons = teacher.lessons;
        lessons.forEach(async(lessonId) => {
            try {
                const lesson = await Lesson.findById(lessonId);
                console.log(lessons);
                // await lesson.remove(teacherId);
                // await lesson.save();
            } catch(err) {
                console.log(err)
            }
        });
        // await teacher.remove();

        // res.status(200).json({ success: true });
    }

};