// postMessage.js
import mongoose from 'mongoose';

const dggerSchema = mongoose.Schema({
    username: String,
    omegalul: {
        type: Number,
        default: 0
    },
});

const DggerEmoteList = mongoose.model('DggerEmoteList', dggerSchema);

export default DggerEmoteList;

