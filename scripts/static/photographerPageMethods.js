// eslint-disable-next-line no-unused-vars
const openModal = () => {
  document.getElementById('responsive-contact').style.display = 'none'
  Array.from(document.getElementsByClassName('bg-modal')).forEach(modal => {
    modal.style.display = 'block'
  })
  document.getElementById('first').focus()
}

// eslint-disable-next-line no-unused-vars
const closeModal = () => {
  Array.from(document.getElementsByClassName('bg-modal')).forEach(modal => {
    modal.style.display = 'none'
  })
  document.getElementById('responsive-contact').removeAttribute('style')
}

// eslint-disable-next-line no-unused-vars
const logData = () => {
  for (let i = 0; i < event.target.form.length - 1; i++) {
    console.log(event.target.form[i].value)
  }
}

// eslint-disable-next-line no-unused-vars
const manageMenu = () => {
  if (document.getElementById('menu-arrow').className === 'menu-close') {
    document.getElementById('menu-arrow').classList.replace('menu-close', 'menu-open')
    document.getElementById('menu-arrow').removeAttribute('style')
    document.getElementById('arrow-svg').style.animation = 'rotate-arrow 1s forwards'
    document.getElementById('menu-list-container').removeAttribute('style')
    document.getElementById('menu-list-container').style.animation = 'open-bg 1s forwards'
    Array.from(document.getElementsByClassName('list-item')).forEach(item => {
      item.removeAttribute('style')
      // item.style.display = 'list-item'
      item.style.animation = 'open-items 1s forwards'
    })
  } else {
    document.getElementById('menu-arrow').classList.replace('menu-open', 'menu-close')
    document.getElementById('menu-arrow').removeAttribute('style')
    document.getElementById('arrow-svg').style.animation = 'rotate-arrow-back 1s forwards'
    document.getElementById('menu-list-container').removeAttribute('style')
    document.getElementById('menu-list-container').style.animation = 'close-bg 1s forwards'
    Array.from(document.getElementsByClassName('list-item')).forEach(item => {
      item.removeAttribute('style')
      item.style.animation = 'close-items 1s forwards'
    })
  }
}

const openLightbox = () => {
  document.getElementById('lightbox-container').style.display = 'block'
  document.body.style.overflowY = 'hidden'
}

const closeLightbox = () => {
  document.getElementById('lightbox-container').style.display = 'none'
  Array.from(document.getElementById('lightbox-content').children).forEach(child => {
    if (child.tagName !== 'A') {
      child.style.display = 'none'
    }
  })
  document.body.removeAttribute('style')
}

let mediaIndex = 1

const currentMedia = (index) => {
  showMedia(mediaIndex = index - 1)
}

const changeSlide = (index) => {
  showMedia(mediaIndex += index)
}

const showMedia = (index) => {
  const medias = Array.from(document.getElementsByClassName('media-slide'))
  for (let i = 0; i < medias.length; i++) {
    medias[i].style.display = 'none'
  }
  if (index < 0) {
    mediaIndex = medias.length - 1
  }
  medias[mediaIndex % medias.length].style.display = 'block'
}
