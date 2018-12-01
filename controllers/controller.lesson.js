const Lesson = require('../models/model.lesson');
const Group = require('../models/model.group');
const Teacher = require('../models/model.teacher');
const Room = require('../models/model.room');

module.exports = {

    getLessons: async(req, res, next) => {
        const lessons = await Lesson.find({});
        res.status(200).json(lessons);
    },

    newLesson: async (req, res, next) => {
        const group = await Group.findById(req.value.body.group);
        const teacher = await Teacher.findById(req.value.body.teacher);
        const room = await Room.findById(req.value.body.room);

        const newLesson = req.value.body;
        delete newLesson.group;
        delete newLesson.teacher;
        delete newLesson.room;

        const lesson = new Lesson(newLesson);

        lesson.group = group;
        lesson.teacher = teacher;
        lesson.room = room;

        await lesson.save();

        group.lessons.push(lesson);
        await group.save();

        teacher.lessons.push(lesson);
        await teacher.save();

        room.lessons.push(lesson);
        await room.save();

        res.status(201).json(lesson);
    },

    getLesson: async(req, res, next) => {
        const { lessonId } = req.params;
        const lesson = await Lesson.findById(lessonId);
        res.status(200).json(lesson);
    },

    replaceLesson: async(req, res, next) => {
        const { lessonId } = req.value.params;
        const lesson = await Lesson.findById(lessonId);

        if(!lesson) {
            return res.status(404).json({ error: 'Lesson doesn\'t exist' });
        }

        const newLesson = req.value.body;
        
        const result = await Lesson.findByIdAndUpdate(lessonId, newLesson);
        res.status(200).json({ success: true });
    },

    updateLesson: async(req, res, next) => {
        const { lessonId } = req.params;
        const newLesson = req.body;
        const result = await Lesson.findByIdAndUpdate(lessonId, newLesson);
        res.status(200).json({ success: true });
    },

    deleteLesson: async(req, res, next) => {
        const { lessonId } = req.value.params;
        const lesson = await Lesson.findById(lessonId);
        if(!lesson) {
            return res.status(404).json({ error: 'Lesson doesn\'t exist' });
        }

        const groupId = lesson.group;
        const teacherId = lesson.teacher;
        const roomId = lesson.room;

        const group = await Group.findById(groupId);
        const teacher = await Teacher.findById(teacherId);
        const room = await Room.findById(roomId);

        await lesson.remove();
        
        group.lessons.pull(lesson);
        await group.save();
        teacher.lessons.pull(lesson);
        await teacher.save();
        room.lessons.pull(lesson);
        await room.save();

        res.status(200).json({ success: true });
    }

};