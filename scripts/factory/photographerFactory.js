import DOMElementFactory from './domElementFactory.js'

class PhotographerFactory {
  constructor () {
    this.createPhotographers = () => {
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
            const a1 = factory.createDOMElement('a', { id: ptgf._id, href: `./photographer.html?phot=${ptgf._id}` }, img1, h2)

            photographers.push(factory.createDOMElement('div', { class: 'main-photographers' }, a1, p1, ul1))
          })
          photographers.forEach(photographer => {
            Array.from(document.getElementsByTagName('main')).forEach(el => el.appendChild(photographer))
          })
        })
        .catch((error) => {
          console.log(error)
        })
    }
    this.createPhotographer = (id) => {
      fetch(`http://localhost:3000/api/photographers/${id}`)
        .then(response => {
          if (!response.ok) {
            throw new Error('HTTP error ' + response.status)
          }
          return response.json()
        })
        .then(photographersData => {
          const photographers = []
          const factory = new DOMElementFactory()
          // eslint-disable-next-line no-unused-expressions
          const insertTitleForm = () => {
            document.getElementById('photographer-form-name').innerHTML = `Contactez-moi <br> ${photographersData.name}`
          }
          insertTitleForm()

          const ul1 = factory.createDOMElement('ul', {})
          for (let i = 0; i < photographersData.tags.length; i++) {
            ul1.appendChild(factory.createDOMElement('li', {}, factory.createDOMElement('a', { class: 'tag' }, `#${photographersData.tags[i]}`)))
          }

          const spanCountry = factory.createDOMElement('span', { class: 'main-location' }, `${photographersData.city}, ${photographersData.country}`)
          const sp2 = factory.createDOMElement('span', { class: 'main-tagline' }, photographersData.tagline)
          const sp3 = factory.createDOMElement('span', { class: 'main-price' }, `${photographersData.price}€/jour`)
          const h2 = factory.createDOMElement('h2', {}, photographersData.name)
          const p1 = factory.createDOMElement('p', {}, h2, spanCountry, sp2, sp3)

          const img1 = factory.createDOMElement('img', {
            src: `../images/fishEye_photos/Sample%20Photos/Photographers%20ID%20Photos/${photographersData.portrait}`,
            alt: ''
          })
          const a1 = factory.createDOMElement('a', {}, img1)

          const but = factory.createDOMElement('button', { id: 'contact', class: 'main-contact', onclick: 'openModal();' }, 'Contactez-moi')

          const div1 = factory.createDOMElement('div', { class: 'descritpion' }, p1, ul1)
          const div2 = factory.createDOMElement('div', { class: 'container' }, div1, but)

          photographers.push(factory.createDOMElement('div', { class: 'main-photographer' }, a1, div2))
          photographers.forEach(photographer => {
            Array.from(document.getElementsByClassName('main-photographer-description')).forEach(el => el.appendChild(photographer))
          })
        })
        .catch((error) => {
          console.log(error)
        })
    }
  }
}

export default PhotographerFactory
