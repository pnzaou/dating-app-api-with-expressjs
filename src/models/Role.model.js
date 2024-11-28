const mongoose = require("mongoose")
const {Schema, model} = mongoose

const roleSchema = new Schema({
    nom: {type: String, required: true}
}, {timestamps: true})

module.exports = model("Role", roleSchema)