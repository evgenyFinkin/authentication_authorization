const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    todo: {
        type: String,
        required: true,
    },
    isDone: {
        type: Boolean,
        default: false
    }
});

module.exports = User = mongoose.model('item', itemSchema);