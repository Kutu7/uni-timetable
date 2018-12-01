const Room = require('../models/model.room');

module.exports = {

    getRoom: async(req, res, next) => {
        const rooms = await Room.find({});
        res.status(200).json(room);
    },

    newRoom: async (req, res, next) => {
        const newRoom = new Room(req.body);
        const room = await newRoom.save();
        res.status(201).json(room);
    },

    getRoom: async(req, res, next) => {
        const { roomId } = req.params;
        const room = await Room.findById(roomId);
        res.status(200).json(room);
    },

    replaceRoom: async(req, res, next) => {
        // enforce that req.body must contain all the fields
        const { roomId } = req.params;
        const newRoom = req.body;
        const result = await Room.findByIdAndUpdate(roomId, newRoom);
        res.status(200).json({ success: true });
    },

    updateRoom: async(req, res, next) => {
        //  req.body may contain any number of the fields
        const { eoomId } = req.params;
        const newRoom = req.body;
        const result = await Room.findByIdAndUpdate(roomId, newRoom);
        res.status(200).json({ success: true });
    }

};