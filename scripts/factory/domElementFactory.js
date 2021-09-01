/**
 * Classe automatisant une partie du processus de création d'éléments du DOM dynamiques.
 */
class DOMElementFactory {
  constructor () {
    /**
     * Méthode permettant la création d'un élément DOM dynamique. Elle prends trois arguments: le type de la balise HTML
     * à créer (div, span, h1...), un objet Javascript dont les paires clés/valeurs représentes les attributs/valeurs de
     * l'élement à créer (class: "ma-class-css", aria-label: "Description"...) et une/des variable(s) pour le/les enfant
     * ou le contenude à intégrer dans la balise (texte, balise...).
     * @param type
     * @param attributes
     * @param children
     * @returns {*}
     */
    this.createDOMElement = (type, attributes, ...children) => {
      /**
       * Vérifie si le type de l'élément correspond à un svg.
       * Si oui, utilise la méthode appropriée pour créer un élément du DOM vectoriel.
       * Si non, utilise la méthode Javascript classique pour créer un élément du DOM.
       */
      let element
      if (type === 'svg' || type === 'path') {
        element = document.createElementNS('http://www.w3.org/2000/svg', type)
      } else {
        element = document.createElement(type)
      }
      /**
       * Boucle itérant au travers des paires clés/valeurs de notre object contenant les attributs/valeur de notre
       * élément et les ajoutant à ce dernier à l'aide de la méthode setAttribute("attribute", "value").
       */
      for (const key in attributes) {
        element.setAttribute(key, attributes[key])
      }
      /**
       * Si children est une liste, itère au travers de celle-ci et ajoute chaque élément en tant qu'enfant à l'élément
       * DOM en cours de création.
       * Si children est une chaine de caractère, ajoute celle-ci en tan que contenu de notre élément.
       */
      children.forEach(child => {
        if (typeof child === 'string') {
          element.innerText = child
        } else {
          element.appendChild(child)
        }
      })

      return element
    }
  }
}

export default DOMElementFactory
