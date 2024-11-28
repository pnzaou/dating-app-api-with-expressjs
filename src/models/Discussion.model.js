const mongoose = require("mongoose")
const {Schema, model} = mongoose

const discussionSchema = new Schema({
    matchId: {type: schema.Types.ObjectId, ref: 'Match', required: true},
    client1Id: {type: Schema.Types.ObjectId, ref: 'Client', required: true},
    client2Id: {type: Schema.Types.ObjectId, ref: 'Client', required: true},
})

module.exports = model("Discussion", discussionSchema)