const mongoose = require("mongoose")
const {Schema, model} = mongoose

const clientCentreInteretSchema = new Schema({
    clientId: {type: Schema.Types.ObjectId, ref: 'Client', required: true},
    centreInteretId: {type: Schema.Types.ObjectId, ref: 'CentreInteret', required: true},
}, {timestamps: true})

module.exports = model("ClientCentreInteret", clientCentreInteretSchema)