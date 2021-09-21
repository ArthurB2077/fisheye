import DOMElementFactory from './domElementFactory.js'

/**
 * FR: Cette classe contient deux méthodes de génération dynamqiue d'éléments DOM. La première méthode permet de générer
 * l'ensemble des éléments correspondant au modèle objet photographers. La deuxième consiste à générer seulement un seul
 * objet photographer à l'aide d'une requête vers un id unique.
 *
 * EN: This class contains two static for dynamically generating DOM elements. The first method allows to generate
 * all the elements corresponding to the photographers object model. The second is to generate only one
 * photographer object using a request to a unique id.
 */
class PhotographerFactory {
  constructor () {
    /**
     * FR: Méthode permettant de requêter l'ensemble des objets photographers vers une API programmer depuis le backend et
     * générer l'ensemble des éléments DOM y étant associé en y intégrant les différentes classes de style associées.
     *
     * EN: Method allowing to request all the photographers objects to an API program from the backend and
     * generate all the DOM elements associated with it by integrating the various associated style classes.
     */
    this.createPhotographers = () => {
      fetch('http://localhost:3000/api/photographers')
      /**
           * FR: Vérifie si la réponse du coté serveur est valide.
           * Si oui, exporte les données récupérer au format JSON.
           * Si non, renvoie une erreur.
           *
           * EN: Checks if the response from the serverside is valid.
           * If yes, export the recovered data in JSON format.
           * If not, return an error.
           */
        .then(response => {
          if (!response.ok) {
            throw new Error('HTTP error ' + response.status)
          }
          return response.json()
        })
        /**
         * FR: C'est dans cette partie du code que l'ensemble des éléments du DOM gérer dynamiquement son créés. La méthode
         * DOMElementFactory est à nouveau appeler pour créer ces éléments toutes en y associant les classe de style
         * adéquates.
         *
         * EN: It is in this part of the code that all the elements of the DOM dynamically manage are created. The method
         * DOMElementFactory is called again to create these elements all by associating the style classes to them
         */
        .then(photographersData => {
          /**
           * FR: L'objet photographersData contient l'ensemble des modèles JSON. Une loop itère sur chacun de ses éléments
           * afin de les injectés les uns à la site des autres dans le DOM. La même structure d'élément DOM est utilisée
           * à chaque fois, seules les données récupérés depuis l'API varient.
           *
           * EN: The photographersData object contains all the JSON models. A loop iterates on each of its elements
           * in order to inject them all into the DOM. The same DOM element structure is used
           * each time, only the data retrieved from the API varies.
           */
          photographersData.forEach(photographer => {
            const factory = new DOMElementFactory()
            /**
             * FR: Une balise liste est tout d'abord créée. Le tableau photographer.tags récupéré depuis l'API contient
             * tous les tags à afficher pour chaque photographer. On itère sur chacun de ses tags et à chaque itération
             * un élément <li></li> contenant le tag en question est créé.
             *
             * EN: A tag list (<ul>) is first created. The photographer.tags array retrieved from the API contains
             * all tags to display for each photographer. We iterate on each of its tags and at each iteration
             * an <li> element containing the relevant tag is created.
             * @type {*}
             */
            const ul1 = factory.createDOMElement('ul', {})
            for (let i = 0; i < photographer.tags.length; i++) {
              ul1.appendChild(factory.createDOMElement('li', {}, factory.createDOMElement('a', { class: 'tag' }, `#${photographer.tags[i]}`)))
            }
            /**
             * FR: Un élément <span> est créé pour chaque informations sur le photographer. L'ensemble est intégré à un
             * élément paragraphe.
             *
             * EN: A <span> element is created for each information about the photographer. The set is integrated into a
             * paragraph element.
             * @type {*}
             */
            const spanCountry = factory.createDOMElement('span', { class: 'main-location' }, `${photographer.city}, ${photographer.country}`)
            const sp2 = factory.createDOMElement('span', { class: 'main-tagline' }, photographer.tagline)
            const sp3 = factory.createDOMElement('span', { class: 'main-price' }, `${photographer.price}€/jour`)
            const p1 = factory.createDOMElement('p', {}, spanCountry, sp2, sp3)
            /**
             * FR: Un élément <img> est tout d'abord créé avec comme source une url vers un canal mis en place par l'api
             * exposant l'ensemble des photos de profil des photographes. Un élément de titre est également généré afin
             * d'afficher le nom du photographe.
             * La balise <a> est généré avec un attribut href dans lequel l'_id, permettant d'effectuer des requête vers
             * un seul objet photographer, est passé en params de l'URL. Cela permet aux éléments générer dynamiquement sur
             * la page renvoie (photographer.html) de savoir quel contenu charger en fonction du photographe qui reçoit
             * l'activation de son lien.
             * L'id de la base est également passé en id afin d'identifier de manière unitaire et dynamique chacun des
             * photographes dans le DOM.
             *
             * EN: An <img> element is first created with as source a url to a channel set up by the API
             * exhibiting all the profile photos of the photographers. A title element is also generated in order to
             * display the name of the photographer.
             * The <a> tag is generated with an href attribute in which the_id, allowing requests to be made to
             * a single photographer object, is passed in params of the URL. This allows items to dynamically render on
             * the page returns (photographer.html) to know what content to load according to the photographer who receives
             * the activation of its link.
             * The base id is also passed to id in order to uniquely and dynamically identify each of the
             * photographers in the DOM.
             * @type {*}
             */
            const img1 = factory.createDOMElement('img', {
              src: `http://localhost:3000/api/file/${photographer.portrait}`,
              alt: `${photographer.name}`
            })
            const h2 = factory.createDOMElement('h2', {}, photographer.name)
            const a1 = factory.createDOMElement('a', { id: photographer._id, href: `./photographer.html?phot=${photographer._id}`, role: 'link' }, img1, h2)
            /**
             * FR: Chaque élément générés est passé dans une balise <article> et injecté dans la section "main-photographers-list"
             * du DOM
             *
             * EN: Each generated element is passed in an <article> tag and injected into the "main-photographers-list" section
             * from the DOM
             */
            document.getElementById('main-photographers-list').appendChild(factory.createDOMElement('article', { class: 'main-photographers', role: 'article' }, a1, p1, ul1))
          })
        })
        .catch((error) => {
          console.log(error)
        })
    }
    /**
     * FR: Le principe de cette méthode est quasiment le même que celle ci-dessus. A l'exception du fait que seul un objet
     * photographer est généré dynamiquement ici. Pour cela l'id récupéré à partir de l'URL (photographerPage.js) est
     * passé en paramètre de la méthode. Il est passé ci-dessus (voir l.111) dans l'URL de la page.
     *
     * EN: The principle of this method is almost the same as the one above. With the exception that only one object
     * photographer is dynamically generated here. For this, the id retrieved from the URL (photographerPage.js) is
     * passed as a parameter of the method. It is passed above (see l.111) in the URL of the page.
     * @param id
     */
    this.createPhotographer = (id) => {
      fetch(`http://localhost:3000/api/photographers/${id}`)
        .then(response => {
          if (!response.ok) {
            throw new Error('HTTP error ' + response.status)
          }
          return response.json()
        })
        .then(photographersData => {
          const factory = new DOMElementFactory()
          // eslint-disable-next-line no-unused-expressions
          /**
           * FR: Seule autre exception pour cette méthode, le nom de l'objet photographer doit passé dynamiquement au composant
           * statique modal (formulaire).
           *
           * EN: Only other exception for this method, the name of the photographer object must be passed dynamically to the component
           * static modal (form).
           */
          document.getElementById('photographer-form-name').innerHTML = `Contactez-moi <br> ${photographersData.name}`

          const ul1 = factory.createDOMElement('div', { class: 'tag-container' })
          for (let i = 0; i < photographersData.tags.length; i++) {
            ul1.appendChild(factory.createDOMElement('div', {}, factory.createDOMElement('a', { class: 'tag' }, `#${photographersData.tags[i]}`)))
          }

          const spanCountry = factory.createDOMElement('span', { class: 'main-location' }, `${photographersData.city}, ${photographersData.country}`)
          const sp2 = factory.createDOMElement('span', { class: 'main-tagline' }, photographersData.tagline)
          const sp3 = factory.createDOMElement('span', { class: 'main-price' }, `${photographersData.price}€/jour`)
          const h2 = factory.createDOMElement('h2', {}, photographersData.name)
          const p1 = factory.createDOMElement('p', {}, h2, spanCountry, sp2, sp3)

          const img1 = factory.createDOMElement('img', {
            src: `http://localhost:3000/api/file/${photographersData.portrait}`,
            alt: `${photographersData.name}`
          })
          const a1 = factory.createDOMElement('a', { role: 'link' }, img1)

          const but = factory.createDOMElement('button', { id: 'contact', class: 'main-contact', onclick: 'openModal();', 'aria-haspopup': true, tabindex: '1' }, 'Contactez-moi')

          const div1 = factory.createDOMElement('div', { class: 'descritpion' }, p1, ul1)
          const div2 = factory.createDOMElement('div', { class: 'container' }, div1, but)

          document.getElementById('main-photographer-description').appendChild(factory.createDOMElement('div', { id: `${photographersData.id}`, class: 'main-photographer' }, a1, div2))
        })
        .catch((error) => {
          console.log(error)
        })
    }
  }
}

export default PhotographerFactory
