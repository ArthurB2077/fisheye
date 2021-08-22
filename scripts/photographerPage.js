import PhotographerFactory from './factory/photographerFactory.js'

const factorPhotographer = new PhotographerFactory()
const url = window.location.href
const id = url.split('phot=')[1]
factorPhotographer.createPhotographer(`${id}`)
