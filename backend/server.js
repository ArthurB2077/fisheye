/**
 * Ici, vous importez le package HTTP natif de Node et l'utilisez pour créer un serveur, en passant une fonction qui
 * sera exécutée à chaque appel effectué vers ce serveur.
 * @type {module:http}
 */
const http = require('http')
const app = require('./app')

/**
 * La fonction normalizePort renvoie un port valide, qu'il soit fourni sous la forme d'un numéro ou d'une chaîne.
 * @param val
 * @returns {boolean|number|*}
 */
const normalizePort = val => {
  const port = parseInt(val, 10)

  if (isNaN(port)) {
    return val
  }
  if (port >= 0) {
    return port
  }
  return false
}

/**
 * Ci-dessous, on configure le serveur pour qu'il écoute :
 * - soit la variable d'environnement du port grâce à process.env.PORT : si la plateforme de déploiement propose un port
 *   par défaut, c'est celui-ci qu'on écoutera ;
 * - soit le port 3000, ce qui nous servira dans le cas de notre plateforme de développement.
 */
const port = normalizePort(process.env.PORT || '3000')
app.set('port', port)

/**
 * La fonction errorHandler recherche les différentes erreurs et les gère de manière appropriée. Elle est ensuite
 * enregistrée dans le serveur.
 * @param error
 */
const errorHandler = error => {
  if (error.syscall !== 'listen') {
    throw error
  }
  const address = server.address()
  const bind = typeof address === 'string' ? 'pipe ' + address : 'port: ' + port
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges.')
      process.exit(1)
      // eslint-disable-next-line no-unreachable
      break
    case 'EADDRINUSE':
      console.error(bind + ' is already in use.')
      process.exit(1)
      // eslint-disable-next-line no-unreachable
      break
    default:
      throw error
  }
}

const server = http.createServer(app)

/**
 * Un écouteur d'évènements est également enregistré, consignant le port ou le canal nommé sur lequel le serveur
 * s'exécute dans la console.
 */
server.on('error', errorHandler)
server.on('listening', () => {
  const address = server.address()
  const bind = typeof address === 'string' ? 'pipe ' + address : 'port ' + port
  console.log('Listening on ' + bind)
})

server.listen(port)
