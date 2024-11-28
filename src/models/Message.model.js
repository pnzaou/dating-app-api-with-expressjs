const mongoose = require("mongoose")
const {Schema, model} = mongoose

const messageSchema = new Schema({
    contenu: {type: String, required: tue},
    isReceived: {type: Boolean, default: false},
    isRead: {type: Boolean, default: false},
    sendeur: {type: Schema.Types.ObjectId, ref: 'Client', required: true},
    discussionId: {type: Schema.Types.ObjectId, ref: 'Discussion', required: true}
},{timestamps: true})