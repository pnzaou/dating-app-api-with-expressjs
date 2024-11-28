const mongoose = require("mongoose")
const {Schema, model} = mongoose

const relationSchema = new Schema({
    nom: {type: String, required: true},
    description: {type: String, required: true},
    icon: {type: String, required: true}
}, {timestamps: true})

module.exports = model("Relation", relationSchema)