/**
 * FR: Classe de filtre utilisée pour trier les medias en fonction de leur popularité, date et titre.
 * Elle est utilisé dynamiquement dans la classe MediaFactory à la génération des éléments sur lesquels s'appliquent le filtre.
 *
 * EN: Filter class used to sort media based on popularity, date and title (alphabetical order).
 * It is used dynamically in the MediaFactory class when generating the elements to which the filter is applied.
 */
class DisplayMediaManager {
  constructor () {
    /**
     * FR: Cette classe pren en paramètre un attribut "data-" porté par chacun des éléments media et contenant toutes les
     * informations utilent au filtrage (voir mediaFactory.js l.190 à 206).
     *
     * EN: This class takes as a parameter a "data-" attribute carried by each of the media elements and containing all the
     * information useful for filtering (see mediaFactory.js l.190 to 206).
     * @param data
     */
    this.filterMedia = (data) => {
      /**
       * FR: Va rechercher dans le DOM la galerie contenant les éléments media à trier et les injectent à nouveau en modifiant
       * l'ordre d'injection en fonction de l'event clic depuis lequel elle a été apellée.
       *
       * EN: Will search the DOM for the gallery containing the media elements to sort and inject them again by modifying
       * the order of injection according to the click event from which it was called.
       * @type {Element}
       */
      const gallery = document.querySelector('#gallery')
      const nodes = Array.from(gallery.children)
      nodes.forEach(node => gallery.removeChild(node))
      nodes.sort((a, b) => {
        if (data === 'data-pop') {
          return parseInt(a.getAttribute(data)) - parseInt(b.getAttribute(data))
        } else {
          return a.getAttribute(data) > b.getAttribute(data) ? 1 : -1
        }
      })
      if (data === 'data-pop' || data === 'data-date') { nodes.reverse() }
      nodes.forEach(node => gallery.appendChild(node))
    }
  }
}

export default DisplayMediaManager
