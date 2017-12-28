const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const messageSchema = new Schema({
    data: {type: Data},
    text: {type: String},
    user: {type: String}
});

module.exports = mongoose.model('messageModel', messageSchema);
