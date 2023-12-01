const mongoose = require('mongoose');

const attractionSchema = new mongoose.Schema({
    id: {
        type: String,
    },
    name: {
        type: String,
    },
    location: String,
    description: String
});

const Attractions = mongoose.model('attractions', attractionSchema);

module.exports = Attractions;