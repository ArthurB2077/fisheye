const mongoose = require('mongoose')

/**
 * Nous créons un schéma de données qui contient les champs souhaités pour chaque modèle, indique leur type ainsi que
 * leur caractère (obligatoire ou non). Pour cela, on utilise la méthode Schema mise à disposition par Mongoose. Pas
 * besoin de mettre un champ pour l'Id puisqu'il est automatiquement généré par Mongoose.
 * @type {*}
 */
const photographerSchema = mongoose.Schema({
  name: { type: String, required: true },
  id: { type: Number, required: true },
  city: { type: String, required: true },
  country: { type: String, required: true },
  tags: { type: Array, required: true },
  tagline: { type: String, required: true },
  price: { type: Number, required: true },
  portrait: { type: String, required: true }
}, { collection: 'photographer' }
)

/**
 * Nous exportons ce schéma en tant que modèle Mongoose appelé « Photographer », le rendant par là même disponible pour notre
 * application Express.
 * @type {Model<Photographer>}
 */
module.exports = mongoose.model('Photographer', photographerSchema)
