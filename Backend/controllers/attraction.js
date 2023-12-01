const Attraction = require('../models/attraction');
const mongoose = require('mongoose');
exports.getAllAttractions = async (req, res) => {
    try {
        const attractions = await Attraction.find({}, '-_id');
        res.success({ attractions, total: attractions.length }, 'Attractions retrieved successfully');
    } catch (error) {
        res.error(500, 'Internal server error');
    }
};

module.exports = exports;
