class DisplayMediaManager {
  constructor () {
    this.filterMedia = (data) => {
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
