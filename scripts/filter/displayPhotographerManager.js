const tags = document.getElementsByClassName('tag-nav')
const selectedTags = document.getElementsByClassName('tag-selected')
const photographers = document.getElementsByClassName('main-photographers')

/**
 * FR: Classe de filtrage permettant d'afficher sur la Homepage seulement les photographes ayant parmi leur tags ceux
 * sélectionnés dans la naviguation.
 *
 * EN: Filtering class allowing to display on the Homepage only the photographers having among their tags those
 * selected navigation.
 */
class DisplayPhotographerManager {
  constructor () {
    this.filterPhotographer = () => {
      /**
       * FR: Itère sur tous les tags statiques du DOM (navigation).
       *
       * EN: Iterate over all static DOM tags (navigation).
       */
      Array.from(tags).forEach(tag => {
        /**
         * FR: Un écouteur d'évènements vérifie pour chaque tag s'il reçoit un clic utilisateur.
         *
         * EN: An event listener checks for each tag if it receives a user click.
         */
        tag.addEventListener('click', () => {
          /**
           * FR: Si un tag possédant la classe de style "tag-nav" reçoit un clic, cette classe est remplacé par "tag-selected".
           *
           * EN: If a tag with the "tag-nav" style class receives a click, this class is replaced by "tag-selected".
           */
          if (tag.className === 'tag-nav') {
            tag.classList.replace('tag-nav', 'tag-selected')
            /**
             * FR: Une fois le tag discrimant validé, itère sur chaque élément possédant la classe "main-photographer" (nos
             * objets photographer affhichés dans le DOM).
             *
             * EN: Once the discriminant tag has been validated, iterate over each element with the "main-photographer"
             * class (our photographer objects displayed in the DOM).
             */
            Array.from(photographers).forEach(pt => {
              /**
               * FR: Passe le display à none par défaut
               *
               * EN: Set the display to none by default
               * @type {string}
               */
              pt.style.display = 'none'
              /**
               * FR: Modifie la class de style des lignes ("main-photographers-list") afin que les élements s'affiche
               * à la suite et ordonnés même en petit nombre.
               *
               * EN: Update the style class of the lines ("main-photographers-list") so that the elements are displayed
               * consecutively and ordered even in small numbers.
               */
              Array.from(document.getElementsByClassName('main-photographers-list')).forEach(ls => {
                ls.style.justifyContent = 'normal'
              })
              /**
               * FR: Va chercher dans chacun des éléments photographers la liste des tags affichés.
               *
               * EN: Go and look for the list of tags displayed in each of the photographic elements.
               */
              pt.querySelectorAll('ul > li > a').forEach(tg => {
                /**
                 * FR: En se basant sur les tags selectionnés (selectedTags l.2), les tags de chaque photographer sont comparé
                 * et si une correspondance est trouvée alors le style="display:none;" est retiré du photographer.
                 * Les chaînes de caractères sont passées en minucules pour éviter les erreurs liées à la casse et les
                 * différences entre pluriel et singulier sont négligées (erreurs dans les maquettes/JSON)
                 *
                 * EN: Based on the selected tags (selectedTags l.2), the tags of each photographer are compared
                 * and if a match is found then the style = "display: none;" is removed from the photographer.
                 * The character strings are passed in lowercase to avoid the errors related to the case and the
                 * differences between plural and singular are neglected (errors in models / JSON)
                 */
                Array.from(selectedTags).forEach(st => {
                  if ((tg.innerHTML === st.innerHTML.toLowerCase()) || (tg.innerHTML === st.innerHTML.toLowerCase() + 's')) {
                    pt.removeAttribute('style')
                  }
                })
              })
            })
          } else {
            /**
             * FR: Même principe dans le cas d'un clique sur un ""tag-selected" mais en inversant le processus.
             *
             * EN: Same principle in the case of a click on a "tag-selected" but by reversing the process.
             */
            tag.classList.replace('tag-selected', 'tag-nav')
            Array.from(photographers).forEach(pt => {
              pt.style.display = 'none'
              pt.querySelectorAll('ul > li > a').forEach(tg => {
                Array.from(selectedTags).forEach(st => {
                  if (tg.innerHTML === st.innerHTML.toLowerCase()) {
                    pt.removeAttribute('style')
                  }
                })
              })
              /**
               * FR: Gère le cas dans lequel des tags ont reçu un click mais ont été déselectionnés par la suite. Donc
               * si aucun tags n'est sélectionnés, l'attribut style="display: none;" est retiré
               *
               * EN: Handles the case in which tags received a click but were subsequently deselected. So
               * if no tags are selected, the style = "display: none;" attribute is withdrawn
               */
              if (selectedTags.length === 0) {
                pt.removeAttribute('style')
              }
            })
          }
        })
      })
    }
  }
}

export default DisplayPhotographerManager
