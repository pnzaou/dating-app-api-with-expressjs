const mongoose = require("mongoose")
const {Schema, model} = mongoose

const permissionSchema = new Schema({
    nom: {type: String, required: true}
}, {timestamps: true})

module.exports = model("Permission", permissionSchema)