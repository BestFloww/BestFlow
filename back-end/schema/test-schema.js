import mongoose from "mongoose";

const testSchema = new mongoose.Schema({
    text: String
});

export const Test = mongoose.model('Test', testSchema);