import PhotographerFactory from './factory/photographerFactory.js'
import MediaFactory from './factory/mediaFactory.js'

const factorPhotographer = new PhotographerFactory()
const url = window.location.href
const id = url.split('phot=')[1]
factorPhotographer.createPhotographer(`${id}`)

const factorMedia = new MediaFactory()
factorMedia.createMediaGallery()

document.getElementById('filter-menu').addEventListener('click', () => {
  let index = 0
  Array.from(document.getElementById('gallery').children).forEach(med => {
    index++
    med.children[0].setAttribute('onclick', `openLightbox();showMedia(${index});`)
  })
})
