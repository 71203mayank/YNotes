const mongoose = require('mongoose');
const IndexSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    updated_date:{
        type: Date,
        default: Date.now
    },
    description:{
        type: String
    }
});

module.exports = IndexPage = mongoose.model('notes',IndexSchema);