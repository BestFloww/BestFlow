/* istanbul ignore file */
import mongoose from "mongoose";

// id is automatically given if left blank in schema

const intentSchema = new mongoose.Schema({
    question: {
        type: String,
        required: true,
    },
    children: {
        type: Map,
        of: Number,
    },
    total_children: Number,
    project_id: {
        type: String,
        required: true,
    },
    star: {
        type: Boolean,
        default: false,
    },
    flag: {
        type: Boolean,
        default: false,
    },
});

intentSchema.methods.getPercentages = function() {
    const percentageMap = {};
    this.children.forEach((numTimesCalled, intent) => {
        percentageMap[intent] = (numTimesCalled / this.total_children * 100).toFixed(2);
    });
    return percentageMap;
};

intentSchema.methods.addChild = function(newChild) {
    if (!this.children.get(newChild)) {
        this.children.set(newChild, 0);
    }
    this.children.set(newChild, this.children.get(newChild) + 1);
};

export const Intent = mongoose.model('Intent', intentSchema);