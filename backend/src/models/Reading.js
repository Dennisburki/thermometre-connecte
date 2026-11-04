import mongoose from "mongoose";

const readingSchema = new mongoose.Schema({
    temperature: {
        type: Number,
        required: true
    },
    humidity: {
        type: Number,
        required: true
    },
    pressure: {
        type: Number,
        required: true
    },
    slotKey: {
        type: String,
        required: true,
        unique: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    receivedAt: {
        type: Date,
        default: Date.now
    }
});

const Reading = mongoose.model("Reading", readingSchema, "temperature");

export default Reading;