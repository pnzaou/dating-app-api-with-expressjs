const mongoose = require("mongoose")
const {Schema, model} = mongoose

const personneSchema = new Schema({
    nom: {type: String, required: true},
    prenom: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    roleId: {type: Schema.Types.ObjectId, ref: 'Role', required: true},
}, {discriminatorKey: '_t', timestamps: true})

const Personne = model('Personne', personneSchema)

const clientSchema = new mongoose.Schema({
    photos: {type: [String], required: true},
    adresse: {
    type: {
      type: String, 
      enum: ['Point'],
      required: true
    },
    coordinates: {
      type: [Number],
      required: true,
      validate: {
        validator: function (coords) {
          return coords.length === 2;
        },
        message: 'Les coordonnées doivent contenir exactement [longitude, latitude]',
      },
    }
  },
  isCertified: { type: Boolean, default: false },
  dateDeNaissance: { type: Date, required: true },
  Likes: [
    {type: Schema.Types.ObjectId, ref: 'Client'}
  ],
  relationId: {type: Schema.Types.ObjectId, ref: 'Relation', required: true},
})

const adminSchema = new mongoose.Schema({})

const Client = Personne.discriminator('Client', clientSchema)
const Admin = Personne.discriminator('Admin', adminSchema)

module.exports = {Personne, Client, Admin}
