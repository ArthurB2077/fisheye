import PhotographerFactory from './factory/photographerFactory.js'
import MediaFactory from './factory/mediaFactory.js'

const factorPhotographer = new PhotographerFactory()
const url = window.location.href
const id = url.split('phot=')[1]
factorPhotographer.createPhotographer(`${id}`)

const factorMedia = new MediaFactory()
factorMedia.createMedia()
