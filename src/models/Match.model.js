const mongoose = require("mongoose")
const {Schema, model} = mongoose

const matchSchema = new Schema({
    client1Id: {type: Schema.Types.ObjectId, ref: 'Client', required: true},
    client2Id: {type: Schema.Types.ObjectId, ref: 'Client', required: true},
},{timestamps: tue})

module.exports = model("Match", matchSchema)