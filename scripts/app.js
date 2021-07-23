class DOMElementFactory {
  constructor () {
    this.createDOMElement = (type, attributes, ...children) => {
      const element = document.createElement(type)

      for (const key in attributes) {
        element.setAttribute(key, attributes[key])
      }

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

class PhotographerFactory {
  constructor () {
    this.createPhotographer = () => {
      const factory = new DOMElementFactory()
      const a2 = factory.createDOMElement('a', { class: 'tag' }, '#portrait')
      const a3 = factory.createDOMElement('a', { class: 'tag' }, '#events')
      const li1 = factory.createDOMElement('li', {}, a2)
      const li2 = factory.createDOMElement('li', {}, a3)
      const ul1 = factory.createDOMElement('ul', {}, li1, li2)

      const sp1 = factory.createDOMElement('span', { class: 'main-location' }, 'London')
      const sp2 = factory.createDOMElement('span', { class: 'main-tagline' }, 'Bonjour')
      const sp3 = factory.createDOMElement('span', { class: 'main-price' }, '8000€')
      const p1 = factory.createDOMElement('p', {}, sp1, sp2, sp3)

      const img1 = factory.createDOMElement('img', { src: '../images/fishEye_photos/Sample%20Photos/Photographers%20ID%20Photos/EllieRoseWilkens.jpg', alt: '' })
      const h2 = factory.createDOMElement('h2', {}, 'Ellie-Rose')
      const a1 = factory.createDOMElement('a', {}, img1, h2)

      return factory.createDOMElement('div', { class: 'main-photographer' }, a1, p1, ul1)
    }
  }
}

const factorPhotographer = new PhotographerFactory()

const photographer = factorPhotographer.createPhotographer()

const getMain = () => {
  Array.from(document.getElementsByTagName('main')).forEach(el => el.appendChild(photographer))
}

getMain()
