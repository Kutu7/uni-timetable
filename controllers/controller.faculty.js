const Faculty = require('../models/model.faculty');
const Group = require('../models/model.group');

module.exports = {
    
    //Validation DONE
    getFaculties: async(req, res, next) => {
        const faculties = await Faculty.find({});
        res.status(200).json(faculties);
    },

    //Validation DONE
    newFaculty: async (req, res, next) => {
        const newFaculty = new Faculty(req.value.body);
        const faculty = await newFaculty.save();
        res.status(201).json(faculty);
    },

    //Validation DONE
    getFaculty: async(req, res, next) => {
        const { facultyId } = req.value.params;
        const faculty = await Faculty.findById(facultyId);
        res.status(200).json(faculty);
    },

    //Validation DONE
    replaceFaculty: async(req, res, next) => {
        const newFaculty = req.value.body;
        const { facultyId } = req.value.params;
        const result = await Faculty.findByIdAndUpdate(facultyId, newFaculty);
        res.status(200).json({ success: true });
    },

    //Validation DONE
    updateFaculty: async(req, res, next) => {
        const { facultyId } = req.value.params;
        const newFaculty = req.value.body;
        const result = await Faculty.findByIdAndUpdate(facultyId, newFaculty);
        res.status(200).json({ success: true });
    },

    //Validation DONE
    deleteFaculty: async(req, res, next) => {
        const { facultyId } = req.value.params;
        const faculty = await Faculty.findById(facultyId);
        if(!faculty) {
            return res.status(404).json({ error: 'Faculty doesn\'t exist' });
        }
        const groups = faculty.groups;
        groups.forEach(async(groupId) => {
            try {
                const group = await Group.findById(groupId);
                await group.remove(facultyId);
                await group.save();
            } catch(err) {
                console.log(err)
            }
        });
        await faculty.remove();

        res.status(200).json({ success: true });
    },

    //Validation DONE
    getFacultyGroups: async(req, res, next) => {
        const { facultyId } = req.value.params;
        const faculty = await Faculty.findById(facultyId).populate('groups');
        res.status(200).json(faculty.groups);
    },

    //Validation DONE
    newFacultyGroup: async(req, res, next) => {
        const { facultyId } = req.value.params;
        // Create a new group
        const newGroup = new Group(req.value.body);
        // Get faculty
        const faculty = await Faculty.findById(facultyId);
        if(!faculty) {
            return res.status(404).json({ error: 'Faculty doesn\'t exist' });            
        }
        newGroup.faculty = faculty;
        // Save the group
        await newGroup.save();
        // Add group to the faculty's groups array
        faculty.groups.push(newGroup._id);
        // Save the faculty
        await faculty.save();
        res.status(201).json(newGroup);

    }

};