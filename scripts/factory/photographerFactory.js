import DOMElementFactory from './domElementFactory.js'

class PhotographerFactory {
  constructor () {
    this.createPhotographer = () => {
      fetch('http://localhost:3000/api/photographers')
        .then(response => {
          if (!response.ok) {
            throw new Error('HTTP error ' + response.status)
          }
          return response.json()
        })
        .then(photographersData => {
          const photographers = []
          photographersData.forEach(ptgf => {
            const factory = new DOMElementFactory()

            const ul1 = factory.createDOMElement('ul', {})
            for (let i = 0; i < ptgf.tags.length; i++) {
              ul1.appendChild(factory.createDOMElement('li', {}, factory.createDOMElement('a', { class: 'tag' }, `#${ptgf.tags[i]}`)))
            }

            const spanCountry = factory.createDOMElement('span', { class: 'main-location' }, `${ptgf.city}, ${ptgf.country}`)
            const sp2 = factory.createDOMElement('span', { class: 'main-tagline' }, ptgf.tagline)
            const sp3 = factory.createDOMElement('span', { class: 'main-price' }, `${ptgf.price}€/jour`)
            const p1 = factory.createDOMElement('p', {}, spanCountry, sp2, sp3)

            const img1 = factory.createDOMElement('img', {
              src: `../images/fishEye_photos/Sample%20Photos/Photographers%20ID%20Photos/${ptgf.portrait}`,
              alt: ''
            })
            const h2 = factory.createDOMElement('h2', {}, ptgf.name)
            const a1 = factory.createDOMElement('a', {}, img1, h2)

            photographers.push(factory.createDOMElement('div', { class: 'main-photographer' }, a1, p1, ul1))
          })
          photographers.forEach(photographer => {
            Array.from(document.getElementsByTagName('main')).forEach(el => el.appendChild(photographer))
          })
        })
        .catch((error) => {
          console.log(error)
        })
    }
  }
}

export default PhotographerFactory
