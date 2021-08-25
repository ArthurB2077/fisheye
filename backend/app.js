const express = require('express')
const mongoose = require('mongoose')
const Grid = require('gridfs-stream')
Grid.mongo = mongoose.mongo

const Photographer = require('./models/Photographer')
const Media = require('./models/Media')

const upload = require('./middleware/multer-config')

const app = express()

mongoose.connect('mongodb+srv://arthur:TheMilkyWay2906@cluster0.zxke9.mongodb.net/fisheyesDB?retryWrites=true&w=majority',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'))

let gfs
const conn = mongoose.createConnection('mongodb+srv://arthur:TheMilkyWay2906@cluster0.zxke9.mongodb.net/fisheyesDB?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true })
conn.once('open', function () {
  gfs = Grid(conn.db)
  gfs.collection('photos')
})

/**
 * Dans ce middleware, les headers permettent :
 * - d'accéder à notre API depuis n'importe quelle origine ( '*' ) ;
 * - d'ajouter les headers mentionnés aux requêtes envoyées vers notre API (Origin , X-Requested-With , etc.) ;
 * - d'envoyer des requêtes avec les méthodes mentionnées ( GET ,POST , etc.).
 */
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS')
  next()
})

app.post('/api/file/uploads', upload.single('file'), (req, res) => {
  if (req.file === undefined) {
    return res.send('You must select a file.')
  }
  const imgURL = `http://localhost:3000/api/file/${req.file.filename}`
  return res.send(imgURL)
})

app.get('/api/file/:filename', async (req, res) => {
  try {
    const file = await gfs.files.findOne({ filename: req.params.filename })
    const readStream = gfs.createReadStream(file.filename)
    readStream.pipe(res)
  } catch (error) {
    res.status(404).json({ error: 'Not found' })
  }
})

/**
 * Dans cette route :
 * - nous utilisons la méthode get() pour répondre uniquement aux demandes GET à cet endpoint;
 * - nous utilisons deux-points : en face du segment dynamique de la route pour la rendre accessible en tant que paramètre;
 * - nous utilisons ensuite la méthode findOne() dans notre modèle pour trouver le modèle unique ayant le même _id que le paramètre de la requête;
 * - ce modèle est ensuite retourné dans une Promise et envoyé au front-end;
 * - si aucun modèle n'est trouvé ou si une erreur se produit, nous envoyons une erreur 404 au front-end, avec l'erreur générée.
 */
app.get('/api/photographers/:id', (req, res) => {
  Photographer.findOne({ _id: req.params.id })
    .then(photographer => res.status(200).json(photographer))
    .catch(error => res.status(404).json(error))
})
app.get('/api/medias/:id', (req, res) => {
  Media.findOne({ _id: req.params.id })
    .then(media => res.status(200).json(media))
    .catch(error => res.status(404).json(error))
})

/**
 * Dans l'exemple ci-dessous, nous utilisons la méthode find() dans notre modèle Mongoose afin de renvoyer un tableau
 * contenant tous les modèles dans notre base de données. À présent, si vous ajoutez un modèle , il doit s'afficher
 * immédiatement sur votre page.
 */
app.get('/api/photographers', (req, res) => {
  Photographer.find()
    .then(photographers => res.status(200).json(photographers))
    .catch(error => res.status(400).json({ error }))
})

app.get('/api/medias', (req, res) => {
  Media.find()
    .then(medias => res.status(200).json(medias))
    .catch(error => res.status(400).json({ error }))
})

module.exports = app
