const User = require('../models/model.user');

const Joi = require('joi');

module.exports = {
    //Validation DONE
    getUsers: async(req, res, next) => {
        const users = await User.find({});
        res.status(200).json(users);
    },

    //Validation DONE
    newUser: async (req, res, next) => {
        const newUser = new User(req.value.body);
        const user = await newUser.save();
        res.status(201).json(user);
    },

    //Validation DONE
    getUser: async(req, res, next) => {
        const { userId } = req.value.params;
        const user = await User.findById(userId);
        res.status(200).json(user);
    },

    //Validation DONE
    replaceUser: async(req, res, next) => {
        // enforce that req.body must contain all the fields
        const newUser = req.value.body;
        const { userId } = req.value.params;
        const result = await User.findByIdAndUpdate(userId, newUser);
        res.status(200).json({ success: true });
    },

    //Validation DONE
    updateUser: async(req, res, next) => {
        //  req.body may contain any number of the fields
        const { userId } = req.value.params;
        const newUser = req.value.body;
        const result = await User.findByIdAndUpdate(userId, newUser);
        res.status(200).json({ success: true });
    }

};