const mongoose = require("mongoose");

const Schema = mongoose.Schema;

let hippoSchema = new Schema(
    {
        name: {type: String},
        weightKg: {type: Number},
        color: {type: String},
        habitat: {type: String},
        maxSpeedKmHr: {type: Number},
        birthDate: {type: Date}
    }
);

module.exports = mongoose.model("hippo", hippoSchema);