const mongoose = require("mongoose");

const Schema = mongoose.Schema;

let hippoSchema = new Schema(
    {
        name: {type: String},
        weightKg: {type: Number},
        color: {type: String},
        habitat: {type: String},
        maxSpeedKmHr: {type: Number},
        birthDate: {type: Date},
        createdBy: {type: String},
        lastUpdatedBy: {type: String}
    }
);

module.exports = mongoose.model("hippo", hippoSchema);