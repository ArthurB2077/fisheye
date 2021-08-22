const tags = document.getElementsByClassName('tag-nav')
const selectedTags = document.getElementsByClassName('tag-selected')
const photographers = document.getElementsByClassName('main-photographers')

class DisplayPhotographerManager {
  constructor () {
    this.filterPhotographer = () => {
      Array.from(tags).forEach(tag => {
        tag.addEventListener('click', () => {
          if (tag.className === 'tag-nav') {
            tag.classList.replace('tag-nav', 'tag-selected')
            Array.from(photographers).forEach(pt => {
              pt.style.display = 'none'
              Array.from(document.getElementsByClassName('main-photographers-list')).forEach(ls => {
                ls.style.justifyContent = 'normal'
              })
              pt.querySelectorAll('ul > li > a').forEach(tg => {
                Array.from(selectedTags).forEach(st => {
                  if ((tg.innerHTML === st.innerHTML.toLowerCase()) || (tg.innerHTML === st.innerHTML.toLowerCase() + 's')) {
                    pt.removeAttribute('style')
                  }
                })
              })
            })
          } else {
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
