import DOMElementFactory from './domElementFactory.js'
import DisplayMediaManager from '../filter/displayMediaManager.js'

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
          let newValue = 0
          const factorDomElement = new DOMElementFactory()
          mediaDatas.forEach(media => {
            Array.from(document.getElementsByClassName('main-photographer')).forEach(el => {
              id = parseInt(el.id, 10)
            })
            if (media.photographerId === id) {
              medias.push(media)
            }
          })
          medias.forEach(media => {
            const path = factorDomElement.createDOMElement('path', {
              d: 'M438.482,58.61c-24.7-26.549-59.311-41.655-95.573-41.711c-36.291,0.042-70.938,15.14-95.676,41.694l-8.431,8.909\n' +
                  'l-8.431-8.909C181.284,5.762,98.663,2.728,45.832,51.815c-2.341,2.176-4.602,4.436-6.778,6.778\n' +
                  'c-52.072,56.166-52.072,142.968,0,199.134l187.358,197.581c6.482,6.843,17.284,7.136,24.127,0.654\n' +
                  'c0.224-0.212,0.442-0.43,0.654-0.654l187.29-197.581C490.551,201.567,490.551,114.77,438.482,58.61z'
            })
            const svg = factorDomElement.createDOMElement('svg', { class: 'media-icon not-liked', viewBox: '0 0 480 520' }, path)
            const span = factorDomElement.createDOMElement('span', {}, `${media.likes}`)

            const mediaLikeContainer = factorDomElement.createDOMElement('div', { class: 'media-like-container' }, span, svg)
            const mediaName = factorDomElement.createDOMElement('div', { class: 'media-name' }, `${media.title}`)

            const mediaDescription = factorDomElement.createDOMElement('div', { class: 'media-description' }, mediaName, mediaLikeContainer)
            const img = factorDomElement.createDOMElement('img', {
              src: `http://localhost:3000/api/file/${media.image}`,
              alt: `${media.title}`
            })
            const source = factorDomElement.createDOMElement('source', { src: `http://localhost:3000/api/file/${media.video}`, type: 'video/mp4' })
            const video = factorDomElement.createDOMElement('video', { autoplay: 'true' }, source)

            let mediaElement
            if (media.image) {
              mediaElement = factorDomElement.createDOMElement('div', { class: 'media', 'data-pop': `${media.likes}`, 'data-date': `${media.date}`, 'data-name': `${media.title}` }, img, mediaDescription)
            } else {
              mediaElement = factorDomElement.createDOMElement('div', { class: 'media', 'data-pop': `${media.likes}`, 'data-date': `${media.date}`, 'data-name': `${media.title}` }, video, mediaDescription)
            }
            document.getElementById('gallery').appendChild(mediaElement)

            const filter = new DisplayMediaManager()
            filter.filterMedia('data-pop')
            Array.from(document.getElementsByClassName('item')).forEach(item => {
              item.addEventListener('click', () => {
                if (item.innerHTML === 'Date') {
                  filter.filterMedia('data-date')
                } else if (item.innerHTML === 'Titre') {
                  filter.filterMedia('data-name')
                } else {
                  filter.filterMedia('data-pop')
                }
              })
            })

            Array.from(document.getElementsByClassName('media-icon')).forEach(icon => {
              icon.addEventListener('click', () => {
                if (icon.classList.contains('not-liked')) {
                  icon.children[0].removeAttribute('style')
                  icon.children[0].style.animation = 'heart-fill 1000ms linear forwards'
                  icon.classList.remove('not-liked')
                  icon.classList.add('liked')
                  const oldValue = parseInt(icon.parentNode.children[0].innerHTML)
                  newValue = oldValue + 1
                  icon.parentNode.children[0].innerHTML = `${newValue}`
                  console.log(icon.parentNode.children[0].innerHTML)
                }
              })
            })
          })
          const likeIndicator = factorDomElement.createDOMElement('div', { id: 'likes-indicator' })
          const salaryIndicator = factorDomElement.createDOMElement('div', { id: 'salary-indicator' })
          const indicatorsBar = factorDomElement.createDOMElement('div', { id: 'indicators-bar' }, salaryIndicator, likeIndicator)

          document.getElementById('gallery').appendChild(indicatorsBar)

          const url = window.location.href
          const photographerId = url.split('phot=')[1]

          fetch(`http://localhost:3000/api/photographers/${photographerId}`)
            .then((response) => {
              if (!response.ok) {
                throw new Error('HTTP error ' + response.status)
              }
              return response.json()
            })
            .then((data) => {
              const icon = factorDomElement.createDOMElement('path', {
                d: 'M438.482,58.61c-24.7-26.549-59.311-41.655-95.573-41.711c-36.291,0.042-70.938,15.14-95.676,41.694l-8.431,8.909\n' +
                    'l-8.431-8.909C181.284,5.762,98.663,2.728,45.832,51.815c-2.341,2.176-4.602,4.436-6.778,6.778\n' +
                    'c-52.072,56.166-52.072,142.968,0,199.134l187.358,197.581c6.482,6.843,17.284,7.136,24.127,0.654\n' +
                    'c0.224-0.212,0.442-0.43,0.654-0.654l187.29-197.581C490.551,201.567,490.551,114.77,438.482,58.61z'
              })
              const svg = factorDomElement.createDOMElement('svg', { viewBox: '0 0 480 520' }, icon)
              let likes = 0
              Array.from(document.getElementsByClassName('media-like-container')).forEach(cont => {
                likes += parseInt(cont.children[0].innerHTML)
              })
              const span = factorDomElement.createDOMElement('span', {}, `${likes}`)
              document.getElementById('likes-indicator').appendChild(span)
              document.getElementById('likes-indicator').appendChild(svg)
              document.getElementById('salary-indicator').innerHTML = `${data.price}€ / jours`
            })
            .catch((error) => {
              console.log(error)
            })
          Array.from(document.getElementsByClassName('media-icon')).forEach(icon => {
            icon.addEventListener('click', () => {
              const likeCnt = parseInt(document.getElementById('likes-indicator').children[0].innerHTML)
              document.getElementById('likes-indicator').children[0].innerHTML = `${likeCnt + 1}`
              console.log(document.getElementById('likes-indicator').children[0].innerHTML)
            })
          })
        })
        .catch((error) => {
          console.log(error)
        })
    }
  }
}

export default MediaFactory
