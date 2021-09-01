import DOMElementFactory from './domElementFactory.js'
import DisplayMediaManager from '../filter/displayMediaManager.js'

/**
 * FR: Classe générant l'ensemble du contenu de la galerie photos dédiée aux photographes. Elle comprends les
 * évènements d'écoute des modifications effectuées sur les photos générées dynamiquement ainsi que leurs composants.
 * Parmi eux, on retrouve le filtre, le système d'incrémentation des likes et le panneaux d'indications du salaire et du
 * nombre total de likes.
 *
 * EN: Class generating all the content of the photo gallery dedicated to photographers. It integrating the
 * listener events for modifications made to dynamically generated photos and their components.
 * Among them, we find the filter, the incrementation likes system and the salary/total number indicators panel.
 */
class MediaFactory {
  constructor () {
    /**
     * FR: Cette méthode génère dynamiquement tout le contenu de la galerie photos en récupérant les objets Javascripts
     * stockés dans la base de donnée.
     * Pour cela, elle utilise les routes implémenter par la partie backend de
     * l'application. Ces requêtes sont effectuées à l'aide de la méthode GET du protocole HTTP.
     * Après récupérations des objets, elle insère dynamiquement les élements générés dans le DOM en leur associant le
     * style et les méthodes leurs permettant de remplir leurs fonctions.
     *
     * EN: This method dynamically generates all the content of the photo gallery by retrieving Javascripts objects
     * stored in the database.
     * For this, it uses the routes implemented by the backend part of the application. These requests are made using
     * the GET method of the HTTP protocol.
     * After retrieving the objects, it dynamically inserts the elements generated in the DOM by associating them with
     * the style and methods allowing them to fulfill their functions.
     */
    this.createMediaGallery = () => {
      /**
       * FR: Requête vers l'API contenant les JSON correspondants aux objets photos requis.
       * EN: Request to the API containing the JSON corresponding to the required photo objects.
       */
      fetch('http://localhost:3000/api/medias')
        /**
         * FR: Vérifie si la réponse du coté serveur est valide.
         * Si oui, exporte les données récupérer au format JSON.
         * Si non, renvoie une erreur.
         *
         * EN: Checks if the response from the serverside is valid.
         * If yes, export the recovered data in JSON format.
         * If not, return an error.
         */
        .then((response) => {
          if (!response.ok) {
            throw new Error('HTTP error ' + response.status)
          }
          return response.json()
        })
        /**
         * FR: Traite l'ensemble des données récupérées afin de les intégrer dynamiquement dans le DOM. C'est ici que
         * l'on retrouve l'ensemble des méthodes responsable des intéractions utilisateurs.
         * Attention, tous les éléments générés ici ne peuvent être générés autre par car ils dependent de données
         * injectées dans le DOM dynamiquement.
         *
         * EN: Processes all the data retrieved in order to integrate them dynamically into the DOM. It's here that
         * we find all the methods responsible for user interactions.
         * Beware, all the elements generated here cannot be generated in an other place by because they depend on data
         * dynamically injected into the DOM.
         */
        .then((mediaDatas) => {
          /**
           * FR: Chacune des pages générés correspond à un seul photographe. Cette variable stocke l'id du photographe
           * auquel la page est dédiée.
           *
           * EN: Each of the generated pages match a single photographer. This variable stores the photographer's id
           * to which the page is dedicated.
           * @type {number}
           */
          let id = 0
          /**
           * FR: Tableau dans lequel les objets JSON "media" récupérés depuis la base de données seront stockés.
           * EN: Array in which the "media" JSON objects retrieved from the database will be stored.
           * @type {*[]}
           */
          const medias = []
          /**
           * FR: Variable stockant la nouvelle valeur du nombre de likes
           *
           * EN: Variable storing the new value of the number of likes
           * @type {number}
           */
          let newLikesNumber = 0
          /**
           * FR: Création d'une instance de la factory méthode pour la création d'éléments du DOM.
           *
           * EN: Creation of an instance of the factory method which allow to create new DOM elements.
           * @type {DOMElementFactory}
           */
          const factorDomElement = new DOMElementFactory()
          /**
           * FR: L'objet mediaDatas comprends tous les objets media de l'application. Ici, nous itérons sur chacun de
           * ces objets afin de comparés si leurs id correspondent à l'id de notre photographe.
           * On peut retrouver cet id dans le DOM de la page au niveau de la balise HTML correspondant à la classe
           * "main-photographer" et ainsi le comparer à ceux présent dans notre objet.
           * La description a été générée plus tôt dans l'appelle de la class PhotographerFactory dans le script
           * photographerPage.js
           *
           * EN: The mediaDatas object includes all the media objects of the application. Here we iterate over each of
           * these objects in order to compare if their id correspond to the id of our photographer.
           * We can find this id in the page DOM at the level of the HTML tag corresponding to the class
           * "main-photographer" and thus compare it to those present in our object.
           * The description was generated earlier in the PhotographerFactory class call in the script
           * photographerPage.js
           */
          mediaDatas.forEach(media => {
            Array.from(document.getElementsByClassName('main-photographer')).forEach(el => {
              id = parseInt(el.id, 10)
            })
            if (media.photographerId === id) {
              medias.push(media)
            }
          })
          /**
           * FR: Le tableau "medias" correspondant aux objets media associé à notre photographe, nous pouvons à présent
           * générés l'ensemble des éléments qui restitueront les données récupérées dans les classes de styles
           * appropriées.
           *
           * EN: The "media" array corresponding to the media objects associated with our photographer, we can now
           * generated all the elements that will restore the data retrieved in the style classes appropriate.
           */
          medias.forEach(media => {
            /**
             * FR: Créé la balise HTML contenant le SVG en forme de coeur et le nombre de likes.
             *
             * EN: Create the HTML tag containing the SVG heart shape and the likes numbers.
             * @type {*}
             */
            const path = factorDomElement.createDOMElement('path', {
              d: 'M438.482,58.61c-24.7-26.549-59.311-41.655-95.573-41.711c-36.291,0.042-70.938,15.14-95.676,41.694l-8.431,8.909\n' +
                  'l-8.431-8.909C181.284,5.762,98.663,2.728,45.832,51.815c-2.341,2.176-4.602,4.436-6.778,6.778\n' +
                  'c-52.072,56.166-52.072,142.968,0,199.134l187.358,197.581c6.482,6.843,17.284,7.136,24.127,0.654\n' +
                  'c0.224-0.212,0.442-0.43,0.654-0.654l187.29-197.581C490.551,201.567,490.551,114.77,438.482,58.61z'
            })
            const svg = factorDomElement.createDOMElement('svg', { class: 'media-icon not-liked', viewBox: '0 0 480 520' }, path)
            const span = factorDomElement.createDOMElement('span', {}, `${media.likes}`)
            const mediaLikeContainer = factorDomElement.createDOMElement('div', { class: 'media-like-container' }, span, svg)
            /**
             * FR: Crée le conteneur dans lequel on retrouve le nom de la photo et la balise créée ci-dessus.
             * EN: Create the container in which we find the name of the photo and the tag created above.
             * @type {*}
             */
            const mediaName = factorDomElement.createDOMElement('div', { class: 'media-name' }, `${media.title}`)
            const mediaDescription = factorDomElement.createDOMElement('div', { class: 'media-description' }, mediaName, mediaLikeContainer)
            /**
             * FR: Créé les deux balises image et vidéo pouvant être utilisées dans un cas ou dans l'autre.
             * EN: Created both image and video tags that can be used in either case.
             * @type {*}
             */
            const img = factorDomElement.createDOMElement('img', {
              src: `http://localhost:3000/api/file/${media.image}`,
              alt: `${media.title}`
            })
            const source = factorDomElement.createDOMElement('source', { src: `http://localhost:3000/api/file/${media.video}`, type: 'video/mp4' })
            const video = factorDomElement.createDOMElement('video', { autoplay: 'true' }, source)
            /**
             * FR: Crée une variable qui retournera un élément contenant soit une vidéo soit une photo en fonction du nom de
             * la clé récupérée dans l'objet media.
             *
             * EN: Create a variable that will return an element containing either a video or a photo depending on the
             * key name retrieved from the media object.
             */
            let mediaElement
            if (media.image) {
              mediaElement = factorDomElement.createDOMElement('div', { class: 'media', 'data-pop': `${media.likes}`, 'data-date': `${media.date}`, 'data-name': `${media.title}` }, img, mediaDescription)
            } else {
              mediaElement = factorDomElement.createDOMElement('div', { class: 'media', 'data-pop': `${media.likes}`, 'data-date': `${media.date}`, 'data-name': `${media.title}` }, video, mediaDescription)
            }
            /**
             * FR: Parcours le DOM statique à la recherche de la balise HTML correspondant à la galerie et y insère chacun
             * des éléments générés correspondant au media récupéré.
             *
             * EN: Browse the static DOM looking for the HTML tag corresponding to the gallery and insert each one
             * generated elements corresponding to the recovered media in it.
             */
            document.getElementById('gallery').appendChild(mediaElement)
            /**
             * FR: Apelle la méthode de filtrage de la classe DisplayMediaManager afin de trier les photos en fonction de
             * leurs popularité (nombre de likes), dates et titres (ordres alphabétique).
             *
             * EN: Calls the filter method of the DisplayMediaManager class in order to sort the pictures according to
             * their popularity (number of likes), dates and titles (alphabetical order).
             * @type {DisplayMediaManager}
             */
            const filter = new DisplayMediaManager()
            filter.filterMedia('data-pop')
            /**
             * FR: Ci-dessus, nous créons une instance de la méthodes de filtrage et nous initialisons le filtre sur la
             * popularité.
             * En-dessous, un écouteurs d'évènements vérifie si un des onglets du menu de filtrages reçoit un click.
             * Si oui, il filtre la galerie en fonction de l'onglet sélectionné par l'utilisateur.
             * Les "data-" correpondent à des attributs que portent chacun des medias et qui permettent d'avoir accès
             * depuis le DOM aux informations permettant le filtrage. Cette méthode évite ainsi de renouveler un appel
             * vers l'API et de regénérer deux fois les mêmes informations. Ils sont gérer du côté de la
             * DisplayMediaManager factory.
             *
             * EN: Above, we create an instance of the filter methods and we initialize the filter on the
             * popularity.
             * Below, an event listener checks if one of the tabs of the filtering menu receives a click.
             * If yes, it filters the gallery based on the tab selected by the user.
             * The "data-" correspond to attributes that each of the media carries and which allow access
             * from the DOM to information allowing filtering. This method thus avoids renewing a call
             * to the API and regenerate the same information twice. They are managing in the DisplayMediaManager factory.
             */
            Array.from(document.getElementsByClassName('item')).forEach(item => {
              item.addEventListener('click', () => {
                if (item.innerHTML === 'Date') {
                  filter.filterMedia('data-date')
                } else if (item.innerHTML === 'Titre') {
                  filter.filterMedia('data-name')
                } else {
                  filter.filterMedia('data-pop')
                }
              })
            })
            /**
             * FR: Un écouteur d'évènements vérifie les clicks reçu par chacun des icône likes de la page.
             * Si un icône reçoit un clic utilisateur, il change la classe de style de ce dernier et incrémente de un le
             * nombre de likes affichés.
             * La classe de style "not-liked" est portée par défaut par tous les icône afin d'identifier s'ils peuvent
             * recevoir un like ou pas.
             *
             * EN: An event listener checks the clicks received by each of the likes icon on the page.
             * If an icon receives a user click, it changes the style class of it and increments by one the
             * number of likes displayed.
             * The "not-liked" style class is carried by default by all icons in order to identify if they can
             * receive a like or not.
             */
            Array.from(document.getElementsByClassName('media-icon')).forEach(icon => {
              icon.addEventListener('click', () => {
                if (icon.classList.contains('not-liked')) {
                  icon.children[0].removeAttribute('style')
                  icon.children[0].style.animation = 'heart-fill 1000ms linear forwards'
                  icon.classList.remove('not-liked')
                  icon.classList.add('liked')
                  const oldLikesValue = parseInt(icon.parentNode.children[0].innerHTML)
                  newLikesNumber = oldLikesValue + 1
                  icon.parentNode.children[0].innerHTML = `${newLikesNumber}`
                  console.log(icon.parentNode.children[0].innerHTML)
                }
              })
            })
          })
          /**
           * FR: Appelle de DOMElementFactory afin de créer le panneau indiquant le nombre total de likes et le prix
           * journalier du photographe. On crée donc trois éléments.
           *
           * EN: Call of DOMElementFactory to create the panel indicating the total number of likes and the price
           * photographer's daily. We therefore create three DOM elements.
           * @type {*}
           */
          const likeIndicator = factorDomElement.createDOMElement('div', { id: 'likes-indicator' })
          const salaryIndicator = factorDomElement.createDOMElement('div', { id: 'salary-indicator' })
          const indicatorsBar = factorDomElement.createDOMElement('div', { id: 'indicators-bar' }, salaryIndicator, likeIndicator)
          /**
           * FR: On injecte dans le DOM le panneau des indicateurs.
           *
           * EN: The indicator panel is injected into the DOM.
           */
          document.getElementById('gallery').appendChild(indicatorsBar)
          /**
           * FR: Afin de pouvoir indiquer le salaire journalier du photographe dynamiquement, il faut requêter l'objet
           * photographer. En récupérant l'id du photographe dans l'url de la page (voir photographerPage.js), on
           * minimise le coût de l'appel car un seul objet est demandé.
           *
           * EN: In order to be able to indicate the daily salary of the photographer dynamically, you must request the
           * object photographer. By retrieving the photographer's id in the page url (see photographerPage.js), we
           * minimizes the cost of the call because only one object is requested.
           */
          const url = window.location.href
          const photographerId = url.split('phot=')[1]
          /**
           * FR: Cette route correspond à une API utilisant la méthode findOne() en base. D'où la néssécité d'avoir accès à
           * l'id du photographe.
           *
           * EN: This route corresponds to an API using the findOne() method in database. Hence the need to have access to
           * the photographer's id.
           */
          fetch(`http://localhost:3000/api/photographers/${photographerId}`)
            .then((response) => {
              if (!response.ok) {
                throw new Error('HTTP error ' + response.status)
              }
              return response.json()
            })
            /**
             * FR: Apelle de la DOMElementFactory méthode afin de créer le SVG correspondant à un icône like dans le
             * panneau des indicateurs.
             * Ensuite, nous initialisons le nombre de likes à 0 et nous le mettons à jour en parcourant chaque
             * "media-like-container" du DOM dans lesquels sont affichés les différents nombres de likes. Nous avons
             * donc le nombre total de likes.
             * Ensuite, nous insérons le SVG, le nombre de likes et le prix journalier récupérés dans les conteneurs
             * prévus à cet effet que nous avons créer l.254 à 256.
             *
             * EN: Calls the DOMElementFactory method in order to create the SVG corresponding to a like icon in the
             * indicator panel.
             * Then we initialize the number of likes to 0 and we update it by going through each
             * DOM "media-like-container" in which the different numbers of likes are displayed. We have
             * therefore the total number of likes.
             * Then we insert the SVG, the number of likes and the daily price retrieved from the fetch in the containers
             * provided for this purpose that we have created l.254 to 256.
             */
            .then((data) => {
              const icon = factorDomElement.createDOMElement('path', {
                d: 'M438.482,58.61c-24.7-26.549-59.311-41.655-95.573-41.711c-36.291,0.042-70.938,15.14-95.676,41.694l-8.431,8.909\n' +
                    'l-8.431-8.909C181.284,5.762,98.663,2.728,45.832,51.815c-2.341,2.176-4.602,4.436-6.778,6.778\n' +
                    'c-52.072,56.166-52.072,142.968,0,199.134l187.358,197.581c6.482,6.843,17.284,7.136,24.127,0.654\n' +
                    'c0.224-0.212,0.442-0.43,0.654-0.654l187.29-197.581C490.551,201.567,490.551,114.77,438.482,58.61z'
              })
              const svg = factorDomElement.createDOMElement('svg', { viewBox: '0 0 480 520' }, icon)
              let likes = 0
              Array.from(document.getElementsByClassName('media-like-container')).forEach(cont => {
                likes += parseInt(cont.children[0].innerHTML)
              })
              const span = factorDomElement.createDOMElement('span', {}, `${likes}`)
              document.getElementById('likes-indicator').appendChild(span)
              document.getElementById('likes-indicator').appendChild(svg)
              document.getElementById('salary-indicator').innerHTML = `${data.price}€ / jours`
            })
            .catch((error) => {
              console.log(error)
            })
          /**
           * FR: Un écouteur d'évènements vérifie les clics utilisateurs reçu par chacun des likes présents dans le DOM.
           * Si un like reçoit un clic et incrémente sa valeur alors on incrémente le nombre de like affichés par le
           * nombre total de likes dans le panneau des iondicateurs.
           *
           * EN: An event listener checks the user clicks received by each of the likes icon present in the DOM.
           * If a like receives a click and increases its value then we increase the number of likes displayed by the
           * total number of likes in the indicators panel.
           */
          Array.from(document.getElementsByClassName('media-icon')).forEach(icon => {
            icon.addEventListener('click', () => {
              const likeCnt = parseInt(document.getElementById('likes-indicator').children[0].innerHTML)
              document.getElementById('likes-indicator').children[0].innerHTML = `${likeCnt + 1}`
              console.log(document.getElementById('likes-indicator').children[0].innerHTML)
            })
          })
        })
        .catch((error) => {
          console.log(error)
        })
    }
  }
}

export default MediaFactory
