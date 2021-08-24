import DOMElementFactory from './domElementFactory.js'

class MediaFactory {
  constructor () {
    this.createMedia = () => {
      fetch('http://localhost:3000/api/medias')
        .then((response) => {
          if (!response.ok) {
            throw new Error('HTTP error ' + response.status)
          }
          return response.json()
        })
        .then((mediaDatas) => {
          let id = 0
          const medias = []
          mediaDatas.forEach(media => {
            Array.from(document.getElementsByClassName('main-photographer')).forEach(el => {
              id = parseInt(el.id, 10)
            })
            if (media.photographerId === id) {
              medias.push(media)
            }
          })
          console.log(medias)
          medias.forEach(media => {
            const factorDomElement = new DOMElementFactory()

            const path = factorDomElement.createDOMElement('path', { d: 'M475.366,71.951c-24.175-23.606-57.575-35.404-100.215-35.404c-11.8,0-23.843,2.046-36.117,6.136c-12.279,4.093-23.702,9.615-34.256,16.562c-10.568,6.945-19.65,13.467-27.269,19.556c-7.61,6.091-14.845,12.564-21.696,19.414c-6.854-6.85-14.087-13.323-21.698-19.414c-7.616-6.089-16.702-12.607-27.268-19.556c-10.564-6.95-21.985-12.468-34.261-16.562c-12.275-4.089-24.316-6.136-36.116-6.136c-42.637,0-76.039,11.801-100.211,35.404C12.087,95.552,0,128.288,0,170.162c0,12.753,2.24,25.889,6.711,39.398c4.471,13.514,9.566,25.031,15.275,34.546c5.708,9.514,12.181,18.796,19.414,27.837c7.233,9.042,12.519,15.27,15.846,18.699c3.33,3.422,5.948,5.899,7.851,7.419L243.25,469.937c3.427,3.429,7.614,5.144,12.562,5.144s9.138-1.715,12.563-5.137l177.87-171.307c43.588-43.583,65.38-86.41,65.38-128.475C511.626,128.288,499.537,95.552,475.366,71.951z' })

            const svg = factorDomElement.createDOMElement('svg', { viewBox: '0 0 511.626 511.627' }, path)
            const span = factorDomElement.createDOMElement('span', {}, `${media.likes}`)

            const mediaLikeContainer = factorDomElement.createDOMElement('div', { class: 'media-like-container' }, span, svg)
            const mediaName = factorDomElement.createDOMElement('div', { class: 'media-name' }, `${media.title}`)

            const mediaDescription = factorDomElement.createDOMElement('div', { class: 'media-description' }, mediaName, mediaLikeContainer)
            const img = factorDomElement.createDOMElement('img', {
              src: `../images/fishEye_photos/Sample%20Photos/${media.image}`,
              alt: `${media.title}`
            })
            const source = factorDomElement.createDOMElement('source', { src: `../images/fishEye_photos/Sample%20Photos/${media.video}`, type: 'video/mp4' })
            const video = factorDomElement.createDOMElement('video', { autoplay: 'true' }, source)

            let mediaElement
            if (media.image) {
              mediaElement = factorDomElement.createDOMElement('div', { class: 'media' }, img, mediaDescription)
            } else {
              mediaElement = factorDomElement.createDOMElement('div', { class: 'media' }, video, mediaDescription)
            }
            document.getElementById('gallery').appendChild(mediaElement)
          }
          )
        })
        .catch((error) => {
          console.log(error)
        })
    }
  }
}

export default MediaFactory
