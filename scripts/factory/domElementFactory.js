/**
 * Classe automatisant une partie du processus de création d'éléments du DOM dynamiques.
 */
class DOMElementFactory {
  constructor () {
    /**
     * FR: Méthode permettant la création d'un élément DOM dynamique. Elle prends trois arguments: le type de la balise HTML
     * à créer (div, span, h1...), un objet Javascript dont les paires clés/valeurs représentes les attributs/valeurs de
     * l'élement à créer (class: "ma-class-css", aria-label: "Description"...) et une/des variable(s) pour le/les enfant
     * ou le contenude à intégrer dans la balise (texte, balise...).
     *
     * EN: Method allowing the creation of a dynamic DOM element. It takes three arguments: the type of the HTML tag
     * to create (div, span, h1 ...), a Javascript object whose key/value pairs represent the attributes/values of
     * the element to create (class: "my-class-css", aria-label: "Description" ...) and a(n) variable for the child(s)
     * or the content to be included in the tag (text, tag ...).
     * @param type
     * @param attributes
     * @param children
     * @returns {*}
     */
    this.createDOMElement = (type, attributes, ...children) => {
      /**
       * FR: Vérifie si le type de l'élément correspond à un svg.
       * Si oui, utilise la méthode appropriée pour créer un élément du DOM vectoriel.
       * Si non, utilise la méthode Javascript classique pour créer un élément du DOM.
       *
       * EN: Checks if the item's type matches an svg.
       * If yes, use the appropriate method to create a vector DOM element.
       * If not, use the classic Javascript method to create a DOM element.
       */
      let element
      if (type === 'svg' || type === 'path') {
        element = document.createElementNS('http://www.w3.org/2000/svg', type)
      } else {
        element = document.createElement(type)
      }
      /**
       * FR: Boucle itérant au travers des paires clés/valeurs de notre object contenant les attributs/valeur de notre
       * élément et les ajoutant à ce dernier à l'aide de la méthode setAttribute("attribute", "value").
       *
       * EN: Loop iterating through the key/value pairs of our object containing the attributes/value of our
       * element and appending them to it using the setAttribute("attribute", "value") method.
       */
      for (const key in attributes) {
        element.setAttribute(key, attributes[key])
      }
      /**
       * FR: Si children est une liste, itère au travers de celle-ci et ajoute chaque élément en tant qu'enfant à l'élément
       * DOM en cours de création.
       * Si children est une chaine de caractère, ajoute celle-ci en tant que contenu de notre élément.
       *
       * EN: If children is a list, iterate through it and add each element as a child to the element
       * DOM being created.
       * If children is a string, add this as the content of our element.
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
