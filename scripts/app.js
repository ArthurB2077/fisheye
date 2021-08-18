import PhotographerFactory from './factory/photographerFactory.js'
import DisplayPhotographerManager from './filter/displayPhotographerManager.js'

const factorPhotographer = new PhotographerFactory()
factorPhotographer.createPhotographer()

const displayPhotographer = new DisplayPhotographerManager()
displayPhotographer.filterPhotographer()
