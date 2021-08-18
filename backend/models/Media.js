const mongoose = require('mongoose')

/**
 * Nous créons un schéma de données qui contient les champs souhaités pour chaque modèle, indique leur type ainsi que
 * leur caractère (obligatoire ou non). Pour cela, on utilise la méthode Schema mise à disposition par Mongoose. Pas
 * besoin de mettre un champ pour l'Id puisqu'il est automatiquement généré par Mongoose.
 * @type {*}
 */
const mediaSchema = mongoose.Schema({
  id: { type: Number, required: true },
  photographerId: { type: Number, required: true },
  country: { type: String, required: true },
  title: { type: String, required: true },
  image: { type: String, required: true },
  tags: { type: Array, required: true },
  likes: { type: Number, required: true },
  date: { type: String, required: true },
  price: { type: Number, required: true }
}, { collection: 'media' }
)

/**
 * Nous exportons ce schéma en tant que modèle Mongoose appelé « Media », le rendant par là même disponible pour notre
 * application Express.
 * @type {Model<Media>}
 */
module.exports = mongoose.model('Media', mediaSchema)
