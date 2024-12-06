const mongoose = require("mongoose")
const {Schema, model} = mongoose

const centreInteretSchema = new Schema({
    nom: {type: String, required: true}
}, {timestamps: true})

module.exports = model("CentreInteret", centreInteretSchema)