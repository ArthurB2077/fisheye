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

export default DOMElementFactory
