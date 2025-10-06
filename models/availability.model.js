const mongoose = require('mongoose');

const availabilitySchema = new mongoose.Schema({
    Product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true,
        unique: true
    },

    unavailableDates: {
        type: [Date],
        default: []
    }
}, { timestamps: true });

availabilitySchema.index({ product: 1 });
availabilitySchema.index({ unavailableDates: 1 });

module.exports = mongoose.model('Availability', availabilitySchema);