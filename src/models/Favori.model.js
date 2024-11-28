const mongoose = require("mongoose")
const {Schema, model} = mongoose

const favoriSchema = new Schema({
    favorisant: {type: Schema.Types.ObjectId, ref: 'Client', required: true},
    favorisé: {type: Schema.Types.ObjectId, ref: 'Client', required: true},
}, {timestamps: true}) 

module.exports = model("Favori", favoriSchema)