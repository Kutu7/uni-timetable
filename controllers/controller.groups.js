const Group = require('../models/model.group');
const Faculty = require('../models/model.faculty');

module.exports = {

    getGroups: async(req, res, next) => {
        const groups = await Group.find({});
        res.status(200).json(groups);
    },

    newGroup: async (req, res, next) => {
        const faculty = await Faculty.findById(req.value.body.faculty);
        
        const newGroup = req.value.body;
        delete newGroup.faculty;

        const group = new  Group(newGroup);

        group.faculty = faculty;

        await group.save();

        faculty.groups.push(group);
        await faculty.save();

        res.status(201).json(group);
    },

    getGroup: async(req, res, next) => {
        const { groupId } = req.value.params;
        const group = await Group.findById(groupId);
        res.status(200).json(group);
    },

    replaceGroup: async(req, res, next) => {
        const { groupId } = req.value.params;
        const newGroup = req.value.body;

        const result = await Group.findByIdAndUpdate(groupId, newGroup);
        res.status(200).json({ success: true });
    },

    updateGroup: async(req, res, next) => {
        const { groupId } = req.value.params;
        const newGroup = req.value.body;
        const result = await Group.findByIdAndUpdate(groupId, newGroup);
        res.status(200).json({ success: true });
    },

    deleteGroup: async(req, res, next) => {
        const { groupId } = req.value.params;
        const group = await Group.findById(groupId);
        if(!group) {
            return res.status(404).json({ error: 'Group doesn\'t exist' });
        }

        const facultyId = group.faculty;
        const faculty = await Faculty.findById(facultyId);

        console.log(faculty);
        // Remove the group
        await group.remove();
        console.log(faculty.groups);
        // Remove group from the faculty group list
        faculty.groups.pull(group);
        await faculty.save();

        res.status(200).json({ success: true });
    }

};