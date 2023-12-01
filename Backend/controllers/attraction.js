const Attraction = require('../models/attraction');
exports.getAllAttractions = async (req, res) => {
    try {
        const attractions = await Attraction.find({}, '-_id');
        res.success({ attractions, total: attractions.length }, 'Attractions retrieved successfully');
    } catch (error) {
        res.error(500, 'Internal server error');
    }
};

exports.getAttractionDetail = async (req, res) => {
    try {
        const { id } = req.query;
        const attraction = await Attraction.findOne({id}, '-_id');
        res.success({ attraction }, 'Attraction detail retrieved successfully');
    } catch (error) {
        res.error(500, 'Internal server error');
    }
}
module.exports = exports;
