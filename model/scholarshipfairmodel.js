import mongoose from 'mongoose';

const scholarshipfairSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true
    },
    date:{
        type: Date,
        default: Date.now
    }
});

const scholarshipfairModel = mongoose.models?.scholarshipfair || mongoose.model('scholarshipfair', scholarshipfairSchema);

export default scholarshipfairModel;